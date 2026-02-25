---
date: 2026-02-25T12:55:36-08:00
researcher: Jim Jeffers
git_commit: e6ee3b7d78c79b3a153314aed2f94417f7b1143c
branch: master
repository: 2026-01-19-personal-blog
topic: "How to add a GitHub activity page similar to steipete.me/about"
tags: [research, github, activity, astro, about-page, contribution-graph]
status: complete
last_updated: 2026-02-25
last_updated_by: Jim Jeffers
---

# Research: Adding GitHub Activity to About Page

**Date**: 2026-02-25T12:55:36-08:00
**Researcher**: Jim Jeffers
**Git Commit**: e6ee3b7d78c79b3a153314aed2f94417f7b1143c
**Branch**: master
**Repository**: 2026-01-19-personal-blog

## Research Question

How can I add a GitHub activity page for my profile similar to the one on https://steipete.me/about?

## Summary

The steipete.me/about page uses a simple, elegant approach for displaying GitHub activity:

1. **GitHub Contribution Graph**: Uses `ghchart.rshah.org` - a free, no-auth-required image service that generates an SVG contribution chart
2. **Simple layout**: Heading + contribution graph image + descriptive text + GitHub profile link
3. **No API required**: The chart image is embedded directly with an `<img>` tag

For an Astro blog, you can implement this in your existing `src/pages/about.astro` file by adding a GitHub Activity section using the contribution chart service.

## Detailed Findings

### The steipete.me Implementation

From the HTML source of steipete.me/about:

```html
<h2 id="github-activity">GitHub Activity</h2>
<div class="bg-secondary p-0 rounded-lg">
  <img 
    src="https://ghchart.rshah.org/steipete" 
    alt="Peter's GitHub Contribution Graph" 
    class="w-full" 
    style="max-width: 100%; height: auto;" 
    loading="lazy"
  />
</div>
<p>I build what excites me and release it all as open source.</p>
<p><a href="https://github.com/steipete/">Follow me on GitHub</a></p>
```

**Key elements**:
- Section heading with semantic ID for linking
- Contribution chart from `ghchart.rshah.org/{username}`
- Styled container with background color (`bg-secondary`)
- Responsive image styling (`w-full`, `max-width: 100%`)
- Lazy loading for performance
- Personal statement about open source work
- Link to full GitHub profile

### The ghchart.rshah.org Service

**Service**: [ghchart.rshah.org](https://ghchart.rshah.org) - GitHub Chart API by @2016rshah

**How it works**:
- Generates an SVG image of GitHub contribution graph
- No authentication required
- Updates automatically as contributions change
- Usage: `https://ghchart.rshah.org/{username}`

**Documentation from the service homepage**:
```html
<img src="http://ghchart.rshah.org/2016rshah" alt="2016rshah's Github chart" />
```

**Source code**: https://github.com/2016rshah/githubchart-api

## Implementation Options for Your Astro Blog

### Option 1: Simple Contribution Graph (Recommended - Matches steipete.me)

Add to your existing `src/pages/about.astro`:

```astro
---
import AboutHeroImage from '../assets/blog-placeholder-about.jpg';
import Layout from '../layouts/BlogPost.astro';
---

<Layout
	title="About Me"
	description="Your description here"
	pubDate={new Date('February 25 2026')}
	heroImage={AboutHeroImage}
>
	<!-- Your existing about content -->
	
	<h2 id="github-activity">GitHub Activity</h2>
	<div class="github-chart-container">
		<img 
			src="https://ghchart.rshah.org/jimjeffers" 
			alt="Jim Jeffers' GitHub Contribution Graph" 
			loading="lazy"
		/>
	</div>
	<p>I build what excites me and release it all as open source.</p>
	<p>
		<a href="https://github.com/jimjeffers/">Follow me on GitHub</a> 
		and check out my projects.
	</p>
	
	<style>
		.github-chart-container {
			background: rgba(var(--color-bg-secondary), 0.5);
			border-radius: 0.5rem;
			padding: 0;
			margin: 1rem 0;
			overflow: hidden;
		}
		.github-chart-container img {
			width: 100%;
			height: auto;
			display: block;
		}
	</style>
</Layout>
```

### Option 2: Contribution Graph with Custom Colors

The ghchart service supports custom color schemes:

```html
<!-- Default (green) -->
<img src="https://ghchart.rshah.org/jimjeffers" />

<!-- Custom hex color -->
<img src="https://ghchart.rshah.org/409ba5/jimjeffers" />

<!-- Another custom color -->
<img src="https://ghchart.rshah.org/ff6b6b/jimjeffers" />
```

### Option 3: Enhanced Activity with GitHub API

For more detailed activity (recent PRs, commits, issues), you could use the GitHub API at build time:

```astro
---
// src/pages/about.astro
const GITHUB_USERNAME = 'jimjeffers';

// Fetch recent public activity
const response = await fetch(
  `https://api.github.com/users/${GITHUB_USERNAME}/events/public`
);
const events = await response.json();

// Filter to last 5 unique repo activities
const recentActivity = events
  .filter(e => ['PushEvent', 'PullRequestEvent', 'IssuesEvent'].includes(e.type))
  .slice(0, 5);
---

<!-- In your template -->
<h2>Recent GitHub Activity</h2>
<ul>
  {recentActivity.map(event => (
    <li>
      <a href={`https://github.com/${event.repo.name}`}>
        {event.repo.name}
      </a>
      - {event.type.replace('Event', '')}
    </li>
  ))}
</ul>
```

**Note**: The GitHub API works without authentication for public events, but has rate limits (60 requests/hour for unauthenticated).

### Option 4: Third-Party Stats Cards

Alternative services for GitHub stats:

- **github-readme-stats**: `https://github-readme-stats.vercel.app/api?username=jimjeffers`
- **GitHub Profile Trophy**: `https://github-profile-trophy.vercel.app/?username=jimjeffers`
- **GitHub Streak Stats**: `https://github-readme-streak-stats.herokuapp.com/?user=jimjeffers`

## Code References

- `src/pages/about.astro` - Your existing about page using BlogPost layout
- `src/layouts/BlogPost.astro` - Layout component with Header, Footer, article styling
- `src/components/Header.astro` - Header component with navigation (already has GitHub link)

## Architecture Insights

The steipete.me approach works well because:

1. **Zero maintenance**: External service handles image generation
2. **Always current**: Image updates as contributions are made
3. **Fast loading**: SVG image is lightweight
4. **No API keys**: No authentication complexity
5. **Simple embedding**: Just an `<img>` tag

For an Astro static site, this is ideal because:
- No server-side code needed
- No build-time API calls required
- Works with static hosting (Vercel, Netlify, etc.)

## Implementation Steps

1. Edit `src/pages/about.astro`
2. Add the GitHub Activity section after your bio content
3. Include the contribution chart image with your username
4. Add optional styling for the chart container
5. Add descriptive text and link to your GitHub profile
6. Test locally with `npm run dev`
7. Build and deploy

## Open Questions

1. **Color scheme**: Should the contribution graph match your site's color palette? (ghchart supports custom hex colors)
2. **Additional activity**: Do you want to show recent repositories, starred projects, or just the contribution graph?
3. **Dark mode**: The ghchart image works on both light/dark backgrounds but you may want to adjust container styling for your theme system

## Related Resources

- [ghchart.rshah.org](https://ghchart.rshah.org) - GitHub Chart API service
- [githubchart-api GitHub repo](https://github.com/2016rshah/githubchart-api) - Source code for the service
- [GitHub Events API](https://docs.github.com/en/rest/activity/events) - For fetching real-time activity data
