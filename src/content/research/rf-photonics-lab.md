---
title: "RF-Photonics Lab"
date: 2026-06-01
type: "lab-work"
summary: "Learning digital communications by building the receive chain end to end — pulse shaping, timing recovery, QPSK through 256-QAM, and OFDM — on GNU Radio and a USRP B210."
media:
  - type: image
    src: "/images/research/rf-photonics-lab/hero.png"
    alt: "OFDM signal in loopback and on the spectrum analyzer, centered at 3000 MHz"
    caption: "OFDM signal in loopback and on the spectrum analyzer, centered at 3000 MHz"
    aspect: "2072 / 788"
  - type: video
    src: "/images/research/rf-photonics-lab/2.mp4"
    alt: "Setting modulation scheme in a CLI which communicates the parameters to the b210 and receives the result"
    caption: "Setting modulation scheme in a CLI which communicates the parameters to the b210 and receives the result"
    aspect: "1 / 1"
    fit: contain
  - type: image
    src: "/images/research/rf-photonics-lab/3.png"
    alt: "16-QAM constellation loopback on the B210"
    caption: "16-QAM constellation loopback on the B210"
    aspect: "2880 / 1800"
---

## 00.01 — Context

This summer I joined Professor Thomas Clark's RF-photonics lab at Michigan State University. The lab's direction is photonics, and I am in charge of generating the signals using a B210 SDR.

---

## 00.02 — Climbing the chain

The workhorse is **GNU Radio** and a **USRP B210**. I have built **35+ flowgraphs** working up the digital-communications chain end to end:

- **FIR filtering and root-raised-cosine pulse shaping** — bandlimiting the signal while satisfying the Nyquist criterion for zero inter-symbol interference at the sampling instants, with the matched filter split across TX and RX.
- **Symbol-timing recovery** — the receiver has no idea where the symbol boundaries are, and getting them wrong is not a small error. This is the block that taught me the most.
- **Carrier frequency and phase offset correction** — Costas loops, and the slow realization that a loop bandwidth is a tradeoff and not a setting.
- **Modulation and demodulation** — QPSK, 16-QAM, and 256-QAM, transmitted and recovered.

I am currently working on **OFDM** — simulated first with BPSK and QPSK subcarriers, then 16 and 256-QAM, corrected with symbol synchronization.

---

## 00.03 — Measurement

Links are only real once you have measured them. On the B210, over a conducted SMA path, I have characterized both single-carrier and OFDM links: quantifying **bit-error rate**, sweeping **TX/RX gain** to map out where constellation quality degrades, and pinning down the sources of inter-symbol interference rather than tuning until it looks acceptable.

A representative result: I cut **square-wave rise/fall time from 135 ns to 45 ns** on the B210 by optimizing sample rate, wave frequency, and gain — while keeping underflow errors under control, since the naive way to get a faster edge is to ask the hardware for more than it can stream.

---

## 00.04 — Tooling

Repetitive experiments beg for tooling, so I have been building it:

- **An interactive constellation TX/RX CLI**, wrapping a flowgraph and exposing **6 modulation schemes** and **9 timing-error detectors** — plus the pulse-shaping parameters — as prompts rather than GUI edits. Sweeping a parameter should not require twenty clicks in a graphical editor.
- **Transmit and receive software written directly against the UHD Python API**, including hand-coded signal transmission and IQ constellation generation. Dropping below GNU Radio's abstraction layer is clarifying: you find out exactly which conveniences you had been leaning on.
- **A real-time spectrum waterfall** on the UHD Python API.
- **IQ conversion utilities** that turn raw captures into CSVs for offline analysis.

---

## 00.05 — Where it is going

The near-term goal is to finish the OFDM chain and take it from simulation onto hardware, then push toward sending the signals the lab actually cares about. The longer arc is the reason I wanted this position: the lab's work sits where RF, photonics, and digital communications meet, and the receive chain is the part of that stack I want to understand from the sampling instant upward.
