---
id: zynapse
title: Endpoint reference
sidebar_position: 5
description: "Every public endpoint of the Zynapse gateway at https://api.zkagi.ai: chat, messages, models, lanes, pricing, receipts, attestation, audio, files and account."
---

# Endpoint reference

<span className="zk-status zk-status--live">● Live</span>

**Base:** `https://api.zkagi.ai`
**Auth:** `Authorization: Bearer zyn_...` or `X-Api-Key: zyn_...`, except
where marked *public*. Request and response bodies are JSON unless noted.
Errors use the [OpenAI error shape](/docs/api/how-it-works#errors).

## Inference

| Method | Path | Notes |
|---|---|---|
| POST | `/v1/chat/completions` | OpenAI Chat Completions. Body adds `lane` (`fast`\|`tee`\|`frontier`) and optionally `brain` (`false` to skip Company Brain passages). Supports `tools`, `tool_choice`, `stream`, `max_tokens` (default 8192) and `temperature` (default 0.2). |
| POST | `/v1/messages` | Anthropic Messages, over the same pipeline. Supports `system`, `tools`, `tool_choice`, `stream`, and image blocks with a base64 source. |

Lane: model suffix `model:lane`, then body `lane`, then header `X-Zynapse-Lane`.
The default for a developer key is `fast`. See [How it works](/docs/api/how-it-works).

## Discovery (public)

| Method | Path | Returns |
|---|---|---|
| GET | `/v1/models` | open-model ids and aliases (OpenAI list shape) |
| GET | `/v1/models/{id}` | one model; accepts `id:lane` |
| GET | `/v1/lanes` | every lane with its status, guarantee and price multiplier; frontier model ids |
| GET | `/v1/pricing` | US$ per 1M tokens for every model on every lane |
| GET | `/health` | gateway status and the models live on each lane |

## Receipts and attestation (public)

| Method | Path | Returns |
|---|---|---|
| GET | `/r/{receipt_id}` | receipt page; JSON with `?format=json` or `Accept: application/json` |
| GET | `/v1/receipts/{receipt_id}` | receipt JSON |
| GET | `/v1/tee/attestation` | the gateway's latest verified TEE attestation, including the raw report (`?fresh=true` attests again) |
| GET | `/v1/tee/sessions?model=` | the upstream TEE sessions approved to serve a model |

## Audio and files

| Method | Path | Notes |
|---|---|---|
| POST | `/v1/audio/transcriptions` | multipart `file`; `response_format=text` for plain text |
| POST | `/v1/audio/speech` | `{input, voice?, response_format?: mp3\|wav\|pcm, speed?}` |
| GET | `/v1/audio/voices` | *public*: voices, formats, limits, price |
| POST | `/v1/files/extract` | multipart `file` → `{text, pages, chars, kind, cost_usd}` |
| POST · GET · DELETE | `/v1/files`, `/v1/files/{id}` | keep a file for 24 h for zkTerminal chat tools; list; delete |

Details: [Images, voice, speech and documents](/docs/api/multimodal).

## Account

| Method | Path | Notes |
|---|---|---|
| GET | `/v1/account` | balance, keys (prefixes only), recent receipts |
| GET | `/v1/account/statement?month=YYYY-MM` | monthly statement |
| GET | `/v1/plans` | monthly plans |

**Keys** are made and revoked at
[zkterminal.zkagi.ai/id/keys](https://zkterminal.zkagi.ai/id/keys) while you
are signed in. The key routes (`GET/POST /v1/keys`, `DELETE /v1/keys/{prefix}`)
refuse a `zyn_` key, so a key can't be used to make or revoke other keys.
**Credit** is added at [zkterminal.zkagi.ai/id/credit](https://zkterminal.zkagi.ai/id/credit).

## Not on this gateway

There are no image or video generation, embeddings, Responses API or Realtime
endpoints. Older proof and media endpoints are on a separate host:
[Legacy endpoints](/docs/api/legacy).
