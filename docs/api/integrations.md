---
id: integrations
title: Chat apps, agents and coding agents
sidebar_position: 3
description: "Connect LibreChat, Open WebUI, Claude Code, the Claude Agent SDK, Hermes Agent, the OpenAI Agents SDK, LangChain, the Vercel AI SDK, aider and Cline to Zynapse. Includes tool calling and streaming."
---

# Chat apps, agents and coding agents

<span className="zk-status zk-status--live">● Live</span>

Any client that lets you set an **OpenAI-compatible base URL** works with
Zynapse. So does any client that lets you set an **Anthropic base URL**.

| You need | Value |
|---|---|
| OpenAI-compatible base URL | `https://api.zkagi.ai/v1` |
| Anthropic base URL | `https://api.zkagi.ai` |
| API key | your `zyn_...` key ([get one](/docs/api/quickstart#1-get-a-key)) |
| Model | an id such as `glm-5.3-flash`, `kimi-k3` or `gemma-4-31b-it` |
| Lane | `fast` (the default for a key), `tee` or `frontier` (opt-in) |

**If your client can't send a custom body field or header, put the lane in
the model id:** `kimi-k3:tee`, `glm-5.3-flash:fast`, `claude-sonnet-5-5:frontier`.
Every client can send a model id.

Only Chat Completions (`/v1/chat/completions`) and Messages (`/v1/messages`)
are served. Clients that **only** speak the OpenAI Responses API
(`/v1/responses`) or the Realtime API won't work. Point them at Chat
Completions if they have the option.

## Chat apps

### LibreChat

Add a custom endpoint to `librechat.yaml` and put the key in LibreChat's `.env`:

```yaml
endpoints:
  custom:
    - name: "Zynapse"
      apiKey: "${ZYNAPSE_API_KEY}"
      baseURL: "https://api.zkagi.ai/v1"
      models:
        default: ["glm-5.3-flash:fast", "kimi-k3:fast", "kimi-k3:tee", "gemma-4-31b-it:tee"]
        fetch: false            # /v1/models lists ids without lanes; list the ones you want
      titleConvo: true
      titleModel: "glm-5.3-flash:fast"
      modelDisplayLabel: "Zynapse"
```

LibreChat's text-to-speech and speech-to-text can also point at Zynapse's
OpenAI-compatible [`/v1/audio/speech` and `/v1/audio/transcriptions`](/docs/api/multimodal).

### Open WebUI

**Admin Settings → Connections → OpenAI API → +**

- URL: `https://api.zkagi.ai/v1`
- Key: your `zyn_` key
- Model IDs: leave the list empty to use `/v1/models`, which shows the open
  models on the `fast` lane. To use `tee`, add ids with the suffix, such as `kimi-k3:tee`.

### Any other OpenAI-compatible app

TypingMind, Chatbox, Msty, Jan, and the "OpenAI-compatible" or "custom
provider" setting in other apps all take the same three values: base URL
`https://api.zkagi.ai/v1`, your key, and a model id (with `:lane` if you
want a lane other than `fast`).

## Coding agents

### Claude Code

Claude Code speaks the Anthropic Messages API, so point it at the gateway's
`/v1/messages`. Set the lane with a header and name the model explicitly.
Claude Code's own model names are only served on `frontier`.

**Private (open model in an attested TEE):**

```bash
export ANTHROPIC_BASE_URL="https://api.zkagi.ai"
export ANTHROPIC_AUTH_TOKEN="$ZYNAPSE_API_KEY"         # sent as Authorization: Bearer
export ANTHROPIC_CUSTOM_HEADERS="X-Zynapse-Lane: tee"
export ANTHROPIC_MODEL="kimi-k3"
export ANTHROPIC_DEFAULT_SONNET_MODEL="kimi-k3"
export ANTHROPIC_DEFAULT_OPUS_MODEL="kimi-k3"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm-5.3-flash"   # background/small tasks
claude
```

**Claude, scrubbed (needs frontier enabled on your account):**

```bash
export ANTHROPIC_BASE_URL="https://api.zkagi.ai"
export ANTHROPIC_AUTH_TOKEN="$ZYNAPSE_API_KEY"
export ANTHROPIC_CUSTOM_HEADERS="X-Zynapse-Lane: frontier"
export ANTHROPIC_MODEL="claude-sonnet-5-5"
export ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-5-5"
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-5-5"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-5-5"
claude
```

On `frontier`, Claude sees your code with sensitive values replaced by
placeholders, and the answer is rehydrated. Placeholders cover patterns
such as emails, phone numbers and card numbers, not source code in general.
For code that must not leave your control at all, use `tee`.

The same variables work for the **Claude Agent SDK**. Only `POST /v1/messages`
is implemented; other Anthropic paths (token counting, batches, files)
return `404`.

### Hermes Agent

In Hermes's `config.yaml`, use a custom OpenAI-compatible provider:

```yaml
model:
  provider: custom
  base_url: https://api.zkagi.ai/v1
  default: kimi-k3:tee
  api_key: zyn_...        # keep this file out of version control
```

### aider, Cline, Roo Code, Continue, opencode and other OpenAI-compatible agents

Choose the "OpenAI Compatible" provider, then set the base URL to
`https://api.zkagi.ai/v1`, the key, and a model id with its lane. For aider:

```bash
export OPENAI_API_BASE="https://api.zkagi.ai/v1"
export OPENAI_API_KEY="$ZYNAPSE_API_KEY"
aider --model openai/kimi-k3:tee
```

For agentic coding, `kimi-k3` is the strongest open model offered, and
`glm-5.3-flash` is the fastest and cheapest.

## Agent frameworks

### OpenAI Agents SDK (Python)

Use Chat Completions. Turn tracing off, or it will try to send traces to OpenAI.

```python
import os
from openai import AsyncOpenAI
from agents import (Agent, Runner, set_default_openai_api,
                    set_default_openai_client, set_tracing_disabled)

set_default_openai_client(AsyncOpenAI(base_url="https://api.zkagi.ai/v1",
                                      api_key=os.environ["ZYNAPSE_API_KEY"]),
                          use_for_tracing=False)
set_default_openai_api("chat_completions")
set_tracing_disabled(True)

agent = Agent(name="assistant", instructions="Be brief.", model="kimi-k3:tee")
print(Runner.run_sync(agent, "What is a TEE?").final_output)
```

### LangChain

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="kimi-k3", base_url="https://api.zkagi.ai/v1",
                 api_key=os.environ["ZYNAPSE_API_KEY"], extra_body={"lane": "tee"})
```

### Vercel AI SDK

```ts
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";

const zynapse = createOpenAICompatible({
  name: "zynapse",
  baseURL: "https://api.zkagi.ai/v1",
  apiKey: process.env.ZYNAPSE_API_KEY,
});
const { text } = await generateText({ model: zynapse("glm-5.3-flash:fast"), prompt: "Hi" });
```

### LlamaIndex

```python
from llama_index.llms.openai_like import OpenAILike

llm = OpenAILike(model="kimi-k3:tee", api_base="https://api.zkagi.ai/v1",
                 api_key=os.environ["ZYNAPSE_API_KEY"],
                 is_chat_model=True, is_function_calling_model=True)
```

## Tool calling

OpenAI `tools` / `tool_choice` and Anthropic `tools` / `tool_use` /
`tool_result` both work on every lane. Arguments are rehydrated before you
receive them, and scrubbed again when your history comes back.

```python
tools = [{"type": "function", "function": {
    "name": "get_weather",
    "description": "Current weather for a city",
    "parameters": {"type": "object", "properties": {"city": {"type": "string"}},
                   "required": ["city"]}}}]

r = client.chat.completions.create(model="kimi-k3", tools=tools,
        messages=[{"role": "user", "content": "Weather in Zurich?"}],
        extra_body={"lane": "tee"})
call = r.choices[0].message.tool_calls[0]
# run the tool, then send back {"role": "tool", "tool_call_id": call.id, "content": "..."}
```

On `tee`, if the requested model has no attested session at that moment, a
call that carries tools moves to another attested model **that calls tools
reliably** (`kimi-k3`, `deepseek-v4-flash-0731`, `gemma-4-31b-it`).

## Streaming

Set `"stream": true`. Responses are standard Server-Sent Events.

```python
stream = client.chat.completions.create(model="glm-5.3-flash", stream=True,
            messages=[{"role": "user", "content": "Count to five."}])
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

- Deltas, including tool-call deltas, are relayed as the model produces them.
- While the model is thinking, an **empty-delta chunk** is sent about every
  5 seconds so proxies and client timeouts don't drop the connection.
  Standard SDKs ignore these chunks.
- The last chunk carries `finish_reason` and `usage`. Then comes `data: [DONE]`.
- On `/v1/messages`, the stream is Anthropic-style: `message_start`,
  `content_block_*`, `message_delta`, `message_stop`, with `ping` events as
  the heartbeat.
- Streamed responses have no `zynapse` block. The chunk `id` `zyn-XXXX` maps
  to receipt `rcpt_XXXX`.
- If you close the connection, the model call stops. You are billed for the
  input plus what was already streamed to you.
