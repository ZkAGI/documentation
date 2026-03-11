import Head from '@docusaurus/Head';

## What is ZkAGI OS? {#what-is-zkagi-os}

<p className="snippet-answer">ZkAGI OS is an all-batteries-included, modular, and upgradeable AI x Crypto Operating System (open-source) built to fuel a new class of Secret Sentients / AI Secret Agents and AI Super Agents. It is an end-to-end customizable OS usable by normies and advanced developers alike, allowing community-centred innovation and incentives.</p>

<img
  src="/img/about/about_1.jpeg"
  alt="An image generated on ZkTerminal"
  style={{ display: 'block', margin: '0 auto', maxWidth: 720, width: '100%' }}
/>
<p className="img-caption">An image generated on ZkTerminal (type /image-gen &lt; your prompt&gt; for the same)</p>

## Why does the AI agent landscape need ZkAGI OS? {#why-does-the-ai-agent-landscape-need-zkagi-os}

<p className="snippet-answer">Most existing AI agents are limited to feature sets provided by big-tech AI APIs, restricting innovation and customizability. ZkAGI OS enables Super Agents that run powerful open-source AI models and Secret Agents that preserve on-chain and training-data privacy.</p>

- Social agents (Bully, Zerebro, Luna Virtuals, etc.) were the first popular class, but are constrained by closed-source APIs
- **Super Agents** run AI models not offered by big tech but openly available on GitHub
- **Secret Agents** preserve privacy on training data and on-chain activity -- being untraceable on-chain is an agent secret power
- Privacy AI delivers the same outcomes as public AI without compromising sensitive information
- The OS serves as a strong foundation built on years of R&D, upgradeable and modifiable by anyone with requisite skills

---

## What are the spaces in ZkAGI OS? {#what-are-the-spaces-in-zkagi-os}

<p className="snippet-answer">Similar to traditional operating systems that have a user space and a kernel space, ZkAGI OS is organized into four distinct spaces: Economic Space, Compute Node Space, Model Hosting Space, and Agent System Space. Each space handles a different layer of the decentralized AI stack.</p>

### Economic Space

<img
  src="/img/about/about_2.jpeg"
  alt="Economic space"
  style={{ display: 'block', margin: '0 auto', maxWidth: 720, width: '100%' }}
/>
<p className="img-caption"> On Blockchain Networks like Solana or Base</p>

### Compute Node Space

<img
  src="/img/about/about_3.jpeg"
  alt="compute node space"
  style={{ display: 'block', margin: '0 auto', maxWidth: 720, width: '100%' }}
/>
<p className="img-caption">CPU & GPU & TEE nodes are clustered, AI models are run on the cluster which handles resource management of these nodes according to workload and privacy requirements</p>

### Model Hosting Space

<img
  src="/img/about/about_4.jpeg"
  alt="compute node space"
  style={{ display: 'block', margin: '0 auto', maxWidth: 720, width: '100%' }}
/>
<p className="img-caption">Models are sharded and stored across distributed nodes, resource manager within the Model hosting space picks the best nodes to process workload and return an output. Requests to the model hosting space are initiated through the Zynapse API</p>

---

## What is the Zynapse API? {#what-is-the-zynapse-api}

<p className="snippet-answer">The Zynapse API is the gateway that routes workloads across the ZkAGI network, comprising a subnet selector, a model selector, and a zk-messenger. These selectors decide how a workload should be processed based on the request initiator and dataset requirements.</p>

<img
  src="/img/about/about_5.jpeg"
  alt="zynapse api"
  style={{ display: 'block', margin: '0 auto', maxWidth: 720, width: '100%' }}
/>
<p className="img-caption">Zynapse API comprises of a subnet selector, a model selector and zk-messenger. The selectors work together in deciding how the workload requested by a human user or agent should be processed based on the initiator of request and data set (whether it requires confidential computing in a private cluster or regular public cluster/what kind of wallets)</p>

- **Subnet selector** -- determines whether to route to a public or private cluster
- **Model selector** -- picks the appropriate AI model for the workload
- **zk-messenger** -- handles zero-knowledge verification and privacy messaging

---

## What is the Agent System Space / User Space? {#what-is-the-agent-system-space}

