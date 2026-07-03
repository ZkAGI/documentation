---
id: introduction
title: Welcome
slug: /
sidebar_position: 1
---

# Privacy you can prove, not just promise

Some data can't leave your control. Patient records, trading signals, contracts,
the documents your legal team loses sleep over. It still needs AI.

zkAGI is infrastructure for running AI on exactly that kind of data. The idea
fits in one sentence:

> **You define the trust domain. We enforce it. Every call returns a receipt.**

Different legal teams anchor trust in different places. Some accept a chip
vendor's attestation (silicon). Some only accept cryptography (math). Many want
both. zkAGI doesn't pick for you. You choose the anchor your compliance
framework already approves, our compiler assembles the stack that enforces it,
and you get an OpenAI-compatible endpoint hosted inside a perimeter you drew.

| You decide | We enforce | You can check |
|---|---|---|
| **The anchor**: silicon, math, or both | The compiler picks the techniques that hold up for your workload | Every inference returns a verifiable receipt |
| **The tier**: Standard, Private, or Sovereign | Stronger tiers trade speed for stronger guarantees | Receipts record the tier that actually ran |
| **The perimeter**: on-prem, one region, or spread across regions | Compute physically stays inside your boundary | Receipts confirm nothing left it in the clear |

## Where to go from here

- **Deciding whether to trust us?** Start with [Trust domains](/docs/trust/trust-domains), then read the [Security model](/docs/trust-center/security-model) and the [Status board](/docs/trust-center/status). We wrote them for skeptics.
- **Building today?** Jump to the [Quickstart](/docs/api/quickstart). If you can call OpenAI, you can call this.
- **Preparing for an audit?** [Receipts](/docs/platform/receipts) explains the compliance artifact. We help you prepare, though the audit stays yours.
- **Curious how a model gets split for privacy?** [The Altaica compiler](/docs/platform/compiler) is the most fun page in here.

## Two honest things before you read on

**First: some of this is live, some is active R&D.** We're a research lab as
much as a product company. Every page in these docs carries a status pill:

<p>
  <span className="zk-status zk-status--live">● Live</span>&nbsp;&nbsp;
  <span className="zk-status zk-status--rnd">◐ Active R&D</span>&nbsp;&nbsp;
  <span className="zk-status zk-status--engagement">◇ Configured per engagement</span>
</p>

If a page says R&D, believe it. The [Status board](/docs/trust-center/status)
is the single source of truth, and before you commit to anything we'll tell you
plainly which pieces are ready for your use case.

**Second: your audit stays your audit.** zkAGI is not an audit firm and our
inference service is not itself certified against HIPAA, GDPR or the EU AI Act.
Compliance responsibility stays with you. Our receipts and documentation exist
to make that job easier, and we'll help you prepare. The
[Disclosures](/docs/trust-center/disclosures) page says all of this properly.

:::info Nothing here is legal advice
These docs describe technology, not legal guarantees. Specific commitments,
availability and service levels live in your agreement with zkAGI, and that
agreement is what governs.
:::

## A note of thanks

zkAGI has been built in the open since 2019, and it exists because a community
of node runners, contributors, agent builders and early believers kept showing
up: through pivots, through bear markets, through the long unglamorous middle
of research. If you ran a GPU, filed an issue, built an agent, or just told a
friend about us: thank you. Truly. This chapter of the work is quieter and more
institutional, but it stands on everything you helped prove. The door is always
open in [our community channels](/contact).
