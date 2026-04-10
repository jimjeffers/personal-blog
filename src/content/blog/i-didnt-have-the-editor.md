---
title: "I Didn't Have the Markdown Editor I Wanted So I Vibecoded One"
description: "How I built a custom markdown editor in one day using Claude Code, TanStack Start, and tailwind to create the writing tool I actually wanted."
tags:
  - AI-assisted development
  - markdown editor
  - full-stack development
  - TanStack Start
  - SaaS
status: draft
pubDate: 'Apr 09 2026'
category: Development
---

Last week I decided to start writing again. [It's been a minute](https://www.donttrustthisguy.com/orientating-yourself-in-ios). But what app should I do all of my writing in today? My IDE isn't exactly well optimized for markdown. Shopping for a dedicated app gives me decision fatigue fast. Why even bother - [today I can generate the app of my dreams](https://clarus.page).

My requirements were simple:

- Handles markdown nicely.
- Supports focus mode similar to some old favorites.
- Utilize popular light/dark themes.
- Runs quickly / easily locally.
- Build it using a stack I already develop in for simple maintenance.

I was able to nail down a web based editor that had the UX I envisioned. I already have a working stack I like to use but swapped out NextJS with TanStack Start to experiment:

- TanStack Start
- Tailwind
- ShadCN
- TipTap

To simplify iteration I changed my default workflow a bit further by not utilizing a monorepo or any other niceties for growing the project.

I utilized the RPI prompts from [HumanLayer](https://github.com/humanlayer/humanlayer/tree/main/.claude) and kicked off research jobs on each of the above tools. Then I kicked off a few more on a handful of my favorite writing tools and IDEs - essentially instructing Claude Code to distill the design principles and implementation of all of those tools into summary reports.

The plan was 3 stages:

1. Create a bootstrap stack from the tools researched. 
2. Implement a full screen unstyled editor route that utilizes TipTap.
3. Create styled minimalist editor shell with tailwind from the design research. This plan prompt was the most involved as I specified which elements from the research to prioritize.

At that point I could walk away while Claude Code worked on each plan sequentially. What came out hit my core requirements. I could polish the rough edges and start writing immediately.

The next step in this one day project was to make the application fully usable. I had a shell I enjoyed working in but I didn't have a way to persist files or interact with AI. Part of my frustration is that I always use markdown for everything these days. But I'm not a fan of the reading raw markdown in an IDE. The pretty HTML outputs are also not that great unless you roll your own plugin and they're also not editable. Hence the next stage of the rabbit hole. It was time to kick off some more research jobs:

1. Investigate existing strategies for [ProseMirror](https://github.com/ProseMirror/prosemirror) to [Markdown](https://daringfireball.net/projects/markdown/) conversion.
2. Read the claude code headless docs.

The reason I generated research for the claude code headless docs was to quickly prototype local execution of prompts against a coding agent to review the markdown files. This was the fastest way to a poor man's prototype using Claude Code as the editing agent. It was extremely fast to get this working and to get useful results which meant I had a prototype that was valuable to me personally.

The problem - it was painfully slow to run in terms of UX. But this was just validation. If what comes out the other end of that wait is worthwhile and/or tunable to be useful then it's worth pursuing.

Over several weekends the markdown bridge was enhanced and server actions + persistence were offloaded to convex. Eventually this project became robust enough that I could say I had the minimum amount of functionality to package this into a product and [Clarus](https://clarus.page) was born.

Vibe coding this initial project was a fun experiment that turned into quite the rabbit hole.  It's never been easier or cheaper to start something. The whole process reminded me why building custom tools can be so rewarding - you get exactly what you need, and the journey itself is half the fun.