<p className="snippet-answer">The Agent System Space (User Space) hosts the programs that dictate agent functioning, such as frameworks like Eliza bound with the Zynapse API. It controls agent memory systems, actions, evaluators, character files, and providers, while apps like ZkTerminal build on the Zynapse API with their own UI and memory systems.</p>

<img
  src="/img/about/about_6.jpeg"
  alt="user space"
  style={{ display: 'block', margin: '0 auto', maxWidth: 720, width: '100%' }}
/>
<p className="img-caption">Programs that dictate the functioning of an agent like program running Eliza Framework bound with Zynapse API controls agent memory system, actions, evaluators, character files and providers, similarly apps like ZkTerminal can build with Zynapse API and have their own UI & Memory system. The rules around communicating with other apps & agents in the network are assigned in the program code hosted in the Agent System Space/User Space</p>

- Agent frameworks (e.g., Eliza) bind with Zynapse API to control memory, actions, evaluators, character files, and providers
- Apps like **ZkTerminal** use Zynapse API with their own UI and memory system
- Communication rules between apps and agents are assigned in program code hosted in this space

---

## Disclaimer {#disclaimer}

<p className="snippet-answer">This document explains ZkAGI OS concepts in simple terms with visual aids, avoiding jargon as much as possible. The basic building blocks of ZkAGI OS have been shipped, with more items being packaged and released over time.</p>

---

## Related Questions {#related-questions}

- [How does ZkAGI OS work?](/docs/getting-started/ZkAGI%20OS/how-zkagi-os-works#how-does-zkagi-os-work)
- [How do I set up ZkAGI OS?](/docs/getting-started/ZkAGI%20OS/setup#how-do-i-set-up-zkagi-os-on-my-device)
- [How do I authenticate with the Zynapse API?](/docs/getting-started/zynapse#how-do-i-authenticate-with-the-zynapse-api)
- [What is the ZkAGI Economic Space?](/docs/getting-started/ZkAGI%20OS/Economic%20Space/economic-space#what-is-the-zkagi-economic-space)

<Head>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is ZkAGI OS?", "acceptedAnswer": { "@type": "Answer", "text": "ZkAGI OS is an all-batteries-included, modular, and upgradeable AI x Crypto Operating System (open-source) built to fuel a new class of Secret Sentients / AI Secret Agents and AI Super Agents. It is an end-to-end customizable OS usable by normies and advanced developers alike, allowing community-centred innovation and incentives." } },
      { "@type": "Question", "name": "Why does the AI agent landscape need ZkAGI OS?", "acceptedAnswer": { "@type": "Answer", "text": "Most existing AI agents are limited to feature sets provided by big-tech AI APIs, restricting innovation and customizability. ZkAGI OS enables Super Agents that run powerful open-source AI models and Secret Agents that preserve on-chain and training-data privacy." } },
      { "@type": "Question", "name": "What are the spaces in ZkAGI OS?", "acceptedAnswer": { "@type": "Answer", "text": "Similar to traditional operating systems that have a user space and a kernel space, ZkAGI OS is organized into four distinct spaces: Economic Space, Compute Node Space, Model Hosting Space, and Agent System Space. Each space handles a different layer of the decentralized AI stack." } },
      { "@type": "Question", "name": "What is the Zynapse API?", "acceptedAnswer": { "@type": "Answer", "text": "The Zynapse API is the gateway that routes workloads across the ZkAGI network, comprising a subnet selector, a model selector, and a zk-messenger. These selectors decide how a workload should be processed based on the request initiator and dataset requirements." } },
      { "@type": "Question", "name": "What is the Agent System Space / User Space?", "acceptedAnswer": { "@type": "Answer", "text": "The Agent System Space (User Space) hosts the programs that dictate agent functioning, such as frameworks like Eliza bound with the Zynapse API. It controls agent memory systems, actions, evaluators, character files, and providers, while apps like ZkTerminal build on the Zynapse API with their own UI and memory systems." } }
    ]
  })}
  </script>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "What is ZkAGI OS?",
    "proficiencyLevel": "Advanced",
    "about": { "@type": "SoftwareApplication", "name": "ZkAGI" },
    "dateModified": "2026-03-11"
  })}
  </script>
</Head>
