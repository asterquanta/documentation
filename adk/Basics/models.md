---
sidebar_position: 3
title: Models
---

# Models
## Explanation
A model is the ADK's approach to the **D**on't **R**epeat **Y**ourself principle. Models solve the
problem of having to develop / copy-paste the same agent across different directories for each
system being optimized. Instead, the agent can be implemented once and the system-specific details
can be part of the model.

This separates the concerns between developing a generic algorithm / method to optimize systems
(for an agent), and tuning specific details to optimize a specific system (for a model).

## Creating a model
In the ADK's eyes, a model is a directory within an agent's models directory with the following
contents:
+ `models/`: A directory containing agent specific model files (NN checkpoints, stats, etc.),
completely controlled by the developer.

+ `hyper_parameters.json`: A file containing the hyper-parameters for the agent's training / the
hyper-parameters the agent was trained with. See [Hyper Parameters](../API/Models/hyper-parameters.md)
for more info.

+ `metadata.json`: A file containing the model metadata. See [Metadata](../API/Models/metadata.md)
for more info.

+ `target_specifications.json`: A file containing the target specifications that can be defined
for the model. See [Model TargetSpec](../API/Models/target-specifications.md) for more info.

+ `world_control_specifications.json`: A file containing the world controls (**controllable parameters**
of the system) that the model can optimize for. See [World Control Specifications](../API/Models/world-control-specifications.md)
for more info.

Run `genie model add` in an agent directory and follow the instructions in order to conveniently
create a model for that agent.

:::note
The `adk` package has to be installed before it and its related tools such as `genie` can be used.
It is highly recommended that one uses a python venv for installing the ADK.
:::

## What next?
Once an agent with the above structure has been successfully created either manually or through
`genie model add`, start the agent. While the ADK is running, the model sync service registers,
updates, and removes models on the platform when local files under the models directory change.

If a model is registered on the platform and the agent is running, a compatiable model will be capable of being selected for
an optimization on the platform.

The `model` sub-command for `genie` provides a convenient interface for adding, listing,
deleting, and restoring agent models. Run `genie model -h` for more info.

<<<<<<< HEAD
## Using a Model

Once a model is created and registered:

- It becomes available in the platform's model selection dialog
- You can choose it while setting up or running an optimization task
- The platform automatically applies the model's predefined rules and settings

This allows users to focus on design intent and results, rather than setup complexity.

## What's Next?

After selecting and configuring a model:

- Run optimization tasks using the chosen model
- Compare results across different models
- Reuse the same model across multiple projects for faster workflows

This approach ensures flexibility, consistency, and scalability for users working on repeated or evolving design problems.
=======
For transfer, export, and import between models, see [Model handling](model-handling.md). For how models fit into optimization runs, see [What To Do Next](../what-to-do-next.md).
>>>>>>> da19c77006e30ef836f8c06ee740aef394646b86
