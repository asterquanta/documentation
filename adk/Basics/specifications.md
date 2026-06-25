---
sidebar_position: 6
---


# Specifications
## Explanation
When you start an optimization on the platform, Genie sends an **optimization specification** to your
agent. [`BaseExecutor`](../API/base-executor.md) parses this payload and builds an
[`OptimizationContext`](../API/optimization-context.md) — that is the core ADK structure every
executor path shares.

What your agent code receives depends on which executor you use:

| Executor | What your code receives |
|----------|---------------------------|
| [`RLExecutor`](../API/rl-executor.md) | [`EnvData`](rl-run-data.md#envdata) and [`AgentData`](rl-run-data.md#agentdata), constructed by `RLExecutor` from the optimization context |
| Custom [`BaseExecutor`](../API/base-executor.md) subclass | [`OptimizationContext`](../API/optimization-context.md) directly |

`EnvData` and `AgentData` are RL-specific conveniences: `RLExecutor` builds them before instantiating your [`RLAgentEnv`](../API/rl-agent-env.md) subclass. The core ADK does not construct these types — if you implement your own executor, work with `OptimizationContext` instead. See [RL Agents](rl-agents.md), [Environments](environments.md), and [What To Do Next](../what-to-do-next.md) for how the pieces fit together.

The specification includes:

+ **Design parameters / [world control specifications](../API/Models/world-control-specifications.md)** — controllable parameters of the system and their bounds or allowed values.

+ **Targets** — criteria the optimization must meet. Runtime target layout is described under [runtime TargetSpec](../API/Models/Optimization/targets.md); model-level defaults live in [model TargetSpec](../API/Models/target-specifications.md).

+ **[Genie model](../API/Models/genie-model.md)** — the model selected for this run, including [hyper parameters](../API/Models/hyper-parameters.md), [metadata](../API/Models/metadata.md), [model target specifications](../API/Models/target-specifications.md), and [world control specifications](../API/Models/world-control-specifications.md). See [Models](models.md).

+ **Static and randomized parameters** — fixed or stochastically sampled parameters for the run. See [Design parameters](../API/Models/Optimization/design-parameters.md).

+ **step_world** — applies a set of design parameter values to the simulator and returns observations (and optionally internal features).

The platform builds an internal [`OptimizationSpec`](../API/Models/Optimization/optimization-spec.md) from your project configuration. You normally interact with `OptimizationContext` (or, on the RL path, the `EnvData` / `AgentData` that `RLExecutor` derives from it) rather than parsing that wire format yourself.
