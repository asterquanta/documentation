---
sidebar_position: 2
title: "DirectActionEnv"
---


# DirectActionEnv

```py
class DirectActionEnv(OptimizationEnv)
```

A default environment implementation provided with the ADK. Directly sets the world controls to the
provided action every step. By default (`episode_maximum_steps=1`), each episode ends on the first
step — either with `terminated=True` when all targets are satisfied, or `truncated=True` otherwise.


## Import
```py
import adk  # registers Gymnasium env IDs
import gymnasium
from adk.executors.rl import EnvData

env = gymnasium.make("AI4EE-Direct-Action-Env", env_data=env_data)
```


## Members

### reward_scaling_factors

```py
reward_scaling_factors: ArrayLike | None
```

An array of scaling factors to multiply each sub-reward by for each evaluated observation.

### episode_maximum_steps

```py
episode_maximum_steps: int = 1
```

Maximum steps per episode before truncation. Defaults to `1`, which makes each episode a single step.

### episode_truncation_reward

```py
episode_truncation_reward: float = 0.0
```

Reward added when `episode_maximum_steps` is reached on a step.

### all_targets_not_satisfied_reward

```py
all_targets_not_satisfied_reward: float = -10.0
```

Reward added **only when observation evaluation fails** (NaN observations), together with
`failed_observation_evaluation_reward`. Not added on ordinary steps where targets are simply not met.

### failed_observation_evaluation_reward

```py
failed_observation_evaluation_reward: float = -50.0
```

The reward added to the total reward for a step when evaluating an observation fails on that step.

### all_targets_satisfied_reward

```py
all_targets_satisfied_reward: float = 10.0
```

The reward added to the total reward for a step when all targets are satisfied on that step.

### observation_space

```py
observation_space: gymnasium.spaces.Box
```

The observation space of the environment. Equivalent to the concatenation of the following in order:
* `world_observation_bounds`: The evaluated observations after taking a given action.
* `world_control_bounds`: The given action evaluating to the aforementioned observations.
* `world_observation_bounds`: The equivalence targets corresponding to each evaluated observation.

### action_space

```py
action_space: gymnasium.spaces.Box
```

The action space of the environment. Equivalent to the `world_control_space`.


## Methods

### step

```py
def step(self, action: NDArray[numpy.float32]) -> tuple[NDArray[numpy.float32], float, bool, bool, dict[str, Any]]
```

Takes a step in the environment with a direct action. World controls are set to the provided
action, then the system is stepped via `step_world`.

**Takes:**
- `action: numpy.typing.NDArray[numpy.float32]`: Flattened world-control values (same shape as `action_space`).

**Returns (as a tuple):**
- `observations: numpy.typing.NDArray[numpy.float32]`: The observations in the same form as described in the `observation_space`.
- `reward: float`: The reward for the given action. Calculated as:
    ```
    -1.0 * sum(
        (abs(Equivalence Targets - Evaluated observations) * Reward Scaling Factors) ^ 2
    ) + All Targets Satisfied Reward (if all targets satisfied)
    ```
    When observation evaluation fails (NaN), the reward is:
    ```
    All Targets Not Satisfied Reward + Failed Observation Evaluation Reward
    ```
    When `episode_maximum_steps` is reached without satisfying targets, `episode_truncation_reward` is also added.
- `terminated: bool`: `True` when all targets are satisfied by the action.
- `truncated: bool`: `True` when the episode ends without satisfying targets (evaluation failure or step limit). Returned as `truncated and not terminated`, so `terminated` and `truncated` are never both `True`.
- `info: dict[str, typing.Any]`: Contains `satisfaction_quality` (float in `[0, 1]`) when observation evaluation succeeds. Used by [`RLExecutor`](../rl-executor.md) for platform progress display. Empty `{}` on evaluation failure.

:::note
With the default `episode_maximum_steps=1`, each episode is a single step. Directly setting world controls means there are no future consequences to bad actions, so iterative multi-step episodes are usually unnecessary.
:::

### reset

```py
def reset(self, *, seed: int | None = None, options: dict[str, Any] | None = None) -> tuple[NDArray[numpy.float32], dict[str, Any]]
```

Resets the env. Initially uses randomly sampled world controls.

**Takes:**
- `seed: int | None`: The seed for random sampling. Ignored even if provided.
- `options: dict[str, typing.Any] | None`: Additional information for reset. Ignored even if provided.

**Returns (as a tuple):**
- `observations: numpy.typing.NDArray[numpy.float32]`: The observations in the same form as described in the `observation_space`. Constructed with random world controls.
- `info: dict[str, typing.Any]`: Contains `satisfaction_quality` when observation evaluation succeeds; otherwise `{}`.

### render

```py
def render(self) -> None
```

Render the environment state. Currently unsupported. All calls to this method are ignored.

**Takes:** Nothing

**Returns:**
- `rendered_frame: None`: Just a `None`.
