# 37signals-Inspired Layout Update Implementation Plan

## Overview

Update the blog layout to follow 37signals' "Long Thoughts" design philosophy while maintaining the existing light/dark theme. Key changes include switching to a geometric sans-serif font (Jost) for headings, adding a descriptive tagline, restructuring the blog index to emphasize content over timestamps, and adding read time estimates.

## Current State Analysis

**Blog Index (`src/pages/blog/index.astro`):**
- Shows: Title (1.5rem) → Date → Description
- 2rem spacing between posts
- Date prominently displayed in secondary color
- EB Garamond serif font for titles

**Article Layout (`src/layouts/BlogPost.astro`):**
- Date displayed above title
- No read time indicator
- 40rem max-width (optimal)

**Typography (`src/components/BaseHead.astro`, `src/styles/global.css`):**
- Headings: EB Garamond (serif)
- Body: Lato (sans-serif)

## Desired End State

- Headings use Jost (geometric sans-serif, Futura-like)
- Blog index shows: Title (larger) → Description (muted) → Date + Read Time (subtle)
- Tagline "Thoughtfulness For Thoughtless Times" under "Blog" heading
- Article pages show date + read time below title
- Increased spacing for calmer reading experience

### Verification:
- Visit `/blog` - should see new tagline, larger titles, date/read time at bottom of each entry
- Visit any blog post - should see date and read time below the title
- Toggle dark mode - all elements should remain readable
- Typography should feel modern and geometric

## What We're NOT Doing

- Changing the color scheme (keeping existing light/dark theme)
- Hiding dates entirely (showing them subtly instead)
- Changing body font (Lato remains)
- Modifying content width (40rem is optimal)
- Adding navigation changes

## Implementation Approach

Three sequential phases: typography first (foundational), then blog index (most visible change), then article pages (consistency).

---

## Phase 1: Typography Update

### Overview
Replace EB Garamond with Jost for all headings to achieve a modern, geometric aesthetic.

### Changes Required:

#### 1. Update Google Fonts Import
**File**: `src/components/BaseHead.astro:33-36`
**Changes**: Replace EB Garamond with Jost font

```astro
<!-- Google Fonts - Jost + Lato -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
```

#### 2. Update Global Heading Styles
**File**: `src/styles/global.css:48-54`
**Changes**: Change font-family to Jost

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Jost', system-ui, sans-serif;
  font-weight: var(--header-weight);
  line-height: 1.2;
  margin: 0 0 0.5rem 0;
  color: rgb(var(--color-text));
}
```

#### 3. Update Blog Index Title Font
**File**: `src/pages/blog/index.astro:38`
**Changes**: Update font-family in .post-title

```css
.post-title {
  font-family: 'Jost', system-ui, sans-serif;
  /* rest remains the same */
}
```

### Success Criteria:

#### Automated Verification:
- [x] Dev server starts without errors: `npm run dev`
- [x] Build completes: `npm run build`

#### Manual Verification:
- [ ] All headings render in Jost font (geometric, not serif)
- [ ] Font weights display correctly in both light and dark modes
- [ ] No flash of unstyled text on page load

---

## Phase 2: Blog Index Redesign

### Overview
Restructure the blog index to emphasize content with a tagline, larger titles, and subtle metadata placement.

### Changes Required:

#### 1. Create Read Time Utility
**File**: `src/utils/readTime.ts` (new file)
**Changes**: Add utility function to calculate read time

```typescript
/**
 * Calculate estimated read time for content
 * Based on average reading speed of 200 words per minute
 */
export function getReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
```

#### 2. Update Blog Index Page
**File**: `src/pages/blog/index.astro`
**Changes**: Complete restructure of the page

```astro
---
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import FormattedDate from '../../components/FormattedDate.astro';
import Header from '../../components/Header.astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../../consts';
import { getReadTime } from '../../utils/readTime';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />
    <style>
      .page-header {
        margin-bottom: 3rem;
      }
      .page-header h1 {
        margin-bottom: 0.5rem;
      }
      .tagline {
        color: rgb(var(--color-text-secondary));
        font-size: 1.125rem;
        margin: 0;
      }
      .posts-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .post-item {
        margin-bottom: 2.5rem;
      }
      .post-item a {
        text-decoration: none;
        display: block;
      }
      .post-item a:hover {
        background-color: transparent;
      }
      .post-item a:hover .post-title {
        text-decoration: underline;
        text-decoration-color: rgb(var(--color-accent) / 0.5);
      }
      .post-title {
        font-family: 'Jost', system-ui, sans-serif;
        font-weight: var(--header-weight);
        font-size: 1.75rem;
        margin: 0 0 0.5rem 0;
        line-height: 1.3;
      }
      .post-description {
        color: rgb(var(--color-text-secondary));
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        line-height: 1.5;
      }
      .post-meta {
        color: rgb(var(--color-text-secondary));
        font-size: 0.8125rem;
        opacity: 0.8;
      }
      .post-meta span {
        margin-right: 0.5rem;
      }
      .post-meta span:last-child {
        margin-right: 0;
      }
      .meta-separator {
        opacity: 0.5;
      }
    </style>
  </head>
  <body>
    <Header />
    <main>
      <div class="page-header">
        <h1>Blog</h1>
        <p class="tagline">Thoughtfulness For Thoughtless Times.</p>
      </div>
      <ul class="posts-list">
        {
          posts.map((post) => (
            <li class="post-item">
              <a href={`/blog/${post.id}/`}>
                <h2 class="post-title">{post.data.title}</h2>
                {post.data.description && (
                  <p class="post-description">{post.data.description}</p>
                )}
                <p class="post-meta">
                  <span><FormattedDate date={post.data.pubDate} /></span>
                  <span class="meta-separator">·</span>
                  <span>{getReadTime(post.body || '')}</span>
                </p>
              </a>
            </li>
          ))
        }
      </ul>
    </main>
    <Footer />
  </body>
