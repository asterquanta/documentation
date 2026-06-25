---
sidebar_position: 4
title: "Connector"
---


# Connector

```py
class Connector
```

Entry point for connecting your agent process to the AsterQuanta platform. The Connector maintains
the WebSocket connection, handles incoming optimization requests, and dispatches work to your
executor implementation.


## Import
```py
from adk.connector import Connector
```


## Typical usage (RL agent)
```py
from adk.connector import Connector
from adk.executors.rl import RLExecutor
from my_agent import MyAgent

app = Connector(
    RLExecutor,
    rl_agent_env_class=MyAgent,
    model_handler=MyAgent,
    throw_errors=True,
)
app.start()
```

## Typical usage (custom executor)
```py
from adk.connector import Connector
from adk.model_handler import ModelHandler
from my_executor import MyOptimizerExecutor
from my_models import MyModelHandler

app = Connector(
    MyOptimizerExecutor,
    model_handler=MyModelHandler,
)
app.start()
```


## Constructor

```py
Connector(
    executor_class=RLExecutor,
    *,
    model_handler=None,
    throw_errors=False,
    **executor_kwargs,
)
```

| Parameter | Description |
|-----------|-------------|
| `executor_class` | Executor type. Defaults to `RLExecutor`. Pass a `BaseExecutor` subclass for custom logic. |
| `model_handler` | Class implementing `ModelHandler` static methods. Required when the platform invokes model transfer, export, or import routes. Often the same class as your RL agent. |
| `throw_errors` | If `True`, WebSocket connection errors propagate instead of being logged and retried. Separate from `RLExecutor`'s `throw_errors` kwarg, which controls optimization-time error handling. |
| `**executor_kwargs` | Forwarded to the executor constructor. For `RLExecutor`, common kwargs are `rl_agent_env_class`, `config`, and `throw_errors`. |

## Methods

### start

```py
def start(self) -> None
```

Blocking call. Runs startup checks, starts model sync for local `models/` directories, connects to
the platform, and processes requests until interrupted (Ctrl+C).

:::note
Ensure `.env` contains a valid `SECRET` from `genie setup` before calling `start()`.
:::

## What happens on start

1. Startup routine validates project configuration (including registration and agent name).
2. Resource usage logging is initialized if enabled in `settings.json`.
3. Model sync watches `models/` and keeps the platform in sync with local model files.
4. WebSocket connects using `SECRET`, ADK version, and `instance-id` headers when an instance id is known.
5. If no instance id is configured, the platform may assign one on connect and persist it to `.env`.
6. Incoming optimization requests instantiate your executor with the job's optimization payload.

See [Agent Settings](../Basics/agent-settings.md) and
[Environment Settings](../Basics/environment-settings.md) for `resource_logging_options` and
`INSTANCE_ID`.

See [`RLExecutor`](rl-executor.md) and [`BaseExecutor`](base-executor.md) for implementing the optimization logic itself.
