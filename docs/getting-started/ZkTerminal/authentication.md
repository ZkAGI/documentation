---
id: zkterminal-authentication
title: Authentication Guide
slug: /getting-started/zkterminal/authentication
sidebar_position: 2
---

import Head from '@docusaurus/Head';

## How do I connect with ZkTerminal? {#how-do-i-connect-with-zkterminal}

<p className="snippet-answer">You connect with ZkTerminal by visiting the website and clicking GET STARTED, which detects your installed Solana wallet and prompts you to sign in. ZkTerminal supports desktop and mobile browsers and works with wallets like Phantom, Solflare, Backpack, and Civic.</p>

- Open your device's web browser and navigate to **ZkTerminal**
- The site works on **desktop and mobile** in all modern browsers
- Click **GET STARTED** on the **Navbar** (or the **Sidebar** in desktop layouts)
- ZkTerminal checks for an installed **Solana wallet** (e.g., Phantom, Solflare, Backpack, Civic)
- **If no wallet provider is found**: You see a toast prompting you to install a wallet; install a wallet extension/app, create an account, then return to ZkTerminal
- **If a wallet provider is detected**: A **wallet selection modal** appears; choose your wallet **provider** and (if prompted) the specific **account** you want to use

> Tip: Make sure any pop-up blockers allow wallet windows to open.

## How do I connect a wallet to ZkTerminal on desktop? {#how-do-i-connect-a-wallet-to-zkterminal-on-desktop}

<p className="snippet-answer">On desktop, click GET STARTED and select your Solana wallet provider from the modal that appears. Confirm the connection in your wallet extension, and your selected wallet will appear in the app header.</p>

- Click **GET STARTED** on the Navbar or Sidebar
- A **wallet selection modal** lists all detected wallet extensions
- Select the wallet **provider** you want to use
- Confirm the connection in your wallet extension
- Once connected, the **selected wallet** appears in the app header, confirming your session

## How do I connect a wallet to ZkTerminal on mobile? {#how-do-i-connect-a-wallet-to-zkterminal-on-mobile}

<p className="snippet-answer">On mobile, tap GET STARTED and either choose an installed wallet or use the Mobile Wallet Adapter option to install one. After installing and creating an account, return to ZkTerminal and select your wallet from the connection pop-up.</p>

**Option A: No wallet app installed (Mobile Wallet Adapter)**

1. Tap **GET STARTED**
2. Choose **Mobile Wallet Adapter** in the connection options
3. You are redirected to the **Solana Mobile** page
   - Accept/Decline cookies as you prefer
   - Scroll to **"Find a Solana wallet"** and pick a wallet from the **App Store / Play Store**
4. Install the wallet app and **create your account**
5. Return to ZkTerminal and tap **GET STARTED** again; your new wallet should be **detected** in the connection pop-up — select it to proceed

**Option B: Wallet app already installed**

- Tapping **GET STARTED** opens a **wallet connection pop-up** showing your installed wallet; select the wallet to connect

> Note: On iOS/Android, deep links or intents may switch you into the wallet app for approval, then return you to ZkTerminal.

## How do I troubleshoot ZkTerminal wallet connection issues? {#how-do-i-troubleshoot-zkterminal-wallet-connection-issues}

<p className="snippet-answer">Common ZkTerminal connection issues include the wallet modal not appearing, mobile deep link failures, and conflicts with multiple installed wallets. Most issues are resolved by refreshing the page, re-enabling the wallet extension, or selecting the correct wallet provider.</p>

- **Wallet modal doesn't appear**: Refresh the page and try **GET STARTED** again; verify the wallet extension/app is enabled
- **Mobile deep link fails**: Reopen ZkTerminal, tap **GET STARTED**, and choose **Mobile Wallet Adapter** again; ensure your wallet app allows deep links
- **Multiple wallets installed**: Pick the intended provider and confirm the **correct account** in the wallet UI
- **No wallet installed**: A toast message will appear explaining you need a wallet with links to install one
- **Wallet detected but connection fails**: Make sure your wallet extension is up to date and that pop-up blockers are not interfering

---

## Related Questions

- [What prompt commands are available in ZkTerminal?](/docs/getting-started/zkterminal/prompt-commands#how-do-i-create-an-agent-in-zkterminal)
- [How do I get started with ZkTerminal?](/docs/getting-started#how-do-i-get-started-with-zkterminal)
- [How do I set up ZkAGI OS?](/docs/getting-started/ZkAGI%20OS/setup#how-do-i-set-up-zkagi-os-on-my-device)

<Head>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I connect with ZkTerminal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You connect with ZkTerminal by visiting the website and clicking GET STARTED, which detects your installed Solana wallet and prompts you to sign in. ZkTerminal supports desktop and mobile browsers and works with wallets like Phantom, Solflare, Backpack, and Civic."
        }
      },
      {
        "@type": "Question",
        "name": "How do I connect a wallet to ZkTerminal on desktop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On desktop, click GET STARTED and select your Solana wallet provider from the modal that appears. Confirm the connection in your wallet extension, and your selected wallet will appear in the app header."
        }
      },
      {
        "@type": "Question",
        "name": "How do I connect a wallet to ZkTerminal on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On mobile, tap GET STARTED and either choose an installed wallet or use the Mobile Wallet Adapter option to install one. After installing and creating an account, return to ZkTerminal and select your wallet from the connection pop-up."
        }
      },
      {
        "@type": "Question",
        "name": "How do I troubleshoot ZkTerminal wallet connection issues?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common issues include the wallet modal not appearing, mobile deep link failures, and conflicts with multiple installed wallets. Most issues are resolved by refreshing the page, re-enabling the wallet extension, or selecting the correct wallet provider."
        }
      }
    ]
  })}
  </script>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "ZkTerminal Authentication Guide",
    "proficiencyLevel": "Advanced",
    "about": { "@type": "SoftwareApplication", "name": "ZkAGI" },
    "dateModified": "2026-03-11"
  })}
  </script>
</Head>
