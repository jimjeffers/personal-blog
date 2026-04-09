---
title: Abandoning Apple and Learning to Love Linux
description: A journey from the Apple ecosystem to a Linux-based desktop setup with Omarchy, comparing the experience of Framework hardware running Hyprland against years of Mac ownership.
pubDate: 2026-01-28
status: draft
tags:
  - linux
  - apple
  - omarchy
  - hyprland
  - framework
  - hardware
category: Technology
---

I've always found the Apple ecosystem to be a comfortable place. But things **started** to crack years ago. The butterfly keyboards on the touch bar MacBook Pros were crippled by the smallest of dust particles rendering keys unusable.

It's safe to say they redeemed themselves with the [M1 macbook pros](https://support.apple.com/en-us/111893). Apple Silicon changed the game for anyone relying on a laptop as their primary workstation. The speed and all day power was unbelievable. The build quality was excellent and I've had virtually no hardware issues. I upgraded to an M4 max with the anti-glare screen when it came out. The anti-glare screen is crisp and color-accurate, the trackpad responds precisely to every gesture, and the aluminum body feels solid without any flex or creaking.

The Vision Pro was the final straw. The headset turned out to be a $3,500 paperweight. Too heavy for extended use, eye tracking that consistently broke, and the virtual desktop feature felt claustrophobic given the tunnelvision I had in the googles. Siri consistently fails to understand basic commands, "turn off the music" often gets a response of "There's no music playing.", in situations where there clearly is!

When I saw DHH's [youtube videos on Omarchy](https://www.youtube.com/watch?v=L3EafsSCv80) and his [comical keynote,](https://youtu.be/gcwzWzC7gUA?si=Aw4yNUJfNGj_ZmKu&t=2279) I knew that I wanted to try it. I was ready to think different. So I sprung for a framework desktop w/ 128GB of unified memory, two 27" anti-glare coding monitors, a mechanical BT keyboard and mouse. All of that was less than half the price of my M4 MBP.

Learning a new OS and keyboard was both fun and frustrating—it took me a month to fully adapt. Now I'm fully used to the keyboard first hyprland UI. I boot the machine and it's just ready. There aren't a ton of third party services booting and polluting the UI or task bar at start. It's just a clean slate. Managing the dozen apps that auto-launch on macOS startup now feels like wasted time. Omarchy just gets out of your way so that you can start working. `Command+Enter` and let's go! I can just do my work and stay organized with a system that can't pile up a stack of windows.

That's not to say there aren't grievances. The universal copy / paste uses a different hot key than nearly all of the other `ctrl+key` combo operations. I've gotten used to that now - which trips me up when I go back to work on my MacBook. Multi-monitor support in Hyprland is barebones, you have to manually calculate pixel positions and edit config files. It's not what I prefer. Good news though - it's just text and a config. 15 minutes in claude code and I had a TUI built in python to visually manage my displays! Omarchy has built in support to launch a TUI or web app like a native app too. This makes launching specialized tools feel seamless.

If you're looking for a work machine - try linux. It's free. It's fast. You can own every decision. The AMD Strix Halo chips are comparable to what you'd get on a Mac mini. Apple has superior power management and memory bandwidth. Did I mention it's half the price?

For a laptop I still think Apple Silicon cannot be beat. So I'll continue to live in both worlds for now. But if AMD's next chips match Apple's efficiency, I won't need both worlds much longer.

Is it for you? If you're technical and like to tinker around.  If you are willing to put up with a bit of rough edges getting setup initially? If you already use a coding agent extensively - then yes, yes, and yes! Opening up Claude Code and typing `/omarchy` to customize and personalize the actual OS is next level.
