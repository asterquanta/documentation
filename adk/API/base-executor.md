---
sidebar_position: 5
title: "BaseExecutor"
---


# BaseExecutor

```py
class BaseExecutor(ABC)
```

Abstract base for optimization executors. Subclass this when your optimization method is **not** the
built-in RL loop (or when you need full control over the run). `RLExecutor` extends `BaseExecutor`
and is the right choice for most Gymnasium-based RL agents.

Executes on a background thread; one instance is created per optimization job.


## Import
```py
from adk.base_executor import BaseExecutor
```


## Implementing a custom executor

```py
from adk.base_executor import BaseExecutor
from adk.models.optimization_complete import OptimizationCompleteCode

class MyOptimizerExecutor(BaseExecutor):
    def run(self) -> None:
        ctx = self.build_optimization_context()

        while not ctx.is_stop_requested():
            # Read specs: ctx.optimized_parameters, ctx.targets, ctx.default_observations
            # Step simulator: ctx.step_world(design_params, is_reset=False, extract_features=False)
            # Report progress: ctx.update_display(optimization_stats, runtime_stats)
            pass

        ctx.finish_optimization(
            OptimizationCompleteCode.Limit,
            "Done.",
        )
```

Pass the class to [`Connector`](connector.md):

```py
app = Connector(MyOptimizerExecutor, model_handler=MyModelHandler)
```


## Constructor (instantiated by the ADK)

The ADK constructs your executor when the platform starts an optimization. You do not call this
constructor from agent code. Subclass `__init__` only if you need to accept extra kwargs forwarded
from [`Connector`](connector.md) (for example `RLExecutor`'s `rl_agent_env_class`).

| Parameter | Description |
|-----------|-------------|
| `optimization` | Job metadata: optimization id, project id, genie model name, inference flag. |
| `connection` | WebSocket handle for platform communication during the run. |

Additional kwargs come from `Connector(..., **executor_kwargs)`.


## Methods you must implement

### run

```py
def run(self) -> None
```

Main optimization loop. Called on the executor thread when the platform starts an optimization.


## Methods provided to subclasses

### build_optimization_context

```py
def build_optimization_context(self) -> OptimizationContext
```

Builds a domain-agnostic view of the problem: parameter specs, targets, default observations,
`step_world` callback, and UI hooks. See [`OptimizationContext`](optimization-context.md).

### update_display

```py
def update_display(self, optimization_stats, runtime_stats=None) -> None
```

Push progress to the platform UI. `optimization_stats` is an `OptimizationStats` object;
`runtime_stats` can be a Pydantic model or dict with agent-specific metrics.

### request_stop / stop

```py
def request_stop(self) -> None
def stop(self) -> None
```

Signal the run should end. The platform may also set the internal stop flag.

### send_error

```py
def send_error(self, code, message) -> None
```

Report a fatal or recoverable error to the platform.

### restart

```py
def restart(self, error) -> None
```

Delegate reconnection logic to the domain controller after a WebSocket error.

### finish_optimization

```py
def finish_optimization(self, code, message) -> None
```

Mark the optimization complete. Use `OptimizationCompleteCode` values such as `Satisfied` or `Limit`.


## Members

| Member | Description |
|--------|-------------|
| `is_reset` | Reset-state flag used during world stepping. |


## Advanced / internal members

:::caution
The following are ADK implementation details. Prefer [`build_optimization_context()`](optimization-context.md) and [`OptimizationContext`](optimization-context.md) in custom executors instead of reading these directly.
:::

| Member | Description |
|--------|-------------|
| `controller` | Internal domain controller (`DomainController`) for simulator and WebSocket plumbing. |
| `optimization_spec` | Parsed platform wire-format [`OptimizationSpec`](Models/Optimization/optimization-spec.md). Superseded at run time by `OptimizationContext` for user logic. |


## When to use BaseExecutor vs RLExecutor

| Use `RLExecutor` | Use custom `BaseExecutor` |
|------------------|---------------------------|
| Gymnasium env + RL agent | Evolutionary / Bayesian / heuristic optimizers |
| Standard `compute_action` / `experience` / `learn` loop | Custom iteration without Gymnasium |
| Built-in episode handling and checkpoint cadence | You manage all iteration logic |
