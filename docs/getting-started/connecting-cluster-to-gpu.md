---
id: connecting-cluster-to-gpu
title: Connecting GPU to Cluster
slug: /getting-started/connecting-cluster-to-gpu
sidebar_position: 4
---

import Head from '@docusaurus/Head';

## How do I connect my GPU to the ZkAGI cluster? {#how-do-i-connect-my-gpu-to-the-zkagi-cluster}

<p className="snippet-answer">You can connect a CPU or GPU to the ZkAGI cluster using Docker on Windows or Ubuntu. Pull the appropriate Docker image, run the container with your wallet address, and click Connect in the ZkAGI interface.</p>

> **Prerequisites**
> - **Docker** installed and running.
> - For **GPU** on Linux: NVIDIA drivers + **NVIDIA Container Toolkit**.
> - For **GPU** on Windows: recent NVIDIA drivers and Docker Desktop (WSL2 backend).

---

## How do I set up CPU connection to ZkAGI? {#how-do-i-set-up-cpu-connection-to-zkagi}

<p className="snippet-answer">CPU connection requires Docker Desktop (Windows) or Docker Engine (Ubuntu), pulling the CPU image, and running a container with your wallet address. The container initializes in about 20 seconds before you can connect.</p>

### 1) Download Docker

Install Docker Desktop (Windows) or Docker Engine (Ubuntu) from the official Docker website.

### 2) Open a terminal

- **Windows:** Command Prompt (CMD)
- **Ubuntu:** Terminal

### 3) Pull the CPU image

```bash
docker pull zkagi/connect2cluster:latest
```

### 4) Run the container (CPU)

Replace `YOUR_WALLET_ADDRESS` with your actual address.

```bash
docker run -dit \
  -e "walletAddress=YOUR_WALLET_ADDRESS" \
  --privileged \
  --network host \
  zkagi/connect2cluster:latest
```

> **Note (Windows):** `--network host` behaves differently on Docker Desktop for Windows. If host networking isn't supported, omit `--network host` and ensure required ports are exposed via `-p <host:container>` as needed.

### 5) Connect

- Wait ~20 seconds for the container to initialize.
- Open the **ZkAGI** interface and click **Connect**.

---

## How do I set up GPU connection to ZkAGI? {#how-do-i-set-up-gpu-connection-to-zkagi}

<p className="snippet-answer">GPU connection requires Docker, verified NVIDIA drivers (check with nvidia-smi), and the GPU-specific Docker image. Run the container with the --gpus all flag and your wallet address to enable GPU passthrough.</p>

### 1) Download Docker

Install Docker Desktop (Windows) or Docker Engine (Ubuntu).

### 2) Check GPU and drivers

Open CMD/Terminal and verify your GPU:

```bash
nvidia-smi
```

> If your **driver version is > 552**, consider installing a compatible version as required by your environment.

### 3) Pull the GPU image

```bash
docker pull zkagi/connect2cluster:gpu-latest
```

### 4) Run the container (GPU)

Replace `YOUR_WALLET_ADDRESS` with your actual address.

```bash
docker run -dit \
  -e "walletAddress=YOUR_WALLET_ADDRESS" \
  --privileged \
  --network host \
  --gpus all \
  zkagi/connect2cluster:gpu-latest
```

> **Linux (NVIDIA Toolkit):** If `--gpus all` fails, install/configure **nvidia-container-toolkit**.
>
> **Windows:** Ensure WSL2, NVIDIA drivers with WSL support, and Docker Desktop GPU integration are enabled.

### 5) Connect

- Wait ~20 seconds for startup.
- Open the **ZkAGI** interface and click **Connect**.

---

## How do I disconnect or restart my ZkAGI cluster connection? {#how-do-i-disconnect-or-restart-my-zkagi-cluster-connection}

<p className="snippet-answer">To disconnect, stop any running container created from the zkagi/connect2cluster images using Docker commands. To restart, use docker restart on previously stopped containers.</p>

### Disconnecting

