---
sidebar_position: 1
---


# Introduction
## What is the ADK?
The ADK (**Agent Development Kit**) is a Python library / framework that makes interacting
with the web APIs of [AsterQuanta](https://www.asterquanta.com) easier, along with utilities to
make commonly built applications **(agents)** built with the API easier to develop.

Agents connect to the Genie platform over WebSocket, receive optimization jobs, and run your
optimization logic — typically a reinforcement-learning agent, but you can provide a fully custom
[`BaseExecutor`](../API/base-executor.md) if your method is not RL-based.

The `genie` CLI scaffolds projects, manages local model directories, and runs your agent entry point.
