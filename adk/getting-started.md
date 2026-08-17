---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started
Let's get started with the **ADK in less than 10 minutes**.


## What you'll need
- An [AsterQuanta](https://academy-genie.asterquanta.com/home/dashboard) account.
- [Python](https://www.python.org/) version 3.13 **only** (will be less restrictive in future versions).
- A **Linux**, **macOS**, or **Windows** development machine.


## Quick start
### Setup development environment
Make a new **development environment** with the following:

<Tabs groupId="operating-systems" queryString="os">
<TabItem value="unix" label="Linux / macOS" default>

1. Create and navigate to your agent directory:
    ```sh
    mkdir MyAgent/
    cd MyAgent/
    ```

2. Create and enter a new **venv** for your agent (recommended):
    ```sh
    python -m venv .venv            # Create venv
    source ./.venv/bin/activate     # Activate venv
    ```

</TabItem>
<TabItem value="windows" label="Windows">

1. Create and navigate to your agent directory (PowerShell):
    ```powershell
    mkdir MyAgent
    cd MyAgent
    ```

2. Create and enter a new **venv** for your agent (recommended):
    ```powershell
    python -m venv .venv                      # Create venv
    .\.venv\Scripts\Activate.ps1              # Activate venv (PowerShell)
    ```

    If PowerShell blocks script execution, use Command Prompt instead:
    ```cmd
    .venv\Scripts\activate.bat
    ```

</TabItem>
</Tabs>

3. Install the **ADK**:
    ```sh
    pip install --trusted-host pypi.asterquanta.com --index-url https://pypi.asterquanta.com/simple/ adk
    ```

    Now, you should be able to run `genie -h` and see the following:
    ```sh
    usage: genie [-h] {setup,run,update,status,model} ...

    Official AsterQuanta Genie ADK wizard.

    options:
    -h, --help            show this help message and exit

    commands:
    {setup,run,update,status,model}
        setup               Sets up the project, in a ready for development state.
        run                 Start the agent (runs src/main.py).
        update              Push the updates on settings.json to AQ server.
        status              Show agent detection and settings summary.
        model               Sub command tree for model related operations.
    ```


### Create a new agent
Create a new **agent** with the following:

1. In your agent directory, run the following, and follow the instructions:
    ```sh
    genie setup -a <BASE_URL>
    ```

    Replace `<BASE_URL>` with either:
    - Production: https://genie.asterquanta.com
    - Staging / Development: https://photon.asterquanta.com
    - Learning / Academy: https://academy-genie.asterquanta.com

    Genie should now have created the following directory structure:
    ```
    MyAgent
    ├── .agent_data/        # ADK internal data, do not modify manually!
    ├── .env                # ADK / server configuration.
    ├── settings.json       # Agent settings (name, description, default hyperparameters).
    ├── src                 # Agent source code directory.
    │   ├── agent.py        # RL agent implementation.
    │   ├── __init__.py     # Python init file for agent.
    │   └── main.py         # Agent / ADK connector entrypoint.
    ```

    See the [Agents](Basics/agents.md) page to understand the full agent layout.


### Update agent settings
An agent's settings live in `settings.json` at the project root. You may edit
this file to change the agent's `name`, `description`, `hyper_parameters`, or `is_public` visibility.
You can also enable optional [resource usage logging](Basics/agent-settings.md#resource-usage-logging)
(`resource_logging_options`) to record CPU and memory samples to a local JSONL file while the agent
is connected.
You can push metadata changes to the AsterQuanta platform without restarting the agent by running:
```sh
genie update
```
For more info, refer to the [Agent Settings](Basics/agent-settings.md) page.

### Update agent environment settings
An agent's environment settings live in `.env` at the project root. You may edit this file to change
connection settings and optional runtime identifiers such as [`INSTANCE_ID`](Basics/environment-settings.md#instance-id-multi-instance-deployments)
when running multiple copies of the same agent. Editing `.env` is generally only needed for
deployment or local development; changes apply on the next agent start. For more info, refer to the
[Environment Settings](Basics/environment-settings.md) page.


### Create a new model
This is the last step before a fully functional agent appears on the platform!
A model is an abstraction that prevents developers from having to create a new agent for every circuit or
system they build an agent for. It enables developers to implement one agent, once, and load it with
different models depending on the task at hand. This is the **Don't Repeat Yourself** principle in full effect.

Create a new **model** with the following:

1. In your agent directory:
    ```sh
    genie model add MyAgent-model
    ```

    You should now see a new `models/` directory with the following structure created by `genie`:

    ```
    models/
    └── MyAgent-model
        ├── hyper_parameters.json
        ├── metadata.json
        ├── models
        ├── target_specifications.json
        └── world_control_specifications.json
    ```

2. Modify `models/MyAgent-model/metadata.json` such that `"bypass"` is set to `true`, this makes it so that the model is not validated against the world control specifications and target specifications such that it can be used for any system:
    ```json
    {
        ...
        "bypass": true,
        ...
    }
    ```


### Start your agent
Start the agent with:

```sh
genie run
```
or alternatively:

```sh
python src/main.py
```

Both of these commands run `src/main.py`, which typically creates a [`Connector`](API/connector.md) and connects to the platform. See [Running on the Cloud](running-on-the-cloud.md) to start an optimization from the web UI.
