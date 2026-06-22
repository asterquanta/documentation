---
sidebar_position: 2
---


# Agents
## Explanation
An agent is a program or system built to optimize a given system given a target to achieve for that
system. An agent may be anything, including: artificial neural networks, heuristic based optimizers,
domain-specific logical optimizers, etc.


## Creating an agent
In the ADK's eyes, an agent is any directory with the following contents:
+ `src/`: A directory containing the source code for the agent. The source code decides the nature
of the agent and is entirely controlled by the developer. Although putting all the source code in
this directory is not enforced by the ADK, it is highly recommended.

+ **Models directory**: A directory containing the **models** associated with the agent. `<agent_dir>/models/` by default. Can be
changed with the GENIE_MODEL_ROOT environment variable.

+ `.env`: A file containing the API key to the AsterQuanta platform, among other configuration.

+ `settings.json`: Agent metadata (name, description, hyper-parameters, visibility). Created by `genie setup`. Push changes with `genie update`. The ADK never modifies this file at startup — edit it directly and run `genie update` to sync with the platform.

+ `.agent_data/`: Internal ADK data. A user should never edit anything inside this directory under normal circumstances.

:::note
The `adk` package has to be installed before it and its related tools such as `genie` can be used.
It is highly recommended that one uses a python venv for installing the ADK.
:::

:::note
On Unix-based operating systems (Linux, macOS), the `.agent_data/` and `.env` files are hidden by default and may not be visible in file explorers without enabling the display of hidden files.
:::

Run `genie setup` in an empty directory and follow the instructions in order to conveniently create
an agent in that directory. Setup writes `.env`, `settings.json`, and `.agent_data/` automatically. It also initializes
`src/` with a template agent implementation.

## Updating an agent
After editing `settings.json`, run `genie update` to push agent metadata
changes (name, description, hyper-parameters, visibility) to the platform without restarting the agent.

## Starting an agent
Start the agent with `genie run` (runs `src/main.py`). If setup has not been run, the agent exits with an error.

## Logging

The ADK configures logging automatically when you run `genie` or start a [`Connector`](../API/connector.md). No project files are required.

To change verbosity:

+ Set `ADK_LOG_LEVEL=DEBUG` (or `LOG_LEVEL=DEBUG`) in the environment before starting the agent.
+ Call `configure_logging(level="DEBUG")` from `adk.logging_config` in `src/main.py` before `app.start()`.
+ Optionally add a `logging.conf` file in the agent root for advanced file-based configuration.


## Implementing an agent

### Reinforcement learning (most common)

See [RL Agents](rl-agents.md) for how [`RLExecutor`](../API/rl-executor.md) drives an
[`RLAgentEnv`](../API/rl-agent-env.md) subclass, and [Environments](environments.md) for the
Gymnasium env side of the same path.

### Custom optimization logic

Subclass [`BaseExecutor`](../API/base-executor.md) and implement `run()` using [`OptimizationContext`](../API/optimization-context.md). Pass your executor class to the Connector instead of `RLExecutor`.


## What next?
Once an agent with the above structure has been successfully created either manually or through `genie setup`,
create a **model** and interact with the platform to start optimizing systems based on targets. See [Models](models.md).
