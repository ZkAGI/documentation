---
id: status
title: Status board
sidebar_position: 1
description: "The single source of truth for what's live, what's active R&D, and what's configured per engagement."
---

# Status board

**This page is the single source of truth** for how far along each capability
is. If a marketing page and this table ever disagree, this table wins. Last
reviewed: July 2026.

Legend: <span className="zk-status zk-status--live">● Live</span> serving real
traffic today · <span className="zk-status zk-status--rnd">◐ Active R&D</span>
runs and is benchmarked, deployed with design partners under written caveats ·
<span className="zk-status zk-status--engagement">◇ Per engagement</span>
assembled with our team for your deployment, scope agreed in writing.

| Capability | Status | Notes |
|---|---|---|
| OpenAI-compatible inference endpoint | ● Live | Hosted; in-perimeter endpoints per engagement |
| Standard tier (on-device scrubbing) | ● Live | |
| Private tier (masked serving) | ● Live | Recovery bounds are our own benchmarks |
| Verification receipts | ● Live | STARK proofs on supported paths |
| Client-side proof generation (`/v1/generate_proof`) | ● Live | Zynapse |
| Proof-unlocked document Q&A (`/v1/ask`) | ● Live | Zynapse |
| Media generation (image / video) | ● Live | Zynapse |
| Sovereign tier (MPC serving) | ◐ Active R&D | Deployed per engagement; batch latency |
| Dealer-on-client-device secret sharing | ◐ Active R&D | |
| Selective disclosure under MPC (private introspection) | ◐ Active R&D | Architecture target; see page caveat |
| FHE inference variants | ◐ Active R&D | Workload-dependent |
| Federated learning | ◐ Active R&D | With design partners |
| Private training / fine-tuning | ◐ Active R&D | |
| Confidential-hardware serving (NVIDIA CC, TDX, Nitro) | ◇ Per engagement | On attested infrastructure you or your cloud provide |
| Custom perimeters (on-prem / regional / transcontinental) | ◇ Per engagement | |
| The Explorer (receipt browser) | ◇ Per engagement | Access on request |
| Compiler-assembled per-customer stacks | ◐ Active R&D | Done with our team today |

## How to read "Active R&D"

It doesn't mean vaporware, and it doesn't mean production-hardened. It means:
the capability runs, we measure it, we're honest about its edges, and if it
matters to your deployment we'll demonstrate it on your data before anything
is signed. What we won't do is let a slide deck promise it for us.

:::info
This board is maintained by hand and reviewed with every significant release.
Questions about a specific line? [Ask us directly](/contact) and you'll get an
engineer's answer, not a sales answer.
:::
