# Altaica Compiler: Secure AI Splitting

The Altaica Compiler by ZkAGI is a technology that makes AI both fast and private. It works by "splitting" an AI model into two parts so that your sensitive data stays safe on your device while the heavy lifting is done by a network of computers.

## How It Works (The Simple Version)

Think of an AI model as a long assembly line with many stations (layers). Some stations are "private" and some are "heavy duty."

### 1. Mapping the Model
The Altaica Compiler takes any open-source AI model and looks at its entire structure. it counts every single layer and identifies the perfect "split point."

### 2. The Split
Altaica divides the AI's work into two categories:
*   **The "Thinking" Parts (Non-linear Operations):** These are the complex parts of the AI. These stay entirely on **your own device** (the client). Since they never leave your machine, your privacy is protected.
*   **The "Heavy Lifting" Parts (Linear Operations):** These are the massive mathematical calculations. These are sent out to a network of **untrusted GPUs** (other computers) to be processed quickly.

### 3. The Digital Receipt (ZK-STARKs)
Because we don't necessarily trust the computers on the network, we use **ZK-STARKs**. This is like a "digital receipt" or a mathematical proof. It proves that the network did the math correctly without the network ever seeing the actual content of your data.

## Why is it Secure?

Even if every single computer in the network tried to work together to "spy" on your data, they couldn't. Because of the way the math is split, the pieces sent to the network are mathematically shielded. The network only sees "linear" math, which doesn't reveal the full picture of your private information. This provides near **100% mathematical privacy**.

## The Process Flow

![Altaica Process Flow](/img/image1.png)

## Future Work: Extra Armor

In the future, we plan to add **Homomorphic Encryption** to the very start and very end of this process. 

Instead of encrypting everything (which is slow), we will use it specifically at the entry and exit points. This acts like a "secure transport box" that protects your data the moment it enters the system and right before it's handed back to you, ensuring even greater security.
