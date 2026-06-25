---
title: AgentData
description: Data class representing the agent's optimization-related state
sidebar_position: 5
---

# AgentData

```py
class AgentData(BaseModel)
```

RL-specific data class built by [`RLExecutor`](../rl-executor.md) and passed alongside
[`EnvData`](environment-data.md) to [`RLAgentEnv`](../rl-agent-env.md) constructors. The core ADK does
not construct `AgentData`; custom executors use [`OptimizationContext`](../optimization-context.md)
instead.

## Import

```py
from adk.executors.rl import AgentData
```

## Definition

```py
class AgentData(BaseModel):
    optimization_data: OptimizationData

    model_config = ConfigDict(
        arbitrary_types_allowed=True
    )
```

## Members

### optimization_data

```py
optimization_data: OptimizationData
```

Contains the inference flag and loaded [`GenieModel`](genie-model.md) for this run. `RLExecutor`
populates this from the same optimization context as `EnvData`.

See also [RL Run Data](../../Basics/rl-run-data.md).