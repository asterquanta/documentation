---
sidebar_position: 2
title: "BaseAgent"
---


# class BaseAgent
Abstract class to define interacting with a combined `AgentInterface` and Gymnasium Env at the same
time. This class extends [AgentInterface](agent-interface.md) and
[gymnasium.Env](https://gymnasium.farama.org/api/env/#env).


## Import
```py
from adk.base_agent import BaseAgent
```


## Members

- ### `env: gymnasium.Env | None`
    + **Description**: The internal reference to the Gymnasium Env the `AgentInterface` interacts
    with. May be a custom environment or an instance of a default one provided with the ADK. May
    also be left empty if a completely custom internally handled env is desired.

    :::warning
    An implementation of `BaseAgent` must still implement the abstract `gymnasium.Env` interface even if
    a completely internal, non-Gymnasium env is used. i.e. `observation_space`, `action_space`,
    `reset()`, `step()`, etc. must all still be implemented even if this `env` member is left as a `None`.
    :::

&nbsp;

- ### `env_data: models.agent.EnvData`
    + **Description**: Information relevant to constructing the internal `env` member or other such
    internal environment interface. See (`TODO`: Refer to `EnvData` once documentation is written) for more info.

&nbsp;

- ### `agent_data: models.agent.AgentData`
    + **Description**: Information relevant to constructing the internal agent interface. See
    (`TODO`: Refer to `AgentData` once documentation is written) for more info.

## Methods

- ### __init__
    + **Description**: Initialize the agent with the given data.
    + **Takes**:
        + `env_data: EnvData`: The environment-specific data used for initialization.
        + `agent_data: AgentData`: The agent-specific data used for initialization.
    + **Returns: Nothing**

&nbsp;

- ### load_sensitivities
    + **Description**: Load the correlation calculator's internal state from the specified path on
    the filesystem.
    + **Takes**:
        + `path: Path`: The filesystem path from which the state is to be loaded.
    + **Returns: Nothing**

&nbsp;

- ### save_sensitivities
    + **Description**: Save the correlation calculator's internal state to the specified path on
    the filesystem.
    + **Takes**:
        + `path: Path`: The filesystem path to which the state is to be saved.
    + **Returns: Nothing**

&nbsp;

- ### calculate_sensitivities
    + **Description**: Calculate the world controls - world observation sensitivities using the correlation calculator.
    + **Takes: Nothing**
    + **Returns**:
        + `sensitivities`: Calculated sensitivity matrix from the correlation calculator, or default sensitivities if no env is present.

&nbsp;

- ### transfer_nn_arch
    + **Description**: Static method for transferring neural network architecture from one model to another. Must be implemented by agent implementations.
    + **Takes**:
        + `from_genie_model: GenieModel`: The source Genie model.
        + `transfer_data: TransferModel`: Data specifying the transfer configuration.
        + `from_nn_arch: dict`: The neural network architecture dictionary to transfer from.
    + **Returns**:
        + `nn_arch: dict`: The transferred neural network architecture dictionary.
    + **Raises**: `NotImplementedError` in the base class.

&nbsp;

- ### transfer_specifics
    + **Description**: Static method for transferring model specifics from one model to another. Must be implemented by agent implementations.
    + **Takes**:
        + `from_genie_model: GenieModel`: The source Genie model.
        + `transfer_data: TransferModel`: Data specifying the transfer configuration.
        + `from_specifics: dict`: The specifics dictionary to transfer from.
    + **Returns**:
        + `specifics: dict`: The transferred specifics dictionary.
    + **Raises**: `NotImplementedError` in the base class.

&nbsp;

- ### transfer_models
    + **Description**: Static method for transferring trained model files from one location to another. Must be implemented by agent implementations.
    + **Takes**:
        + `from_genie_model: GenieModel`: The source Genie model.
        + `transfer_data: TransferModel`: Data specifying the transfer configuration.
        + `from_model_path: Path`: The filesystem path to the source model files.
        + `to_model_path: Path`: The filesystem path to the destination model files.
    + **Returns: Nothing**
    + **Raises**: `NotImplementedError` in the base class.