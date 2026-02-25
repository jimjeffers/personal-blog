# GitHub Activity Widget Implementation Plan

## Overview

Add a theme-aware GitHub contribution graph to the About page that dynamically updates its color to match the currently selected omarchy theme.

## Current State Analysis

**Existing Assets:**
- Theme system with 14 themes in `src/data/themes.ts` - each theme has `accentHex` (e.g., `#89b4fa`)
- Theme selector component in `src/components/ThemeSelector.astro` that stores selection in localStorage
- About page at `src/pages/about.astro` using BlogPost layout
- `ghchart.rshah.org` service supports custom colors: `https://ghchart.rshah.org/{hex}/{username}`

**Gap:** The About page has no GitHub activity section, and we need client-side logic to keep the chart color in sync with theme changes.

## Desired End State

After this plan is complete:
1. The About page displays a "GitHub Activity" section with a contribution graph
2. The contribution graph uses the current theme's accent color
3. When user changes themes via the dropdown, the chart updates to match (no page reload)
4. The chart loads with the correct color on initial page load (respecting saved/random theme)

**Verification:** 
- Open About page → chart displays with current theme color
- Change theme via dropdown → chart color updates immediately
- Refresh page → chart retains selected theme color

## What We're NOT Doing

- NOT fetching real-time GitHub data (API rate limits, build-time complexity)
- NOT adding stats cards or additional GitHub metrics (keep it simple)
- NOT implementing server-side rendering for the chart (client-side only)
- NOT supporting non-hex color formats (ghchart requires hex)

## Implementation Approach

Use a client-side script that:
1. Reads the current theme's `accentHex` from the theme data attributes
2. Constructs the ghchart URL with the hex color
3. Listens for theme changes and updates the image src dynamically
4. Handles the initial theme (from localStorage or random)

## Phase 1: Update About Page with GitHub Activity Section

### Overview
Add the GitHub Activity section to `src/pages/about.astro` with a placeholder image and client-side script to handle theme-aware coloring.

### Changes Required:

#### 1. Update `src/pages/about.astro`

**File**: `src/pages/about.astro`

**Changes**: Add GitHub Activity section with client-side theme-aware script

```astro
---
import AboutHeroImage from '../assets/blog-placeholder-about.jpg';
import Layout from '../layouts/BlogPost.astro';
import { THEMES } from '../data/themes';

const GITHUB_USERNAME = 'jimjeffers';
---

<Layout
	title="About Me"
	description="Software development engineer in Portland, OR"
	pubDate={new Date('February 25 2026')}
	heroImage={AboutHeroImage}
>
	<!-- Keep existing bio paragraphs or update with your real bio -->
	
	<h2 id="github-activity">GitHub Activity</h2>
	<div class="github-chart-container">
		<img 
			id="github-chart"
			src={`https://ghchart.rshah.org/${THEMES[0].accentHex.replace('#', '')}/${GITHUB_USERNAME}`}
			alt="Jim Jeffers' GitHub Contribution Graph" 
			loading="lazy"
		/>
	</div>
	<p>I build what excites me and release it all as open source.</p>
	<p>
		<a href={`https://github.com/${GITHUB_USERNAME}/`}>Follow me on GitHub</a> 
		and check out my projects.
	</p>
	
	<style>
		.github-chart-container {
			background: rgb(var(--color-text) / 0.05);
			border-radius: 0.5rem;
			padding: 0.5rem;
			margin: 1rem 0;
			overflow: hidden;
		}
		.github-chart-container img {
			width: 100%;
			height: auto;
			display: block;
			border-radius: 0.25rem;
		}
	</style>
</Layout>
```

### Success Criteria:

#### Automated Verification:
- [ ] Page builds successfully: `npm run build`
- [ ] No TypeScript errors: Check `astro check` passes
- [ ] Chart image loads with fallback color (first theme's accent)

#### Manual Verification:
- [ ] About page displays GitHub Activity section
- [ ] Contribution graph is visible
- [ ] Section styling matches blog design
- [ ] Links to GitHub profile work

---

## Phase 2: Create GitHub Chart Theme Integration Script

### Overview
Create a client-side script that updates the GitHub chart color when the theme changes.

### Changes Required:

#### 1. Create Theme-Aware Chart Script

**File**: `src/components/GitHubChart.astro`

```astro
---
interface Props {
  username: string;
  themeDataId?: string;
}

