---
id: zkterminal-prompt-commands
title: Prompt Commands
slug: /getting-started/zkterminal/prompt-commands
sidebar_position: 1
---

import Head from '@docusaurus/Head';

## How do I create an agent in ZkTerminal? {#how-do-i-create-an-agent-in-zkterminal}

<p className="snippet-answer">Use the `/create-agent` command followed by an image description to generate a unique meme image that becomes the foundation for your agent's meme coin name and description. Image generation typically takes less than 5 minutes.</p>

**Command:** `/create-agent`

```bash
/create-agent [details for image generation]
```

- **Image Description**: Provide specific instructions or themes for the meme image to be generated
- Image generation typically takes **< 5 minutes**
- After generation, you can:
  - **Download ZKProof**: Click **Download Proof** to obtain a cryptographic proof of the image
  - **Launch Agent**: Click **Launch Agent** to proceed with creating the agent

---

## How do I configure an agent's character JSON in ZkTerminal? {#how-do-i-configure-an-agents-character-json-in-zkterminal}

<p className="snippet-answer">Use the `/character-json` command to generate and manage a JSON configuration for your selected agent using training data and the agent's image. The command includes an edit mode where all interactions are captured as additional training data.</p>

**Command:** `/character-json`

```bash
/character-json
```

**Process:**

1. **Ticker Selection** — Ensure an agent/ticker is selected using `/select`; if none selected, the system prompts you to run `/select`
2. **JSON Generation** — Generates a JSON file for the selected agent using training data + image
3. **Edit Mode Activation** — Enter edit mode to modify the generated JSON; all prompts and responses during edit mode are captured as future training data
4. **Exit Edit Mode** — When edit mode is turned off, the updated JSON is displayed
5. **User Actions** — **Confirm** to finalize the JSON configuration, or **Keep Editing** to re-enter edit mode
6. **Confirmation & Storage** — On confirmation, the JSON is stored securely; after a few minutes, the system begins triggering tweets based on the configured Twitter handle and credentials

**Key details:**

- **Mandatory**: A ticker must be selected (`/select`) before using `/character-json`
- **Edit Mode Benefits**: Iteratively improves the agent using your interactions
- **Twitter Credentials**: Ensure tokens are set via `/token` to enable automated tweeting
- **Dynamic Behavior**: JSON can be tuned to align agent behavior with desired functionality

**Example Workflow:**

1. Select an agent:
   ```bash
   /select
   ```
   Choose the desired agent from the displayed table.

2. Generate the character JSON:
   ```bash
   /character-json
   ```
   If no agent is selected, you will be prompted to run `/select`.

3. (Optional) Enter edit mode and modify the JSON; your interactions are stored as training data.

4. After exiting edit mode, either **Confirm** the JSON or continue editing.

5. On confirmation, JSON is stored and tweeting begins (if `/token` is configured).

---

## How do I launch an agent on pump.fun using ZkTerminal? {#how-do-i-launch-an-agent-on-pumpfun-using-zkterminal}

<p className="snippet-answer">Use the `/launch` command to launch your locally created meme coin agent on pump.fun. The agent must first be created via `/create-agent` and selected via `/select`.</p>

**Command:** `/launch`

```bash
/launch
```

- **Prerequisites**: The agent must have been created locally via `/create-agent` and selected via `/select`
- If no agent is selected, run `/select` first
- Launch flow displays a table with a **launch link** or allows you to enter a **coin ID**

---

## How do I select an agent in ZkTerminal? {#how-do-i-select-an-agent-in-zkterminal}

<p className="snippet-answer">Use the `/select` command to choose an existing meme coin agent for subsequent operations like launching, tweeting, and configuration. The command displays a table of available agents from which you select by ID.</p>

**Command:** `/select`

```bash
/select
```

- Displays a table of available agents
- Locate the desired agent and note its **ID**
- Enter the agent's ID when prompted to select it
- The selected agent appears in the header for quick reference
- Always verify the selected agent to avoid acting on the wrong coin

