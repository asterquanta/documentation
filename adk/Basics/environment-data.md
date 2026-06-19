---
sidebar_position: 8
---

# Environment Data

## Explanation

Environment Data is a data structure containing all the data generally required for most environment
implementations to optimize a system. Environment data contains the following information:

- **Static World Control Space**: The space of the controllable parameters that remain fixed throughout optimization.

- **Optimized World Control Space**: The space of the controllable parameters that are actively optimized.

- **Randomized World Control Space**: The space of the controllable parameters that are sampled stochastically during optimization.

- **Default Static World Controls**: The default values of the static controllable parameters.

- **Default Optimized World Controls**: The default starting state of the actively optimized parameters.

- **Default Randomized World Controls**: The default values of the stochastically sampled parameters.

- **World Observation Space**: The space of all observable **evaluated** observations.

- **Default World Observations**: The default observed values of the system at initialization.

- **Internal Structure Graph**: An optional graph representing the internal structure of the system, used when graph instrumentation is enabled.

- **Default World Features**: An optional mapping of domain-level internal system features extracted at initialization, used when graph instrumentation is enabled.

- **Targets Space**: The space of the targets that are to be optimized for.

- **Step World (routine)**: Method regarding how the system's controllable parameters are to be set during optimization.

- **Optimization Data**: Runtime optimization configuration, including inference mode and the loaded Genie model.

## Definition

```python
class EnvData(BaseModel):
    static_world_controls_space: gym.spaces.Dict
    optimized_world_controls_space: gym.spaces.Dict
    randomized_world_controls_space: gym.spaces.Dict

    default_static_world_controls: dict[str, DesignParamValue]
    default_optimized_world_controls: dict[str, DesignParamValue]
    default_randomized_world_controls: dict[str, DesignParamValue]

    world_observations_space: gym.spaces.Dict
    default_world_observations: dict[str, ObservationValue]

    internal_structure_graph: nx.Graph | None
    default_world_features: dict[str, dict[str, float]] | None

    targets_space: gym.spaces.Dict

    step_world: StepWorldCB

    optimization_data: OptimizationData
```

## Members

- ### `static_world_controls_space: gym.spaces.Dict`
  - **Description**: The space of the controllable parameters that remain fixed and are not optimized during the optimization run.

&nbsp;

- ### `optimized_world_controls_space: gym.spaces.Dict`
  - **Description**: The space of the controllable parameters that are actively optimized by the agent.

&nbsp;

- ### `randomized_world_controls_space: gym.spaces.Dict`
  - **Description**: The space of the controllable parameters that are sampled stochastically during optimization.

&nbsp;

- ### `default_static_world_controls: dict[str, DesignParamValue]`
  - **Description**: The default values of the static controllable parameters.

&nbsp;

- ### `default_optimized_world_controls: dict[str, DesignParamValue]`
  - **Description**: The default starting state of the actively optimized controllable parameters.

&nbsp;

- ### `default_randomized_world_controls: dict[str, DesignParamValue]`
  - **Description**: The default values of the stochastically sampled controllable parameters.

&nbsp;

- ### `world_observations_space: gym.spaces.Dict`
  - **Description**: The space of all observable **evaluated** observations of the system.

&nbsp;

- ### `default_world_observations: dict[str, ObservationValue]`
  - **Description**: The default observed values of the system at initialization.

&nbsp;

- ### `internal_structure_graph: nx.Graph | None`
  - **Description**: An optional graph representing the internal structure of the system. Populated when graph instrumentation is enabled via `is_graph_instrumented` in [`ModelMetadata`](adk\API\Models\metadata.md).

&nbsp;

- ### `default_world_features: dict[str, dict[str, float]] | None`
  - **Description**: An optional mapping of domain-level internal system features extracted at initialization. Populated when graph instrumentation is enabled via `is_graph_instrumented` in [`ModelMetadata`](adk\API\Models\metadata.md).

&nbsp;

- ### `targets_space: gym.spaces.Dict`
  - **Description**: The space of the targets that are to be optimized for. For more information check [Target Specifications](adk\API\Models\target-specifications.md).

&nbsp;

- ### `step_world: StepWorldCB`
  - **Description**: Callback method regarding how the system's controllable parameters are to be set during optimization.

&nbsp;

- ### `optimization_data: OptimizationData`
  - **Description**: Runtime optimization configuration, including inference mode and the loaded Genie model.