---
title: "Pedometer PCB workshop"
date: 2026-02-20
status: "complete"
role: "Workshop lead · PCB design · BOM"
tools: ["KiCad", "C"]
summary: "A one-session IEEE MSU workshop taking undergrads from never-opened-KiCad to a soldered, flashed, working pedometer."
---

A workshop for IEEE MSU where a room of undergrads went from never having opened KiCad to a soldered, flashed, working pedometer in a single session.

The goal wasn't a novel pedometer. It was to compress the full hardware loop — schematic, layout, BOM, SMD assembly, firmware — into one session where everyone left with something that counted their steps. I was the workshop lead: I did the board design, built the BOM, and ran the session. The learning happened in twenty pairs of hands, not mine — calling this my project would overclaim.

The design was driven by teaching constraints as much as by electrical ones. Every time I reached for a cooler part, the question "can I walk a first-time solderer through this?" killed it. What ended up on the board:

- Accelerometer over I²C
- Microcontroller chosen for student accessibility and a readable datasheet
- Coin cell power with basic reverse-polarity protection
- SMD parts, nothing smaller than 0603; no QFN, no BGAs, no footprint that wasn't hand-solderable
- C firmware that debounces acceleration peaks against a fixed threshold — intentionally not a filter bank, so participants could actually read the code while the board ran

The lesson I'll take forward is the teaching constraint itself. A workshop BOM is a different artifact than a personal BOM, and the boards I picked under that pressure were usually better-chosen than the ones I'd picked under no pressure. Next time I run a workshop I want to push the firmware walkthrough further — more time on the code, less "flash this binary and watch it count."
