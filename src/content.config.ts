import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const portfolio = defineCollection({
	loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			client: z.string().optional(),
			role: z.string(),
			stack: z.array(z.string()),
			startDate: z.coerce.date(),
			endDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			hero: z.object({
				background: z.string(),
				foreground: z.string(),
				accent: z.string().optional(),
				muted: z.string().optional(),
				heading: z.string().optional(),
				variant: z.enum(['desktop', 'phones', 'marketing-row', 'clarus']).default('desktop'),
				screenshots: z.array(z.string()).optional(),
			}).optional(),
			screenshots: z.array(z.string()).optional(),
			screenshotDisplay: z.enum(['strip', 'carousel', 'inline', 'none']).default('strip'),
			externalUrl: z.string().url().optional(),
			featured: z.boolean().default(false),
			tags: z.array(z.string()).default([]),
			order: z.number().default(99),
		}),
});

export const collections = { blog, portfolio };
