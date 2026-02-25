---
date: 2026-02-25T12:00:00-07:00
researcher: Claude
git_commit: e6ee3b7d78c79b3a153314aed2f94417f7b1143c
branch: master
repository: 2026-01-19-personal-blog
topic: "Omarchy theme system research for blog theme selector implementation"
tags: [research, codebase, omarchy, themes, astro, css-custom-properties]
status: complete
last_updated: 2026-02-25
last_updated_by: Claude
---

# Research: Omarchy Theme System for Blog Theme Selector

**Date**: 2026-02-25
**Researcher**: Claude
**Git Commit**: e6ee3b7d78c79b3a153314aed2f94417f7b1143c
**Branch**: master
**Repository**: 2026-01-19-personal-blog

## Research Question
What omarchy themes are available, and how can they be integrated into the Astro blog as a user-selectable dropdown with localStorage persistence and random default?

## Summary

Omarchy ships with **14 built-in themes** (11 dark, 3 light). Each theme defines a full color palette via `colors.toml` with standardized keys: `background`, `foreground`, `accent`, `cursor`, `selection_foreground`, `selection_background`, and 16 ANSI colors (`color0`-`color15`). The blog currently uses CSS custom properties with RGB channel values for its color system, making it straightforward to map omarchy theme colors into the existing `--color-bg`, `--color-text`, `--color-accent`, and `--color-border` variables.

## Detailed Findings

### All 14 Omarchy Themes with Complete Color Data

#### Dark Themes (11)

| Theme | Display Name | Background | Foreground | Accent |
|-------|-------------|-----------|-----------|--------|
| catppuccin | Catppuccin | `#1e1e2e` | `#cdd6f4` | `#89b4fa` |
| ethereal | Ethereal | `#060B1E` | `#ffcead` | `#7d82d9` |
| everforest | Everforest | `#2d353b` | `#d3c6aa` | `#7fbbb3` |
| gruvbox | Gruvbox | `#282828` | `#d4be98` | `#7daea3` |
| hackerman | Hackerman | `#0B0C16` | `#ddf7ff` | `#82FB9C` |
| kanagawa | Kanagawa | `#1f1f28` | `#dcd7ba` | `#7e9cd8` |
| matte-black | Matte Black | `#121212` | `#bebebe` | `#e68e0d` |
| nord | Nord | `#2e3440` | `#d8dee9` | `#81a1c1` |
| osaka-jade | Osaka Jade | `#111c18` | `#C1C497` | `#509475` |
| ristretto | Ristretto | `#2c2525` | `#e6d9db` | `#f38d70` |
| tokyo-night | Tokyo Night | `#1a1b26` | `#a9b1d6` | `#7aa2f7` |

#### Light Themes (3)

| Theme | Display Name | Background | Foreground | Accent |
|-------|-------------|-----------|-----------|--------|
| catppuccin-latte | Catppuccin Latte | `#eff1f5` | `#4c4f69` | `#1e66f5` |
| flexoki-light | Flexoki Light | `#FFFCF0` | `#100F0F` | `#205EA6` |
| rose-pine | Rose Pine | `#faf4ed` | `#575279` | `#56949f` |

### Full Color Palettes (colors.toml)

Each theme's `colors.toml` contains these standardized keys:
- `accent` - Primary accent/highlight color
- `cursor` - Cursor color
- `foreground` - Main text color
- `background` - Background color
- `selection_foreground` - Text color when selected
- `selection_background` - Background color when selected
- `color0` through `color15` - ANSI terminal color palette

#### catppuccin
```
accent=#89b4fa cursor=#f5e0dc foreground=#cdd6f4 background=#1e1e2e
color0=#45475a color1=#f38ba8 color2=#a6e3a1 color3=#f9e2af color4=#89b4fa
color5=#f5c2e7 color6=#94e2d5 color7=#bac2de color8=#585b70 color9=#f38ba8
color10=#a6e3a1 color11=#f9e2af color12=#89b4fa color13=#f5c2e7 color14=#94e2d5 color15=#a6adc8
```

#### catppuccin-latte
```
accent=#1e66f5 cursor=#dc8a78 foreground=#4c4f69 background=#eff1f5
color0=#bcc0cc color1=#d20f39 color2=#40a02b color3=#df8e1d color4=#1e66f5
color5=#ea76cb color6=#179299 color7=#5c5f77 color8=#acb0be color9=#d20f39
color10=#40a02b color11=#df8e1d color12=#1e66f5 color13=#ea76cb color14=#179299 color15=#6c6f85
```

#### ethereal
```
accent=#7d82d9 cursor=#ffcead foreground=#ffcead background=#060B1E
color0=#060B1E color1=#ED5B5A color2=#92a593 color3=#E9BB4F color4=#7d82d9
color5=#c89dc1 color6=#a3bfd1 color7=#F99957 color8=#6d7db6 color9=#faaaa9
color10=#c4cfc4 color11=#f7dc9c color12=#c2c4f0 color13=#ead7e7 color14=#dfeaf0 color15=#ffcead
```

