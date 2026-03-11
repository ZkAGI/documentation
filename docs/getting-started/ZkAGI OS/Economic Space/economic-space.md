# Economic Space

import Head from '@docusaurus/Head';

## What is the ZkAGI Economic Space? {#what-is-the-zkagi-economic-space}

<p className="snippet-answer">The ZkAGI Economic Space is the layer where record-keeping and transactions are processed to ensure the $ZKAGI token economy fuels both agentic and user activity. It currently operates on Solana, with plans to expand to more chains and token-fiat rails for broader developer and user adoption.</p>

- Record-keeping and transactions are processed to ensure the economy around **$ZKAGI** fuels agentic and user activity
- Currently operates on a blockchain like **Solana**
- Will be expanded to more chains and token-fiat rails to support developers and users from outside crypto
- The token operates in the economic space allowing **agent-to-agent**, **agent-to-human**, and **human-to-agent** payments for services on the network

## How are compute payments handled in ZkAGI? {#how-are-compute-payments-handled-in-zkagi}

<p className="snippet-answer">Compute payments in ZkAGI are resolved through the economic layer, where agents or developers pay for renting compute nodes running ZkAGI OS. API consumption payments and revenue splitting between end-user apps and the Zynapse API are also settled in this layer.</p>

- Records for **compute provisioning** by nodes running ZkAGI OS and associated payments are resolved
- These payments are made by agents or developers renting the compute nodes
- **API access**: agents consume the **Zynapse API** by ZkAGI to keep performing actions
- End-user apps may add a markup on top of API consumption
- Payments for APIs and revenue splitting are resolved in the economic layer

## How does ZkAGI handle wallet key security? {#how-does-zkagi-handle-wallet-key-security}

<p className="snippet-answer">ZkAGI supports multiple wallet key storage models including local self-custodial storage, TEE-based autonomous custody, and secure hashed databases with 2FA. Each model offers different tradeoffs between automation convenience and user control over signing.</p>

- **Local storage** on a user's machine or VPS — automations work in self-custodial wallets locally
- **TEE-based custody** — agent/autonomous custody and signing inside Trusted Execution Environments
- **Secure hashed databases with dynamic salt** — wallet keys locked with 2FA and password
  - Agent recommends actions
  - User must authenticate using both a password and 2FA before execution can happen

---

## Related Questions

- [How does the ZkAGI Flywheel work?](/docs/getting-started/ZkAGI%20OS/Tokenomics/zkagi-flywheel#how-does-the-zkagi-flywheel-work)
- [How does ZkAGI integrate with the Solana Agent Kit?](/docs/getting-started/ZkAGI%20OS/Economic%20Space/solana-agent-kit#how-does-zkagi-integrate-with-the-solana-agent-kit)
- [How does ZkAGI OS work?](/docs/getting-started/ZkAGI%20OS/how-zkagi-os-works#how-does-zkagi-os-work)

<Head>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the ZkAGI Economic Space?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The ZkAGI Economic Space is the layer where record-keeping and transactions are processed to ensure the $ZKAGI token economy fuels both agentic and user activity. It currently operates on Solana, with plans to expand to more chains and token-fiat rails for broader developer and user adoption."
        }
      },
      {
        "@type": "Question",
        "name": "How are compute payments handled in ZkAGI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compute payments in ZkAGI are resolved through the economic layer, where agents or developers pay for renting compute nodes running ZkAGI OS. API consumption payments and revenue splitting between end-user apps and the Zynapse API are also settled in this layer."
        }
      },
      {
        "@type": "Question",
        "name": "How does ZkAGI handle wallet key security?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ZkAGI supports multiple wallet key storage models including local self-custodial storage, TEE-based autonomous custody, and secure hashed databases with 2FA. Each model offers different tradeoffs between automation convenience and user control over signing."
        }
      }
    ]
  })}
  </script>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "ZkAGI Economic Space",
    "proficiencyLevel": "Advanced",
    "about": { "@type": "SoftwareApplication", "name": "ZkAGI" },
    "dateModified": "2026-03-11"
  })}
  </script>
</Head>
