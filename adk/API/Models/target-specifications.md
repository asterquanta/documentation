---
sidebar_position: 3
title: "Target Specifications"
---

# class TargetSpec

A dataclass that captures all necessary data to represent a target that an agent can achieve.

## Definition

```python
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

## Members

- ### `label: str`
  - **Description**: A unique identifier which can be used to map user defined expressions (on the
    web interface) to actual agent definitions. Maximum 24 characters.

&nbsp;

- ### `kind: RuntimeType`
  - **Description**: Declare the type of target used for type checking. Accepts a `RuntimeType` value, string, or integer representation:
    - `scalar`: A single numerical value
    - `vector`: A one-dimensional array of values
    - `series`: A time-series or sequential data structure
    - `matrix`: A two-dimensional array of values

&nbsp;

- ### `points: int`
  - **Description**: Number of points that are required by the target. For `vector` and `series` targets,
    this represents the length. For `matrix` targets, this represents the total number of elements
    (rows × columns). Number of points is not checked when `kind` is `scalar`. Must be greater than 0 when `kind` is `vector`.

&nbsp;

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

&nbsp;

- ### `order: int`
  - **Description**: Used to sort all observations before being provided to the agent, ensures
    data integrity.