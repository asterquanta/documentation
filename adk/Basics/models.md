---
sidebar_position: 3
title: Models
---

# Models

## What is a Model?

A model represents a reusable optimization setup that can be applied to different systems or projects without starting from scratch each time.

Instead of redefining the same optimization logic repeatedly, a model allows you to:

- Reuse proven optimization intelligence
- Apply it to different systems by changing only system-specific settings
- Maintain consistency across projects

In simple terms:

- The agent defines how optimization works
- The model defines what is being optimized and under what conditions

This separation makes it easier to adapt optimization workflows to new systems while keeping the core logic unchanged.

## Creating a Model

A model groups together all the information needed to apply optimization to a specific type of system. This includes:

- Configuration settings
- Parameter ranges
- Target performance goals
- System controls that can be adjusted during optimization

Models can be created easily using the Genie workflow, which guides you step by step through the process and ensures everything is set up correctly.

## Using a Model

Once a model is created and registered:

- It becomes available in the platform's model selection dialog
- You can choose it while setting up or running an optimization task
- The platform automatically applies the model's predefined rules and settings

This allows users to focus on design intent and results, rather than setup complexity.

## Model Configuration (Transfer Learning)

Within the Genie section of the platform, users can fine-tune how a selected model is applied to their project using Transfer Learning.

This includes:

- **Model Details**: View the model's name and description
- **Design Parameter Specification**: Map your project's controllable parameters to the model's expected inputs
- **Target Specifications**: Define desired outputs, accuracy goals, and how results should be interpreted

Once configured, the model can be transferred into the project environment and used directly for optimization.

## What's Next?

After selecting and configuring a model:

- Run optimization tasks using the chosen model
- Compare results across different models
- Reuse the same model across multiple projects for faster workflows

This approach ensures flexibility, consistency, and scalability for users working on repeated or evolving design problems.