---
sidebar_position: 8
---

# RL Agents

An RL agent in the ADK is your [`RLAgentEnv`](../API/rl-agent-env.md) subclass — the class
[`RLExecutor`](../API/rl-executor.md) instantiates and drives through the optimization loop. It
implements policy logic (`compute_action`, `learn`, …) and, on the RL path, must also satisfy the
[Gymnasium](https://gymnasium.farama.org/) interface because `RLExecutor` calls `reset`, `step`, and
related methods on your agent instance directly.

The agent / [environment](environments.md) split in `genie setup` templates follows from that
executor choice, not from the core ADK itself.

If you implement a custom [`BaseExecutor`](../API/base-executor.md) subclass instead, you put
optimization logic inside `run()` and work with
[`OptimizationContext`](../API/optimization-context.md) — there is no `RLAgentEnv` and no
`AgentInterface` unless you add that wiring yourself.

## RLExecutor wiring

On each run, `RLExecutor`:

1. Builds [`EnvData` and `AgentData`](rl-run-data.md) from the optimization context.
2. Constructs your class as `rl_agent_env_class(env_data, agent_data)`.
3. Calls `load_models` from `models/<genie-model>/models/`.
4. Runs the [optimization loop](optimization-loop.md): `reset` → `compute_action` → `step` →
   `experience` → `learn` until the job completes.

Wire your class in `src/main.py`:

```py
from adk.connector import Connector
from adk.executors.rl import RLExecutor, RLAgentEnv

class MyAgent(RLAgentEnv):
    ...

app = Connector(
    RLExecutor,
    rl_agent_env_class=MyAgent,
    model_handler=MyAgent,  # only if you implement ModelHandler
)
```

See [RL Run Data](rl-run-data.md) for what `env_data` and `agent_data` contain.

## What you implement

Subclass [`RLAgentEnv`](../API/rl-agent-env.md), which combines [`AgentInterface`](../API/agent-interface.md) with Gymnasium's `Env`. You must implement both sides:

| Side | Methods / members | Role |
|------|-------------------|------|
| [`AgentInterface`](../API/agent-interface.md) | `compute_action`, `experience`, `learn`, `save_models`, `load_models` | Policy, learning, checkpoints |
| Gymnasium | `reset`, `step`, `observation_space`, `action_space`, … | Episode stepping (often delegated to `self.env`) |

Many agents hold a separate Gymnasium env — see [Environments](environments.md) — and forward `reset` /
`step` to it. Even then, those methods must exist on your `RLAgentEnv` subclass because `RLExecutor`
never calls `self.env` directly.

```py
import gymnasium as gym
from adk.executors.rl import RLAgentEnv, EnvData, AgentData

class MyAgent(RLAgentEnv):
    def __init__(self, env_data: EnvData, agent_data: AgentData) -> None:
        super().__init__(env_data, agent_data)
        self.env = gym.make("AI4EE-Direct-Action-Env", env_data=env_data)

    def reset(self, *, seed=None, options=None):
        return self.env.reset(seed=seed, options=options)

    def step(self, action):
        return self.env.step(action)

    @property
    def observation_space(self):
        return self.env.observation_space

    @property
    def action_space(self):
        return self.env.action_space

    def compute_action(self, observation, info):
        ...

    def experience(self, observation, info, action, reward, next_observation, next_info, terminated, truncated):
        ...

    def learn(self):
        ...

    def save_models(self, save_to):
        ...

    def load_models(self, load_from):
        ...
```

## Model handling

Model transfer, export, and import are not part of `AgentInterface`. If your agent supports those
workflows, also subclass [`ModelHandler`](../API/model-handler.md) and pass the same class as
`model_handler` to the Connector. See [Model handling](model-handling.md).

## Related

| Topic | Page |
|-------|------|
| Gymnasium envs on the RL path | [Environments](environments.md) |
| `EnvData` / `AgentData` | [RL Run Data](rl-run-data.md) |
| Episode and step cycle | [Optimization loop](optimization-loop.md) |
| API reference | [`RLAgentEnv`](../API/rl-agent-env.md), [`AgentInterface`](../API/agent-interface.md) |
