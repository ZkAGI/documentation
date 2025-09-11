---
id: zkterminal-prompt-commands
title: Prompt Commands
slug: /getting-started/zkterminal/prompt-commands
sidebar_position: 1
---

# Prompt Commands

This page documents the available **ZkTerminal / ZkSurfer AI** chat commands and how to use them.

---

## `/create-agent`

**Description**  
Initiates creation of an agent by generating a unique meme image. This image becomes the foundation for generating the meme coin’s **name** and **description**.

**Usage**
```bash
/create-agent [details for image generation]
```

**Details required**
- **Image Description**: Provide specific instructions or themes for the meme image to be generated.

**Notes**
- Image generation typically takes **< 5 minutes**.
- After generation, you can:
  - **Download ZKProof**: Click **Download Proof** to obtain a cryptographic proof of the image.
  - **Launch Agent**: Click **Launch Agent** to proceed with creating the agent.

---

## `/character-json`

**Description**  
Generates and manages a **JSON configuration** for the selected agent using training data and the agent’s image. Also supports an **edit mode** to modify the JSON; interactions during edit mode are captured as additional training data.

**Usage**
```bash
/character-json
```

**Process**
1. **Ticker Selection**
   - **Prerequisite**: Ensure an agent/ticker is selected using `/select`.
   - **If none selected**: The system prompts you to run `/select`.
2. **JSON Generation**
   - Generates a JSON file for the selected agent using training data + image.
3. **Edit Mode Activation**
   - Enter edit mode to modify the generated JSON.
   - **While in edit mode**: All prompts and responses are captured as future training data.
4. **Exit Edit Mode**
   - When edit mode is turned off, the updated JSON is displayed.
5. **User Actions**
   - **Confirm**: Finalize the JSON configuration.
   - **Keep Editing**: Re-enter edit mode for more changes.
6. **Confirmation & Storage**
   - On confirmation, the JSON is stored securely.
   - **Automated Tweets**: After a few minutes, the system begins triggering tweets based on the configured Twitter handle and credentials.

**Notes**
- **Mandatory**: A ticker must be selected (`/select`) before using `/character-json`.
- **Edit Mode Benefits**: Iteratively improves the agent using your interactions.
- **Twitter Credentials**: Ensure tokens are set via `/token` to enable automated tweeting.
- **Dynamic Behavior**: JSON can be tuned to align agent behavior with desired functionality.

**Example Workflow**
1. **Select an agent**
   ```bash
   /select
   ```
   Choose the desired agent from the displayed table.

2. **Generate the character JSON**
   ```bash
   /character-json
   ```
   If no agent is selected, you’ll be prompted to run `/select`.

3. **(Optional) Edit Mode**
   - Modify the JSON; your interactions are stored as training data.

4. **Confirm or Keep Editing**
   - After exiting edit mode, either **Confirm** the JSON or continue editing.

5. **Finalize & Trigger Tweets**
   - On confirmation, JSON is stored and tweeting begins (if `/token` is configured).

---

## `/launch`

**Description**  
Launches the locally created meme coin agent on **pump.fun**.

**Usage**
```bash
/launch
```

**Prerequisites**
- The agent must have been created locally via `/create-agent`.
- An agent must be selected via `/select`.

**Notes**
- If no agent is selected, run `/select`.
- Launch flow displays a table with a **launch link** or allows you to enter a **coin ID**.

---

## `/select`

**Description**  
Selects an existing meme coin agent for subsequent operations (launching, tweeting, etc.).

**Usage**
```bash
/select
```

**Process**
1. Displays a table of available agents.
2. Locate the desired agent and note its **ID**.
3. Enter the agent’s ID when prompted to select it.
4. The selected agent appears in the header for quick reference.

**Notes**
- Always verify the selected agent to avoid acting on the wrong coin.

---

## `/generate`

**Description**  
Generates a specified number of tweets for the **selected** agent.

**Usage**
```bash
/generate [number_of_tweets]
```

**Example**
```bash
/generate 5
```

**Process**
1. Ensure an agent is selected (`/select`).
2. Provide the number of tweets to generate.
3. Wait a few minutes; generated tweets appear in a table.

**Notes**
- Generation time scales with the requested number of tweets.

---

## `/save` & `/saves`

**Description**  
Saves generated tweets for future posting.

**Usage — single tweet**
```bash
/save [tweet_id]
```

**Example**
```bash
/save 3
```

**Usage — multiple tweets**
```bash
/saves [id1,id2,id3,...]
```

**Example**
```bash
/saves 1,3,4,7
```

**Process**
1. After `/generate`, note tweet IDs from the table.
2. Use `/save` for one tweet, or `/saves` for multiple.

**Notes**
- Saved tweets can later be posted with `/post`, `/tweet`, or `/tweets`.

---

## `/post`

**Description**  
Displays a list of **saved** tweets ready to be posted.

**Usage**
```bash
/post
```

**Process**
1. Ensure the desired agent is selected.
2. Running `/post` shows a table of saved tweets.
3. Choose to post individual or multiple tweets.

**Notes**
- Make sure your **Twitter tokens** are set via `/token` before posting.

---

## `/tweet` & `/tweets`

**Description**  
Posts saved tweets to Twitter.

**Usage — single tweet**
```bash
/tweet [tweet_id]
```

**Example**
```bash
/tweet 2
```

**Usage — multiple tweets**
```bash
/tweets [id1,id2,id3,...]
```

**Example**
```bash
/tweets 1,4,5
```

**Process**
1. Use `/post` to view saved tweets and note their IDs.
2. Execute `/tweet` or `/tweets` to post them.

**Notes**
- Requires Twitter access token/key configured via `/token`.

---

## `/token`

**Description**  
Stores Twitter access **tokens** and **keys** for automated tweeting.

**Usage**
```bash
/token
```

**Process**
1. Run `/token` to open the credential form.
2. Enter your **Twitter Access Token** and **Access Key**.
3. Submit to save the tokens securely.

**Notes**
- Tokens are required for `/post`, `/tweet`, `/tweets`.
- Keep your tokens confidential.

---

## `/image gen`

**Description**  
Generates images from textual descriptions.

**Usage**
```bash
/image gen [image_description]
```

**Example**
```bash
/image gen A funny cat wearing sunglasses
```

**Process**
1. Enter a detailed description.
2. The system generates an image matching your prompt.

**Notes**
- Generated images can enrich your agent’s brand and content.

---

## `/ugc`

**Description**  
Generates user-generated content for **selected characters**, enabling personalized interactions and scenarios.

**Usage**
```bash
/ugc [character] [prompt]
```

**Example**
```bash
/ugc Landwolf leads an adventurous quest through the enchanted forest
```

**Process**
1. **Initiate**: Enter `/ugc` in chat.
2. **Select Character**: e.g., *Landwolf*, *Ponke*.
3. **Enter Prompt**: Describe what you want the character to do/be.
4. **Generate**: Content is created featuring the selected character.

**Notes**
- **No prerequisites** — can be used directly.
- **Versatile** — useful for engagement and storytelling around your agent.
- **Customizable** — supports a wide range of creative prompts.
