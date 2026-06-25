---
sidebar_position: 9
---

# RL Run Data

When you use [`RLExecutor`](../API/rl-executor.md), it builds two data objects from the optimization
context before constructing your [`RLAgentEnv`](../API/rl-agent-env.md) subclass:

- [`EnvData`](../API/Models/environment-data.md) — spaces, defaults, and simulator callbacks for environments
- [`AgentData`](../API/Models/agent-data.md) — optimization state the agent reads directly

These types live under `adk.executors.rl` and are **not** part of the core ADK contract. The core ADK
parses the platform payload into [`OptimizationContext`](../API/optimization-context.md) via
[`BaseExecutor.build_optimization_context()`](../API/base-executor.md); only `RLExecutor` maps that
context into `EnvData` and `AgentData`. If you subclass `BaseExecutor` yourself, work with
`OptimizationContext` instead. See [Specifications](specifications.md) and [What To Do Next](../what-to-do-next.md).

```py
from adk.executors.rl import EnvData, AgentData, RLAgentEnv

class MyAgent(RLAgentEnv):
    def __init__(self, env_data: EnvData, agent_data: AgentData) -> None:
        super().__init__(env_data, agent_data)
        if agent_data.optimization_data.inference:
            ...
```

## EnvData

`EnvData` holds what most Gymnasium environment implementations need to turn an optimization
specification into an RL problem:

+ **World control spaces** — static, optimized, and randomized controllable parameters (`static_world_controls_space`, `optimized_world_controls_space`, `randomized_world_controls_space`).

+ **Default world controls** — starting values for each parameter group.

+ **World observation space** — evaluated observations the environment exposes to the agent.

+ **Targets space** — target value ranges used during optimization.

+ **Internal structure graph** — optional graph of the system under optimization (when instrumented).

+ **Default world features** — optional internal features extracted from the system.

+ **step_world** — callback to apply design parameters and read observations from the simulator.

+ **optimization_data** — inference flag and loaded [Genie model](../API/Models/genie-model.md) for the run.

[RL agents](rl-agents.md) typically pass `env_data` into `gymnasium.make` for a [built-in environment](environments.md) or
an [`OptimizationEnv`](../API/Environments/optimization-env.md) subclass. See the
[`EnvData`](../API/Models/environment-data.md) API page for the full field list.

## AgentData

`AgentData` is the slimmer companion passed alongside `EnvData`. It carries information your agent
needs that is not wired through the environment:

+ **optimization_data** — whether the run is in **inference** mode (using a learnt model) or **training** mode, and the loaded [Genie model](../API/Models/genie-model.md) (hyper-parameters, metadata, target specifications, world control specifications).

The [Genie model](../API/Models/genie-model.md) inside `optimization_data` reflects the model files
under `<models directory>/<name>/` selected for this optimization on the platform. See
[`AgentData`](../API/Models/agent-data.md) for the type definition.
