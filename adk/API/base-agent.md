---
sidebar_position: 2
title: "BaseAgent"
---


# BaseAgent

Abstract class to define interacting with a combined AgentInterface and Gymnasium Env at the same time. This class extends AgentInterface and gymnasium.Env.

## Import

```python
from adk.base_agent import BaseAgent
```

## Members

### env: gymnasium.Env | None

**Description:**

The internal reference to the Gymnasium Env the AgentInterface interacts with. May be a custom environment or an instance of a default one provided with the ADK. May also be left empty if a completely custom internally handled env is desired.

:::warning
An implementation of BaseAgent must still implement the abstract gymnasium.Env interface even if a completely internal, non-Gymnasium env is used. i.e. `observation_space`, `action_space`, `reset()`, `step()`, etc. must all still be implemented even if this env member is left as a `None`.
:::

:::info Additional Note
In some implementations, BaseAgent may directly implement the required gymnasium.Env interface without maintaining a separate internal env object. In such cases, environment behavior is fully defined within the agent itself.
:::

### env_data: models.agent.EnvData

**Description:**

Information relevant to constructing the internal env member or other such internal environment interface. See (TODO: Refer to EnvData once documentation is written) for more info.

### agent_data: models.agent.AgentData

**Description:**

Information relevant to constructing the internal agent interface. See (TODO: Refer to AgentData once documentation is written) for more info.

## Methods

### init

**Description:**

Initialize the agent with the given data.

**Parameters:**

- `env_data: EnvData` – The environment-specific data used for initialization.
- `agent_data: AgentData` – The agent-specific data used for initialization.

**Returns:**

Nothing

---

### __init__ (Added)

**Description:**

Initializes the base agent using environment-specific and agent-specific metadata.

**Parameters:**

- `env_data: EnvData` – Environment-related configuration and metadata.
- `agent_data: AgentData` – Agent-related configuration and metadata.

**Returns:**

Nothing

:::note
This constructor complements the documented init method. Concrete agent implementations may rely on either initialization pattern depending on design requirements.
:::

---

### load_sensitivities

**Description:**

Load the correlation calculator's internal state from the specified path on the filesystem.

**Parameters:**

- `path: Path` – The filesystem path from which the state is to be loaded.

**Returns:**

Nothing

---

### save_sensitivities

**Description:**

Save the correlation calculator's internal state to the specified path on the filesystem.

**Parameters:**

- `path: Path` – The filesystem path to which the state is to be saved.

**Returns:**

Nothing

---

### calculate_sensitivities

**Description:**

Calculate the world controls - world observation sensitivities using the correlation calculator.

**Parameters:**

Nothing

**Returns:**

`sensitivities` – Calculated sensitivity matrix from the correlation calculator, or default sensitivities if no env is present.

---

### transfer_nn_arch

**Description:**

Static method for transferring neural network architecture from one model to another. Must be implemented by agent implementations.

**Parameters:**

- `from_genie_model: GenieModel` – The source Genie model.
- `transfer_data: TransferModel` – Data specifying the transfer configuration.
- `from_nn_arch: dict` – The neural network architecture dictionary to transfer from.

**Returns:**

`nn_arch: dict` – The transferred neural network architecture dictionary.

**Raises:**

`NotImplementedError` in the base class.

---

### transfer_specifics

**Description:**

Static method for transferring model specifics from one model to another. Must be implemented by agent implementations.

**Parameters:**

- `from_genie_model: GenieModel` – The source Genie model.
- `transfer_data: TransferModel` – Data specifying the transfer configuration.
- `from_specifics: dict` – The specifics dictionary to transfer from.

**Returns:**

`specifics: dict` – The transferred specifics dictionary.

**Raises:**

`NotImplementedError` in the base class.

---

### transfer_models

**Description:**

Static method for transferring trained model files from one location to another. Must be implemented by agent implementations.

**Parameters:**

- `from_genie_model: GenieModel` – The source Genie model.
- `transfer_data: TransferModel` – Data specifying the transfer configuration.
- `from_model_path: Path` – The filesystem path to the source model files.
- `to_model_path: Path` – The filesystem path to the destination model files.

**Returns:**

Nothing

**Raises:**

`NotImplementedError` in the base class.

---

### serialize_models (Added)

**Description:**

Serializes trained model artifacts into a byte representation for storage or transfer.

**Parameters:**

- `serialize_from: Path` – Filesystem path containing model artifacts to serialize.

**Returns:**

`bytes` – Serialized model data.

**Raises:**

`NotImplementedError` – Must be implemented by derived agent classes.

---

### deserialize_models (Added)

**Description:**

Deserializes model data from a byte representation and restores it to a specified location.

**Parameters:**

- `serialized_data: bytes` – Serialized model data.
- `deserialize_to: Path` – Filesystem path where the model artifacts should be restored.

**Returns:**

Nothing

**Raises:**

`NotImplementedError` – Must be implemented by derived agent classes.