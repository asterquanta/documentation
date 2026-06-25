---
sidebar_position: 1
title: "AgentInterface"
---


# AgentInterface

```py
class AgentInterface(ABC)
```

Abstract interface for the **agent** half of an RL optimization — everything that is not the
Gymnasium environment step itself. Implement these methods on your [`RLAgentEnv`](rl-agent-env.md)
subclass. See [RL Agents](../Basics/rl-agents.md) for how `RLExecutor` drives your class through the optimization loop.

Model transfer, export, and import are **not** part of `AgentInterface`; use [`ModelHandler`](model-handler.md) for those.


## Import
```py
from adk.executors.rl import AgentInterface
```


## Members

| Member | Description |
|--------|-------------|
| `env_data` | [`EnvData`](Models/environment-data.md) constructed by [`RLExecutor`](rl-executor.md) and passed at construction. |
| `agent_data` | [`AgentData`](Models/agent-data.md) constructed by [`RLExecutor`](rl-executor.md) and passed at construction. |


## Methods

### compute_action

```py
def compute_action(self, observation, info) -> action
```

Choose an action given the current observation and step info dict from the environment.

### experience

```py
def experience(
    self,
    observation,
    info,
    action,
    reward,
    next_observation,
    next_info,
    terminated,
    truncated,
) -> None
```

Record one transition. Called once immediately after each `step`, in this argument order.

### learn

```py
def learn(self) -> None
```

Perform one learning update (e.g. gradient step). Called once after each `experience` call.

### save_models

```py
def save_models(self, save_to: Path) -> None
```

Persist agent state (weights, buffers, etc.) under the given directory. Training runs trigger saves periodically via `RLExecutor`.

### load_models

```py
def load_models(self, load_from: Path) -> None
```

Restore agent state from the given directory at the start of each optimization run.

:::info
After `save_models` followed by `load_models`, external behaviour must match the saved state — the platform and your tests should see identical actions for identical observations.
:::

## Related types

Observation and action types depend on your environment; the ADK uses `Any` at the interface boundary. Gymnasium `spaces` on your env define the concrete shapes.
