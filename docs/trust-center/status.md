---
id: status
title: Status board
sidebar_position: 1
description: "The single source of truth for what's live, what's active R&D, and what's configured per engagement."
---

# Status board

**This page is the single source of truth** for how far along each capability
is. If a marketing page and this table ever disagree, this table wins. Last
reviewed: 7 November 2026.

Legend: <span className="zk-status zk-status--live">● Live</span> serving real
traffic today · <span className="zk-status zk-status--rnd">◐ Active R&D</span>
runs and is benchmarked, deployed with design partners under written caveats ·
<span className="zk-status zk-status--engagement">◇ Per engagement</span>
assembled with our team for your deployment, scope agreed in writing.

| Capability | Status | Notes |
|---|---|---|
| Zynapse gateway, OpenAI-compatible (`/v1/chat/completions`) | ● Live | `https://api.zkagi.ai/v1`; in-perimeter endpoints per engagement |
| Anthropic-compatible `/v1/messages` (Claude Code, Anthropic SDKs) | ● Live | Same lanes, scrubbing and receipts |
| `fast` lane: open models, zero-data-retention host | ● Live | deepseek-v4.1-flash, glm-5.3-flash, glm-5.3, kimi-k3. No hardware proof |
| `tee` lane: open models in an attested GPU TEE | ● Live | Phala Cloud; attestation and signed response receipt checked by the gateway; fails closed. gemma-4-31b-it, kimi-k3, glm-5.3, qwen3.8-27b and others |
| `frontier` lane: closed models, always scrubbed | ● Live, opt-in | claude-sonnet-5-5, claude-haiku-5-5, claude-opus-5-5, claude-fable-5-1. No zero-retention or hardware guarantee. argon-4 listed, rate pending |
| PII scrubbing before send, rehydration after (incl. tool-call arguments) | ● Live | Pattern detectors; see [How it works](/docs/api/how-it-works#scrubbing) |
| Per-call receipts (`/r/{id}`) | ● Live | Content-free: amounts, counts, hashes, verification status |
| Image input; video input (tee only) | ● Live | Inline data URLs only |
| Voice notes, speech-to-text, text-to-speech | ● Live | Run on the gateway; audio is not sent to a provider |
| Document text extraction (`/v1/files/extract`) | ● Live | PDF, DOCX, images, text |
| `zynapse-auto` model selection | ◇ Per engagement | Private sealed-router deployments only; not on `api.zkagi.ai` |
| `mpc` and `obfuscated` lanes | ◐ Active R&D | Return 501 on the gateway today |
| Legacy proof generation, proof-unlocked Q&A, image/video generation (`zynapse.zkagi.ai`) | ◇ Re-checking | Separate older host, not part of the gateway; see [Legacy endpoints](/docs/api/legacy) |
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
