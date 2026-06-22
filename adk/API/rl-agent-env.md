---
sidebar_position: 2
title: "RLAgentEnv"
---


# RLAgentEnv

```py
class RLAgentEnv(AgentInterface, Env)
```

Abstract base for RL agents used with [`RLExecutor`](rl-executor.md). Combines
[`AgentInterface`](agent-interface.md) with [Gymnasium's `Env`](https://gymnasium.farama.org/api/env/#gymnasium.Env).

Your class must implement both the agent methods (`compute_action`, `experience`, `learn`,
`save_models`, `load_models`) and the Gymnasium API (`reset`, `step`, `observation_space`,
`action_space`, etc.).


## Import
```py
from adk.executors.rl import RLAgentEnv, EnvData, AgentData
```


## Constructor

```py
class MyAgent(RLAgentEnv):
    def __init__(self, env_data: EnvData, agent_data: AgentData) -> None:
        super().__init__(env_data, agent_data)
        self.env = gymnasium.make("AI4EE-Direct-Action-Env", env_data=env_data)
```

The executor constructs your class as `rl_agent_env_class(env_data, agent_data)`.


## Internal environment
See [RL Agents](../Basics/rl-agents.md) for the full RL path overview. Many agents hold a Gymnasium env in `self.env` created with a [built-in environment ID](../Basics/environments.md) or a custom [`OptimizationEnv`](Environments/optimization-env.md) subclass.

:::warning
Even if you implement stepping logic internally without a separate `self.env` object, you must still implement the full Gymnasium interface on your `RLAgentEnv` subclass — `RLExecutor` calls `reset`, `step`, and related methods on your agent instance directly.
:::


## Combining with ModelHandler

Production agents that support model transfer, export, or import declare both bases:

```py
from adk.executors.rl import RLAgentEnv
from adk.model_handler import ModelHandler

class MyAgent(RLAgentEnv, ModelHandler):
    ...
```

Pass the same class as both `rl_agent_env_class` and `model_handler` to [`Connector`](connector.md):

```py
Connector(RLExecutor, rl_agent_env_class=MyAgent, model_handler=MyAgent)
```

See [`ModelHandler`](model-handler.md) for the static methods to implement.
