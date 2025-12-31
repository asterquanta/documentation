---
sidebar_position: 5
title: ADK Tutorial
---

# ADK Tutorial

This tutorial covers how to create agents, create and manage models, and run or modify agents using the Agent Development Kit (ADK). Before beginning, ensure:

- The ADK is installed inside your virtual environment, and
- The virtual environment is activated, ensuring the ADK is already on your PYTHONPATH.

## 1. Creating an Agent

### Prerequisites

All commands in this section assume the ADK is installed in an active virtual environment.

### Step 1 — Run the Agent Setup Command

To generate a new agent project structure, run:

```bash
genie setup -a <url>
```

Valid `<url>` options are:

- `https://photon.asterquanta.com`
- `https://genie.asterquanta.com`

You may refer to the Quick Start Guide for more context, but these are the complete and current valid URLs.

### Step 2 — Files and Folders Generated

The setup command creates:

| Item | Description |
|------|-------------|
| `.env` | Contains environment variables such as API endpoints and authentication keys needed by the agent. |
| `logging.conf` | Configuration for logging levels, formats, and output destinations. |
| `agent.sh` | A helper shell script that can launch or wrap agent-related tasks. |
| `src/` | The source directory that contains the agent code. |

Inside `src/`, the two key files are:

#### `src/main.py`

The default entry point for running the agent:

```bash
python src/main.py
```

You are free to restructure or replace this file; it is simply provided as a starting point.

#### `src/agent.py`

This file contains the agent class implementation. It defines the execution logic for optimization tasks and is where you customize how the agent behaves.

## 2. Creating a Model

### Prerequisites

Ensure your virtual environment is active and the ADK is available.

### Step 1 — Add a New Model

To create a model, run:

```bash
genie model add <model-name>
```

Example:

```bash
genie model add inverter_model
```

#### What This Command Generates

The following files are created inside the model directory:

| File | Purpose |
|------|---------|
| `hyper_parameters.json` | Contains tunable parameters, such as ranges or limits used during optimization. |
| `metadata.json` | Describes the model's identity, type, and essential properties used by Genie. |
| `target_specifications.json` | Defines what the model is expected to achieve—targets, goals, constraints, and metrics. |
| `world_control_specifications.json` | Defines control variables, knobs, or inputs that can be adjusted during optimization. |

For full detail on model structure, you may refer to the complete Genie Model documentation.

### Step 2 — Registering a Model (First Time Only)

The first time you create a model, you must register it:

```bash
genie model register <model-name>
```

This step is required only once.

### Step 3 — Modifying a Model

You may update any aspect of the model by directly editing the JSON files listed above.

### Step 4 — Commit Changes

Once a model has been registered, any subsequent modification must be committed:

```bash
genie model commit <model-name>
```

This ensures your updates are versioned and recognized by Genie.

## 3. Running and Modifying Agents

This example assumes the default agent template generated via `genie setup`, though the process applies generally.

### Step 1 — Run the Agent

Start the agent with:

```bash
python src/main.py
```

### Step 2 — Modify the Agent

Edit `src/agent.py` and add a print statement inside the agent class—for example:

```python
print("Agent execution started")
```

### Step 3 — Restart to Apply Changes

To apply code updates:

1. Stop the running program (e.g., Ctrl + C)
2. Start it again:

```bash
python src/main.py
```

### Step 4 — Run Optimization on a Registered Model

When you start an optimization using a model registered with this agent, the print statement you added will be displayed during the optimization execution, because the statement is evaluated when the agent class is instantiated for the optimization run.