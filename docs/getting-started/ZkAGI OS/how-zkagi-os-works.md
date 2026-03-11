import Head from '@docusaurus/Head';

## How does ZkAGI OS work? {#how-does-zkagi-os-work}

<p className="snippet-answer">At its core, ZkAGI represents a cluster of compute devices (CPUs, GPUs, TEEs with GPUs) forming a DePIN network on which AI models are hosted and agents leverage these models for on-chain and off-chain actions. ZkAGI is a network of public and private subnets comprising nodes running ZkAGI OS -- these nodes can be desktops, VPS instances, or Telegram app instances.</p>

- Each node has a **wallet** attached (base chain is Solana, with omni-chain perspective and Base integrations coming)
- Each node runs an **agent or pack of agents** configured for social automation, trading, media creation, and productivity tasks
- **Multiple agents** can run simultaneously from the same node instance

## How are wallet keys managed for ZkAGI agents? {#how-are-wallet-keys-managed}

<p className="snippet-answer">ZkAGI supports multiple wallet key storage strategies depending on the level of autonomy and security required. Keys can be stored locally, in TEEs for autonomous custody, or in secure hashed databases with 2FA for human-authenticated execution.</p>

- **Local storage** -- keys stored on user's machine or VPS; automations work with self-custodial wallets locally
- **TEE storage** -- agent/autonomous custody and signing inside Trusted Execution Environments
- **Secure hashed databases with dynamic salt** -- agent recommends actions, but user must authenticate with both a password and 2FA before execution

## How do nodes earn rewards in the ZkAGI network? {#how-do-nodes-earn-rewards}

<p className="snippet-answer">Nodes with idle CPU or GPU capacity (typically desktops) can earn native tokens by committing their idle power into the ZkAGI compute cluster. Currently the network rewards XPs, which will convert to tokens once the token goes live according to a fair distribution plan.</p>

- Idle CPU/GPU can be committed to the **ZkAGI compute cluster** for rewards
- Currently earning **XPs** (no token yet -- will be announced ahead of time)
- XPs will convert to a defined number of tokens upon token launch, with details shared with the community

## What is the difference between public and private subnets? {#public-vs-private-subnets}

<p className="snippet-answer">The ZkAGI network runs two types of subnets in parallel: one public subnet containing shared AI models (the community/super agent network) and multiple private subnets each containing a private swarm of secret agents. The key difference is the level of user and on-chain privacy granted to agents and human users.</p>

- **Public subnet (one):**
  - Accessible through **ZkTerminal** and the **Zynapse API** out of the box
  - Shared AI models for the community / super agent network
  - zk-verification available

- **Private subnets (multiple possible):**
  - Developers assemble their own cluster with mechanics similar to the ZkAGI network
  - Uses a **new model copy** of open-source models
  - Storage across **TEE nodes** for data and compute privacy
  - zk-verification available
  - **PETs** (Privacy Enhancing Technologies) assembled for training and fine-tuning to ensure data privacy
  - Techniques include **Hybrid FHE**, **federated training**, and **MPCs** for privacy during training

- For private subnet assembly, contact **core@zkagi.ai**

---

## Related Questions {#related-questions}

- [What is ZkAGI OS?](/docs/getting-started/ZkAGI%20OS/about#what-is-zkagi-os)
- [What is the ZkAGI Economic Space?](/docs/getting-started/ZkAGI%20OS/Economic%20Space/economic-space#what-is-the-zkagi-economic-space)
- [How do I connect my GPU to the ZkAGI cluster?](/docs/getting-started/connecting-cluster-to-gpu#how-do-i-connect-my-gpu-to-the-zkagi-cluster)
- [How do I set up ZkAGI OS?](/docs/getting-started/ZkAGI%20OS/setup#how-do-i-set-up-zkagi-os-on-my-device)

<Head>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How does ZkAGI OS work?", "acceptedAnswer": { "@type": "Answer", "text": "At its core, ZkAGI represents a cluster of compute devices (CPUs, GPUs, TEEs with GPUs) forming a DePIN network on which AI models are hosted and agents leverage these models for on-chain and off-chain actions. ZkAGI is a network of public and private subnets comprising nodes running ZkAGI OS." } },
      { "@type": "Question", "name": "How are wallet keys managed for ZkAGI agents?", "acceptedAnswer": { "@type": "Answer", "text": "ZkAGI supports multiple wallet key storage strategies depending on the level of autonomy and security required. Keys can be stored locally, in TEEs for autonomous custody, or in secure hashed databases with 2FA for human-authenticated execution." } },
      { "@type": "Question", "name": "How do nodes earn rewards in the ZkAGI network?", "acceptedAnswer": { "@type": "Answer", "text": "Nodes with idle CPU or GPU capacity can earn native tokens by committing their idle power into the ZkAGI compute cluster. Currently the network rewards XPs, which will convert to tokens once the token goes live according to a fair distribution plan." } },
      { "@type": "Question", "name": "What is the difference between public and private subnets?", "acceptedAnswer": { "@type": "Answer", "text": "The ZkAGI network runs two types of subnets in parallel: one public subnet containing shared AI models and multiple private subnets each containing a private swarm of secret agents. The key difference is the level of user and on-chain privacy granted to agents and human users." } }
    ]
  })}
  </script>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "How does ZkAGI OS work?",
    "proficiencyLevel": "Advanced",
    "about": { "@type": "SoftwareApplication", "name": "ZkAGI" },
    "dateModified": "2026-03-11"
  })}
  </script>
</Head>