#### everforest
```
accent=#7fbbb3 cursor=#d3c6aa foreground=#d3c6aa background=#2d353b
color0=#475258 color1=#e67e80 color2=#a7c080 color3=#dbbc7f color4=#7fbbb3
color5=#d699b6 color6=#83c092 color7=#d3c6aa color8=#475258 color9=#e67e80
color10=#a7c080 color11=#dbbc7f color12=#7fbbb3 color13=#d699b6 color14=#83c092 color15=#d3c6aa
```

#### flexoki-light
```
accent=#205EA6 cursor=#100F0F foreground=#100F0F background=#FFFCF0
color0=#100F0F color1=#D14D41 color2=#879A39 color3=#D0A215 color4=#205EA6
color5=#CE5D97 color6=#3AA99F color7=#FFFCF0 color8=#100F0F color9=#D14D41
color10=#879A39 color11=#D0A215 color12=#4385BE color13=#CE5D97 color14=#3AA99F color15=#FFFCF0
```

#### gruvbox
```
accent=#7daea3 cursor=#bdae93 foreground=#d4be98 background=#282828
color0=#3c3836 color1=#ea6962 color2=#a9b665 color3=#d8a657 color4=#7daea3
color5=#d3869b color6=#89b482 color7=#d4be98 color8=#3c3836 color9=#ea6962
color10=#a9b665 color11=#d8a657 color12=#7daea3 color13=#d3869b color14=#89b482 color15=#d4be98
```

#### hackerman
```
accent=#82FB9C cursor=#ddf7ff foreground=#ddf7ff background=#0B0C16
color0=#0B0C16 color1=#50f872 color2=#4fe88f color3=#50f7d4 color4=#829dd4
color5=#86a7df color6=#7cf8f7 color7=#85E1FB color8=#6a6e95 color9=#85ff9d
color10=#9cf7c2 color11=#a4ffec color12=#c4d2ed color13=#cddbf4 color14=#d1fffe color15=#ddf7ff
```

#### kanagawa
```
accent=#7e9cd8 cursor=#c8c093 foreground=#dcd7ba background=#1f1f28
color0=#090618 color1=#c34043 color2=#76946a color3=#c0a36e color4=#7e9cd8
color5=#957fb8 color6=#6a9589 color7=#c8c093 color8=#727169 color9=#e82424
color10=#98bb6c color11=#e6c384 color12=#7fb4ca color13=#938aa9 color14=#7aa89f color15=#dcd7ba
```

#### matte-black
```
accent=#e68e0d cursor=#eaeaea foreground=#bebebe background=#121212
color0=#333333 color1=#D35F5F color2=#FFC107 color3=#b91c1c color4=#e68e0d
color5=#D35F5F color6=#bebebe color7=#bebebe color8=#8a8a8d color9=#B91C1C
color10=#FFC107 color11=#b90a0a color12=#f59e0b color13=#B91C1C color14=#eaeaea color15=#ffffff
```

#### nord
```
accent=#81a1c1 cursor=#d8dee9 foreground=#d8dee9 background=#2e3440
color0=#3b4252 color1=#bf616a color2=#a3be8c color3=#ebcb8b color4=#81a1c1
color5=#b48ead color6=#88c0d0 color7=#e5e9f0 color8=#4c566a color9=#bf616a
color10=#a3be8c color11=#ebcb8b color12=#81a1c1 color13=#b48ead color14=#8fbcbb color15=#eceff4
```

#### osaka-jade
```
accent=#509475 cursor=#D7C995 foreground=#C1C497 background=#111c18
color0=#23372B color1=#FF5345 color2=#549e6a color3=#459451 color4=#509475
color5=#D2689C color6=#2DD5B7 color7=#F6F5DD color8=#53685B color9=#db9f9c
color10=#63b07a color11=#E5C736 color12=#ACD4CF color13=#75bbb3 color14=#8CD3CB color15=#9eebb3
```

#### ristretto
```
accent=#f38d70 cursor=#c3b7b8 foreground=#e6d9db background=#2c2525
color0=#72696a color1=#fd6883 color2=#adda78 color3=#f9cc6c color4=#f38d70
color5=#a8a9eb color6=#85dacc color7=#e6d9db color8=#948a8b color9=#ff8297
color10=#c8e292 color11=#fcd675 color12=#f8a788 color13=#bebffd color14=#9bf1e1 color15=#f1e5e7
```

#### rose-pine
```
accent=#56949f cursor=#cecacd foreground=#575279 background=#faf4ed
color0=#f2e9e1 color1=#b4637a color2=#286983 color3=#ea9d34 color4=#56949f
color5=#907aa9 color6=#d7827e color7=#575279 color8=#9893a5 color9=#b4637a
color10=#286983 color11=#ea9d34 color12=#56949f color13=#907aa9 color14=#d7827e color15=#575279
```

