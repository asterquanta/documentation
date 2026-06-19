---
sidebar_position: 7
---

# Environments

## Explanation

An environment in the context of the ADK is broadly the same as most descriptions of a
reinforcement learning environment. There are however, minimal frameworks and APIs that the ADK
uses heavily. Such use is mostly limited to the [Gymnasium](https://gymnasium.farama.org/index.html)
framework in the ADK's default environments. Users are, however, free to use their own environment
framework of choice as use of Gymnasium is slightly relied upon.

An environment is in charge of converting an optimization configuration and abstracting it to an RL
specification. This includes handling reward computation logic, action logic, constructing the
observation space and handling interaction with the system itself.