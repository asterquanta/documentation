---
sidebar_position: 3
title: "Model TargetSpec"
---

# Model TargetSpec

```py
class TargetSpec(BaseModel)  # adk.models.model
```

Pydantic model for one entry in `target_specifications.json` and
[`GenieModel.target_specifications`](genie-model.md). Describes what targets an agent was trained for
and how observations are ordered.

:::note
Not the same as the **runtime** [`TargetSpec`](Optimization/targets.md) inside
[`OptimizationContext`](../optimization-context.md). Model specs are authored on disk; runtime specs
are built by the ADK when an optimization starts.
:::

## Definition

```py
class TargetSpec(BaseModel):
    label: str
    kind: RuntimeType
    points: int
    precisions: float | list[float] | list[list[float]]
    precision_kind: PrecisionType = PrecisionType.Absolute
    fn: Fn = Fn.Range
    description: str = ""
    order: int
```

In JSON, `fn`, `kind`, and `precision_kind` are usually strings (see below). The Python types are
`Fn`, `RuntimeType`, and `PrecisionType` enums.

## Members

### label

```py
label: str
```

A unique identifier which can be used to map user defined expressions (on the web interface) to actual agent specifications.

### description

```py
description: str = ""
```

Human-readable description describing the purpose of the target specification. For informal purposes only.

### fn

```py
fn: Fn
```

Objective function for the target. JSON accepts `"min"`, `"max"`, `"range"`, or `"equals"` (or integer codes `1`–`4`).

### kind

```py
kind: RuntimeType
```

Data shape for the target. JSON accepts `"scalar"`, `"vector"`, or `"series"` (or integer codes `0`–`2`). Two-dimensional data is represented as `series`.

### points

```py
points: int
```

Number of points required by the target. For `vector` and `series` targets, this represents the length. For `series`, this is the total number of elements across all rows. Not validated when `kind` is `scalar`.

### precisions

```py
precisions: float | list[float] | list[list[float]]
```

Tolerance or precision for optimization:
* When `kind` is `scalar`: a single float
* When `kind` is `vector`: a list of floats (one per point)
* When `kind` is `series`: a 2D list matching the series shape

Only applicable for `range` and `equals` objective functions.

### precision_kind

```py
precision_kind: PrecisionType = PrecisionType.Absolute
```

Whether `precisions` are absolute values or percentages of the target mean. JSON accepts `"absolute"` / `"percent"` (or `1` / `2`). Used when flattening target spaces in [`OptimizationEnv`](../Environments/optimization-env.md).

### order

```py
order: int
```

Used to sort observations before they are provided to the agent; must be unique across all target specifications on a model.

## Related

- [Runtime TargetSpec](Optimization/targets.md) — shape of `OptimizationContext.targets` at run time
- [Target specifications on disk](../../Basics/models.md)