const { username, themeDataId = 'theme-data' } = Astro.props;
---

<script define:vars={{ username, themeDataId }}>
  function initGitHubChart() {
    const chart = document.getElementById('github-chart');
    if (!chart) return;

    // Get theme accent hex from the current theme option or data attribute
    function getCurrentAccentHex() {
      // First, check if there's an active theme in the theme selector
      const activeTheme = document.querySelector('.theme-list [role="option"].active, [data-theme-active="true"]');
      if (activeTheme) {
        // Try to get accent from data attribute
        const accent = activeTheme.getAttribute('data-accent-hex');
        if (accent) return accent.replace('#', '');
      }

      // Fallback: check document.documentElement for data-theme
      const currentThemeId = document.documentElement.getAttribute('data-theme');
      if (currentThemeId) {
        // Look up in the theme list
        const themeOption = document.querySelector(`[data-theme-id="${currentThemeId}"]`);
        if (themeOption) {
          const accent = themeOption.getAttribute('data-accent-hex');
          if (accent) return accent.replace('#', '');
        }
      }

      // Default fallback
      return '89b4fa'; // Catppuccin accent
    }

    function updateChartColor() {
      const accentHex = getCurrentAccentHex();
      const newSrc = `https://ghchart.rshah.org/${accentHex}/${username}`;
      
      // Only update if different to avoid unnecessary reloads
      if (chart.src !== newSrc) {
        chart.src = newSrc;
      }
    }

    // Initial update
    updateChartColor();

    // Listen for theme changes
    // The theme selector fires a custom event or we can observe the data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'style') {
          updateChartColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style']
    });

    // Also listen for custom theme change event if we add one
    document.addEventListener('themechange', updateChartColor);
  }

  // Run on load and after Astro view transitions
  initGitHubChart();
  document.addEventListener('astro:after-swap', initGitHubChart);
</script>
```

#### 2. Update About Page to Include Script

**File**: `src/pages/about.astro`

Add the component before the closing `</Layout>` tag:

```astro
<GitHubChart username="jimjeffers" />
```

Don't forget to import it:
```astro
---
import AboutHeroImage from '../assets/blog-placeholder-about.jpg';
import Layout from '../layouts/BlogPost.astro';
import GitHubChart from '../components/GitHubChart.astro';
import { THEMES } from '../data/themes';

const GITHUB_USERNAME = 'jimjeffers';
---
```

### Success Criteria:

#### Automated Verification:
- [ ] Component builds without errors
- [ ] No console errors on page load
- [ ] TypeScript types are correct

#### Manual Verification:
- [ ] Chart loads with current theme color on page load
- [ ] Changing theme updates chart color without page reload
- [ ] Chart works after navigating away and back (Astro view transitions)

---

## Phase 3: Enhance Theme Selector to Expose accentHex

### Overview
The current theme selector doesn't expose the hex color values to the client-side script. We need to add `data-accent-hex` attributes to the theme options.

### Changes Required:

#### 1. Update ThemeSelector Component

**File**: `src/components/ThemeSelector.astro`

Add `data-accent-hex` attribute to theme options:

```astro
<ul class="theme-list" role="listbox" aria-label="Themes" hidden>
  {THEMES.map((theme) => (
    <li
      role="option"
      data-theme-id={theme.id}
      data-bg={theme.bg}
      data-text={theme.text}
      data-text-secondary={theme.textSecondary}
      data-accent={theme.accent}
      data-accent-hex={theme.accentHex}
      data-border={theme.border}
      data-header-weight={theme.headerWeight}
    >
      <span class="option-swatches">
        <span class="swatch" style={`background-color: ${theme.bgHex};`}></span>
        <span class="swatch" style={`background-color: ${theme.accentHex};`}></span>
      </span>
      <span class="option-name">{theme.name}</span>
    </li>
  ))}
