---
sidebar_position: 3
title: "AdditiveActionEnv"
---


# AdditiveActionEnv

```py
class AdditiveActionEnv(OptimizationEnv)
```

Additive-action environment: each step **adds** the action to current world controls without clipping
(controls may exceed bounds; an `exceed_world_control_bounds_reward` penalty applies). Suited to
multi-step episodes where actions are small deltas.

Registered as `"AI4EE-Additive-Action-Env"` (also the ADK `DEFAULT_ENV`). For clipping behavior, see
[`ClippedAdditiveActionEnv`](clipped-additive-action-env.md) (`"AI4EE-Clipped-Additive-Action-Env"`).


## Import
```py
import adk  # registers Gymnasium env IDs
import gymnasium
from adk.executors.rl import EnvData

env = gymnasium.make("AI4EE-Additive-Action-Env", env_data=env_data)
```


## Key differences from ClippedAdditiveActionEnv

| | `AdditiveActionEnv` | `ClippedAdditiveActionEnv` |
|--|---------------------|----------------------------|
| Out-of-bounds controls | Allowed; penalty via `exceed_world_control_bounds_reward` | Clipped to bounds |
| Default ID | `AI4EE-Additive-Action-Env` | `AI4EE-Clipped-Additive-Action-Env` |

Shared constructor knobs include `n_action_intervals`, `episode_maximum_steps`, reward scaling, and
observation/action space layout (see [`ClippedAdditiveActionEnv`](clipped-additive-action-env.md) for
the same reward and space semantics).

### exceed_world_control_bounds_reward

```py
exceed_world_control_bounds_reward: float = -50.0
```

Penalty when an additive action would push world controls outside bounds (unclipped env only).

### target_generators

:::warning
**Not implemented** in either additive env variant — `reset()` raises `NotImplementedError` if set.
:::


## Methods

### step

```py
def step(self, action: NDArray[numpy.float32]) -> tuple[NDArray[numpy.float32], float, bool, bool, dict[str, Any]]
```

Same Gymnasium contract as [`ClippedAdditiveActionEnv.step`](clipped-additive-action-env.md#step): pass a flattened `action` array; receive observation, reward, `terminated`, `truncated`, and `info`.

### reset / render

Same signatures and behavior as [`ClippedAdditiveActionEnv`](clipped-additive-action-env.md).
