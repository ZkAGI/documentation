---
id: connecting-cluster-to-gpu
title: Connecting GPU to Cluster
slug: /getting-started/connecting-cluster-to-gpu
sidebar_position: 4
---

# Connecting GPU to Cluster
Windows and Ubuntu setup guide for connecting **CPU** or **GPU** to the ZkAGI cluster using Docker.

> **Prerequisites**
> - **Docker** installed and running.
> - For **GPU** on Linux: NVIDIA drivers + **NVIDIA Container Toolkit**.
> - For **GPU** on Windows: recent NVIDIA drivers and Docker Desktop (WSL2 backend).

---

## CPU Setup

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

> **Note (Windows):** `--network host` behaves differently on Docker Desktop for Windows. If host networking isn’t supported, omit `--network host` and ensure required ports are exposed via `-p <host:container>` as needed.

### 5) Connect
- Wait ~20 seconds for the container to initialize.
- Open the **ZkAGI** interface and click **Connect**.

---

## GPU Setup

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

## Disconnecting CPU/GPU Connection

Stop any running container created from the `zkagi/connect2cluster` images.

**Windows (CMD):**
```bat
FOR /F "tokens=*" %i IN ('docker ps -q --filter "ancestor=zkagi/connect2cluster"') DO docker stop %i
```

**Ubuntu (bash):**
```bash
docker ps -q --filter "ancestor=zkagi/connect2cluster" | xargs docker stop
```

---

## Restarting CPU/GPU Connection

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

## Troubleshooting

- **Cannot use `--network host` on Windows:** Remove that flag and publish required ports with `-p`.  
- **`--gpus all` fails:** Install NVIDIA drivers and **nvidia-container-toolkit** (Linux) or enable GPU support in Docker Desktop (Windows).  
- **No GPU detected in container:** Run `docker run --rm --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi` to verify Docker can see the GPU.  
- **Wallet not recognized:** Ensure `walletAddress` is passed exactly and the value is correct.

---
