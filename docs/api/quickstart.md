---
id: quickstart
title: Quickstart
sidebar_position: 1
description: "Get a zyn_ key and make your first Zynapse API call with curl, the OpenAI SDKs (Python, JS) or the Anthropic SDK. Base URL https://api.zkagi.ai/v1."
---

# Quickstart

<span className="zk-status zk-status--live">● Live</span>

**In one breath:** the Zynapse API speaks the OpenAI Chat Completions format
(and the Anthropic Messages format). Point the SDK you already use at
`https://api.zkagi.ai/v1`, use a `zyn_` key, and pick a **lane** that sets
how private the call is.

| | |
|---|---|
| Base URL (OpenAI format) | `https://api.zkagi.ai/v1` |
| Base URL (Anthropic SDKs) | `https://api.zkagi.ai` (the SDK adds `/v1/messages`) |
| Auth | `Authorization: Bearer zyn_...` (or `X-Api-Key: zyn_...`) |
| Chat | `POST /v1/chat/completions` · `POST /v1/messages` |
| Discover | `GET /v1/models` · `GET /v1/lanes` · `GET /v1/pricing` (no key needed) |

## 1. Get a key

1. Sign in to zkTerminal and open **[zkterminal.zkagi.ai/id/keys](https://zkterminal.zkagi.ai/id/keys)**.
2. Name the key and create it. The full key (`zyn_` + 64 hex characters) is
   shown **once**. Copy it into your secret store. Only a hash of it is kept,
   so it can't be shown again; if you lose it, make a new one and revoke the old one.
3. Add credit at **[zkterminal.zkagi.ai/id/credit](https://zkterminal.zkagi.ai/id/credit)**
   (card or ZKAGI token). An account needs **$10** of credit before its first call,
   and after that you pay per token at the [published prices](https://api.zkagi.ai/v1/pricing).
   With no credit, calls return `402` with a message that says so.

You can make up to 20 keys, and you revoke them on the same page. A `zyn_` key
can call models but **can't make or revoke keys**, so a key that leaks can't
be used to make more keys.

```bash
export ZYNAPSE_API_KEY="zyn_..."   # never commit this
```

## 2. First call: curl

```bash
curl -s https://api.zkagi.ai/v1/chat/completions \
  -H "Authorization: Bearer $ZYNAPSE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-5.3-flash",
    "lane": "fast",
    "messages": [{"role": "user", "content": "Say hello in five words."}]
  }'
```

If you leave out `lane`, a developer key uses the `fast` lane. If you leave out
`model`, the call goes to `glm-5.3-flash`. To run the same call in an attested
GPU TEE, set `"lane": "tee"`.

## 3. OpenAI Python SDK

```python
import os
from openai import OpenAI

client = OpenAI(base_url="https://api.zkagi.ai/v1", api_key=os.environ["ZYNAPSE_API_KEY"])

resp = client.chat.completions.create(
    model="kimi-k3",
    messages=[{"role": "user", "content": "Summarise this note: ..."}],
    extra_body={"lane": "tee"},          # or model="kimi-k3:tee", or header X-Zynapse-Lane
)
print(resp.choices[0].message.content)
print(resp.model)                        # e.g. "zynapse/kimi-k3": the model that served it
```

## 4. OpenAI JS / TypeScript SDK

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.zkagi.ai/v1",
  apiKey: process.env.ZYNAPSE_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "glm-5.3-flash:fast",           // model:lane suffix works in any client
  messages: [{ role: "user", content: "Write a haiku about receipts." }],
});
console.log(resp.choices[0].message.content);
```

## 5. Anthropic SDK (`/v1/messages`)

The Anthropic SDKs add `/v1/messages` themselves, so their base URL has **no `/v1`**.

```python
import os
import anthropic

client = anthropic.Anthropic(
    base_url="https://api.zkagi.ai",
    api_key=os.environ["ZYNAPSE_API_KEY"],      # sent as x-api-key, which the gateway accepts
)

msg = client.messages.create(
    model="kimi-k3",
    max_tokens=512,
    messages=[{"role": "user", "content": "Explain TEEs in two sentences."}],
    extra_headers={"X-Zynapse-Lane": "tee"},
)
print(msg.content[0].text)
```

`/v1/messages` runs through the same pipeline: lanes, scrubbing, tools,
images and streaming. **A Claude model id alone does not reach Claude.**
Closed models are served only on `lane=frontier`, and only for accounts that
have opted in (see [lanes](/docs/api/how-it-works#lanes)). Without that lane,
the call is served by an open model on the private lane. Check `model` in the
response to see which one.

## 6. Read what came back

Every non-streaming response has a `zynapse` object next to the usual fields:

```json
"zynapse": {
  "lane": "tee",
  "served_by": "moonshotai/kimi-k3",
  "privacy_tier": "TEE",
  "closed_model": false,
  "original_values_left_device": false,
  "sensitive_items_removed_before_send": {"EMAIL": 1},
  "receipt_id": "rcpt_3f9a...",
  "receipt_url": "https://api.zkagi.ai/r/rcpt_3f9a...",
  "cost_usd": 0.000412,
  "balance_usd": 18.73
}
```

Open `receipt_url` in a browser, or add `?format=json`. The receipt holds
amounts, counts and hashes, **never your prompt or the answer**.
[How receipts work →](/docs/api/how-it-works#receipts)

## Next

- [How the Zynapse API works](/docs/api/how-it-works): lanes, model choice, scrubbing, headers, receipts
- [Use it from chat apps, agent frameworks and coding agents](/docs/api/integrations): LibreChat, Open WebUI, Claude Code, Hermes, LangChain and others
- [Images, voice, speech and documents](/docs/api/multimodal)
- [Endpoint reference](/docs/api/zynapse)
- For AI agents: [`/llms.txt`](https://docs.zkagi.ai/llms.txt)
