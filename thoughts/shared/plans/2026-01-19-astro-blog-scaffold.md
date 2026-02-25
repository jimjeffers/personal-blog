# Astro Blog Scaffold Implementation Plan

## Overview

Scaffold a personal markdown blog using Astro's official blog template with Tailwind CSS, deployed to Vercel. The site will be purely static with no interactive features.

## Current State Analysis

- Fresh project directory with only `.claude` config and `thoughts` research folder
- No existing codebase or dependencies
- Target: Astro 5.x with Content Collections

## Desired End State

A fully functional Astro blog that:
- Uses the official Astro blog template as a foundation
- Has Tailwind CSS configured for styling
- Uses Astro 5's Content Collections with type-safe frontmatter
- Is deployed and live on Vercel
- Has git version control initialized

### Verification:
- Site builds successfully with `npm run build`
- Development server runs with `npm run dev`
- Blog posts render from markdown files
- Site is accessible via Vercel URL

## What We're NOT Doing

- No interactive features (comments, newsletter, contact forms)
- No custom design system - using template defaults + Tailwind utilities
- No CMS integration - content managed as local markdown files
- No SSR/dynamic features - pure static generation

## Implementation Approach

Use Astro's CLI to scaffold from the official blog template, then verify/add Tailwind integration and deploy to Vercel. The official template handles most configuration out of the box.

---

## Phase 1: Project Scaffolding

### Overview
Create the Astro project from the official blog template and initialize git.

### Commands:

```bash
# Navigate to project directory
cd /home/jimjeffers/Work/tries/2026-01-19-personal-blog

# Create Astro project from blog template (in current directory)
npm create astro@latest . -- --template blog --install --git --typescript strict

# Verify installation
npm run dev
```

### Expected Result:
- Astro project files in the root directory
- `package.json` with Astro dependencies
- `astro.config.mjs` configuration file
- `src/` directory with template components and content
- Git repository initialized
- Development server running at `localhost:4321`

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` completes without errors
- [x] `npm run dev` starts development server
- [x] `npx astro check` passes TypeScript validation

#### Manual Verification:
- [ ] Visit `http://localhost:4321` and see the blog template
- [ ] Sample blog posts are visible and clickable

---

## Phase 2: Tailwind Integration

### Overview
Verify Tailwind CSS is configured, or add it if the template doesn't include it.

### Check if Tailwind is included:

The official blog template may or may not include Tailwind. We'll check and add if needed.

### Commands (if Tailwind not present):

```bash
# Add Tailwind integration
npx astro add tailwind

# This will:
# 1. Install @astrojs/tailwind and tailwindcss
# 2. Add the integration to astro.config.mjs
# 3. Create tailwind.config.mjs
```

### Configuration:

**File**: `tailwind.config.mjs`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` completes without errors
- [x] Tailwind classes compile correctly

#### Manual Verification:
- [ ] Add a Tailwind class (e.g., `class="text-blue-500"`) to a component and verify it renders

---

## Phase 3: Content Collections Configuration

### Overview
Verify and understand the Content Collections setup from Astro 5.

### Expected Structure (from template):

```
src/
├── content/
│   └── blog/
│       ├── first-post.md
│       ├── second-post.md
│       └── ...
└── content.config.ts   # Astro 5 location
```

### Verify Schema:

**File**: `src/content.config.ts`

The official template should include a schema similar to:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

### Customization (optional):
If you want to add additional frontmatter fields (e.g., `tags`, `draft`), update the schema:

```typescript
schema: z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional().default(false),
}),
```

### Success Criteria:

#### Automated Verification:
- [x] `npx astro check` passes with no type errors
- [x] `npm run build` generates pages for all blog posts

#### Manual Verification:
- [ ] Blog posts display correctly with frontmatter data
- [ ] Content collection types are working (IDE autocomplete)

---

## Phase 4: Vercel Deployment

### Overview
Configure and deploy the site to Vercel.

### Option A: Vercel CLI (Recommended for quick setup)

```bash
# Install Vercel CLI if not present
npm i -g vercel

# Deploy (will prompt for project setup)
vercel

# For production deployment
vercel --prod
```

### Option B: Git-based deployment

1. Push to GitHub repository
2. Import project in Vercel dashboard
3. Vercel auto-detects Astro and configures build

### Configuration:

Astro with Vercel requires zero configuration for static output. The default `astro.config.mjs` works out of the box:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // No adapter needed for static output
  // Vercel auto-detects Astro
});
```

### Optional: `vercel.json` for custom settings

**File**: `vercel.json` (only if needed)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### Success Criteria:

#### Automated Verification:
- [x] `vercel build` completes successfully locally
- [x] Deployment completes without errors

#### Manual Verification:
- [ ] Site is accessible at Vercel URL (e.g., `project-name.vercel.app`)
- [ ] All pages load correctly
- [ ] Blog posts render properly
- [ ] Lighthouse scores are 95+ for performance

---

## Testing Strategy

### Build Verification:
- `npm run build` - Full production build
- `npx astro check` - TypeScript validation
- `npm run preview` - Preview production build locally

### Content Verification:
- Create a new blog post and verify it appears
- Check frontmatter validation catches errors

### Deployment Verification:
- Verify Vercel preview deployments work on branches
- Confirm production deployment is accessible

---

## Post-Deployment Next Steps

After the initial scaffold is complete, consider:

1. **Personalization**: Update site title, author info, and about page
2. **Styling**: Customize colors and typography with Tailwind
3. **Content**: Write initial blog posts
4. **SEO**: Add meta tags, Open Graph images
5. **Analytics**: Consider adding Vercel Analytics (optional)

---

## References

- Research document: `thoughts/shared/research/2026-01-19-markdown-blog-static-site-options.md`
- [Astro Blog Template](https://astro.build/themes/details/blog/)
- [Astro + Vercel Deployment](https://docs.astro.build/en/guides/deploy/vercel/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro + Tailwind Integration](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
