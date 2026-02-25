---
date: 2026-01-19T12:00:00-07:00
researcher: Claude
git_commit: e6ee3b7d78c79b3a153314aed2f94417f7b1143c
branch: master
repository: 2026-01-19-personal-blog
topic: "37signals Long Thoughts Design Analysis for Blog Implementation"
tags: [research, design, 37signals, blog, layout, typography, astro]
status: complete
last_updated: 2026-01-19
last_updated_by: Claude
---

# Research: 37signals Long Thoughts Design Analysis for Blog Implementation

**Date**: 2026-01-19T12:00:00-07:00
**Researcher**: Claude
**Git Commit**: e6ee3b7d78c79b3a153314aed2f94417f7b1143c
**Branch**: master
**Repository**: 2026-01-19-personal-blog

## Research Question

How can we utilize a similar overall layout and style as the 37signals.com/thoughts/ "Long Thoughts" page for our blog, while maintaining the existing light/dark theme and not adopting their green color scheme?

## Summary

The 37signals "Long Thoughts" page employs a minimalist, content-first design philosophy that emphasizes ideas over timestamps. Key characteristics include: no visible dates on the index (treating articles as timeless thoughts), bold headline links with descriptive summaries, generous whitespace, high-contrast typography, and a clean navigation structure. These patterns can be adapted to the current Astro blog while preserving the existing light/dark theme system.

## Detailed Findings

### 37signals Blog Index Design Patterns

**Article Presentation Format:**
- Each article entry consists of a **bold headline link** followed by a **descriptive paragraph**
- **No publication dates** are shown on the index - articles are presented as timeless "long thoughts"
- Articles are stacked vertically with consistent, generous spacing between entries
- The page title "Long Thoughts" is accompanied by a descriptive tagline: "A tight collection of complete ideas, thoughts, articles, and writings from the founders of 37signals"

**Example Article Entries from 37signals:**
1. "Seven Shipping Principles" - "Core fundamentals that inform how we go about building — and shipping — great software at a sustainable pace."
2. "The 37signals Guide to Making Decisions" - Describes their decision-making methodology
3. "Why We Choose Profit at 37signals" - Explains their commitment to profitability
4. "The 37signals Guide to Internal Communication" - Covers communication methods and formats
5. "Group Chat: The Best Way to Totally Stress Out Your Team" - "The perils of the modern communications conveyor belt..."

**Typography & Visual Hierarchy:**
- Sans-serif typography throughout
- High-contrast black text on white background
- Headlines are the primary visual element with summaries in supporting role
- Professional yet approachable tone

**Navigation Structure:**
- Dual-navigation system: primary menu (products) + secondary menu (content categories)
- Clean header with logo as homepage anchor
- Simple, unadorned navigation links

**Spacing & Layout:**
- Generous whitespace surrounding content sections
- Clear vertical rhythm between article entries
- Minimalist aesthetic - no unnecessary ornamentation

### Current Blog Implementation

**Framework:** Astro 5.16.11 with Tailwind CSS 4.1.18

**Current Blog Index (`src/pages/blog/index.astro`):**
- Shows: Title + Date + Description for each post
- 2rem margin between posts
- 1.5rem title font size
- Date displayed in secondary color above description

**Current Article Layout (`src/layouts/BlogPost.astro`):**
- Date displayed above title
- Optional hero image support
- 40rem max-width (optimal reading width)
- Clean article presentation

**Current Typography:**
- Headings: EB Garamond (serif), weight varies by theme
- Body: Lato (sans-serif)
- Base font size: 20px (18px on mobile)

**Current Theme System (`src/styles/global.css`):**
- CSS custom properties for theming
- Light mode: White background (#FFFFFF), dark text (#141414)
- Dark mode: Charcoal background (#1F2225), light text (#D3D5D6)
- Automatic detection via `prefers-color-scheme: dark`

## Recommended Implementation Changes

### Blog Index Page Changes

| Aspect | Current | 37signals-Inspired |
|--------|---------|-------------------|
| Article format | Title, date, description | Title + description only |
| Dates | Shown in secondary color | Hidden from index (show on article page only) |
| Post spacing | 2rem margin | 2.5-3rem for more breathing room |
| Title size | 1.5rem | 1.75-2rem for more visual impact |
| Page header | Simple "Blog" title | Consider adding descriptive tagline |

### Article Page Changes

| Aspect | Current | 37signals-Inspired |
|--------|---------|-------------------|
| Date position | Above title | Below title or in footer area |
| Content width | 40rem max | Keep at 40rem (optimal) |
| Hero image | Optional, centered | Keep optional, ensure clean presentation |

### Typography Recommendations

**Option A: Keep Current Fonts (Recommended)**
- EB Garamond + Lato is elegant and distinctive
- Make headlines larger (2rem on index) for more impact
- Increase headline weight slightly in light mode

**Option B: More Sans-Serif Approach**
- Switch headings to a clean sans-serif (Inter, system-ui)
- Matches 37signals utilitarian aesthetic
- Loses some personality but gains minimalist consistency

### Specific CSS Changes

**Blog Index Styling:**
```css
.post-item {
  margin-bottom: 2.5rem; /* increased from 2rem */
}
.post-title {
  font-size: 1.75rem; /* increased from 1.5rem */
  margin-bottom: 0.5rem;
}
.post-description {
  color: rgb(var(--color-text)); /* use primary text, not secondary */
  font-size: 1rem; /* slightly larger */
  line-height: 1.5;
}
/* Remove or hide .post-date from index */
```

**Article Page Styling:**
```css
.post-header {
  margin-bottom: 2.5rem;
}
.post-header h1 {
  margin-bottom: 1rem;
}
.date {
  /* Move below title, keep subtle */
  margin-top: 0.5rem;
}
```

## Code References

- `src/pages/blog/index.astro:18-54` - Blog index styling and post list rendering
- `src/layouts/BlogPost.astro:17-47` - Article page layout and styling
- `src/styles/global.css:1-171` - Global styles and theme variables
- `src/components/Header.astro:1-43` - Navigation header component

## Architecture Insights

**Design Philosophy Alignment:**
- 37signals treats their writings as timeless "thoughts" rather than time-bound "posts"
- Removing dates from the index shifts focus from recency to relevance
- The descriptive summaries guide readers to content that interests them
- Generous whitespace creates a calm, focused reading environment

**Theme Preservation:**
- The existing CSS custom property system is well-architected for this adaptation
- Light/dark mode can be maintained with the same variable structure
- No color scheme changes needed - the 37signals approach is inherently black/white

**Astro Component Structure:**
- Current component separation (Header, Footer, BaseHead) is appropriate
- Blog index can be modified without affecting article pages
- FormattedDate component can be conditionally used (article pages only)

## Implementation Priority

1. **High Impact, Low Effort:**
   - Remove dates from blog index
   - Increase spacing between posts
   - Increase title font size

2. **Medium Impact, Medium Effort:**
   - Add page description/tagline under "Blog" heading
   - Adjust article page date positioning
   - Refine description text styling

3. **Lower Priority:**
   - Consider typography changes
   - Add navigation refinements
   - Explore numbered/curated article presentation

## Open Questions

1. Should dates be completely hidden from the index, or shown in a very subtle way (e.g., year only)?
2. Would a curated/featured section at the top be valuable, similar to how 37signals highlights key pieces?
3. Should the blog have a descriptive tagline like "Long Thoughts" has?
4. Are there specific 37signals article page features to examine more closely?

## Sources

- https://37signals.com/thoughts/ - Main "Long Thoughts" index page
- https://37signals.com/ - 37signals homepage for overall design patterns
