---
title: Runtime TargetSpec
description: Target shapes on OptimizationContext at run time (read-only)
sidebar_position: 4
draft: true
---

# Runtime TargetSpec

```py
class TargetSpec(BaseModel)  # adk.models.optimization.targets
```

:::note
Not the same as the **model** [`TargetSpec`](../target-specifications.md) in
`target_specifications.json`. Runtime specs appear in [`OptimizationContext.targets`](../optimization-context.md)
after the ADK parses the platform payload. You read these during optimization; you do not author them
on disk.
:::

Base type for target entries in the optimization context. Subclasses add value and observation
bounds for scalar, vector, and matrix shapes.

## Definition

```py
class TargetSpec(BaseModel):
    name: str = Field(min_length=1)
    fn: Fn
```

## Members

### name

```py
name: str = Field(min_length=1)
```

The unique identifier or name of the target. Must contain at least one character.

### fn

```py
fn: Fn
```

The objective function associated with the target. Defines how the optimization process measures and evaluates success or deviation from desired outcomes.

---

# ValueBounds

```py
class ValueBounds(BaseModel)
```

Defines the lower and upper numeric limits for a single scalar value used in a target specification.

## Definition

```py
class ValueBounds(BaseModel):
    min: float
    max: float
```

## Members

### min

```py
min: float
```

Minimum allowable value for the target or observed data.

### max

```py
max: float
```

Maximum allowable value for the target or observed data.

---

# ScalarTargetSpec

```py
class ScalarTargetSpec(TargetSpec)
```

Extends `TargetSpec` to represent a scalar target specification, including bounds for both target and observation values.

## Definition

```py
class ScalarTargetSpec(TargetSpec):
    target_values: ValueBounds
    observation_bounds: ValueBounds
```

## Members

### target_values

```py
target_values: ValueBounds
```

The desired target value range that the optimization aims to achieve.

### observation_bounds

```py
observation_bounds: ValueBounds
```

The permissible range of observed values during optimization for validation and constraint checking.

---

# VectorTargetSpec

```py
class VectorTargetSpec(TargetSpec)
```

Extends `TargetSpec` to define vector-based targets, supporting multiple elements each with their own bounds.

## Definition

```py
class VectorTargetSpec(TargetSpec):
    target_values: list[ValueBounds]
    observation_bounds: list[ValueBounds]
```

## Members

### target_values

```py
target_values: list[ValueBounds]
```

List of value bounds representing the desired range for each element in the target vector.

### observation_bounds

```py
observation_bounds: list[ValueBounds]
```

List of value bounds defining acceptable observed ranges for each vector element during optimization.

---

# MatrixTargetSpec

```py
class MatrixTargetSpec(TargetSpec)
```

Extends `TargetSpec` to define matrix-based targets for multidimensional optimization objectives.

## Definition

```py
class MatrixTargetSpec(TargetSpec):
    target_values: list[list[ValueBounds]]
    observation_bounds: list[list[ValueBounds]]
```

## Members

### target_values

```py
target_values: list[list[ValueBounds]]
```

Nested list of `ValueBounds` defining the target value range for each cell in the matrix target.

### observation_bounds

```py
observation_bounds: list[list[ValueBounds]]
```

Nested list of `ValueBounds` defining the acceptable observed range for each matrix element during optimization.
