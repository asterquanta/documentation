---
title: OptimizationNodeSpec
description: Per-node optimization graph spec (read-only; built by the ADK)
sidebar_position: 2
---

# OptimizationNodeSpec

```py
class OptimizationNodeSpec(BaseModel)  # adk.models.optimization.optimization_node
```

:::caution Internal / read-only
Part of the platform payload parsed into [`OptimizationSpec`](optimization-spec.md). Not constructed
by agent code. Today the executor uses the first optimization node's graph only when building
[`OptimizationContext`](../../optimization-context.md).
:::

Per-node specification within an optimization graph: parameters, targets, and optional NetworkX
topology.

## Definition

```py
class OptimizationNodeSpec(BaseModel):
    name: str = Field(min_length=1)

    static_parameters: dict[str, DesignParamSpec]
    optimized_parameters: dict[str, DesignParamSpec]
    randomized_parameters: dict[str, DesignParamSpec]

    targets: dict[str, TargetSpec]

    model_config = ConfigDict(arbitrary_types_allowed=True)
    graph: nx.Graph | None
```

## Members

### name

```py
name: str = Field(min_length=1)
```

The unique identifier or name of the optimization node. Must be at least one character long.

### static_parameters

```py
static_parameters: dict[str, DesignParamSpec]
```

Dictionary of parameters with fixed values that remain constant throughout the optimization process. Each entry maps a parameter name to its corresponding `DesignParamSpec`.

### optimized_parameters

```py
optimized_parameters: dict[str, DesignParamSpec]
```

Dictionary of parameters that are subject to optimization. These parameters will be tuned or modified by the optimization algorithm to improve performance or meet objectives.

### randomized_parameters

```py
randomized_parameters: dict[str, DesignParamSpec]
```

Dictionary of parameters that are assigned randomized values. Typically used for stochastic optimization or to introduce variability in simulation runs.

### targets

```py
targets: dict[str, TargetSpec]
```

Collection of optimization targets associated with the node. Each key corresponds to a target name, and each value is a [runtime `TargetSpec`](targets.md).

### graph

```py
graph: nx.Graph | None
```

Optional NetworkX graph object representing the connectivity or relationship of the node within the larger optimization graph. Used to define dependencies or system topology.
