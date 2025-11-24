---
sidebar_position: 1
title: "AgentInterface"
---


# class AgentInterface
Abstract class to define interacting with a purely RL agent.

:::note
The `ObservationType` and `ActionType` types are `TypeVar`s because the actual types depend on
the context.
:::

:::info
There should be no visible side effects in the operation of an agent after an agent is saved and
subsequently loaded with `save_models` and `load_models` respectively. A loaded model must be a
1:1 reconstruction of the respective saved model from an external API's point of view.
:::

# Definition
```py
class AgentInterface(ABC):
    env: gymnasium.Env
    env_data: EnvData
    agent_data: AgentData

    @abstractmethod
    def compute_action(self, observation: ObservationType, info: dict[str, Any]) -> ActionType: pass

    @abstractmethod
    def experience(
        self,
        observation: ObservationType,
        action: ActionType,
        reward: SupportsFloat,
        next_observation: ObservationType,
        terminated: bool,
        truncated: bool,
        info: dict[str, Any],
        next_info: dict[str, Any]
    ) -> None: pass

    @abstractmethod
    def learn(self) -> None: pass

    @abstractmethod
    def save_models(self, save_to: Path) -> None: pass

    @abstractmethod
    def load_models(self, load_from: Path) -> None: pass

    @staticmethod
    @abstractmethod
    def transfer_nn_arch(from_genie_model: GenieModel, transfer_data: TransferModel, from_nn_arch: dict) -> dict: pass

    @staticmethod
    @abstractmethod
    def transfer_specifics(from_genie_model: GenieModel, transfer_data: TransferModel, from_specifics: dict) -> dict: pass

    @staticmethod
    @abstractmethod
    def transfer_models(from_genie_model: GenieModel, transfer_data: TransferModel, from_model_path: Path, to_model_path: Path): pass
```

## Import
```py
from adk.agent_interface import AgentInterface
```

## Members

- ### `env: gymnasium.Env`
    + **Description**: The Gymnasium environment that the agent interacts with.

&nbsp;

- ### `env_data: EnvData`
    + **Description**: Information relevant to constructing the internal environment interface. See (`TODO`: Refer to `EnvData` once documentation is written) for more info.

&nbsp;

- ### `agent_data: AgentData`
    + **Description**: Information relevant to constructing the internal agent interface. See (`TODO`: Refer to `AgentData` once documentation is written) for more info.


## Methods
- ### compute_action
    + **Description**: Compute an action based on an `observation` and some `info`.
    + **Takes**:
        + `observation: ObservationType`: The observation from the environment.
        + `info: dict[str, Any]`: Auxiliary diagnostic information for the agent (helpful for
        debugging, learning, and logging). This might, for instance, contain: metrics that describe
        the agent's performance state, variables that are hidden from observations, or individual
        reward terms that are combined to produce the total reward.
    + **Returns**:
        + `action: ActionType`: Action taken based on the `observation` and `info`.
  

- **Reference**:
    ```py
    @abstractmethod
    def compute_action(self, observation: ObservationType, info: dict[str, Any]) -> ActionType: pass
    ```

&nbsp;

- ### experience
    + **Description**: Append one iteration of the RL `sars'd` loop to the agent's experiences.
    This method is guaranteed to be called exactly once right after `compute_action` is called.
    + **Takes**:
        + `observation: ObservationType`: The original observation from the environment,
        + `action: ActionType`: The action taken based on the original observation.
        + `reward: SupportsFloat`: The reward for the action which was taken based on the original observation.
        + `next_observation: ObservationType`: The observation obtained after taking the action
        based on the original observation.
        + `terminated: bool`: Whether or not the episode **terminated** (ended by satisfying the task
        / target) after taking the action based on the original observation.
        + `truncated: bool`: Whether or not the episode **truncated** (ended by triggering a boundary
        condition / limit) after taking the action based on the original observation.
        + `info: dict[str, Any]`: The original auxiliary diagnostic information.
        + `next_info: dict[str, Any]`: The auxiliary diagnostic information obtained after taking
        the action based on the original observation.
    + **Returns: Nothing**

- **Reference**:
    ```py
    @abstractmethod
    def experience(self, observation: ObservationType, action: ActionType, reward: SupportsFloat, next_observation: ObservationType, terminated: bool, truncated: bool, info: dict[str, Any], next_info: dict[str, Any]) -> None: pass
    ```

&nbsp;

- ### learn
    + **Description**: The agent's internal learn routine. e.g. An RL algorithm using collected
    experiences to train in order to improve performance. This method is guaranteed to be called
    exactly once right after `experience` is called.
    + **Takes: Nothing**
    + **Returns: Nothing**

- **Reference**:
    ```py
    @abstractmethod
    def learn(self) -> None: pass
    ```

&nbsp;

- ### save_models
    + **Description**: Save the agent's internal state to the specified path on the filesystem.
    + **Takes**:
        + `save_to: Path`: The filesystem path to which the state is to be saved.
    + **Returns: Nothing**

- **Reference**:
    ```py
    @abstractmethod
    def save_models(self, save_to: Path) -> None: pass
    ```

&nbsp;

- ### load_models
    + **Description**: Load the agent's internal state from the specified path on the filesystem.
    + **Takes**:
        + `load_from: Path`: The filesystem path from which the state is to be loaded.
    + **Returns: Nothing**

- **Reference**:
    ```py
    @abstractmethod
    def load_models(self, load_from: Path) -> None: pass
    ```

&nbsp;

- ### transfer_nn_arch
    + **Description**: Static method for transferring neural network architecture from one model to another. Must be implemented by agent implementations.
    + **Takes**:
        + `from_genie_model: GenieModel`: The source Genie model.
        + `transfer_data: TransferModel`: Data specifying the transfer configuration.
        + `from_nn_arch: dict`: The neural network architecture dictionary to transfer from.
    + **Returns**:
        + `nn_arch: dict`: The transferred neural network architecture dictionary.

- **Reference**:
    ```py
    @staticmethod
    @abstractmethod
    def transfer_nn_arch(from_genie_model: GenieModel, transfer_data: TransferModel, from_nn_arch: dict) -> dict: pass
    ```

&nbsp;

- ### transfer_specifics  
    + **Description**: Static method for transferring model specifics from one model to another. Must be implemented by agent implementations.
    + **Takes**:  
        + `from_genie_model: GenieModel`: The source Genie model.
        + `transfer_data: TransferModel`: Data specifying the transfer configuration.
        + `from_specifics: dict`: The specifics dictionary to transfer from.
    + **Returns**:  
        + `specifics: dict`: The transferred specifics dictionary.

- **Reference**:  
    ```py
    @staticmethod
    @abstractmethod
    def transfer_specifics(from_genie_model: GenieModel, transfer_data: TransferModel, from_specifics: dict) -> dict: pass
    ```  
&nbsp;

- ### transfer_models  
    + **Description**: Static method for transferring trained model files from one location to another. Must be implemented by agent implementations.
    + **Takes**:  
        + `from_genie_model: GenieModel`: The source Genie model.
        + `transfer_data: TransferModel`: Data specifying the transfer configuration.
        + `from_model_path: Path`: Filesystem path to the source model files.
        + `to_model_path: Path`: Filesystem path to the destination model files.
    + **Returns: Nothing**

- **Reference**:  
    ```py
    @staticmethod
    @abstractmethod
    def transfer_models(from_genie_model: GenieModel, transfer_data: TransferModel, from_model_path: Path, to_model_path: Path): pass
    ```  
&nbsp;