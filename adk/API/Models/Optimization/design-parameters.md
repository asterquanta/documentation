---
title: DesignParamSpec
description: Design parameter shapes on OptimizationContext at run time (read-only)
sidebar_position: 1
draft: true
---

# DesignParamSpec

```py
class DesignParamSpec(BaseModel)  # adk.models.optimization.design_params
```

:::note
These types describe parameters on [`OptimizationContext`](../optimization-context.md) after the ADK
parses the platform payload. You read `ctx.optimized_parameters` and similar fields at run time; you
do not construct `DesignParamSpec` in agent code.
:::

Specification for a single design parameter: default value and continuous or discrete bounds.

## Definition

```py
class DesignParamSpec(BaseModel):
    bounds: DesignParamBounds
    default: SpecifiedDesignParam
```

## Members

### bounds

```py
bounds: DesignParamBounds
```

Defines the valid range or set of values the parameter can take. Can be either continuous (`ContinuousDesignParamBounds`) or discrete (`DiscreteDesignParamBounds`).

### default

```py
default: SpecifiedDesignParam
```

Specifies the default configuration of the parameter, including its name, location, and initial value.

---

# SpecifiedDesignParam

```py
class SpecifiedDesignParam(BaseModel)
```

Defines a single design parameter with a name, internal location, and assigned value. Used to represent the default or user-specified state of a design parameter.

## Definition

```py
class SpecifiedDesignParam(BaseModel):
    name: str = Field(min_length=1)
    location: str
    value: float | str
```

## Members

### name

```py
name: str = Field(min_length=1)
```

The identifier for the design parameter. Must be at least one character long.

### location

```py
location: str
```

**Internal.** Mapping key used by the ADK for inverse mapping to simulator locations. Present on
parsed platform payloads; not something agent authors set in project files.

### value

```py
value: float | str
```

The current or default value assigned to the parameter. Can be numeric or string-based, depending on parameter type.

---

# DesignParamBounds

```py
class DesignParamBounds(BaseModel)
```

Marker base type for parameter bounds. Subclass with [`ContinuousDesignParamBounds`](#continuousdesignparambounds) or [`DiscreteDesignParamBounds`](#discretedesignparambounds).

## Definition

```py
class DesignParamBounds(BaseModel):
    pass
```

---

# ContinuousDesignParamBounds

```py
class ContinuousDesignParamBounds(DesignParamBounds)
```

Defines the lower and upper numeric limits for a continuous design parameter.

## Definition

```py
class ContinuousDesignParamBounds(DesignParamBounds):
    min: float
    max: float
```

## Members

### min

```py
min: float
```

Minimum allowable numeric value for the parameter.

### max

```py
max: float
```

Maximum allowable numeric value for the parameter.

---

# DiscreteDesignParamBounds

```py
class DiscreteDesignParamBounds(DesignParamBounds)
```

Defines a finite set of discrete permissible values for a design parameter.

## Definition

```py
class DiscreteDesignParamBounds(DesignParamBounds):
    possibilities: list[float | str]
```

## Members

### possibilities

```py
possibilities: list[float | str]
```

A list of valid discrete values the parameter can take. Each element can be a float or string, depending on the parameter's nature.
