---
sidebar_position: 4
title: "ClippedAdditiveActionEnv"
---


# ClippedAdditiveActionEnv

```py
class ClippedAdditiveActionEnv(OptimizationEnv)
```

A default environment implementation provided with the ADK. Used to iteratively add the provided
action to the world controls every step, **clipping** controls to bounds when an action would exceed
them. Each episode either terminates or truncates after a maximum number of steps OR after
satisfying the provided targets.

Registered as `"AI4EE-Clipped-Additive-Action-Env"`. For the unclipped variant, see
[`AdditiveActionEnv`](additive-action-env.md) (`"AI4EE-Additive-Action-Env"`).


## Import
```py
import adk  # registers Gymnasium env IDs
import gymnasium
from adk.executors.rl import EnvData

env = gymnasium.make("AI4EE-Clipped-Additive-Action-Env", env_data=env_data)
```


## Members

### reward_scaling_factors

```py
reward_scaling_factors: ArrayLike | None
```

An array of scaling factors to multiply each sub-reward by for each evaluated observation.

### n_action_intervals

```py
n_action_intervals: int = 10
```

The number of intervals to divide the world control space into. i.e. The right actions can go from any point in the action to any other point in the action space given that a minimum of `n_action_intervals` number of actions are taken.

### episode_maximum_steps

```py
episode_maximum_steps: int = 100
```

The maximum number of steps that can be taken before the episode is truncated. It is highly recommended that this is always set to a value that is larger than or equal to the number of action intervals.

### episode_truncation_reward

```py
episode_truncation_reward: float = 0.0
```

The reward added to the total reward on the step that the maximum number of allowed steps within an episode is exceeded.

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

### target_generators

```py
target_generators: list[Callable[[float], list[float]]] | None = None
```

:::warning
**Not implemented.** If this argument is set to a non-`None` value, `reset()` raises
`NotImplementedError`. Reserved for future use.
:::

### observation_space

```py
observation_space: gymnasium.spaces.Box
```

The observation space of the environment. Equivalent to the concatenation of the following in order:
* `low: -world_observation_bounds_diff, high: +world_observation_bounds_diff`: The difference between the evaluated observations and equivalence targets.
* `world_control_bounds`: The world controls after adding and clipping the given action, which resulted in evaluating to the aforementioned observations.

### action_space

```py
action_space: gymnasium.spaces.Box
```

The action space of the environment. Equivalent to the `world_control_space` divided by the number of action intervals.


## Methods

### step

```py
def step(self, action: NDArray[numpy.float32]) -> tuple[NDArray[numpy.float32], float, bool, bool, dict[str, Any]]
```

Takes a step in the environment with an additive action. The action is added to the world controls and the world controls are clipped to the bounds.

**Takes:**
- `action: numpy.typing.NDArray[numpy.float32]`: Flattened additive action (same shape as `action_space`).

**Returns (as a tuple):**
- `observations: numpy.typing.NDArray[numpy.float32]`: The observations in the same form as described in the `observation_space`.
- `reward: float`: The reward for the given action. Calculated as:
    ```
    -1.0 * sum(
        (abs(Equivalence Targets - Evaluated observations) * Reward Scaling Factors) ^ 2
    ) + (
        All Targets Satisfied Reward (if applicable only) +
        Episode Truncation Reward (if applicable only) +
        Failed Observation Evaluation Reward (if applicable only)
    )
    ```
- `terminated: bool`: `True` when all targets are satisfied by the computed world controls.
- `truncated: bool`: `True` when the episode ends without satisfying targets (step limit or evaluation failure). Returned as `truncated and not terminated`, so `terminated` and `truncated` are never both `True`.
- `info: dict[str, typing.Any]`: Always an empty dictionary.

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
- `info: dict[str, typing.Any]`: Always an empty dictionary.

### render

```py
def render(self) -> None
```

Render the environment state. Currently unsupported. All calls to this method are ignored.

**Takes:** Nothing

**Returns:**
- `rendered_frame: None`: Just a `None`.
