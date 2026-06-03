---
title: Breaking Things is Just as Important as Making Things
description: Master the art of code critique with AI agents. Learn why questioning approach matters more than implementation in modern code review.
tags:
  - code-review
  - AI-agents
  - software-quality
  - development-practices
status: draft
pubDate: 2026-05-09
category: software-engineering
---

**tldr;** Your ability to poke flaws or break things is amplified with a coding agent. This is a highly valuable skill to master.

Code is cheap. Review is the new bottleneck. That's what they say. The service to mitigate this? Automated review via [Codex](https://developers.openai.com/codex/cloud/code-review), [Claude](https://code.claude.com/docs/github-actions), [CodeRabbit](https://coderabbit.ai/), or [Greptile](https://www.greptile.com/). At [eDNA Explorer](https://ednaexplorer.org/), we've set the team up with Greptile and it has definitely helped. The automated diagrams and P0-P3 issues surfaced is generally very useful.

But I still don't find these automated quality gates to be very good at questioning the overall approach. They optimize the gaps in a PR but don't seem to weigh in on whether or not the approach is good. [Peter Steinberger has a good magic words style prompt](https://youtu.be/YFjfBk8HI5o?si=9nCI9t2aSZwvksmP&t=4159) that seems to do a better job - specifically with the Codex model:

> What is the intent of this PR? Was this the best way to implement it?

This open ended question surfaces strategic flaws and trouble with the general approach. This is not a one shot prompt with an answer but rather the start of a hearty discussion. Here's what happens:

1. Codex surfaces P0, P1, P2, or P3 issues.
2. I review the issues I think are actually significant. Many times the agent might not fully understand the entire codebase or have some misconceptions. These can be ignored but they are often the exception not the rule.
3. I'll ask the agent to diagram the flow or show code snippets from the PR illustrating the issue. Basically I want the agent to build the case and prove this is really an issue.
4. I'll ask the agent to propose a solution or ask if we can address the issue via another approach I have in mind. If so what are the tradeoffs?
5. After finalizing a set of problems and solutions in the discussion I'll ask the agent to draft a comment or series of comments for the PR with snippets or diagrams for the PR author.

This is not too different from researching the codebase and building a plan to implement a feature. But, I submit that your ability to critique a PR with these tools is more important than providing an implementation. We can implement a solution to a problem in several different ways simultaneously. How do we choose the right approach? How good are we at surfacing architectural flaws, security gaps, business logic errors, and analyzing the tradeoffs rather than simply generating lines of code and bloating the codebase.

Automated review gates are a good measure to establish a quality baseline but they don't go much beyond that. They still can't replace strategic review via a human plus an agent. Your ability to be critical is critical.
