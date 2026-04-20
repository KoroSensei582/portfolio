---
title: "Hand-controlled drone"
slug: "hand-controlled-drone"
date: 2026-03-01
status: "in-progress"
role: "Hardware · firmware"
tools: ["KiCad", "C"]
tags: ["pcb-design", "kicad", "embedded", "drone", "in-progress"]
summary: "A gesture-driven quadcopter prototype — IMU input on a wearable, onboard firmware parsing pose into flight commands."
hero:
  src: "./drone-prototype.jpg"
  alt: "Quadcopter and wearable controller on a workbench"
---

A gesture-controlled quadcopter prototype: the hand wears an IMU, and the drone takes the pose as a control input.

I wanted a project that would force me across the full hardware-to-firmware stack rather than stopping at the PCB. A gesture-driven drone made the decisions unavoidable — what does the sensor give you, how do you turn it into a stable command stream, and how much of that work belongs on which end of a wireless link.

The system has two sides. The wearable carries an IMU, a microcontroller, and a [wireless module, e.g., nRF24 / ESP-NOW]; it samples orientation, converts pose to commands, and transmits. The drone side parses incoming packets and forwards them to the flight controller. Design decisions worth naming:

- [Specific IMU] on the glove, sampled at [rate]
- Complementary filter fusing accelerometer tilt with gyro rate into a pose estimate stable enough to control against
- [Wireless link]; packet rate sized for the control loop, not for the sensor's full sample rate
- Firmware deadband and slew limits so small hand tremor doesn't map to erratic drone input
- Fail-safe: if the link drops for more than [N] ms, the drone commands neutral throttle and holds

Where it stands: the wearable is assembled, the filter is behaving, the link is up, and the drone side is receiving. I'm still tuning the mapping from pose to flight command — tilt-for-pitch is obvious, yaw is harder, and altitude from a glove is genuinely unresolved. Next revision is a second wearable with a thumb-actuated throttle and a more conservative default mapping.
