---
sidebar_position: 2
title: "Metadata"
---

# ModelMetadata

```py
class ModelMetadata(BaseModel)
```

A data class that is used to define and manage key information of a [Genie Model](genie-model.md).

## Definition

```py
class ModelMetadata(BaseModel):
    name: str
    description: str
    specifics: dict[str, Any]
    
    nn_arch: dict[str, Any]
    
    bypass: bool = False
    is_public: bool = False
    is_global: bool = False
    is_graph_instrumented: bool = False
    state: ModelState | None = ModelState.Learning
```

## Members

### name

```py
name: str
```

Name of the model. Completely user controlled.

### description

```py
description: str
```

Human-readable description describing the purpose of the model. For informal purposes only.

### specifics

```py
specifics: dict[str, Any]
```

Developer defined data that is loaded and provided by ADK. There are no restrictions on how this object can be structured, and it is the developer's responsibility to interpret and handle the structure accordingly.

### nn_arch

```py
nn_arch: dict[str, Any]
```

The Neural Network architecture. This is used to contruct the neural network at runtime dynamically (as opposed to hardcoding it in the code). As of now there are no restrictions on how this object can be structured, and it is the developer's responsibility to interpret and handle the structure accordingly.

### is_public

```py
is_public: bool = False
```

Declares whether the model should be visible to users other than the owner of the agent. Models are synced to the platform when the agent runs; see [Models](../../Basics/models.md).

### is_global

```py
is_global: bool = False
```

Declares whether the model is used in a global optimization (Needs access to more than one optimizable system in the same optimization run).

### is_graph_instrumented

```py
is_graph_instrumented: bool = False
```

Declares whether the optimization loop should produce and support extracting internal system features at the beginning, and during the optimization of a system.

### state

```py
state: ModelState | None = ModelState.Learning
```

Whether the model is in **training** (`learning`) or **inference** (`learnt`) mode. In JSON use
`"learning"` / `"learnt"` or integer codes `0` / `1`. Defaults to `learning` when omitted.

The executor may override inference when the platform requests a training run on a model still marked
`learning`.

### bypass

```py
bypass: bool = False
```

When set to `True`, bypasses all type checking, validations, and safeguards implemented by the ADK. This mode disables:
* World control specifications mapping and validation
* Target specifications mapping and validation
* Input/output type checking
* Data structure validations
* Safety constraints

This is useful for advanced use cases such as data collection, testing, benchmarking, or when you need full control over the optimization process without framework restrictions. Use with caution as it removes protective measures that ensure correct model behavior.
