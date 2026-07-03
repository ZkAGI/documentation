---
id: selective-disclosure
title: "Selective disclosure: proof-unlocked documents"
sidebar_position: 3
description: "Upload a document, generate a zero-knowledge proof client-side, and use that proof as the key to a private reading session: selective disclosure over your own data."
---

# Selective disclosure: proof-unlocked documents

<span className="zk-status zk-status--live">● Live on Zynapse</span>

**In one breath:** you upload a document, a zero-knowledge proof is generated
on the client side, and that proof becomes the key that unlocks a reading
session over that exact data. You choose what gets disclosed. Nothing else
exists, as far as the session is concerned.

<video className="zk-video" autoPlay loop muted playsInline
  src="/videos/doc-unlock.mp4" title="A proof unlocking a private reading session" />

## The idea, with a filing cabinet

Imagine a filing cabinet that doesn't have a lock. Instead, it has a rule: it
will only open for someone who can *prove* they already hold the document
inside, without showing the document to anyone on the way. And when it opens,
it doesn't hand over the whole drawer. It answers exactly the question asked,
and nothing more.

That's the mechanism:

1. **Client-side proof.** Your document never leaves in the clear. A
   zero-knowledge proof of it is generated where the document lives: on your
   machine.
2. **The proof is the key.** That proof file, not a password, not a cookie, is
   what opens a reading session bound to that specific data. No proof, no
   session. Wrong document, no session.
3. **Selective disclosure.** Within the session you ask questions, and the
   session answers from the proven document. What's disclosed is what you ask
   for. The raw document is never on the table.

## Two calls, that's the whole API

```bash
# 1. generate the proof from your document (the key)
curl -s -X POST "https://zynapse.zkagi.ai/v1/generate_proof" \
  -H "X-API-Key: <YOUR_KEY>" \
  -F "file=@contract.pdf" -o proof.json

# 2. use the proof to unlock a Q&A session on that data
curl -s -X POST "https://zynapse.zkagi.ai/v1/ask" \
  -H "X-API-Key: <YOUR_KEY>" \
  -F "query=What are the termination clauses?" \
  -F "proof_file=@proof.json;filename=proof.json;type=application/json"
```

Full parameters, error codes and SDK snippets are in the
[Zynapse API reference](/docs/api/zynapse).

## Now couple it with the Sovereign tier

Selective disclosure controls *what* is revealed. The
[Sovereign tier](/docs/trust/tiers) controls *who could possibly see it while
computing*. Put them together and you get something genuinely rare: **private
introspection over documents.**

The proof unlocks the session, and the session's inference itself runs as MPC:
split across operators who each hold meaningless fragments, with the dealer
role runnable on your own device. So you can interrogate a portfolio of
contracts, a clinical file, a diligence data room, and at no point does any
single machine, operator, or company (including us) hold both the question and
the document in readable form. The answer arrives with a
[receipt](/docs/platform/receipts) proving how it was computed.

Ask your hardest questions of your most sensitive documents, and the
infrastructure is built so that nobody, us included, gets to listen in.

## Seen in the wild

Our [heart-health case study](/docs/platform/heart-health-case) uses the same
selective-disclosure principle in miniature: a Groth16 proof shows a private
heart-risk score meets a policy threshold, and the verifier learns a YES/NO
and nothing else. Same philosophy, clinical setting.

:::caution Where this stands
Proof-unlocked document Q&A (`/v1/generate_proof` + `/v1/ask`) is live on
Zynapse today. Running that session end-to-end under the Sovereign MPC tier is
active R&D and deployed per engagement; the coupling described above is the
architecture we build toward, and what applies to your deployment is agreed in
writing. See the [Status board](/docs/trust-center/status).
:::
