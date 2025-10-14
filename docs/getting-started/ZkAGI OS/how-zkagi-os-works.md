# How ZkAGI Works — and What is the ZkAGI OS?

At the very heart of it, ZkAGI represents a cluster of compute devices could be CPUs or GPUs or TEEs with GPUs (DePIN) on which AI models are hosted and agents leverage these AI models to make on-chain and off-chain actions. ZkAGI is a network (public, private subnets) comprising of nodes which are running ZkAGI OS. These nodes could be desktops or VPS or could be instances on a Tg app!

Each node has a wallet attached to it (our base chain is Solana, however we keep an omni-chain perspective to the Agentic Economy w/ integrations for Base coming up!).

Each node is effectively running an agent/or pack of agents which the user sets up for his/her goals in social automation, trading, media creation and productivity tasks. Multiple agents could be simultaneously run from the same node instance.

Wallet keys for these agents could be stored locally on a users machine or VPS (automations work in self-custodial wallets locally), on TEEs (agent/autonomous custody & signing) or locked with 2FA and password on secure hashed databases w/ dynamic salt (agent recommends actions which the user has to authenticate using both a password and 2FA before execution can happen).

Nodes having idle cpu or gpu (typically desktops)  can earn native tokens (no token out yet beware, will be announced ahead of time) on committing their idle power into the ZkAGI compute cluster. For now, we are rewarding XPs, when token goes live these XPs will be converted into certain number of tokens which will be detailed to community according to a decided fair distribution.

You want to imagine two versions of subnets of ZkAGI existing parallelly, a public network containing shared AI models (community/super agent network) and another type, several private clusters each containing a private swarm of secret agents. The difference between these versions is the level of user and on-chain privacy granted to agents and human users.

There is only one public Subnet in the ZkAGI network. This is accessible through ZkTerminal and through Zynapse API right out of the box.

Developers wanting full privacy features can assemble their own private cluster with similar mechanics as the ZkAGI network with the exception that a new model copy of open source models is used & storage is done across TEE nodes to ensure data privacy and compute privacy. There can be more than one private subnet. zk-verification is available on both the public & private subnets. PETs are assembled for training & fine-tuning tasks to ensure data privacy while training the model. Techniques like Hybrid FHE, federated training & MPCs are used to better preserve privacy during training.

If you are interested in a private subnet for secret agents, please email core@zkagi.ai for help in assembling this together.

