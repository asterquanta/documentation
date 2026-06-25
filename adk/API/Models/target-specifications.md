---
sidebar_position: 3
title: "Model TargetSpec"
---

<<<<<<< HEAD
# class TargetSpec

A dataclass that captures all necessary data to represent a target that an agent can achieve.

## Definition

```python
=======
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
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86
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

<<<<<<< HEAD
## Members

- ### `label: str`
  - **Description**: A unique identifier which can be used to map user defined expressions (on the
    web interface) to actual agent definitions. Maximum 24 characters.
=======
In JSON, `fn`, `kind`, and `precision_kind` are usually strings (see below). The Python types are
`Fn`, `RuntimeType`, and `PrecisionType` enums.

## Members
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86

### label

<<<<<<< HEAD
- ### `kind: RuntimeType`
  - **Description**: Declare the type of target used for type checking. Accepts a `RuntimeType` value, string, or integer representation:
    - `scalar`: A single numerical value
    - `vector`: A one-dimensional array of values
    - `series`: A time-series or sequential data structure
    - `matrix`: A two-dimensional array of values
=======
```py
label: str
```

A unique identifier which can be used to map user defined expressions (on the web interface) to actual agent specifications.

### description

```py
description: str = ""
```

Human-readable description describing the purpose of the target specification. For informal purposes only.
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86

### fn

<<<<<<< HEAD
- ### `points: int`
  - **Description**: Number of points that are required by the target. For `vector` and `series` targets,
    this represents the length. For `matrix` targets, this represents the total number of elements
    (rows × columns). Number of points is not checked when `kind` is `scalar`. Must be greater than 0 when `kind` is `vector`.
=======
```py
fn: Fn
```
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86

Objective function for the target. JSON accepts `"min"`, `"max"`, `"range"`, or `"equals"` (or integer codes `1`–`4`).

<<<<<<< HEAD
- ### `precisions: float | list[float] | list[list[float]]`
  - **Description**: Specify the tolerance or precision to which an observation should be optimized to. All precision values must be greater than 0:
    - When `kind` is `scalar`: A single float value
    - When `kind` is `vector`: A list of float values whose length must equal `points`
    - When `kind` is `series`: A 2D list of float values where all rows must be equal in length and the total number of elements must equal `points`

  Only applicable for `range` and `equals` objective functions.

&nbsp;

- ### `precision_kind: PrecisionType = PrecisionType.Absolute`
  - **Description**: Specifies how precision values should be interpreted. Accepts a `PrecisionType` value, string, or integer representation. Defaults to `PrecisionType.Absolute`.

&nbsp;

- ### `fn: Fn = Fn.Range`
  - **Description**: Objective function that should be used for the particular target. Accepts an `Fn` value, string, or integer representation. Defaults to `Fn.Range`.

&nbsp;

- ### `description: str = ""`
  - **Description**: Human-readable description describing the purpose of the target. For
    informal purposes only. Defaults to an empty string. Maximum 256 characters.
=======
### kind
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86

```py
kind: RuntimeType
```

<<<<<<< HEAD
- ### `order: int`
  - **Description**: Used to sort all observations before being provided to the agent, ensures
    data integrity.
=======
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
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86
