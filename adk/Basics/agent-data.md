---
sidebar_position: 9
---

# Agent Data

## Explanation

Agent Data is a data structure containing all the data generally required for an agent to optimize
a system. Agent data contains the following information:

- **Optimization Data**: Runtime optimization configuration, including inference mode and the loaded Genie model. This includes the [hyper parameters](adk\API\Models\hyper-parameters.md), [metadata](adk\API\Models\metadata.md), [target specifications](adk\API\Models\target-specifications.md) and [world control](adk\API\Models\world-controls.md) specifications. See [Models](models.md) for more info.

## Definition

```python
class AgentData(BaseModel):
    optimization_data: OptimizationData
```

## Members

- ### `optimization_data: OptimizationData`
  - **Description**: Runtime optimization configuration, including inference mode and the loaded Genie model. For more information check [Models](models.md).