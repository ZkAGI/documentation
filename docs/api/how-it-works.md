---
id: how-it-works
title: How the Zynapse API works
sidebar_position: 2
description: "Lanes (fast, tee, frontier), how a model is chosen, PII scrubbing and rehydration, the zynapse response block, request headers, errors and receipts."
---

# How the Zynapse API works

<span className="zk-status zk-status--live">● Live</span>

Zynapse is a gateway at `https://api.zkagi.ai/v1`. It speaks the OpenAI Chat
Completions format (`POST /v1/chat/completions`) and the Anthropic Messages
format (`POST /v1/messages`). Both formats run the same steps on every call:

1. **Authenticate** the `zyn_` key and find its account.
2. **Pick the lane**, which decides who may see the request (see below).
3. **Scrub**: sensitive values (emails, phone numbers, card numbers and the
   like) are replaced by placeholders such as `[EMAIL_1]` *on the gateway*,
   before anything is sent to a model host.
4. **Hold** an estimate of the cost on your balance, call the model, then
   **settle** the real token cost.
5. **Rehydrate**: placeholders in the answer, and in any tool-call arguments,
   are swapped back for your real values, so you see real data.
6. **Receipt**: a content-free record of the call is stored and linked from the response.

The original values stay on the gateway; only scrubbed text goes on to the model host.

## Lanes {#lanes}

A lane is a privacy promise. Pick the lane first, then the model.

