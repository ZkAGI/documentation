---
id: security-model
title: Security model
sidebar_position: 2
description: "The assumptions we make, stated plainly, because a guarantee is only as good as the assumptions under it."
---

# Security model

**In one breath:** every privacy guarantee stands on assumptions. Here are
ours, stated plainly, because your security team will ask and they deserve a
straight answer.

## What we assume, per anchor

### Mathematics (MPC / secret sharing)

- **Non-collusion.** Shares of your data go to operator-disjoint nodes. The
  guarantee is information-theoretic *provided the operators don't all
  conspire*. This is the standard MPC assumption, and we strengthen it by
  placing operators in different organizations and jurisdictions.
- **The dealer.** Someone has to split the data into shares. That role can run
  on **your own device**, so shares are created inside your walls. If you let
  a server deal instead, that server momentarily holds the input, and your
  threat model should account for it. We default to client-side dealing where
  the workload allows.
- **Masking is not magic.** Lightweight masked serving (our Private tier) has
  measured, non-zero recovery bounds, and a serving node that knows exactly
  which model it runs can in principle attack a masking. That's why bounds are
  benchmarked and published per deployment, and why higher-sensitivity work
  belongs at the Sovereign tier.

### Silicon (confidential computing)

- **The vendor's root of trust.** Enclave guarantees (NVIDIA confidential
  computing on GPUs, Intel TDX, AWS Nitro) rest on the hardware vendor's
  silicon, microcode and attestation service. If your framework can't accept
  a hardware vendor in the trust chain, use the mathematics anchor.
- **Side channels exist.** Confidential computing narrows the attack surface;
  it doesn't abolish physics. We treat enclaves as a strong layer, best used
  hybrid.

### Both anchors

- **Receipts prove computation, not intent.** A STARK receipt proves the
  declared computation ran correctly on the declared configuration. It cannot
  prove that no other copy of unencrypted data existed somewhere it was never
  supposed to be. Perimeter and anchor choices are what prevent that; the
  receipt is what evidences them.
- **Keys and clients.** If your API key leaks or the client machine that
  generates proofs is compromised, cryptography downstream can't save you.
  Standard key hygiene applies; rotation is built into the API.

## What we deliberately don't claim

- We don't claim "100% privacy" as a blanket. We state which property holds
  (e.g. information-theoretic under non-collusion) and where it applies.
- We don't claim certifications we don't hold. See
  [Disclosures](/docs/trust-center/disclosures).
- We don't claim the platform is finished. See the
  [Status board](/docs/trust-center/status).

## Peaceful use, in writing

zkAGI is built for peaceful, civilian use: business productivity in regulated
industries such as healthcare, banking and legal. We don't take defense or
other dual-use work. If that costs us a deal, so be it.

:::info Found something?
If you believe you've found a vulnerability, [contact us](/contact) with
"SECURITY" in the subject and we'll respond fast. We're grateful to everyone
who kicks the tires.
:::
