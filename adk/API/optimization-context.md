---
sidebar_position: 6
title: "OptimizationContext"
---


# OptimizationContext

```py
class OptimizationContext(BaseModel)
```

Domain-agnostic description of an optimization job, returned by
[`BaseExecutor.build_optimization_context()`](base-executor.md). Use this when implementing a
**custom executor** to read parameters, step the simulator, and report results without going through
RL env/agent types.


## Import
```py
from adk.models.optimization_context import OptimizationContext
```


## Fields

| Field | Description |
|-------|-------------|
| `static_parameters` | Fixed design parameters for this run ([`DesignParamSpec`](Models/Optimization/design-parameters.md)). |
| `optimized_parameters` | Parameters your algorithm may change. |
| `randomized_parameters` | Parameters sampled stochastically each step/episode. |
| `default_*_parameters` | Default values for each parameter group. |
| `targets` | Target specs keyed by name ([runtime TargetSpec](Models/Optimization/targets.md)). |
| `default_observations` | Observation values at default parameters. |
| `internal_structure_graph` | Optional NetworkX graph of the system (when instrumented). |
| `default_world_features` | Optional internal feature values at defaults. |
| `optimization_data` | Inference flag and loaded [`GenieModel`](Models/genie-model.md). |
| `step_world` | Callable `(design_params, is_reset, extract_features) → (raw_obs, obs, features)`. |
| `update_display` | Callable to push stats to the platform. |
| `send_error` | Callable `(code, message)` for errors. |
| `finish_optimization` | Callable `(OptimizationCompleteCode, message)` to end the run. |
| `is_stop_requested` | Callable returning `True` when the user or platform requested stop. |


## Example

```py
def run(self) -> None:
    ctx = self.build_optimization_context()

    params = dict(ctx.default_optimized_parameters)
    while not ctx.is_stop_requested():
        _, observations, _ = ctx.step_world(params, is_reset=False, extract_features=False)
        # ... update params based on your algorithm ...
        ctx.update_display(self._optimization_stats)

    ctx.finish_optimization(OptimizationCompleteCode.Limit, "Finished.")
```

When using [`RLExecutor`](rl-executor.md), your agent receives [`EnvData`](Models/environment-data.md) and [`AgentData`](Models/agent-data.md) instead — `RLExecutor` builds those from the same underlying context. See [RL Agents](../Basics/rl-agents.md) and [RL Run Data](../Basics/rl-run-data.md).
