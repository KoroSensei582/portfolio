---
title: "Solar Car vehicle controls"
date: 2025-09-15
status: "ongoing"
role: "Vehicle Controls & Sensing · contributor"
tools: ["Altium Designer"]
tags: ["pcb-design", "altium", "team-project", "solar-car"]
summary: "Contributing to 4-layer, impedance-controlled PCBs for MSU Solar Car Racing — my first exposure to signal integrity on a real, safety-critical system."
---

Contributing to the 4-layer, impedance-controlled boards that run MSU Solar Car Racing's vehicle controls — my first exposure to signal integrity on a real, safety-critical system.

MSU Solar Car Racing designs and builds solar-powered vehicles for competition. The Vehicle Controls and Sensing subteam owns the boards that read sensors, talk to the motor controllers, and enforce the interlocks that let the car be raced safely. I joined as a first-year, which means I'm one contributor among several, always working under review from the subteam leads.

My work has been scoped — deliberately, and correctly for my level. I've taken on parts of schematic capture, parts selection, and layout on specific control boards:

- Component selection driven by automotive operating ranges (wider temperature, sustained vibration) and by supply-chain reality — avoiding anything with a 26-week lead time, even when it's electrically ideal
- 4-layer stack-up with impedance control for the differential pairs that matter (CAN especially, and some SPI where trace length starts to bite)
- Fine-pitch SMD assembly on boards routed to stricter IPC standards than anything I'd worked on before, which mostly meant learning how much I didn't know about paste, reflow, and inspection

Impedance-controlled layout isn't one skill. It's a stack: stack-up planning, dielectric thickness, trace-width calculation, awareness of return paths under high-speed signals, and enough design review to catch the places you got any of that wrong. I didn't know any of it before Solar Car, and I'm not expert in any of it yet. Most of my contribution so far has been on work where the risk is bounded and reviewed — which is the honest answer for where I am. The next goal on the team is to take a smaller board end-to-end, schematic through assembly, with review but as the primary contributor.