</html>
```

### Success Criteria:

#### Automated Verification:
- [x] Dev server starts without errors: `npm run dev`
- [x] Build completes: `npm run build`
- [x] TypeScript compiles: `npx astro check`

#### Manual Verification:
- [ ] Tagline "Thoughtfulness For Thoughtless Times." appears below "Blog"
- [ ] Post titles are noticeably larger (1.75rem)
- [ ] Each post shows: Title → Description → Date · Read Time
- [ ] Date and read time appear subtle (smaller, muted)
- [ ] Spacing between posts feels generous
- [ ] Hover state underlines title correctly

---

## Phase 3: Article Page Update

### Overview
Update article pages to show date and read time below the title for consistency with the index.

### Changes Required:

#### 1. Update BlogPost Layout
**File**: `src/layouts/BlogPost.astro`
**Changes**: Restructure header to show date below title, add read time

```astro
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import FormattedDate from '../components/FormattedDate.astro';
import Header from '../components/Header.astro';
import { getReadTime } from '../utils/readTime';

type Props = CollectionEntry<'blog'>['data'] & { body?: string };

const { title, description, pubDate, updatedDate, heroImage, body } = Astro.props;
const readTime = body ? getReadTime(body) : null;
---

<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
    <style>
      .hero-image {
        max-width: 40rem;
        margin: 0 auto 2rem;
        padding: 0 1rem;
      }
      .hero-image img {
        display: block;
        width: 100%;
        border-radius: 0.25rem;
      }
      article {
        max-width: 40rem;
        margin: 0 auto;
        padding: 0 1rem 2rem;
      }
      .post-header {
        margin-bottom: 2.5rem;
      }
      .post-header h1 {
        margin-bottom: 0.75rem;
      }
      .post-meta {
        color: rgb(var(--color-text-secondary));
        font-size: 0.875rem;
      }
      .post-meta span {
        margin-right: 0.5rem;
      }
      .meta-separator {
        opacity: 0.5;
      }
      .last-updated-on {
        font-style: italic;
        margin-top: 0.25rem;
        font-size: 0.8125rem;
        opacity: 0.8;
      }
    </style>
  </head>

  <body>
    <Header />
    <main>
      {heroImage && (
        <div class="hero-image">
          <Image width={1020} height={510} src={heroImage} alt="" />
        </div>
      )}
      <article>
        <div class="post-header">
          <h1>{title}</h1>
          <p class="post-meta">
            <span><FormattedDate date={pubDate} /></span>
            {readTime && (
              <>
                <span class="meta-separator">·</span>
                <span>{readTime}</span>
              </>
            )}
          </p>
          {updatedDate && (
            <p class="last-updated-on">
              Last updated on <FormattedDate date={updatedDate} />
            </p>
          )}
        </div>
        <slot />
      </article>
    </main>
    <Footer />
  </body>
</html>
```

#### 2. Update Blog Post Page to Pass Body
**File**: `src/pages/blog/[...slug].astro`
**Changes**: Pass the post body to the layout for read time calculation

```astro
---
import { type CollectionEntry, getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
type Props = CollectionEntry<'blog'>;

const post = Astro.props;
const { Content } = await render(post);
---

<BlogPost {...post.data} body={post.body}>
  <Content />
</BlogPost>
```

The key change is adding `body={post.body}` to pass the raw content for read time calculation.

### Success Criteria:

#### Automated Verification:
- [x] Dev server starts without errors: `npm run dev`
- [x] Build completes: `npm run build`

#### Manual Verification:
- [ ] Article title appears first (not date)
- [ ] Date and read time appear below title, subtle styling
- [ ] "Last updated" still appears when applicable
- [ ] Hero image still works correctly
- [ ] Content renders properly below header

---

## Testing Strategy

### Visual Testing:
- Compare blog index before/after screenshots
- Verify font rendering on different browsers (Chrome, Firefox, Safari)
- Test responsive behavior on mobile widths

### Functional Testing:
- Verify all blog post links work
- Confirm read time calculations are reasonable
- Test dark mode toggle

### Edge Cases:
- Very short posts (1 min read)
- Very long posts (20+ min read)
- Posts without descriptions
- Posts with hero images vs without

## Performance Considerations

- Jost font is similar file size to EB Garamond - no significant impact
- Read time calculation is simple string operation - negligible performance cost
- No additional network requests beyond font swap

## References

- Research document: `thoughts/shared/research/2026-01-19-37signals-blog-design-analysis.md`
- 37signals Long Thoughts: https://37signals.com/thoughts/
- Jost font: https://fonts.google.com/specimen/Jost
