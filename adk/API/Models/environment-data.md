---
title: EnvData
description: Data passed to RL agents and environments for each optimization run
sidebar_position: 6
---

# EnvData

```py
class EnvData(BaseModel)
```

RL-specific data class built by [`RLExecutor`](../rl-executor.md) and passed to
[`RLAgentEnv`](../rl-agent-env.md) constructors. The core ADK does not construct `EnvData`; custom
executors use [`OptimizationContext`](../optimization-context.md) instead. Built-in and custom
environments on the RL path read from `env_data` to configure spaces and to call back into the
simulator.

## Import

```py
from adk.executors.rl import EnvData
```

## Definition

```py
class EnvData(BaseModel):
    static_world_controls_space: gym.spaces.Dict
    optimized_world_controls_space: gym.spaces.Dict
    randomized_world_controls_space: gym.spaces.Dict

    default_static_world_controls: dict[str, DesignParamValue]
    default_optimized_world_controls: dict[str, DesignParamValue]
    default_randomized_world_controls: dict[str, DesignParamValue]

    world_observations_space: gym.spaces.Dict
    default_world_observations: dict[str, ObservationValue]

    internal_structure_graph: nx.Graph | None
    default_world_features: dict[str, dict[str, float]] | None

    targets_space: gym.spaces.Dict

    step_world: StepWorldCB

    optimization_data: OptimizationData
```

## Members

### World control spaces
`static_world_controls_space`, `optimized_world_controls_space`, and `randomized_world_controls_space` are Gymnasium `Dict` spaces describing controllable parameters that are fixed, optimized, or randomly sampled.

### Default controls
`default_static_world_controls`, `default_optimized_world_controls`, and `default_randomized_world_controls` hold starting values for each group.

### Observations and targets
`world_observations_space` and `default_world_observations` describe evaluated measurements from the simulator. `targets_space` describes target value ranges for the optimization.

### Graph and features
`internal_structure_graph` is present when the model uses graph instrumentation. `default_world_features` holds optional internal feature values at default parameters.

### step_world

```py
step_world: StepWorldCB
```

Callback that applies design parameters to the simulator and returns raw observations, evaluated observations, and optional features. Used by [`OptimizationEnv`](../Environments/optimization-env.md) implementations.

### optimization_data

```py
optimization_data: OptimizationData
```

Contains the inference flag and loaded [`GenieModel`](genie-model.md) for this run.

See also [RL Run Data](../../Basics/rl-run-data.md).
