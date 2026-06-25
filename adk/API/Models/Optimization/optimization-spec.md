---
title: OptimizationSpec
description: Platform wire-format for optimization jobs (read-only; built by the ADK)
sidebar_position: 3
draft: true
---

# OptimizationSpec

```py
class OptimizationSpec(BaseModel)  # adk.models.optimization.optimization_spec
```

:::caution Internal / read-only
The ADK builds this from the platform payload when an optimization starts. Agent authors should use
[`OptimizationContext`](../optimization-context.md) (or `EnvData` / `AgentData` on the RL path), not
construct or parse `OptimizationSpec` directly. `step_system` is implemented by the domain layer,
not by user code.
:::

Wire-format description of an optimization job: nodes, parameters, targets, and the batched simulator
callback.

## Definition

```py
class OptimizationSpec(BaseModel):
    inference: bool
    genie_model: str

    optimization_nodes: dict[str, OptimizationNodeSpec]

    static_parameters: dict[str, DesignParamSpec]
    optimized_parameters: dict[str, DesignParamSpec]
    randomized_parameters: dict[str, DesignParamSpec]

    targets: dict[str, TargetSpec]

    step_system: BatchedStepWorldCB
```

## Members

### inference

```py
inference: bool
```

Indicates whether the optimization process is running in inference mode. When `True`, the system performs evaluation without learning or modifying parameters.

### genie_model

```py
genie_model: str
```

Identifier or name of the Genie model used in the optimization process. Defines the model architecture or behavior under optimization.

### optimization_nodes

```py
optimization_nodes: dict[str, OptimizationNodeSpec]
```

Dictionary containing the specification of all optimization nodes involved in the process. Each key is a node name, and each value is an `OptimizationNodeSpec` describing that node's configuration, parameters, and targets.

### static_parameters

```py
static_parameters: dict[str, DesignParamSpec]
```

Dictionary of parameters with fixed values that remain constant during optimization. Typically represent system constants or non-tunable configurations.

### optimized_parameters

```py
optimized_parameters: dict[str, DesignParamSpec]
```

Dictionary of parameters that are actively optimized by the system to achieve the defined objectives.

### randomized_parameters

```py
randomized_parameters: dict[str, DesignParamSpec]
```

Dictionary of parameters that are randomly varied to introduce diversity or stochastic behavior in the optimization process.

### targets

```py
targets: dict[str, TargetSpec]
```

Dictionary defining the optimization targets. Each entry is a [runtime `TargetSpec`](Optimization/targets.md).

### step_system

```py
step_system: BatchedStepWorldCB
```

A callable function that executes one batched optimization step in the system. It takes as input:

- A dictionary mapping node and parameter names to their respective values (`dict[str, dict[str, DesignParamValue]]`).
- Two boolean flags controlling step behavior (e.g., inference and reset conditions).

It returns a tuple containing:

1. A dictionary of system observations.
2. A dictionary of measured outcomes.
3. A dictionary of additional metadata or runtime outputs.

## Related Type Definitions

### DesignParamValue

```py
DesignParamValue = float | str
```

Represents a single design parameter value, which can be either numeric or string-based.

### ObservationValue

```py
ObservationValue = float | list[float] | list[list[float]]
```

Represents the observed value from the system, supporting scalar, vector, and matrix-like data.

### StepWorldCB

```py
StepWorldCB
```

A callable for performing a single (non-batched) world step, handling one set of parameters at a time.

### BatchedStepWorldCB

```py
BatchedStepWorldCB
```

A callable for performing a batched world step, processing multiple parameter sets or optimization nodes simultaneously. Returns structured observation, measurement, and metadata dictionaries.
