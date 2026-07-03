---
id: compiler
title: The Altaica compiler
sidebar_position: 1
description: "How one compiler takes your trust domain, tier and perimeter, splits the model accordingly, and hands you an OpenAI-compatible endpoint."
---

# The Altaica compiler

<span className="zk-status zk-status--rnd">◐ Active R&D</span>

**In one breath:** you describe the workload and the constraints. The compiler
weighs your needs, your hardware and your budget, picks the privacy techniques
that hold up for your case, and hands back an OpenAI-compatible endpoint inside
your perimeter. You never have to choose between MPC, enclaves or federated
learning yourself. That's the compiler's job.

<video className="zk-video" autoPlay loop muted playsInline
  src="/videos/compiler-split.mp4" title="How the compiler splits a model" />

## The assembly line

Think of an AI model as a long assembly line with many stations (its layers).
Some stations do subtle, sensitive work. Others just do enormous amounts of
plain arithmetic.

The compiler walks the whole line, station by station, and asks one question at
each: *if an outsider watched only this station, what could they learn?*

### 1. Mapping

Altaica takes an open model and maps its entire structure: every layer, every
operation, and the perfect points to split it.

### 2. The split

The work divides into two kinds:

- **The "thinking" parts** (non-linear operations). These are the ones that
  could leak meaning. They stay on trusted ground: your own device, your
  perimeter, or an attested enclave, depending on the anchor you chose.
- **The "heavy lifting" parts** (linear operations, the giant matrix math).
  These are shipped out to fast, untrusted GPUs, but only after being masked
  or secret-shared so the GPUs are crunching numbers they cannot interpret.

The result: the network does most of the work while seeing none of the
meaning.

### 3. The receipt

Because the heavy lifting runs on machines we don't ask you to trust, the work
comes back with a STARK proof: a mathematical receipt that the network did the
math correctly, without the network ever seeing your content. More in
[Receipts](/docs/platform/receipts).

## One honest caveat, because it matters

Masking-style obfuscation on its own is a *basic* technique. If a serving node
knows exactly which model it is running, some maskings can in principle be
reversed. We know this, we benchmark it, and it's precisely why zkAGI never
leans on any single technique. The compiler's whole reason to exist is to
choose, per workload, from the full toolbox: masking, secret sharing, MPC,
FHE, federated learning, attested hardware, and combinations of them, so that
the guarantee you get is the one that actually survives your threat model.

## What you get at the end

```python
# the only change your code needs
client = OpenAI(
    base_url="https://infer.your-perimeter.ai/v1",
    api_key="zk-..."
)
client.chat.completions.create(...)  # models hosted inside YOUR perimeter
```

## Looking ahead

We're extending the compiler with homomorphic encryption at the entry and exit
points of the pipeline: a "secure transport box" that protects data the moment
it enters and right before it's handed back. Like everything on this page,
watch the [Status board](/docs/trust-center/status) rather than taking a
roadmap's word for it.

:::caution Where this stands
The compiler is the heart of our research program and under active R&D. Model
splitting, masked serving and receipt generation run today in our environments;
per-customer compilation is done with our team, per engagement, with the
resulting guarantees agreed in writing. This page describes the architecture we
build toward, not a general-availability promise.
:::
