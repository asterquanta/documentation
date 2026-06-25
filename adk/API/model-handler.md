---
sidebar_position: 3
title: "ModelHandler"
---


# ModelHandler

```py
class ModelHandler(ABC)
```

Optional mixin for agents (or separate handler classes) that support **model transfer**, **export**,
and **import** on the platform. All methods are `@staticmethod` abstract methods.


## Import
```py
from adk.model_handler import ModelHandler
```


## When to implement
Implement `ModelHandler` if users should be able to:

- Transfer a model's neural architecture or specifics between Genie models on the platform
- Export serialized model artifacts from the platform
- Import serialized model artifacts into a model directory

Pass the implementing class to [`Connector`](connector.md) as `model_handler`. For RL agents, this is
usually the same class as `rl_agent_env_class`:

```py
class MyAgent(RLAgentEnv, ModelHandler):
    ...

Connector(RLExecutor, rl_agent_env_class=MyAgent, model_handler=MyAgent)
```

Non-RL executors can provide a dedicated handler class.


## Methods

### transfer_nn_arch

```py
@staticmethod
def transfer_nn_arch(from_genie_model, transfer_data, from_nn_arch) -> dict
```

Return the updated neural-network architecture dict for the destination model.

### transfer_specifics

```py
@staticmethod
def transfer_specifics(from_genie_model, transfer_data, from_specifics) -> dict
```

Return the updated model `specifics` dict (agent-defined metadata in `metadata.json`).

### transfer_models

```py
@staticmethod
def transfer_models(from_genie_model, transfer_data, from_model_path, to_model_path)
```

Copy or transform checkpoint files from one model directory to another.

### serialize_models

```py
@staticmethod
def serialize_models(serialize_from: Path) -> bytes
```

Pack model artifacts under `serialize_from` into bytes for export.

### deserialize_models

```py
@staticmethod
def deserialize_models(serialized_data: bytes, deserialize_to: Path)
```

Restore exported bytes into `deserialize_to`.

## Platform workflow

When the platform requests a transfer, export, or import, the connected agent routes the call
through the model sync service to your handler. See [Model handling](../Basics/model-handling.md)
for the end-to-end flow and implementation guidance.

If `model_handler` is omitted at Connector construction, model sync routes that require these methods will fail when invoked.
