---
sidebar_position: 7
title: "RLExecutor"
---


# RLExecutor

```py
class RLExecutor(BaseExecutor)
```

Default executor for reinforcement-learning agents. Implements the standard loop documented in
[Optimization loop](../Basics/optimization-loop.md): construct `EnvData` / `AgentData`, load
checkpoints, then run reset → compute_action → step → experience → learn until the job completes.

You normally do not subclass `RLExecutor`; pass it to [`Connector`](connector.md) along with your
[`RLAgentEnv`](rl-agent-env.md) class.


## Import
```py
from adk.executors.rl import RLExecutor, RLExecutorConfig
```


## Connector usage

```py
from adk.connector import Connector
from adk.executors.rl import RLExecutor, RLExecutorConfig

app = Connector(
    RLExecutor,
    rl_agent_env_class=MyAgent,
    model_handler=MyAgent,
    config=RLExecutorConfig(maximum_training_steps=50_000),
)
```


## Constructor kwargs (via Connector)

| Kwarg | Description |
|-------|-------------|
| `rl_agent_env_class` | Your `RLAgentEnv` subclass (**required**). |
| `throw_errors` | Propagate errors instead of sending platform error responses. |
| `config` | `RLExecutorConfig` instance (see below). |


## RLExecutorConfig

```py
class RLExecutorConfig(BaseModel):
    maximum_training_steps: int = 100_000
    maximum_inference_steps: int = 1_000
```

| Field | Description |
|-------|-------------|
| `maximum_training_steps` | Stop training runs after this many env steps. |
| `maximum_inference_steps` | Stop inference runs after this many env steps. |

## Behaviour notes

- Models are loaded from `models/<genie-model>/models/` at the start of each run.
- During **training**, checkpoints are saved every 100 episodes.
- During **inference**, the run finishes with `Satisfied` when an episode ends with `terminated=True`.
- Progress is reported through `update_display` with `OptimizationStats` and `AgentStats`.
