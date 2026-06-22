---
sidebar_position: 1
title: "OptimizationEnv"
---


# OptimizationEnv

```py
class OptimizationEnv(ABC, gym.Env)
```

Abstract class to define an environment for interacting with optimizable systems. Highly recommended
for custom environments and heavily used in default environments alike.


## Import
```py
from adk.executors.rl.envs.optimization_env import OptimizationEnv
from adk.executors.rl import EnvData
```


## Members

### env_data

```py
env_data: EnvData
```

Information relevant to constructing the internal environment interface. Contains optimization data, world control specifications, target specifications, and other environment configuration.

### flat_world_control_space

```py
flat_world_control_space: gymnasium.spaces.Box
```

The flattened bounds of the controllable parameters of the system being optimized. Created by flattening the `env_data.optimized_world_controls_space`.

### flat_world_observation_space

```py
flat_world_observation_space: gymnasium.spaces.Box
```

The flattened bounds of the observable parameters of the system being optimized. Created by flattening the `env_data.world_observations_space`.

### flat_target_space

```py
flat_target_space: gymnasium.spaces.Box
```

The flattened target space representing the desired values for observations. Created by flattening the `env_data.targets_space` and incorporating precision values.

### flat_default_world_controls

```py
flat_default_world_controls: numpy.typing.NDArray[numpy.float32]
```

The default world controls in flattened array form, evaluated from `env_data.default_optimized_world_controls`.

### flat_default_world_observations

```py
flat_default_world_observations: numpy.typing.NDArray[numpy.float32]
```

The default world observations in flattened array form, evaluated from `env_data.default_world_observations`.


## Methods

### __init__

```py
def __init__(self, env_data: EnvData) -> None
```

Initialize the OptimizationEnv with the given environment data.

**Takes:**
- `env_data: EnvData`: The environment-specific data used for initialization (provided by [`RLExecutor`](../rl-executor.md) on each run).

**Returns:** Nothing

Subclasses such as [`DirectActionEnv`](direct-action-env.md) accept additional constructor kwargs for reward tuning; those are not forwarded to this base `__init__`.

### flatten_world_controls

```py
def flatten_world_controls(self, world_controls: dict[str, DesignParamValue]) -> NDArray[numpy.float32]
```

Convert a dictionary of world controls into a flattened numpy array according to the internal ordering.

**Takes:**
- `world_controls: dict[str, DesignParamValue]`: Dictionary mapping world control labels to their values.

**Returns:**
- `flat_world_controls: numpy.typing.NDArray[numpy.float32]`: The flattened array of world control values.

### flatten_world_observations

```py
def flatten_world_observations(self, world_observations: dict[str, ObservationValue]) -> NDArray[numpy.float32]
```

Convert a dictionary of world observations into a flattened numpy array according to the internal ordering.

**Takes:**
- `world_observations: dict[str, ObservationValue]`: Dictionary mapping world observation labels to their values.

**Returns:**
- `flat_world_observations: numpy.typing.NDArray[numpy.float32]`: The flattened array of world observation values.

### step_world

```py
def step_world(
    self,
    flat_world_controls: NDArray,
    is_reset: bool = False,
    *,
    extract_features: bool = False,
) -> tuple[NDArray[numpy.float32], dict[str, dict[str, float]] | None]
```

Apply the provided world controls to the system and return the resulting observations. This method validates that controls are within bounds, merges them with default controls, executes the world step via `env_data.step_world`, and returns flattened observations.

**Takes:**
- `flat_world_controls: numpy.typing.NDArray`: The flattened array of world controls to apply.
- `is_reset: bool` (optional, default=False): Whether this step represents a reset of the environment.
- `extract_features: bool` (keyword-only, default=False): Whether to extract internal graph features (when the model is graph-instrumented).

**Returns (as a tuple):**
- `flat_world_observations: numpy.typing.NDArray[numpy.float32]`: Flattened observations from the simulator.
- `world_features: dict[str, dict[str, float]] | None`: Optional per-domain feature dict when `extract_features=True`; otherwise `None`.

**Raises:**
- `ValueError`: If the provided world controls are not within the world control bounds.

### construct_equivalence_targets

```py
def construct_equivalence_targets(self) -> NDArray[numpy.float32]
```

Construct equivalence targets from the flat target space. These represent the center points of the target ranges and are useful for calculating distances from different intended target types.

**Takes:** Nothing

**Returns:**
- `equivalence_targets: numpy.typing.NDArray[numpy.float32]`: The equivalence targets calculated as the midpoint between the low and high bounds of the flat target space.

### construct_target_precisions

```py
def construct_target_precisions(self) -> NDArray[numpy.float32]
```

Construct target precision values from the flat target space. These represent the tolerance ranges for each target.

**Takes:** Nothing

**Returns:**
- `target_precisions: numpy.typing.NDArray[numpy.float32]`: The precision values calculated as half the range between the high and low bounds of the flat target space.
