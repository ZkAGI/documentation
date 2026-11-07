---
id: multimodal
title: Images, voice, speech and documents
sidebar_position: 4
description: "What the Zynapse gateway serves beyond text: image and video input, voice notes, speech-to-text, text-to-speech and document text extraction. Plus what it does not serve."
---

# Images, voice, speech and documents

<span className="zk-status zk-status--live">● Live</span>

This page lists exactly what `api.zkagi.ai` serves beyond text.

| Capability | Endpoint | Status |
|---|---|---|
| Image input in chat | `/v1/chat/completions`, `/v1/messages` | ● Live: fast, tee, frontier |
| Video input in chat | `/v1/chat/completions` | ● Live: **tee lane only** |
| Voice notes in chat (transcribed on the gateway) | `/v1/chat/completions` | ● Live |
| Speech-to-text | `POST /v1/audio/transcriptions` | ● Live |
| Text-to-speech | `POST /v1/audio/speech` | ● Live |
| Document text extraction (PDF, DOCX, images, text) | `POST /v1/files/extract` | ● Live |
| Image generation, video generation, embeddings | — | **Not served** by this gateway |

## Image input {#images}

Send OpenAI-style content parts. **Attachments must be inline `data:` URLs.**
A link to a hosted image is refused with `400`.

```python
import base64
img = base64.b64encode(open("receipt.png", "rb").read()).decode()

r = client.chat.completions.create(
    model="gemma-4-31b-it",
    extra_body={"lane": "tee"},
    messages=[{"role": "user", "content": [
        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{img}"}},
        {"type": "text", "text": "What is the total on this receipt?"},
    ]}],
)
```

- **Formats:** PNG, JPEG, GIF, WebP, BMP. The gateway checks the file's
  actual bytes, so an HTML or SVG file labelled as `image/png` is refused.
- **Limits:** 10 attachments per request; 10 MB per image, 20 MB per other attachment.
- **The model is chosen to match.** If the model you asked for can't read
  images, a vision model on the same lane serves the call: `glm-5.3-flash`
  on `fast` (`deepseek-v4.1-flash` and `kimi-k3` also read images there), and
  `qwen3.8-27b` on `tee` (`gemma-4-31b-it`, `kimi-k3` and `glm-5.3-flash`
  also read images there). `model` in the response says which model served it.
- On `frontier`, images go to Claude. On `/v1/messages`, send Anthropic
  `image` blocks with a `base64` source.
- The text around an image is scrubbed. The image is not altered, so
  sensitive text that appears inside the image itself reaches the model host.
  For images like that, use `tee`.
- Count roughly 1,100 prompt tokens per image when you budget.

## Video input {#video}

Send `{"type": "video_url", "video_url": {"url": "data:video/mp4;base64,..."}}`
(MP4, WebM or QuickTime) with `lane=tee`. The video-capable TEE models are
`gemma-4-31b-it`, `qwen3.8-27b` and `kimi-k3`. On other lanes, video returns
`400` asking you to switch to TEE.

## Voice notes in chat {#voice-notes}

An audio part in a chat message is transcribed **on the gateway**
(faster-whisper on CPU). Only the transcript, scrubbed like any other text,
goes to the model. The audio is never sent to a model host or written to disk.

```json
{"type": "input_audio", "input_audio": {"data": "<base64>", "format": "wav"}}
```

`{"type": "audio_url", "audio_url": {"url": "data:audio/ogg;base64,..."}}` is
accepted too. The limits are 25 MB and 5 minutes per clip. The model sees the
note as `[Voice note transcript] ...`.

## Speech-to-text {#stt}

OpenAI-compatible, multipart:

```bash
curl -s https://api.zkagi.ai/v1/audio/transcriptions \
  -H "Authorization: Bearer $ZYNAPSE_API_KEY" \
  -F file=@note.m4a
# {"text": "..."}         add -F response_format=text for plain text
```

```python
text = client.audio.transcriptions.create(model="whisper-1", file=open("note.m4a", "rb")).text
```

The `model` field is accepted but ignored: the gateway runs its own
faster-whisper. Transcription happens on the gateway and isn't billed today.
When the service is busy it returns `503` with `Retry-After: 2`.

## Text-to-speech {#tts}

OpenAI-compatible. Kokoro-82M runs on the gateway's CPU, so the text is
never sent to a provider to be spoken.

```bash
curl -s https://api.zkagi.ai/v1/audio/speech \
  -H "Authorization: Bearer $ZYNAPSE_API_KEY" -H "Content-Type: application/json" \
  -d '{"input": "Your receipt is ready.", "voice": "af_heart", "response_format": "mp3"}' \
  -o out.mp3
```

- `GET /v1/audio/voices` (no key needed) lists the voices, the aliases, the
  formats (`mp3`, `wav`, `pcm`), the maximum input (4,000 characters) and the
  price ($0.015 per 1,000 characters).
- `speed` can be from 0.5 to 2.0. `pcm` (16-bit LE mono, 24 kHz) is streamed
  sentence by sentence; `mp3` and `wav` arrive whole.
- Response headers: `X-Zynapse-Voice`, `X-Zynapse-Chars`,
  `X-Zynapse-Sample-Rate`, `X-Zynapse-Cost-USD`, plus `X-Zynapse-Seconds`
  for `mp3`/`wav`.

## Document text extraction {#files}

```bash
curl -s https://api.zkagi.ai/v1/files/extract \
  -H "Authorization: Bearer $ZYNAPSE_API_KEY" \
  -F file=@contract.pdf
# {"text": "...", "pages": 12, "chars": 48211, "kind": "pdf", "cost_usd": 0.024, "name": "contract.pdf"}
```

PDF, DOCX, images and plain text are parsed in a sandbox on the gateway, at
**$0.002 per page**. Files can be up to 20 MB, and up to 400,000 characters
of text come back. Put the text you get into a chat call; it is scrubbed like
any other message.

`POST /v1/files` keeps a file for 24 hours so zkTerminal's chat tools can read
it later. `GET /v1/files` lists your files and `DELETE /v1/files/{id}`
deletes one.

## Not served here

There is no image generation, video generation or embeddings endpoint on
`api.zkagi.ai`. Older generation endpoints on a separate host are described
in [Legacy endpoints](/docs/api/legacy); they are not part of this gateway.