---

## How do I generate tweets for my agent in ZkTerminal? {#how-do-i-generate-tweets-for-my-agent-in-zkterminal}

<p className="snippet-answer">Use the `/generate` command followed by the number of tweets you want to create for the currently selected agent. Generation time scales with the number of tweets requested.</p>

**Command:** `/generate`

```bash
/generate [number_of_tweets]
```

**Example:**

```bash
/generate 5
```

- Ensure an agent is selected (`/select`) before generating
- Provide the number of tweets to generate
- Wait a few minutes; generated tweets appear in a table
- Generation time scales with the requested number of tweets

---

## How do I save generated tweets in ZkTerminal? {#how-do-i-save-generated-tweets-in-zkterminal}

<p className="snippet-answer">Use `/save` to save a single generated tweet by its ID, or `/saves` to save multiple tweets at once by providing a comma-separated list of IDs. Saved tweets can later be posted with `/post`, `/tweet`, or `/tweets`.</p>

**Commands:** `/save` and `/saves`

**Save a single tweet:**

```bash
/save [tweet_id]
```

**Example:**

```bash
/save 3
```

**Save multiple tweets:**

```bash
/saves [id1,id2,id3,...]
```

**Example:**

```bash
/saves 1,3,4,7
```

- After `/generate`, note tweet IDs from the table
- Use `/save` for one tweet, or `/saves` for multiple
- Saved tweets can later be posted with `/post`, `/tweet`, or `/tweets`

---

## How do I view saved tweets in ZkTerminal? {#how-do-i-view-saved-tweets-in-zkterminal}

<p className="snippet-answer">Use the `/post` command to display a list of saved tweets that are ready to be posted. From this list you can choose to post individual or multiple tweets.</p>

**Command:** `/post`

```bash
/post
```

- Ensure the desired agent is selected
- Running `/post` shows a table of saved tweets
- Choose to post individual or multiple tweets from the list
- Make sure your **Twitter tokens** are set via `/token` before posting

---

## How do I post tweets from ZkTerminal? {#how-do-i-post-tweets-from-zkterminal}

<p className="snippet-answer">Use `/tweet` to post a single saved tweet by its ID, or `/tweets` to post multiple saved tweets at once using a comma-separated list of IDs. Twitter access tokens must be configured via `/token` before posting.</p>

**Commands:** `/tweet` and `/tweets`

**Post a single tweet:**

```bash
/tweet [tweet_id]
```

**Example:**

```bash
/tweet 2
```

**Post multiple tweets:**

```bash
/tweets [id1,id2,id3,...]
```

**Example:**

```bash
/tweets 1,4,5
```

- Use `/post` to view saved tweets and note their IDs
- Execute `/tweet` or `/tweets` to post them
- Requires Twitter access token/key configured via `/token`

---

## How do I set up Twitter tokens in ZkTerminal? {#how-do-i-set-up-twitter-tokens-in-zkterminal}

<p className="snippet-answer">Use the `/token` command to open a credential form where you enter your Twitter Access Token and Access Key. These tokens are required for all tweet-posting commands including `/post`, `/tweet`, and `/tweets`.</p>

**Command:** `/token`

```bash
/token
```

- Run `/token` to open the credential form
- Enter your **Twitter Access Token** and **Access Key**
- Submit to save the tokens securely
- Tokens are required for `/post`, `/tweet`, `/tweets`
- Keep your tokens confidential

---

## How do I generate images in ZkTerminal? {#how-do-i-generate-images-in-zkterminal}

<p className="snippet-answer">Use the `/image gen` command followed by a detailed text description to generate images from text. Generated images can enrich your agent's brand and content.</p>

**Command:** `/image gen`

```bash
/image gen [image_description]
```

**Example:**

```bash
/image gen A funny cat wearing sunglasses
```

- Enter a detailed description of the image you want
- The system generates an image matching your prompt
- Generated images can enrich your agent's brand and content

---

