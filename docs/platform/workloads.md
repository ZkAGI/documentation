---
id: workloads
title: Workloads you can run
sidebar_position: 4
description: "Private inference, confidential-hardware inference, federated learning, and in-perimeter training. The compiler picks the technique, you keep the SDK."
---

# Workloads you can run

<span className="zk-status zk-status--engagement">◇ Mix varies · see status board</span>

**In one breath:** inference is only part of the story. The same trust domain
you defined wraps training and federated learning too, so the whole model
lifecycle stays inside your rules.

## Private inference

<span className="zk-status zk-status--live">● Live</span>

The workhorse. The compiler matches the technique to how sensitive the data
is: masked, secret-shared, or fully homomorphic. The strongest option never
decrypts your inputs at all, anywhere. One key, four modalities: vision,
voice, text and time-series.

## Confidential-hardware inference

<span className="zk-status zk-status--engagement">◇ Per engagement</span>

Models served inside attested enclaves, with NVIDIA confidential computing on
the GPUs doing the serving. Near-native speed and chip-signed evidence, for
teams whose auditors already accept confidential computing.

## Federated learning

<span className="zk-status zk-status--rnd">◐ Active R&D</span>

Train one model across hospitals, branches or borders **without the data ever
pooling**. Each site keeps its records where they are; only the learning
moves. This is how a network of clinics gets a model none of them could train
alone, without any of them handing over a single patient record.

## Private training & fine-tuning

<span className="zk-status zk-status--rnd">◐ Active R&D</span>

Bring the model to your corpus instead of the other way around. Fine-tune on
proprietary data inside the perimeter you defined, receipts included.

## You don't pick the technique. You pick the outcome.

It bears repeating: you never have to become an expert in MPC versus FHE
versus federated averaging. You tell the [compiler](/docs/platform/compiler)
what the data is, where it may live, and what your auditors accept. It picks
what holds up, and gives your engineers the same OpenAI-compatible endpoint
either way.

:::caution Where this stands
Private inference on Standard and Private tiers serves production traffic.
Confidential-hardware serving is assembled per engagement on attested
infrastructure. Federated learning and in-perimeter training are active R&D,
run with design partners. The [Status board](/docs/trust-center/status) is the
source of truth; your agreement defines what applies to you.
:::
