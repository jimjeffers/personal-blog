---
title: Why Coding Agent CLIs Fall Short of Desktop Applications
description: Exploring why desktop and mobile interfaces outperform CLI tools for managing AI coding agents and parallel development workflows.
tags:
  - AI coding agents
  - developer tools
  - workflow optimization
  - Claude
status: draft
pubDate: 2026-05-26
category: Development Tools
---

A year ago, Claude Code's CLI stole the lion's share of my curiosity and attention, but I no longer use it in my day to day. I've moved on to the [codex](https://openai.com/codex) and [claude native applications](https://claude.ai/download) for desktop and mobile. Google recently jumped into the game converting [antigravity](https://antigravity.google) into a similar experience. Both of these interfaces provide a more useful abstraction for managing multiple agent sessions and worktrees. It made sense that we'd see these tools proved out as a CLI at first. This was the path of least resistance during a period of experimentation. But even the creator of Claude Code often expresses that most of this work is now down via his phone not the CLI.

None of this should surprise you. If you're not already using these apps to manage your sessions with a coding agent, I'd encourage you to consider it. Why? Well for one thing choosing the base branch and creating a work tree is baked into both by default. No need to take extra steps to ask your agent to create a worktree let alone trying to remember which terminal session is handling which task. The desktop applications are highly effective at removing the friction of managing parallel work and parallel work is definitely a keystone habit of leveraging your abilities with agentic delegation.

The alternative is simply waiting for an agent to produce output or stream its thoughts to you which in most cases is not how you want to be spending your time. This is the new way of working for now. Yes, this is a moving target. But right now, if you're still using the CLI form factor of an agent harness, you're not working as efficiently as the alternatives allow. Let's just iterate on some powerful features that CLI variants are not intended to do:

1. Operate from a different directory such as a worktree; by default the CLI is expected to work from the root directory it has been launched.
2. Switch between multiple sessions; the CLI is only responsible for a single session by design. You need to utilize your own strategy for managing multiple instances of the tool.
3. Collaborate with you in a dedicated browser session; you can configure the playwright or agent dev tools MCP but the desktop apps have this baked in and even allow you to annotate the page the agent is working in.

If you haven't yet - I'd encourage you to try spinning up 3 or 4 worktrees today to tackle at least 3 issues in parallel. See how you like the experience compared to the CLI. I personally haven't looked back.
