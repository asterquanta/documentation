---
sidebar_position: 5
title: "BaseExecutor"
---

<<<<<<< HEAD
# class BaseExecutor

Abstract class that serves as the foundation for executing optimization tasks. Extends `Thread` and `ABC` to provide concurrent execution capabilities for optimization workflows.
=======

# BaseExecutor

```py
class BaseExecutor(ABC)
```

Abstract base for optimization executors. Subclass this when your optimization method is **not** the
built-in RL loop (or when you need full control over the run). `RLExecutor` extends `BaseExecutor`
and is the right choice for most Gymnasium-based RL agents.

Executes on a background thread; one instance is created per optimization job.
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86

## Import

```python
from adk.base_executor import BaseExecutor
```

<<<<<<< HEAD
## Members

- ### `controller: DomainController`
  - **Description**: The domain controller responsible for managing the optimization workflow, including communication with the platform and system execution.

&nbsp;

- ### `optimization_spec: OptimizationSpec`
  - **Description**: The specification defining the optimization problem, including parameters, targets, and system behavior. Retrieved from the controller.

&nbsp;

- ### `is_reset: bool`
  - **Description**: Flag indicating whether the executor is in a reset state.

&nbsp;

- ### `inference_satisfied_flag: Event`
  - **Description**: Threading event used to signal when the optimization inference has been satisfied or should stop execution.
=======

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

>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86

## Advanced / internal members

<<<<<<< HEAD
- ### \_\_init\_\_
  - **Description**: Initialize the `BaseExecutor` with optimization configuration and connection details. Sets up the domain controller, loads the Genie model, and prepares the execution environment.
  - **Takes**:
    - `optimization: Optimization`: The optimization configuration containing project, target, and model information.
    - `connection: WsThread`: WebSocket connection thread for communication with the platform.
  - **Returns: Nothing**
=======
:::caution
The following are ADK implementation details. Prefer [`build_optimization_context()`](optimization-context.md) and [`OptimizationContext`](optimization-context.md) in custom executors instead of reading these directly.
:::
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86

| Member | Description |
|--------|-------------|
| `controller` | Internal domain controller (`DomainController`) for simulator and WebSocket plumbing. |
| `optimization_spec` | Parsed platform wire-format [`OptimizationSpec`](Models/Optimization/optimization-spec.md). Superseded at run time by `OptimizationContext` for user logic. |

<<<<<<< HEAD
- ### run
  - **Description**: Abstract method defining the main execution loop. Must be implemented by subclasses to define specific optimization behavior.
  - **Takes: Nothing**
  - **Returns: Nothing**
=======
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86

## When to use BaseExecutor vs RLExecutor

<<<<<<< HEAD
- ### update_display
  - **Description**: Update the display/UI with current optimization and agent statistics.
  - **Takes**:
    - `optimization_stats: OptimizationStats`: Statistics object containing current optimization progress metrics and state.
    - `agent_stats: AgentStats`: Statistics object containing current agent performance metrics and state.
  - **Returns: Nothing**

&nbsp;

- ### stop
  - **Description**: Signal the executor to stop execution.
  - **Takes: Nothing**
  - **Returns: Nothing**

&nbsp;

- ### send_error
  - **Description**: Send an error message to the platform through the controller.
  - **Takes**:
    - `code: int`: Error code identifying the type of error.
    - `message: str`: Human-readable error message describing what went wrong.
  - **Returns: Nothing**

&nbsp;

- ### restart
  - **Description**: Restart the executor after an error has occurred, delegating to the controller for restart logic.
  - **Takes**:
    - `error: Exception`: The exception that triggered the restart.
  - **Returns: Nothing**

&nbsp;

- ### inference_satisfied
  - **Description**: Signal that inference has been satisfied by setting the `inference_satisfied_flag` event.
  - **Takes: Nothing**
  - **Returns: Nothing**
=======
| Use `RLExecutor` | Use custom `BaseExecutor` |
|------------------|---------------------------|
| Gymnasium env + RL agent | Evolutionary / Bayesian / heuristic optimizers |
| Standard `compute_action` / `experience` / `learn` loop | Custom iteration without Gymnasium |
| Built-in episode handling and checkpoint cadence | You manage all iteration logic |
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86
