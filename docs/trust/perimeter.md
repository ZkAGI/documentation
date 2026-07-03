---
id: perimeter
title: "Perimeter: decide where it runs"
sidebar_position: 3
description: "Draw the physical and legal boundary your compute lives inside: on-prem, one jurisdiction, or spread across regions."
---

# Perimeter: decide where it runs

<span className="zk-status zk-status--engagement">◇ Configured per engagement</span>

**In one breath:** the trust anchor is one axis, residency is the other. You
draw the boundary the compute lives inside, and models are hosted within it,
behind your own endpoint.

## Three shapes of boundary

### Your own cluster (on-prem)

Inference runs entirely inside your data centre or GPU cluster. Nothing leaves
the building, and you still get the same receipts. Run it on hardware you
already own, or we help you provision it.

### One jurisdiction (regional)

Pin the compute to a single region so data stays inside one legal boundary.
This is the simple answer to residency rules: if your regulator says "EU
only", the perimeter says it too, and the receipt shows it.

### Spread across regions (transcontinental)

The counterintuitive one. Place operator-disjoint nodes in *different*
countries, so that no single site, and no single country, ever holds the whole
computation. Paired with the Sovereign tier, this turns geography itself into
part of the privacy guarantee.

## The endpoint lives inside

Whatever shape you choose, the [compiler](/docs/platform/compiler) hands you an
OpenAI-compatible endpoint **hosted inside that perimeter**:

```python
client = OpenAI(
    base_url="https://infer.your-perimeter.ai/v1",  # yours, inside your boundary
    api_key="zk-..."
)
```

Your engineers keep the SDK they already use. The privacy machinery is compiled
in underneath, not bolted on around them.

:::caution Where this stands
Perimeters are, by definition, configured per engagement: your hardware, your
regions, your rules, agreed in writing. Regional pinning and on-prem
deployments follow established patterns; transcontinental operator-disjoint
meshes are deployed together with our team. See the
[Status board](/docs/trust-center/status).
:::

**Next:** [meet the compiler that puts it together →](/docs/platform/compiler)
