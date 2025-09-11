---
id: zkterminal-authentication
title: Authentication Guide
slug: /getting-started/zkterminal/authentication
sidebar_position: 2
---

# Authentication Guide

This guide explains how to **sign up / log in** to **ZkTerminal**, connect your **Solana wallet** on desktop or mobile, and what happens if no wallet is detected. A quick how-to for **adding images in Markdown** (Docusaurus) is included at the end.

---

## How to Connect with ZkTerminal

### 1) Visit the ZkTerminal website
Open your device’s web browser and navigate to **ZkTerminal**. The site works on **desktop and mobile** in all modern browsers.

> Tip: Make sure any pop-up blockers allow wallet windows to open.

### 2) Sign up / Log in via wallet
- Click **GET STARTED** on the **Navbar** (or the **Sidebar** in desktop layouts).
- ZkTerminal checks for an installed **Solana wallet** (e.g., Phantom, Solflare, Backpack, Civic, etc.).

**If no wallet provider is found**  
You’ll see a toast prompting you to install a wallet. Install a wallet extension/app, create an account, then return to ZkTerminal to continue.

**If a wallet provider is detected**  
A **wallet selection modal** appears. Choose your wallet **provider** and (if prompted) the specific **account** you want to use.

---

## Mobile Devices

### Option A: Mobile Wallet Adapter (no wallet app installed)
1. Tap **GET STARTED**.
2. Choose **Mobile Wallet Adapter** in the connection options.
3. You’ll be redirected to the **Solana Mobile** page.  
   - Accept/Decline cookies as you prefer.
   - Scroll to **“Find a Solana wallet”** and pick a wallet from the **App Store / Play Store**.
4. Install the wallet app and **create your account**.
5. Return to ZkTerminal and tap **GET STARTED** again. Your new wallet should be **detected** in the connection pop-up—select it to proceed.

### Option B: Wallet app already installed
- Tapping **GET STARTED** opens a **wallet connection pop-up** showing your installed wallet. Select the wallet to connect.

> Note: On iOS/Android, deep links or intents may switch you into the wallet app for approval, then return you to ZkTerminal.

---

## What You’ll See

- **No wallet installed** → A toast message explaining you need a wallet; links to install.
- **Wallet detected** → A **modal** listing providers; after you pick one, you’ll confirm in the wallet, then get redirected back, now **signed in**.

Once connected, the **selected wallet** typically appears in the app header, confirming your session.

---

## Troubleshooting

- **Wallet modal doesn’t appear**: Refresh the page and try **GET STARTED** again; verify the wallet extension/app is enabled.
- **Mobile deep link fails**: Reopen ZkTerminal → **GET STARTED** → choose **Mobile Wallet Adapter** again. Ensure your wallet app allows deep links.
- **Multiple wallets installed**: Pick the intended provider and confirm the **correct account** in the wallet UI.
