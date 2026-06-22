// Pure, framework-agnostic builders for schema.org JSON-LD nodes.
//
// IMPORTANT: keep this file free of Astro globals. Callers (e.g. BaseHead.astro)
// must resolve `Astro.site` and any asset paths up front and pass them in as
// plain values (URL / string / Date). This keeps the builders unit-testable and
// reusable.
//
// Framing note: structured data enables rich-result *eligibility* and richer
// search appearance. It is NOT a ranking signal — do not describe it as such.

import { AUTHOR, SITE_TITLE } from '../consts';

// ---------------------------------------------------------------------------
// Stable @id scheme (all absolute, resolved against the site origin).
// ---------------------------------------------------------------------------

/** Fragment ids appended to absolute URLs to form stable node @ids. */
export const SCHEMA_IDS = {
	website: '#website',
	person: '#person',
	webpage: '#webpage',
	article: '#article',
	work: '#work',
	breadcrumb: '#breadcrumb',
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single visible breadcrumb crumb. `url` is resolved later vs. the site. */
export interface BreadcrumbItem {
	name: string;
	url: string;
}

/** A schema.org node. Always carries an @type; usually carries an @id. */
export interface SchemaNode {
	'@type': string | string[];
	'@id'?: string;
	[key: string]: unknown;
}

/** The final graph object rendered into a single ld+json script. */
export interface SchemaGraph {
	'@context': 'https://schema.org';
	'@graph': SchemaNode[];
}

export type WebPageType = 'WebPage' | 'CollectionPage' | 'ProfilePage' | 'AboutPage';

export interface WebsiteNodeOptions {
	name?: string;
	description: string;
}

export interface WebPageNodeOptions {
	site: URL;
	url: string;
	name: string;
	type?: WebPageType;
	breadcrumbId?: string;
	mainEntityId?: string;
	datePublished?: Date;
	dateModified?: Date;
	isPartOfWebsiteId?: string;
}

export interface BlogPostingNodeOptions {
	site: URL;
	url: string;
	headline: string;
	description: string;
	datePublished: Date;
	dateModified?: Date;
	image?: { url: string; width?: number; height?: number };
	webpageId: string;
}

export interface CreativeWorkNodeOptions {
	site: URL;
	url: string;
	name: string;
	description: string;
	/** Tech stack / topics. Joined into a comma-separated `keywords` string. */
	keywords?: string[];
	image?: { url: string; width?: number; height?: number };
	dateCreated?: Date;
	/** External/live project URL — used for `url` + `sameAs`. */
	externalUrl?: string;
	/** Client name -> sourceOrganization. */
	client?: string;
}

export interface SoftwareApplicationNodeOptions extends CreativeWorkNodeOptions {
	applicationCategory?: string;
	operatingSystem?: string;
}

// ---------------------------------------------------------------------------
// URL helper
// ---------------------------------------------------------------------------

/**
 * Resolve a path or URL to an absolute https URL against `site`.
 * Pass-through (trimmed) if the value is already absolute (http/https/protocol-relative).
 */
export function absUrl(site: URL, pathOrUrl: string): string {
	const value = pathOrUrl.trim();
	if (/^https?:\/\//i.test(value)) return value;
	if (value.startsWith('//')) return `https:${value}`;
	return new URL(value, site).href;
}

/** Build a node @id by resolving a base URL absolute then appending a fragment. */
function nodeId(site: URL, baseUrl: string, fragment: string): string {
	return `${absUrl(site, baseUrl)}${fragment}`;
}

function isoOrUndefined(date?: Date): string | undefined {
	return date ? date.toISOString() : undefined;
}

// ---------------------------------------------------------------------------
// Node builders
// ---------------------------------------------------------------------------

/**
 * Global Person node (entity identity via sameAs). Included on every page for
 * identity; on its own it yields no Google rich result. Carries a headshot
 * ImageObject (square) when AUTHOR.image is configured.
 */
export function personNode(site: URL): SchemaNode {
	const node: SchemaNode = {
		'@type': 'Person',
		'@id': `${site.origin}/${SCHEMA_IDS.person}`,
		name: AUTHOR.name,
		url: absUrl(site, AUTHOR.url),
		jobTitle: AUTHOR.jobTitle,
		sameAs: [...AUTHOR.sameAs],
		worksFor: {
			'@type': 'Organization',
			name: AUTHOR.worksFor.name,
			url: AUTHOR.worksFor.url,
		},
	};
	if (AUTHOR.image) {
		node.image = imageObject(site, AUTHOR.image, `${site.origin}/${SCHEMA_IDS.person}-image`);
	}
	return node;
}

/** Global WebSite node. publisher points at the global Person. */
export function websiteNode(site: URL, opts: WebsiteNodeOptions): SchemaNode {
	return {
		'@type': 'WebSite',
		'@id': `${site.origin}/${SCHEMA_IDS.website}`,
		name: opts.name ?? SITE_TITLE,
		url: `${site.origin}/`,
		description: opts.description,
		publisher: { '@id': `${site.origin}/${SCHEMA_IDS.person}` },
		inLanguage: 'en',
	};
}

/**
 * Per-page WebPage node (or a subtype: CollectionPage / ProfilePage / AboutPage).
 * Self-contained: always wires isPartOf -> #website. Optional breadcrumb /
 * mainEntity references and dates are included only when provided.
 */
export function webPageNode(opts: WebPageNodeOptions): SchemaNode {
	const {
		site,
		url,
		name,
		type = 'WebPage',
		breadcrumbId,
		mainEntityId,
		datePublished,
		dateModified,
		isPartOfWebsiteId,
	} = opts;

	const node: SchemaNode = {
		'@type': type,
		'@id': nodeId(site, url, SCHEMA_IDS.webpage),
		url: absUrl(site, url),
		name,
		isPartOf: { '@id': isPartOfWebsiteId ?? `${site.origin}/${SCHEMA_IDS.website}` },
	};

	if (breadcrumbId) node.breadcrumb = { '@id': breadcrumbId };
	if (mainEntityId) node.mainEntity = { '@id': mainEntityId };

	const published = isoOrUndefined(datePublished);
	const modified = isoOrUndefined(dateModified ?? datePublished);
	if (published) node.datePublished = published;
	if (modified) node.dateModified = modified;

	return node;
}

/**
 * BreadcrumbList matching the visible nav. Positions are 1-based and contiguous.
 * The LAST crumb (current page) omits `item` per Google guidance.
 */
export function breadcrumbNode(
	site: URL,
	currentUrl: string,
	items: BreadcrumbItem[],
): SchemaNode {
	const lastIndex = items.length - 1;
	return {
		'@type': 'BreadcrumbList',
		'@id': nodeId(site, currentUrl, SCHEMA_IDS.breadcrumb),
		itemListElement: items.map((item, i) => {
			const element: SchemaNode = {
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
			};
			if (i !== lastIndex) {
				element.item = absUrl(site, item.url);
			}
			return element;
		}),
	};
}

/**
 * BlogPosting node. The property that accepts a Person and matters for the
 * Article rich result is `author`; `publisher` is optional and here points at
 * the same Person @id (no logo required).
 */
export function blogPostingNode(opts: BlogPostingNodeOptions): SchemaNode {
	const { site, url, headline, description, datePublished, dateModified, image, webpageId } = opts;
	const personRef = { '@id': `${site.origin}/${SCHEMA_IDS.person}` };

	const node: SchemaNode = {
		'@type': 'BlogPosting',
		'@id': nodeId(site, url, SCHEMA_IDS.article),
		headline,
		description,
		datePublished: datePublished.toISOString(),
		dateModified: (dateModified ?? datePublished).toISOString(),
		author: personRef,
		publisher: personRef,
		mainEntityOfPage: { '@id': webpageId },
		url: absUrl(site, url),
		inLanguage: 'en',
	};

	if (image) {
		node.image = imageObject(site, image);
	}

	return node;
}

/**
 * Portfolio CreativeWork node. Default for portfolio projects unless the project
 * is genuinely an installable/shippable app (use softwareApplicationNode then).
 */
export function creativeWorkNode(opts: CreativeWorkNodeOptions): SchemaNode {
	return buildWorkNode('CreativeWork', opts);
}

/**
 * Portfolio SoftwareApplication node. Use ONLY for genuinely installable/
 * shippable apps or tools; adds applicationCategory + operatingSystem.
 */
export function softwareApplicationNode(opts: SoftwareApplicationNodeOptions): SchemaNode {
	const node = buildWorkNode('SoftwareApplication', opts);
	if (opts.applicationCategory) node.applicationCategory = opts.applicationCategory;
	if (opts.operatingSystem) node.operatingSystem = opts.operatingSystem;
	return node;
}

function buildWorkNode(
	type: 'CreativeWork' | 'SoftwareApplication',
	opts: CreativeWorkNodeOptions,
): SchemaNode {
	const { site, url, name, description, keywords, image, dateCreated, externalUrl, client } = opts;

	const node: SchemaNode = {
		'@type': type,
		'@id': nodeId(site, url, SCHEMA_IDS.work),
		name,
		description,
		creator: { '@id': `${site.origin}/${SCHEMA_IDS.person}` },
		inLanguage: 'en',
	};

	if (keywords && keywords.length > 0) node.keywords = keywords.join(', ');
	if (image) node.image = imageObject(site, image);
	if (dateCreated) node.dateCreated = dateCreated.toISOString();

	if (externalUrl) {
		node.url = absUrl(site, externalUrl);
		node.sameAs = [absUrl(site, externalUrl)];
	} else {
		node.url = absUrl(site, url);
	}

	if (client) {
		node.sourceOrganization = { '@type': 'Organization', name: client };
	}

	return node;
}

/** Build an ImageObject (with optional @id, dimensions, caption) from a resolved-absolute url. */
function imageObject(
	site: URL,
	image: { url: string; width?: number; height?: number; caption?: string },
	id?: string,
): SchemaNode {
	const node: SchemaNode = {
		'@type': 'ImageObject',
		url: absUrl(site, image.url),
	};
	if (id) node['@id'] = id;
	if (typeof image.width === 'number') node.width = image.width;
	if (typeof image.height === 'number') node.height = image.height;
	if (image.caption) node.caption = image.caption;
	return node;
}

// ---------------------------------------------------------------------------
// Graph wrapper
// ---------------------------------------------------------------------------

/**
 * Wrap nodes into a single schema.org graph object.
 * - Drops falsy entries (so callers can spread conditionals inline).
 * - De-dupes by @id (first occurrence wins); nodes without an @id are kept as-is.
 */
export function buildGraph(nodes: Array<SchemaNode | null | undefined | false>): SchemaGraph {
	const seen = new Set<string>();
	const graph: SchemaNode[] = [];

	for (const node of nodes) {
		if (!node) continue;
		const id = node['@id'];
		if (typeof id === 'string') {
			if (seen.has(id)) continue;
			seen.add(id);
		}
		graph.push(node);
	}

	return { '@context': 'https://schema.org', '@graph': graph };
}
