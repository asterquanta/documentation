---
sidebar_position: 9
title: "Genie Model"
---


# GenieModel

```py
class GenieModel(BaseModel)
```

A high-level data class that structures all necessary information required by an agent for
optimizing a particular system.


## Definition
```py
class GenieModel(BaseModel):
    hyperparameters: dict[str, Any]
    model_metadata: ModelMetadata
    target_specifications: list[TargetSpec]
    world_control_specifications: list[WorldControlSpec]
```

## Members

### hyperparameters

```py
hyperparameters: dict[str, Any]
```

A key-value pair of all user defined hyperparameters that are local to a particular model. For more information check [Hyper Parameters](hyper-parameters.md) (`hyper_parameters.json` on disk).

### model_metadata

```py
model_metadata: ModelMetadata
```

Stores user defined information that is used on the platform and at agent initialization. For more information check [Metadata](metadata.md).

### target_specifications

```py
target_specifications: list[TargetSpec]
```

Specifications that clearly define what kind of targets an agent was trained for/is capable of achieving. Also defines the observation space that is expected by the agent. For more information check [Model TargetSpec](target-specifications.md).

### world_control_specifications

```py
world_control_specifications: list[WorldControlSpec]
```

Specifications that define the action space for an agent. The `order` members of each element in the list must be unique across the list for ordering purposes. For more information check [World Control Specifications](world-control-specifications.md).