Stop any running container created from the `zkagi/connect2cluster` images.

**Windows (CMD):**

```bat
FOR /F "tokens=*" %i IN ('docker ps -q --filter "ancestor=zkagi/connect2cluster"') DO docker stop %i
```

**Ubuntu (bash):**

```bash
docker ps -q --filter "ancestor=zkagi/connect2cluster" | xargs docker stop
```

### Restarting

Restart a previously stopped container created from the `zkagi/connect2cluster` images.

**Windows (CMD):**

```bat
FOR /F "tokens=*" %i IN ('docker ps -a -q --filter "ancestor=zkagi/connect2cluster"') DO docker restart %i
```

**Ubuntu (bash):**

```bash
docker ps -a -q --filter "ancestor=zkagi/connect2cluster" | xargs -I {} docker restart {}
```

---

## How do I troubleshoot ZkAGI cluster connection issues? {#how-do-i-troubleshoot-zkagi-cluster-connection-issues}

<p className="snippet-answer">Common issues include host networking incompatibility on Windows, GPU passthrough failures, and wallet address errors. Each problem has a specific fix involving Docker flags, NVIDIA toolkit installation, or verifying container GPU access.</p>

- **Cannot use `--network host` on Windows:** Remove that flag and publish required ports with `-p`.
- **`--gpus all` fails:** Install NVIDIA drivers and **nvidia-container-toolkit** (Linux) or enable GPU support in Docker Desktop (Windows).
- **No GPU detected in container:** Run the following to verify Docker can see the GPU:
  ```bash
  docker run --rm --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi
  ```
- **Wallet not recognized:** Ensure `walletAddress` is passed exactly and the value is correct.

---

## Related Questions

- [How do I get started with ZkTerminal?](/docs/getting-started#how-do-i-get-started-with-zkterminal)
- [How does ZkAGI OS work?](/docs/getting-started/ZkAGI%20OS/how-zkagi-os-works#how-does-zkagi-os-work)
- [What is ZkAGI?](/docs/#what-is-zkagi)

<Head>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How do I connect my GPU to the ZkAGI cluster?", "acceptedAnswer": { "@type": "Answer", "text": "You can connect a CPU or GPU to the ZkAGI cluster using Docker on Windows or Ubuntu. Pull the appropriate Docker image, run the container with your wallet address, and click Connect in the ZkAGI interface." } },
      { "@type": "Question", "name": "How do I set up CPU connection to ZkAGI?", "acceptedAnswer": { "@type": "Answer", "text": "CPU connection requires Docker Desktop (Windows) or Docker Engine (Ubuntu), pulling the CPU image, and running a container with your wallet address. The container initializes in about 20 seconds before you can connect." } },
      { "@type": "Question", "name": "How do I set up GPU connection to ZkAGI?", "acceptedAnswer": { "@type": "Answer", "text": "GPU connection requires Docker, verified NVIDIA drivers (check with nvidia-smi), and the GPU-specific Docker image. Run the container with the --gpus all flag and your wallet address to enable GPU passthrough." } },
      { "@type": "Question", "name": "How do I disconnect or restart my ZkAGI cluster connection?", "acceptedAnswer": { "@type": "Answer", "text": "To disconnect, stop any running container created from the zkagi/connect2cluster images using Docker commands. To restart, use docker restart on previously stopped containers." } },
      { "@type": "Question", "name": "How do I troubleshoot ZkAGI cluster connection issues?", "acceptedAnswer": { "@type": "Answer", "text": "Common issues include host networking incompatibility on Windows, GPU passthrough failures, and wallet address errors. Each problem has a specific fix involving Docker flags, NVIDIA toolkit installation, or verifying container GPU access." } }
    ]
  })}
  </script>
  <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "How do I connect my GPU to the ZkAGI cluster?",
    "proficiencyLevel": "Advanced",
    "about": { "@type": "SoftwareApplication", "name": "ZkAGI" },
    "dateModified": "2026-03-11"
  })}
  </script>
</Head>