#### tokyo-night
```
accent=#7aa2f7 cursor=#c0caf5 foreground=#a9b1d6 background=#1a1b26
color0=#32344a color1=#f7768e color2=#9ece6a color3=#e0af68 color4=#7aa2f7
color5=#ad8ee6 color6=#449dab color7=#787c99 color8=#444b6a color9=#ff7a93
color10=#b9f27c color11=#ff9e64 color12=#7da6ff color13=#bb9af7 color14=#0db9d7 color15=#acb0d0
```

### Current Blog Color System

The blog uses CSS custom properties in `src/styles/global.css` with RGB channel values (space-separated, no `rgb()` wrapper):

```css
:root {
  --color-bg: 255 255 255;
  --color-text: 20 20 20;
  --color-text-secondary: 150 160 180;
  --color-accent: 100 110 130;
  --color-border: 0 0 0 / 0.05;
  --header-weight: 600;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: 31 34 37;
    --color-text: 211 213 214;
    --color-text-secondary: 100 110 130;
    --color-accent: 255 255 255;
    --color-border: 255 255 255 / 0.05;
    --header-weight: 400;
  }
}
```

Colors are consumed as `rgb(var(--color-bg))` throughout components.

### Mapping Strategy: Omarchy Hex to Blog RGB Channels

Omarchy colors are hex (`#1a1b26`). The blog expects space-separated RGB channels (`26 27 38`). A hex-to-RGB conversion is needed either:
- **At build time**: Precompute all RGB values in a static JS/TS themes map
- **At runtime**: Convert hex to RGB in a small client-side utility

Recommended mapping:
| Blog Variable | Omarchy Source | Derivation |
|---|---|---|
| `--color-bg` | `background` | Direct hex-to-RGB |
| `--color-text` | `foreground` | Direct hex-to-RGB |
| `--color-accent` | `accent` | Direct hex-to-RGB |
| `--color-text-secondary` | `foreground` | Muted (reduce opacity or blend toward bg) |
| `--color-border` | `foreground` or `color8` | Low opacity variant |
| `--header-weight` | Light themes: `600`, Dark themes: `400` | Based on `light.mode` flag |

### Theme Metadata for UI

For the dropdown, each theme needs:
- `id`: kebab-case directory name (e.g., `tokyo-night`)
- `name`: Display name (e.g., `Tokyo Night`)
- `mode`: `light` or `dark` (3 light themes have a `light.mode` marker file)
- `background`, `foreground`, `accent`: For color preview swatches in dropdown

### Implementation Approach

1. **Static theme data file** (`src/data/themes.ts`): Export a typed array of all 14 themes with pre-converted RGB channel values
2. **Theme selector component**: Client-side Astro component with `client:load` directive
3. **localStorage persistence**: Store selected theme ID in `localStorage('omarchy-theme')`
4. **Random default**: On first visit (no localStorage), pick a random theme
5. **Flash prevention**: Apply theme in a `<script>` tag in `<head>` (before paint) to avoid FOUC
6. **CSS variable override**: Set `style` attribute on `<html>` element to override `:root` variables

### Theme Source Files

All themes live at: `/home/jimjeffers/.local/share/omarchy/themes/`

Each theme directory structure:
```
{theme-name}/
  colors.toml          # Color palette (standardized keys)
  backgrounds/         # Wallpaper images
  btop.theme           # btop theme
  icons.theme          # GNOME icon theme
  neovim.lua           # Neovim colorscheme
  vscode.json          # VSCode theme
  preview.png          # Preview screenshot
  light.mode           # (optional) Marker for light themes
```

## Code References

- `src/styles/global.css` - Current CSS custom property definitions and color system
- `src/components/BaseHead.astro` - Head component where anti-FOUC script would go
- `src/components/Header.astro` - Fixed header, potential location for theme dropdown
- `src/components/HeaderLink.astro` - Active state detection pattern to reference
- `src/consts.ts` - Site constants, could hold theme metadata
- `~/.local/share/omarchy/themes/*/colors.toml` - Source of all theme color data

## Architecture Insights

1. **The blog's CSS variable system is already theme-ready** - colors are consumed via `rgb(var(--color-*))` everywhere, so overriding the variables on `:root` will cascade to all components automatically.

2. **No Tailwind utility classes in components** - all styling uses scoped `<style>` blocks with CSS variables, meaning the theme switch only needs to update the 5-6 root variables.

3. **Light vs dark distinction matters** for `--header-weight` (600 for light, 400 for dark) and `--color-border` opacity direction (black at 5% for light, white at 5% for dark).

4. **The `@media (prefers-color-scheme: dark)` block should be replaced** or overridden by the theme system, since theme selection supersedes system preference.

## Open Questions

1. Should the dropdown show color preview swatches (small circles showing bg/fg/accent)?
2. Should light and dark themes be grouped separately in the dropdown?
3. Should the theme selector replace the existing `prefers-color-scheme` media query entirely, or act as an override on top of it?
4. Where in the header should the dropdown be placed - left nav area or right area near social icons?
