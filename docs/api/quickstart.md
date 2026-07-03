---
id: quickstart
title: Quickstart
sidebar_position: 1
description: "If you can call OpenAI, you can call this. First private inference and first receipt in five minutes."
---

# Quickstart

<span className="zk-status zk-status--live">● Live</span>

**In one breath:** point the OpenAI SDK you already use at a new base URL,
and every response comes back wearing a receipt.

## 1. Get a key

Keys are issued through your workspace admin or [by talking to us](/contact).
If your deployment is in-perimeter, your endpoint URL is your own; the
examples below use the hosted one.

## 2. Make your first call

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://infer.zkagi.ai/v1",
    api_key="zk-...",
)

resp = client.chat.completions.create(
    model="zk-default",
    messages=[{"role": "user", "content": "Summarize this clinical note: ..."}],
    extra_body={"tier": "private"},   # foothill | private | sovereign
)
print(resp.choices[0].message.content)
```

Same shape in curl:

```bash
curl -s https://infer.zkagi.ai/v1/chat/completions \
  -H "Authorization: Bearer $ZKAGI_KEY" \
  -d '{"model":"zk-default","tier":"private","messages":[{"role":"user","content":"..."}]}'
```

## 3. Meet your receipt

Every response carries one:

```json
"receipt": {
  "trust_domain": "mathematics",
  "tier": "private",
  "egress": "none",
  "proof": "stark:0x9f3a"
}
```

Keep it. It's the [compliance artifact](/docs/platform/receipts) your future
self hands to an auditor.

## 4. Go deeper

- Ask questions of your own documents with a [proof as the key](/docs/platform/selective-disclosure)
- Turn the tier up to [sovereign](/docs/trust/tiers) for your batch workloads
- Browse the full [Zynapse API reference](/docs/api/zynapse) for proofs, media generation and key management

:::caution Where this stands
The hosted endpoint, tiers Standard and Private, and receipts are live. The
`sovereign` tier value routes to the MPC path, which is active R&D and
enabled per engagement. Endpoint names and fields shown here can evolve while
we're pre-GA; the [Status board](/docs/trust-center/status) tracks it.
:::
