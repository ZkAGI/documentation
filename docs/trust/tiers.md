---
id: tiers
title: "Tiers: pick your altitude"
sidebar_position: 2
description: "Standard, Private and Sovereign: three strengths of guarantee, chosen per workload, changeable per call."
---

# Tiers: pick your altitude

<span className="zk-status zk-status--live">● Live</span> <span className="zk-status zk-status--rnd">◐ Sovereign tier: active R&D</span>

**In one breath:** not every workload needs the strongest guarantee, and paying
for one you don't need is its own kind of waste. The guarantee comes in three
strengths, and you set it per call.

## The mountain

We name the tiers after altitude because that's how they feel in practice: the
higher you climb, the stronger the guarantee and the more it costs in latency.

### Tier 1 · Foothill · Standard

Fast access to a wide choice of large models, with secrets scrubbed **on your
device** before a request ever leaves it. Zero retention, lowest cost, and yes,
still a receipt on every call.

*For:* general workloads where the input isn't regulated data, but you still
want hygiene and evidence.

### Tier 2 · Ridge · Private

The regulated default. The compiler picks the protection that fits your anchor
and workload, from masked serving (the serving node never sees your raw
inputs) to attested enclaves. Benchmarked below 0.05% token recovery, at
interactive speed.

*For:* production workloads on regulated data that need answers now.

### Tier 3 · Summit · Sovereign

The strongest guarantee we offer. Your data is split into pieces and sent to
operators who don't know each other. No single one of them holds enough to
reconstruct anything, and the result comes back with a STARK proof of correct
execution.

Two details your security team will like:

1. **The splitting itself can happen on your own device.** The "trusted
   dealer" role in MPC doesn't have to be a server you rent from us. Shares
   can be created inside your walls before anything leaves.
2. **The privacy is information-theoretic under non-collusion.** That's the
   same standard assumption behind MPC everywhere: the guarantee holds as long
   as the operators don't all conspire.

*For:* batch workloads where assurance beats latency. You trade speed for proof.

## Side by side

| | Foothill · Standard | Ridge · Private | Summit · Sovereign |
|---|---|---|---|
| Speed | Interactive | Interactive | Batch |
| Who sees raw inputs | Scrubbed on-device first | No serving node, ever | No one; data is split |
| Token recovery | n/a (scrubbed) | < 0.05%, benchmarked | 0% effective |
| Proof | Receipt | Receipt | Receipt + STARK |
| Typical use | General workloads | Regulated production | Highest-assurance batch |

## Changing your mind is one field

The tier is a parameter on the request, not a contract negotiation:

```json
{ "task": "vision.classify", "tier": "sovereign" }
```

Run your nightly compliance batch at Summit and your customer-facing chat at
Ridge, from the same API key.

:::caution Where this stands
Standard and Private tiers serve production traffic. The Sovereign tier's MPC
serving path is active R&D: it runs, we benchmark it continuously, and we
deploy it per engagement with the caveats agreed in writing. Recovery-rate
figures are our own benchmarks, not third-party certifications. See the
[Status board](/docs/trust-center/status) and [Disclosures](/docs/trust-center/disclosures).
:::

**Next:** [decide where it runs →](/docs/trust/perimeter)