</ul>
```

Also add accentHex to the trigger's swatch rendering in the `applyTheme` function if needed for consistency.

### Success Criteria:

#### Automated Verification:
- [ ] Theme selector still builds and works
- [ ] HTML output includes `data-accent-hex` attributes

#### Manual Verification:
- [ ] Theme dropdown opens and selects themes correctly
- [ ] Inspecting element shows `data-accent-hex` on theme options

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 4: Final Integration and Testing

### Overview
Verify the complete integration works end-to-end and handle any edge cases.

### Changes Required:

#### 1. Verify GitHubChart Script Uses accentHex

**File**: `src/components/GitHubChart.astro`

Ensure the script correctly reads `data-accent-hex`:

```javascript
const accent = activeTheme.getAttribute('data-accent-hex');
if (accent) return accent.replace('#', '');
```

#### 2. Add Error Handling for Image Load

Add error handling in case the ghchart service is unavailable:

```javascript
chart.addEventListener('error', () => {
  // Fallback to default green chart
  chart.src = `https://ghchart.rshah.org/${username}`;
});
```

#### 3. Optimize Initial Load

In `src/pages/about.astro`, update the initial src to use a more intelligent default:

```astro
<script is:inline define:vars={{ themes: THEMES, username: GITHUB_USERNAME }}>
  // Set initial chart color based on current theme before hydration
  (function() {
    const savedThemeId = localStorage.getItem('omarchy-theme');
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const currentTheme = themes.find(t => t.id === savedThemeId) || randomTheme;
    const accentHex = currentTheme.accentHex.replace('#', '');
    
    const chart = document.getElementById('github-chart');
    if (chart && chart.src.includes('ghchart.rshah.org')) {
      chart.src = `https://ghchart.rshah.org/${accentHex}/${username}`;
    }
  })();
</script>
```

### Success Criteria:

#### Automated Verification:
- [ ] All phases build together: `npm run build`
- [ ] Lighthouse performance score remains acceptable
- [ ] No JavaScript errors in console

#### Manual Verification:
- [ ] Chart displays correctly on first visit (random theme)
- [ ] Chart displays saved theme color on return visit
- [ ] Theme changes update chart immediately
- [ ] Chart survives browser back/forward navigation
- [ ] Works in both light and dark themes
- [ ] Mobile: Chart is responsive and readable

---

## Testing Strategy

### Unit Tests:
- N/A - Client-side only, no complex logic to unit test

### Integration Tests:
- Verify chart loads on About page
- Verify theme change updates chart

### Manual Testing Steps:

1. **Initial Load Test:**
   - Clear localStorage or open incognito
   - Visit About page
   - Verify chart loads with a color (may be random)
   - Verify chart is not the default green

2. **Theme Change Test:**
   - Open theme selector dropdown
   - Select different themes
   - Verify chart color changes to match each theme

3. **Persistence Test:**
   - Select a theme
   - Refresh page
   - Verify chart retains the selected theme's color

4. **Navigation Test:**
   - Go to another page
   - Return to About
   - Verify chart color is correct

5. **Edge Cases:**
   - Test with slow network (chart should still load)
   - Test ghchart service failure (should show default green)

## Performance Considerations

1. **Image Caching**: ghchart images are cached by CDN, subsequent loads are fast
2. **Script Size**: GitHubChart component is small (< 1KB)
3. **No Blocking**: Image uses `loading="lazy"`, doesn't block initial paint
4. **MutationObserver**: Efficiently watches for theme changes without polling

## References

- Original research: `thoughts/shared/research/2026-02-25-github-activity-page-implementation.md`
- Theme system research: `thoughts/shared/research/2026-02-25-omarchy-theme-selector.md`
- Theme data: `src/data/themes.ts`
- Theme selector: `src/components/ThemeSelector.astro`
- About page: `src/pages/about.astro`
- ghchart service: https://ghchart.rshah.org
