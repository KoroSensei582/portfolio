---
title: "Inertial Measurement Unit"
date: 2025-11-15
status: "complete"
role: "PCB design"
tools: ["Altium Designer"]
tags: ["pcb-design", "altium", "i2c", "personal-project"]
summary: "A six-axis IMU breakout board designed end-to-end in Altium — schematic, layout, BOM."
---

A six-axis IMU breakout board — my first PCB taken end-to-end in Altium, from picking the sensor to routing the supply rails.

I wanted a small, bounded project that would force me through every step of the PCB workflow: reading a datasheet to decide on a part, routing an I²C interface, planning a power supply, running design rule checks, and ending up with something manufacturable. Not a class assignment — a deliberate first pass with no shortcuts.

The contribution is full: schematic, layout, and BOM are all mine, including the decisions that were probably wrong the first time. The design in outline:

- Six-axis MEMS IMU (accelerometer + gyroscope) with an I²C interface
- Two-layer board
- Decoupling per the sensor's datasheet — 100 nF across each supply pin plus a shared bulk cap, placed as close to the IC as the footprint allowed
- I²C pull-ups sized for the intended bus speed and capacitance
- Pin-header breakout with castellated edges so the board can be hand-soldered to another design or reflowed as a module onto a larger one
- ERC and DRC clean before handoff

The thing I underestimated is how much of PCB design is the schematic. Routing was mostly mechanical once the signals were understood; component choices and supply layout took days. I'm not fully happy with my ground return on the first revision — I poured ground on both layers but didn't stitch vias as aggressively along the analog supply path as I would now. A v2 with a cleaner pour and an optional onboard LDO is next on the bench.
