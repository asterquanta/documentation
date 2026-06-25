---
sidebar_position: 1
title: "Hyper Parameters"
---

# Hyper Parameters

Each model directory contains a `hyper_parameters.json` file: a JSON object of training and
inference settings that are **specific to that model** (circuit, system, or task). The ADK loads
this file into [`GenieModel.hyperparameters`](genie-model.md#hyperparameters) at run time.

## On disk

```json
{
  "learning_rate": 0.001,
  "batch_size": 64
}
```

There are no enforced keys — structure and interpretation are entirely up to your agent
implementation. Read them from `agent_data.optimization_data.genie_model.hyperparameters` (RL path)
or `ctx.optimization_data.genie_model.hyperparameters` (custom executor path).

## Python type

```py
hyperparameters: dict[str, Any]
```

Part of [`GenieModel`](genie-model.md). Values are also included in platform **transfer** payloads
when creating a child model; see [Model handling](../../Basics/model-handling.md).

## Related

- [Models](../../Basics/models.md) — creating models with `genie model add`
- [GenieModel](genie-model.md) — full model structure loaded from disk
