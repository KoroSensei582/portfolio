---
title: "MSU Solar Car Racing"
organization: "MSU Solar Car Racing"
role: "Harnessing and Integration Lead"
location: "East Lansing, MI"
startDate: 2025-09-01
endDate: null
summary: "Designing, assembling, and debugging the boards and firmware that let the car's systems talk to each other — from 4-layer Altium layout to STM32 CAN firmware running on the vehicle."
media:
  - type: image
    src: "/images/involvement/solar-car-racing/hero.jpeg"
    alt: "Altair, the star of the show"
    caption: "Altair, the star of the show"
  - type: video
    src: "/images/involvement/solar-car-racing/2.mp4"
    alt: "The board receiving CAN messages and driving light logic"
    caption: "The board receiving CAN messages and driving light logic"
  - type: image
    src: "/images/involvement/solar-car-racing/3.jpeg"
    alt: "Altair mounted on the car, race ready"
    caption: "Altair mounted on the car, race ready"
---

## 00.01 — Context

I joined **MSU Solar Car Racing** in September 2025 on **Vehicle Controls and Sensing**, and I am now the team's **Harnessing and Integration Lead**. The car is MSU's official entry for the **2026 Formula Sun Grand Prix** and the **American Solar Challenge**.
Controls and Sensing owns three boards VEGA, Altair, and Deneb which together act as the brain of the car.

---

## 00.02 — Hardware design

I take boards from schematic through to fabrication in **Altium Designer**: schematic capture, part selection, and 4-layer impedance-controlled layout for safety-critical vehicle control systems.

Part selection on a car is not the same exercise as part selection on a bench project. Every component gets validated against automotive operating conditions, temperature range, thermal dissipation, transient behavior on a noisy supply and supply chain availability

I also assemble them. That means **hand-soldering fine-pitch components** to IPC standards, which has a much steeper learning curve than it looks like from the outside and is a skill I would rather have than not.

---

## 00.03 — Firmware

I wrote the **STM32 firmware in C++ for the lighting board** which is now **installed and tested on the vehicle**.

Lighting sounds trivial until you look at what it depends on. The board knows nothing on its own; it learns everything over **CAN**. I configured reception for five message types (turn signals, hazards, brake, and BPS fault) and implemented the full lighting logic on top of them. I also added functionality for the board to transmit and receive **LIN** messages, as a backup incase something were to happen to the CAN line

The BPS fault case is the one that really matters. A battery protection system fault is the car reporting that something is wrong at the pack level, and the lighting board's job is to make that visible immediately and unambiguously. The logic has to be correct not in the average case but in the failure case, which is a different design posture than most firmware I have written.

Working on this also forced me to actually understand CAN: arbitration, message IDs functioning as priorities, and why a broadcast bus with no addressing is the right choice for a vehicle in the first place.

---

## 00.04 — Debugging

The most instructive work has been bring-up on boards that should have worked and did not.

The clearest case: an inherited board with critical malfunctions caused by **traces routed underneath ICs**. It is the kind of fault that is invisible in the schematic, survives any review that only checks the netlist, and only surfaces when a populated board misbehaves in a way that makes no logical sense. Finding it meant abandoning the assumption that the design was right and measuring my way back to physical reality with a multimeter.

---

## 00.05 — Why this team

Solar car is the closest thing an undergraduate gets to shipping a vehicle. There is a hard date on the calendar, the car either drives or it does not, and every board I design has to survive being physically installed in something that then goes out and races. It is the least abstract engineering I do, and the feedback loop is brutal in the best way.