## How do I generate user content (UGC) in ZkTerminal? {#how-do-i-generate-user-content-ugc-in-zkterminal}

<p className="snippet-answer">Use the `/ugc` command with a character name and a prompt to generate personalized user-generated content featuring selected characters. No prerequisites are needed — it can be used directly for engagement and storytelling.</p>

**Command:** `/ugc`

```bash
/ugc [character] [prompt]
```

**Example:**

```bash
/ugc Landwolf leads an adventurous quest through the enchanted forest
```

- **Initiate**: Enter `/ugc` in chat
- **Select Character**: e.g., *Landwolf*, *Ponke*
- **Enter Prompt**: Describe what you want the character to do/be
- **Generate**: Content is created featuring the selected character
- **No prerequisites** — can be used directly
- **Versatile** — useful for engagement and storytelling around your agent
- **Customizable** — supports a wide range of creative prompts

---

## Related Questions

- [How do I connect with ZkTerminal?](/docs/getting-started/zkterminal/authentication#how-do-i-connect-with-zkterminal)
- [How do I get started with ZkTerminal?](/docs/getting-started#how-do-i-get-started-with-zkterminal)
- [How does ZkAGI handle healthcare use cases?](/docs/Agents/healthcare#what-is-zk-heart-health)

<Head>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I create an agent in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /create-agent command followed by an image description to generate a unique meme image that becomes the foundation for your agent's meme coin name and description. Image generation typically takes less than 5 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I configure an agent's character JSON in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /character-json command to generate and manage a JSON configuration for your selected agent using training data and the agent's image. The command includes an edit mode where all interactions are captured as additional training data."
        }
      },
      {
        "@type": "Question",
        "name": "How do I launch an agent on pump.fun using ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /launch command to launch your locally created meme coin agent on pump.fun. The agent must first be created via /create-agent and selected via /select."
        }
      },
      {
        "@type": "Question",
        "name": "How do I select an agent in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /select command to choose an existing meme coin agent for subsequent operations like launching, tweeting, and configuration. The command displays a table of available agents from which you select by ID."
        }
      },
      {
        "@type": "Question",
        "name": "How do I generate tweets for my agent in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /generate command followed by the number of tweets you want to create for the currently selected agent. Generation time scales with the number of tweets requested."
        }
      },
      {
        "@type": "Question",
        "name": "How do I save generated tweets in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use /save to save a single generated tweet by its ID, or /saves to save multiple tweets at once by providing a comma-separated list of IDs. Saved tweets can later be posted with /post, /tweet, or /tweets."
        }
      },
      {
        "@type": "Question",
        "name": "How do I view saved tweets in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /post command to display a list of saved tweets that are ready to be posted. From this list you can choose to post individual or multiple tweets."
        }
      },
      {
        "@type": "Question",
        "name": "How do I post tweets from ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use /tweet to post a single saved tweet by its ID, or /tweets to post multiple saved tweets at once using a comma-separated list of IDs. Twitter access tokens must be configured via /token before posting."
        }
      },
      {
        "@type": "Question",
        "name": "How do I set up Twitter tokens in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /token command to open a credential form where you enter your Twitter Access Token and Access Key. These tokens are required for all tweet-posting commands including /post, /tweet, and /tweets."
        }
      },
      {
        "@type": "Question",
        "name": "How do I generate images in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /image gen command followed by a detailed text description to generate images from text. Generated images can enrich your agent's brand and content."
        }
      },
      {
        "@type": "Question",
        "name": "How do I generate user content (UGC) in ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the /ugc command with a character name and a prompt to generate personalized user-generated content featuring selected characters. No prerequisites are needed — it can be used directly for engagement and storytelling."
        }
      }
    ]
  })}
  </script>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "ZkTerminal Prompt Commands",
    "proficiencyLevel": "Advanced",
    "about": { "@type": "SoftwareApplication", "name": "ZkAGI" },
    "dateModified": "2026-03-11"
  })}
  </script>
</Head>
