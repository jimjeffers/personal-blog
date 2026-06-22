// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Jim Jeffers';
export const SITE_DESCRIPTION =
	'Writing by Jim Jeffers on leadership, coding, business, software, and practical outcomes in the age of AI.';

/**
 * Canonical site origin. `Astro.site` (from astro.config.mjs) remains the
 * source of truth inside .astro files; this is provided for non-Astro consumers.
 */
export const SITE_URL = 'https://jimjeffers.com';

/** Owner / author / publisher — a single Person across the whole site. */
export const AUTHOR = {
	name: 'Jim Jeffers',
	url: 'https://jimjeffers.com/',
	jobTitle: 'Co-founder & CTO, eDNA Explorer',
	sameAs: [
		'https://github.com/jimjeffers',
		'https://www.linkedin.com/in/jimjeffers',
		'https://twitter.com/jimjeffers',
	],
	worksFor: {
		name: 'eDNA Explorer',
		url: 'https://ednaexplorer.org',
	},
	/** Square headshot served from /public (stable, crawlable URL for schema). */
	image: {
		url: '/jim-jeffers.webp',
		width: 360,
		height: 360,
		caption: 'Jim Jeffers',
	},
} as const;
