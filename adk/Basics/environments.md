---
sidebar_position: 7
---

# Environments
<<<<<<< HEAD

## Explanation

An environment in the context of the ADK is broadly the same as most descriptions of a
reinforcement learning environment. There are however, minimal frameworks and APIs that the ADK
uses heavily. Such use is mostly limited to the [Gymnasium](https://gymnasium.farama.org/index.html)
framework in the ADK's default environments. Users are, however, free to use their own environment
framework of choice as use of Gymnasium is slightly relied upon.

An environment is in charge of converting an optimization configuration and abstracting it to an RL
specification. This includes handling reward computation logic, action logic, constructing the
observation space and handling interaction with the system itself.
=======

Gymnasium environments in the ADK are part of the **RL path** when you use
[`RLExecutor`](../API/rl-executor.md). They translate actions into simulator steps, define reward
semantics, and shape observations — the usual reinforcement-learning environment role. The [RL agent](rl-agents.md) / environment split in `genie setup` templates follows from that
executor choice, not from the core ADK itself.

If you implement a custom [`BaseExecutor`](../API/base-executor.md) subclass instead, you typically
call [`OptimizationContext.step_world`](../API/optimization-context.md) directly and do not need a
Gymnasium environment at all.

## Registering built-in env IDs

Gymnasium IDs are registered when you `import adk` in the **agent process** (`genie run` /
`python src/main.py`). The `genie` CLI sets `GENIE=1` and skips registration, so always import
`adk` (or `gymnasium` after `import adk`) from agent code, not from CLI-only scripts.

Every built-in env requires `env_data` from [`RLExecutor`](../API/rl-executor.md):

```py
import adk  # registers env IDs
import gymnasium as gym
from adk.executors.rl import RLAgentEnv

class MyAgent(RLAgentEnv):
    def __init__(self, env_data, agent_data):
        super().__init__(env_data, agent_data)
        self.env = gym.make("AI4EE-Direct-Action-Env", env_data=env_data)
```

## RLExecutor wiring

On each run, `RLExecutor` constructs [`EnvData`](rl-run-data.md#envdata) from the optimization
context and passes it to your [`RLAgentEnv`](../API/rl-agent-env.md) constructor. Your agent must
still expose the Gymnasium interface (`reset`, `step`, `observation_space`, `action_space`, …) because
`RLExecutor` calls those methods on the agent instance directly — even when stepping logic lives in a
separate `self.env` object.

See [RL Agents](rl-agents.md) and [RL Run Data](rl-run-data.md) for how your agent receives and uses this data.

## Built-in environments

The ADK registers these Gymnasium environment IDs (note the `AI4EE` prefix):

| ID | Class | Documentation |
|----|-------|----------------|
| `"AI4EE-Direct-Action-Env"` | `DirectActionEnv` | [API](../API/Environments/direct-action-env.md) |
| `"AI4EE-Episodic-Direct-Action-Env"` | `EpisodicDirectActionEnv` | Same family as `DirectActionEnv`; multi-step episodes |
| `"AI4EE-Additive-Action-Env"` | `AdditiveActionEnv` | [API](../API/Environments/additive-action-env.md) |
| `"AI4EE-Clipped-Additive-Action-Env"` | `ClippedAdditiveActionEnv` | [API](../API/Environments/clipped-additive-action-env.md) |
| `"AI4EE-Direct-Action-Graph-Env"` | `DirectActionEnv` (graph) | Graph-instrumented direct action; see source |
| `"AI4EE-Dynamic-Env"` | `DynamicEnv` | Advanced; see `adk.executors.rl.envs.dynamic_env` |
| `"AI4EE-Dynamic-Env-V1"` | `DynamicEnvV1` | Advanced variant |
| `"AI4EE-Dynamic-Env-V2"` | `DynamicEnvV2` | Advanced variant |
| `"AI4EE-Single-Optimum-Env"` | `SingleOptimumEnv` | Advanced; single-optimum reward shaping |
| `"AI4EE-PGRL-Env-V1"` | `PGRLEnv` | Advanced; PGRL-specific |
| `"AI4EE-Raw-Simulation-Env"` | `RawSimulationEnv` | Advanced; minimal reward wrapper |

IDs without dedicated API pages are **advanced** built-ins maintained for specific agent projects.
Inspect [`adk/__init__.py`](../../../adk/adk/__init__.py) registrations and the matching module under
`adk/executors/rl/envs/` before adopting them.

## Custom environments

Subclass [`OptimizationEnv`](../API/Environments/optimization-env.md) to implement reward logic,
action handling, and stepping against `EnvData.step_world`. This base class backs the built-in
environments and is the recommended starting point for custom envs on the RL path.

Pass `env_data` into `gymnasium.make` for built-in envs, or construct your `OptimizationEnv`
subclass directly in the [RL agent](rl-agents.md) constructor.
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86
