---
date: 2026-01-19T12:00:00-08:00
researcher: Claude
git_commit: N/A (new project)
branch: N/A
repository: personal-blog
topic: "Best options for hosting a personal markdown blog on Vercel"
tags: [research, static-site-generators, astro, nextjs, vercel, markdown, blog]
status: complete
last_updated: 2026-01-19
last_updated_by: Claude
---

# Research: Best Options for Hosting a Personal Markdown Blog on Vercel

**Date**: 2026-01-19T12:00:00-08:00
**Researcher**: Claude
**Git Commit**: N/A (new project)
**Branch**: N/A
**Repository**: personal-blog

## Research Question

What are the current best options for hosting a personal blog given a preference to manage content with markdown? Requirements include creating a simple static site for personal self-promotion, hosting on Vercel, with prior experience using Next.js and Astro.

## Summary

**Astro is the recommended choice** for a markdown-based personal blog on Vercel in 2025-2026. It offers superior markdown support through Content Collections, ships zero JavaScript by default, has 5x faster build times than Next.js, and deploys to Vercel with zero configuration. Next.js remains viable if dynamic features are needed, while Eleventy and SvelteKit serve as lightweight alternatives.

## Detailed Findings

### Astro (Recommended)

Astro has emerged as the leading static site generator for content-focused websites. Version 5.0 (released late 2024) introduced the Content Layer API, which provides:

- **Type-safe content management** with Zod schema validation
- **5x faster builds** for Markdown pages on content-heavy sites
- **2x faster builds** for MDX content
- **25-50% less memory usage** compared to the legacy approach
- **Zero JavaScript by default** - only ships JS when explicitly added

#### Performance Characteristics

| Metric | Astro | Next.js |
|--------|-------|---------|
| Build time (50 posts) | 4.2s | 18.7s |
| JavaScript shipped | 0KB | ~127KB |
| First Contentful Paint | 0.5s | 1-1.5s |
| Lighthouse scores | 98-100 | 85-95 |

