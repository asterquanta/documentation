---
sidebar_position: 1
title: "OptimizationEnv"
---


# class OptimizationEnv
Abstract class to define an environment for interacting with optimizable systems. Highly recommended
for custom environments and heavily used in default environments alike.


## Import
```py
from adk.envs.optimization_env import OptimizationEnv
```


## Members
- ### `env_data: EnvData`
    + **Description**: Information relevant to constructing the internal environment interface. Contains optimization data, world control specifications, target specifications, and other environment configuration.

&nbsp;

- ### `flat_world_control_space: gymnasium.spaces.Box`
    + **Description**: The flattened bounds of the controllable parameters of the system being optimized. Created by flattening the `env_data.optimized_world_controls_space`.

&nbsp;

- ### `flat_world_observation_space: gymnasium.spaces.Box`
    + **Description**: The flattened bounds of the observable parameters of the system being optimized. Created by flattening the `env_data.world_observations_space`.

&nbsp;

- ### `flat_target_space: gymnasium.spaces.Box`
    + **Description**: The flattened target space representing the desired values for observations. Created by flattening the `env_data.targets_space` and incorporating precision values.

&nbsp;

- ### `flat_default_world_controls: numpy.typing.NDArray[numpy.float32]`
    + **Description**: The default world controls in flattened array form, evaluated from `env_data.default_optimized_world_controls`.

&nbsp;

- ### `flat_default_world_observations: numpy.typing.NDArray[numpy.float32]`
    + **Description**: The default world observations in flattened array form, evaluated from `env_data.default_world_observations`.


## Methods
- ### __init__
    + **Description**: Initialize the OptimizationEnv with the given environment data.
    + **Takes**:
        + `env_data: EnvData`: The environment-specific data used for initialization.
        + `**kwargs`: Additional keyword arguments.
    + **Returns: Nothing**

&nbsp;

- ### flatten_world_controls
    + **Description**: Convert a dictionary of world controls into a flattened numpy array according to the internal ordering.
    + **Takes**:
        + `world_controls: dict[str, DesignParamValue]`: Dictionary mapping world control labels to their values.
    + **Returns**:
        + `flat_world_controls: numpy.typing.NDArray[numpy.float32]`: The flattened array of world control values.

&nbsp;

- ### flatten_world_observations
    + **Description**: Convert a dictionary of world observations into a flattened numpy array according to the internal ordering.
    + **Takes**:
        + `world_observations: dict[str, ObservationValue]`: Dictionary mapping world observation labels to their values.
    + **Returns**:
        + `flat_world_observations: numpy.typing.NDArray[numpy.float32]`: The flattened array of world observation values.

&nbsp;

- ### step_world
    + **Description**: Apply the provided world controls to the system and return the resulting observations. This method validates that controls are within bounds, merges them with default controls, executes the world step, and returns flattened observations.
    + **Takes**:
        + `flat_world_controls: numpy.typing.NDArray`: The flattened array of world controls to apply.
        + `is_reset: bool` (optional, default=False): Whether this step represents a reset of the environment.
    + **Returns**:
        + `flat_world_observations: numpy.typing.NDArray[numpy.float32]`: The flattened observations obtained from running the system with the given world controls.
    + **Raises**:
        + `ValueError`: If the provided world controls are not within the world control bounds.

&nbsp;

- ### construct_equivalence_targets
    + **Description**: Construct equivalence targets from the flat target space. These represent the center points of the target ranges and are useful for calculating distances from different intended target types.
    + **Takes: Nothing**
    + **Returns**:
        + `equivalence_targets: numpy.typing.NDArray[numpy.float32]`: The equivalence targets calculated as the midpoint between the low and high bounds of the flat target space.

&nbsp;

- ### construct_target_precisions
    + **Description**: Construct target precision values from the flat target space. These represent the tolerance ranges for each target.
    + **Takes: Nothing**
    + **Returns**:
        + `target_precisions: numpy.typing.NDArray[numpy.float32]`: The precision values calculated as half the range between the high and low bounds of the flat target space.