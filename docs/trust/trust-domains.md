---
id: trust-domains
title: Trust domains
sidebar_position: 1
description: "Pick the anchor of trust your compliance framework already approves: silicon, mathematics, or both."
---

# Trust domains

<span className="zk-status zk-status--engagement">◇ Configured per engagement</span>

**In one breath:** a trust domain is your answer to the question "who has to be
honest for my data to stay private?" zkAGI lets you pick that answer instead of
inheriting ours.

<video className="zk-video" autoPlay loop muted playsInline
  src="/videos/trust-domains.mp4" title="How a trust domain is chosen and enforced" />

## The question nobody asks out loud

Every AI vendor asks you to trust *something*. Usually the choice is made for
you: trust our policies, or trust our chip vendor. Your legal team never got a
vote.

We think that's backwards. Your compliance framework has already decided what
kinds of evidence it accepts. Infrastructure should enforce that decision, not
argue with it. So the first thing you configure on zkAGI isn't a model or a
region. It's the anchor.

## The three anchors

### Silicon: trust the hardware

Inference runs inside hardware-isolated enclaves. NVIDIA confidential computing
protects the model and your data on the serving GPUs themselves, and CPU
families like Intel TDX and AWS Nitro seal the rest of the stack. The chips
sign an attestation of exactly what ran.

*Choose this when* your auditors already accept confidential computing. It's
the fastest anchor, at near-native speed.

*What has to be honest:* the hardware vendor and their firmware.

### Mathematics: trust the cryptography

Your inputs are secret-shared or encrypted **before they reach any machine**,
so no single operator ever holds anything it could reverse. Depending on the
workload that means secure multi-party computation (MPC), secret sharing, or
fully homomorphic encryption. The compiler picks what actually holds up, not
what's fashionable.

*Choose this when* you can't accept any hardware vendor inside your trust
chain. The guarantee rests on math your own team can check.

*What has to be honest:* not any single party. Operators must merely not *all*
collude. And the trusted dealer that splits your data can be **your own
device**, so the shares are created inside your walls before anything leaves.

### Hybrid: trust both, layered

Cryptographic privacy running inside attested hardware. If an enclave is ever
compromised, the math still holds. If a cryptographic assumption slips, the
silicon still isolates. Two independent layers that fail separately.

*Choose this when* the workload is one you can't afford to get wrong. Common in
healthcare, banking and legal.

## What happens after you choose

You don't assemble any of this yourself. You state the anchor (plus your tier
and perimeter), and the [Altaica compiler](/docs/platform/compiler) compiles a
serving stack that enforces it. Every call that stack serves returns a
[receipt](/docs/platform/receipts) recording which anchor was actually in
force. Same API, same receipt format, whichever anchor you choose.

:::caution Where this stands
The mathematics anchor (obfuscated and MPC serving) and receipts are the core
of our research program and run in our production environments. Confidential
hardware anchors are assembled per engagement on attested infrastructure you
or your cloud provide. Exact configurations, and which guarantees apply to
yours, are agreed in writing before go-live. See the
[Status board](/docs/trust-center/status).
:::

**Next:** [pick your altitude with tiers →](/docs/trust/tiers)