#### Content Collections Example

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
```

#### Recommended Templates

| Template | Description | Best For |
|----------|-------------|----------|
| **Official Blog** | Minimal, well-documented | Quick start |
| **Astrofy** | Portfolio + Blog + CV + RSS | Self-promotion |
| **Stablo** | MDX + Tailwind, minimal | Clean design |

#### Quick Start

```bash
npm create astro@latest -- --template blog
vercel
```

#### Gotchas

1. Config file moved from `src/content/config.ts` to `src/content.config.ts` in v5
2. `layout` frontmatter field no longer supported - must import layouts in route templates
3. TypeScript required for content collection type safety
4. May need to install latest `@astrojs/mdx` separately for MDX support

### Next.js with MDX

Next.js remains a strong option, particularly for blogs requiring dynamic features or integration with larger React applications.

#### Two Main Approaches

1. **`@next/mdx` (Recommended)**: MDX imports directly into components, no frontmatter by default
2. **`next-mdx-remote` (Legacy)**: Cannot handle import/export in MDX, marked "unstable" with RSC

#### When to Choose Next.js

- Need dynamic features (comments, user auth, real-time updates)
- Blog is part of a larger React application
- Require ISR for automatic CMS content updates
- Have significant existing React expertise

#### Recommended Templates

| Template | Description |
|----------|-------------|
| **Portfolio Starter Kit** | Official Vercel, MDX + Tailwind v4 + RSS |
| **Blog Starter Kit** | Official, simpler setup |

### Eleventy (11ty) - Lightweight Alternative

Eleventy v3 offers zero-JavaScript output with perfect Lighthouse scores out of the box.

#### Key Features

- Supports 10+ templating languages
- Automatic blog post collections, tag pages, RSS feeds
- 0 Cumulative Layout Shift, 0ms Total Blocking Time
- Maintained by Google (eleventy-high-performance-blog)

#### Best For

- Maximum simplicity
- Template-based development over component frameworks
- Perfect Lighthouse scores with minimal effort

### SvelteKit - Modern Alternative

SvelteKit with mdsvex provides a modern alternative for those familiar with Svelte.

#### Key Features

- Svelte 5 compatible (as of late 2025)
- 100% Lighthouse scores achievable
- Client-side routing with static export

#### Consideration

- Requires Svelte knowledge (smaller community than React)
- Adapter configuration needed for Vercel

## Comparison Matrix

| Feature | Astro | Next.js | Eleventy | SvelteKit |
|---------|-------|---------|----------|-----------|
| **Markdown Support** | Excellent | Good | Excellent | Good |
| **Zero JS Default** | Yes | No | Yes | No |
| **Build Speed** | Fastest | Slower | Fast | Fast |
| **Vercel Deploy** | Zero-config | Native | Zero-config | Adapter |
| **Type Safety** | Built-in (Zod) | Optional | None | Optional |
| **Learning Curve** | Low | Medium | Low | Medium |
| **Dynamic Features** | Via islands | Full | Limited | Full |

## Architecture Insights

### Static Site Generator Evolution (2024-2026)

The static site generator landscape has consolidated around a few key players:

1. **Content-first frameworks** (Astro, Eleventy) - Optimize for minimal JavaScript and fast content delivery
2. **App frameworks with static export** (Next.js, SvelteKit) - Provide full application capabilities with optional static generation
3. **Hybrid approaches** - Astro's "islands architecture" allows selective hydration of interactive components

### Vercel Deployment Patterns

- All major SSGs now have zero-config or near-zero-config Vercel deployment
- Astro and Eleventy deploy as pure static sites
- Next.js and SvelteKit can use edge functions for dynamic features
- Build caching and incremental builds reduce deployment times

## Final Recommendation

For a simple personal blog with markdown content on Vercel:

**Primary Choice: Astro**
- Best markdown DX with Content Collections
- Fastest builds and smallest output
- Zero configuration for Vercel
- Familiar if you've used it before, easy to learn if not

**Alternative: Next.js**
- Only if you anticipate needing dynamic features
- Good choice if blog will grow into a larger application

## Sources

### Astro
- [Astro Markdown Guide | Docs](https://docs.astro.build/en/guides/markdown-content/)
- [Content Layer: A Deep Dive | Astro](https://astro.build/blog/content-layer-deep-dive/)
- [Astro 5.0 Release](https://astro.build/blog/astro-5/)
- [Deploy Astro to Vercel | Docs](https://docs.astro.build/en/guides/deploy/vercel/)
- [Official Astro Blog Template](https://astro.build/themes/details/blog/)
- [Best Astro Blog Templates 2025](https://statichunt.com/blog/best-astro-blog-templates)

### Next.js
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx)
- [Building a blog with Next.js App Router and MDX](https://www.alexchantastic.com/building-a-blog-with-next-and-mdx)
- [Next.js Portfolio Starter Kit | Vercel](https://vercel.com/templates/next.js/portfolio-starter-kit)

### Eleventy
- [Eleventy Base Blog | GitHub](https://github.com/11ty/eleventy-base-blog)
- [eleventy-high-performance-blog | Google GitHub](https://github.com/google/eleventy-high-performance-blog)

### SvelteKit
- [Build a static Markdown blog with SvelteKit | Josh Collinsworth](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog)
- [SvelteKit Blog Starter | GitHub](https://github.com/josh-collinsworth/sveltekit-blog-starter)

### Comparisons
- [Top Static Site Generators for 2025 | CloudCannon](https://cloudcannon.com/blog/the-top-five-static-site-generators-for-2025-and-when-to-use-them/)
- [Astro vs Next.js: Which Is Better for Your Project in 2025?](https://pagepro.co/blog/astro-nextjs/)
- [Astro vs Next.js for Blogs 2026](https://sourabhyadav.com/blog/astro-vs-nextjs-for-blogs-2026/)

## Open Questions

1. Will the blog need any interactive features (comments, newsletter signup, contact forms)?
2. Is there a preference for styling approach (Tailwind, vanilla CSS, CSS-in-JS)?
3. Are there specific design/template preferences for the self-promotion focus?