| Lane | What serves it | What is guaranteed | Price |
|---|---|---|---|
| `fast` | Open-weight models at a host bound by a **zero-data-retention** contract | Scrubbed before send; zero retention is required on every request. No hardware proof. | list price (×1.0) |
| `tee` | Open-weight models inside an **attested GPU TEE** (Phala Cloud) | Scrubbed before send; the gateway verifies the TEE's attestation, pins the upstream sessions and checks the signed response receipt. **Fails closed**: no attested session means an error, never a quiet fallback to a weaker lane. | ×1.5 |
| `frontier` | **Closed models**: Claude via the Anthropic API | **Always** scrubbed (it can't be turned off on this lane), so the provider sees placeholders, not your values. **No** zero-retention contract and **no** hardware guarantee; the provider's API terms apply. **Opt-in per account.** | provider list price + 12% |

`GET /v1/lanes` returns this table live, with each lane's current status.
`mpc` and `obfuscated` are listed there as `coming`; calling them returns
`501`. `GET /v1/pricing` gives per-model prices in US$ per million tokens.

**Frontier is opt-in.** An account that has not been enabled gets
`403 the frontier lane (closed models) is not enabled for this account`.
[Ask us](/contact) to turn it on. No other lane ever downgrades to frontier.

### Three ways to set the lane

Use whichever your client lets you set. The model suffix is checked first,
then the body field, then the header.

```text
model suffix   "model": "kimi-k3:tee"
body field     "lane": "tee"                   (OpenAI SDK: extra_body={"lane": "tee"})
header         X-Zynapse-Lane: tee
```

If you set none of them, a developer key uses `fast`.

## Which model answers {#models}

| You send | Served by |
|---|---|
| no `model` | `glm-5.3-flash` on the lane |
| an alias: `zynapse-fast` · `zynapse-balanced` · `zynapse-max` | `glm-5.3-flash` · `glm-5.3-flash` · `kimi-k3`, on the lane |
| a model id plus a lane | that model, on that lane, with the exceptions below |
| `lane=frontier` with a Claude id | exactly that Claude model. With no model, `claude-sonnet-5-5`. |

Live model ids (`GET /v1/models` lists the open ones; frontier ids are in `GET /v1/lanes`):

- **fast (zero-data-retention):** `deepseek-v4.1-flash`, `glm-5.3-flash`, `glm-5.3`, `kimi-k3`.
  Older ids that are also listed (`deepseek-v4-flash-0731`, `qwen3.8-27b`,
  `qwen3.6-35b-a3b`, `glm-5.1`, `glm-5.2`, `kimi-k2.6`) are not
  zero-retention at the host, so on `fast` they are **served by a
  zero-retention substitute** (`glm-5.3-flash`, `glm-5.3` or `kimi-k3`).
- **tee (attested):** `glm-5.3-flash`, `glm-5.3`, `kimi-k3`, `deepseek-v4-flash-0731`
  (also used for `deepseek-v4.1-flash`), `qwen3.8-27b` and `gemma-4-31b-it`
  (TEE only; asking for it on `fast` returns `400` telling you to use `lane=tee`).
  When a model has no attested session at that moment, the call moves to
  another **attested** model on the same lane. It never drops to `fast`.
- **frontier (closed, opt-in):** `claude-sonnet-5-5`, `claude-haiku-5-5`,
  `claude-opus-5-5`, `claude-fable-5-1`. `argon-4` is listed but not yet
  sold ("rate pending" in `/v1/pricing`).

**Always check what served the call.** The response's `model`
(`zynapse/<id>`) and `zynapse.served_by` name the model that actually
answered, including after a substitution or TEE fallback. On `fast` and
`tee`, an id the gateway does not recognise is served by the default model
(`glm-5.3-flash`) and does **not** return an error, so check `model`. On
`frontier`, an unknown id returns `400` with the list of frontier models.

**A closed model is never reached without `lane=frontier`.** If you send
`"model": "claude-sonnet-5-5"` with no lane, an open model on your private
lane answers.

:::note
Private deployments (a sealed router run inside a customer's own cloud,
[by arrangement](/contact)) also offer `zynapse-auto`, which picks the
cheapest model in the lane that is expected to pass the request, and they
return `400` for unknown ids on every lane. **The public gateway at
`api.zkagi.ai` does not offer `zynapse-auto` today.**
:::

## Scrubbing and rehydration {#scrubbing}

- Before the call goes out, the gateway's detectors find sensitive spans in
  every text part of every message: emails, phone numbers, national ID
  numbers, IBANs, card numbers, dates and similar. Each one becomes a typed
  placeholder (`[EMAIL_1]`, `[PHONE_1]`, ...). The same value gets the same
  placeholder throughout a request.
- The answer comes back with the placeholders replaced by the originals.
  **Tool-call arguments are rehydrated too**, so an agent can act on the real
  email address. When that history comes back in the next turn, the
  arguments are scrubbed again before they go upstream.
- Images, video and audio data are not altered; the text around them is scrubbed.
- `zynapse.sensitive_items_removed_before_send` gives counts per category
  (for example `{"EMAIL": 2}`), never the values themselves.
- An account can choose to keep some categories unscrubbed on `fast` and
  `tee`. On `frontier`, scrubbing is always on.

Scrubbing is detection. It catches the patterns it is built for. It is not a
guarantee that no sensitive text gets through, which is why `tee` exists for
data that must not be seen at all.

## The `zynapse` response block {#response}

Every non-streaming response from `/v1/chat/completions` and from
`/v1/messages` has a `zynapse` object:

| Field | Meaning |
|---|---|
| `lane` | the lane that served the call |
| `served_by`, `serving` | the model, and in plain words where it ran |
| `privacy_tier` | `ZDR`, `TEE` or `NONE` (frontier) |
| `closed_model` | `true` only on frontier |
| `original_values_left_device` | `false`: the originals stayed on the gateway |
| `third_party_saw` | frontier only: "the scrubbed prompt (placeholders, not the original values)" |
| `verified_by` | what was actually checked (for example scrub + rehydrate + attestation + signed receipt) |
| `tee` | tee only: the attestation summary, pinned sessions, `response_sha256` and the receipt verification status |
| `sensitive_items_removed_before_send` | counts per category |
| `receipt_id`, `receipt_url` | the stored receipt |
| `cost_usd`, `balance_usd` | what this call cost and what is left |

**Streaming responses carry no `zynapse` block.** Find the receipt from the
chunk `id` instead: `zyn-XXXX` maps to `rcpt_XXXX` (and `msg_XXXX` on
`/v1/messages`).

## Headers {#headers}

Request headers the gateway reads:

| Header | Effect |
|---|---|
| `Authorization: Bearer zyn_...` or `X-Api-Key: zyn_...` | auth |
| `X-Zynapse-Lane: fast\|tee\|frontier` | sets the lane |
| `X-Zynapse-Brain: off` | for an account that has a Company Brain: don't add its passages to this call (same as body `"brain": false`) |

Chat responses carry **no `x-zynapse-*` response headers**. Everything about
the call is in the `zynapse` block and the receipt. The speech endpoint is the
exception (see [Multimodal](/docs/api/multimodal#tts)).

## Receipts {#receipts}

- `GET https://api.zkagi.ai/r/{receipt_id}` shows a readable page. Add
  `?format=json`, or send `Accept: application/json`, to get JSON.
  `GET /v1/receipts/{receipt_id}` also returns JSON.
- A receipt holds the lane, the model, what was verified, category counts,
  token counts, cost and timings: **amounts, counts and hashes, never prompt
  or answer text**. Anyone who has the id can open it, so treat the id like a
  link you would share.
- On `tee`, the check of the signed response receipt runs right after the
  answer is delivered. The response says `"verified": "pending"`, and the
  stored receipt is updated with the result. Fetch it again a moment later to
  see the final status.
- `GET /v1/tee/attestation` returns the gateway's latest verified TEE
  attestation, including the raw report, so you can verify the quote yourself.

## Errors {#errors}

Errors use the OpenAI shape, so SDKs show the real reason:

```json
{"error": {"message": "the frontier lane (closed models) is not enabled for this account; use lane=fast or lane=tee, or ask zkAGI to enable it",
           "type": "permission_error", "param": null, "code": "403"},
 "detail": "..."}
```

| Status | Usual cause |
|---|---|
| 400 | bad body, a lane name that doesn't exist, a TEE-only model on `fast`, an unknown frontier model, an unsupported attachment |
| 401 | missing or invalid key |
| 402 | not enough credit (below the $10 start, or the balance can't cover the hold) |
| 403 | frontier not enabled for this account |
| 429 | rate limited; back off and retry |
| 501 | `mpc` / `obfuscated` lanes (coming) |
| 503 | the provider is unavailable, or no attested TEE session right now; retry |

During a stream, an error comes as a final `data: {"error": {...}}` frame
followed by `data: [DONE]`.
