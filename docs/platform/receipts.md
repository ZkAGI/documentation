---
id: receipts
title: Receipts & the Explorer
sidebar_position: 2
description: "Every inference returns a verifiable receipt: the artifact your compliance team can check without asking us anything."
---

# Receipts & the Explorer

<span className="zk-status zk-status--live">● Live</span>

**In one breath:** every call returns a receipt recording which anchor and tier
ran it, the measured privacy bound, and that no plaintext left your boundary.
Your auditor can check it without asking us anything.

<video className="zk-video" autoPlay loop muted playsInline
  src="/videos/receipt-flow.mp4" title="The life of a receipt" />

## Why a receipt

"We don't train on your data" is a policy in a PDF. A receipt is different: it
is evidence attached to the very call it describes. When the auditor asks what
happened, you don't hand them a screenshot of a log. You hand them an artifact
they can verify themselves.

## What's inside one

```json
{
  "result": { "...": "..." },
  "receipt": {
    "trust_domain": "mathematics",
    "tier": "sovereign-mpc",
    "guarantee": "information-theoretic",
    "egress": "none",
    "proof": "stark:0x9f3a"
  }
}
```

| Field | What it tells your auditor |
|---|---|
| `trust_domain` | Which anchor (silicon, math or hybrid) enforced this call |
| `tier` | Which strength of guarantee actually ran |
| `guarantee` | The privacy property in force, e.g. information-theoretic |
| `egress` | Confirmation that plaintext never crossed your boundary |
| `proof` | A STARK record anyone can verify, no vendor in the loop |

## The Explorer

The Explorer is where receipts live: a queryable trail of every inference,
built for the person who has to answer "what ran, where, under what
guarantee?" six months later. [Request access](/contact) and we'll walk your
compliance team through it.

## What a receipt can evidence

Receipts are designed to line up with the clauses your auditors actually cite:

| Framework | Where receipts help |
|---|---|
| GDPR Art. 25 | Data protection by design and by default |
| GDPR Art. 32 | Security of processing: proof of technical measures |
| HIPAA §164.312 | Technical safeguards: access control and integrity |
| EU AI Act Art. 12 | Record-keeping and traceability of inference |

:::caution The audit stays yours
This table is mapping guidance for your compliance team, not legal advice and
not a certification. zkAGI's inference service has not itself been audited or
certified against these frameworks, and compliance responsibility stays with
you. What we offer is evidence that makes your case easier to carry, and
hands-on help preparing. We assist with audit preparation; we don't conduct
audits. Full text in [Disclosures](/docs/trust-center/disclosures).
:::

**Next:** [unlock a document with a proof →](/docs/platform/selective-disclosure)
