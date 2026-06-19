---
sidebar_position: 4
title: "Connector"
---

# class Connector

The main connector class that manages the WebSocket connection between the agent and the AsterQuanta platform. Handles heartbeat messages, incoming requests, and task lifecycle management.

## Import

```python
from adk.connector import Connector
```

## Members

- ### `request_handler: RequestHandler`
  - **Description**: Handler responsible for processing incoming requests from the platform and routing them to appropriate agent or executor methods.

## Methods

- ### \_\_init\_\_
  - **Description**: Initialize the `Connector` with the agent class and optional executor class. Sets up the WebSocket connection, request handling, and authentication headers.
  - **Takes**:
    - `agent_class: type[BaseAgent]`: The agent class to be instantiated for optimization tasks.
    - `executor_class: type[BaseExecutor]` (optional, default=`DefaultExecutor`): The executor class to be used for running optimization workflows.
    - `throw_errors: bool` (optional, default=`False`): Whether to propagate errors up or handle them internally with logging.
  - **Returns: Nothing**

&nbsp;

- ### start
  - **Description**: Start the connector, run the startup routine, and establish a WebSocket connection with the platform. Once connected, continuously listens for incoming requests and sends heartbeat messages. Automatically attempts to reconnect if the connection is closed unexpectedly.
  - **Takes: Nothing**
  - **Returns: Nothing**
  - **Note**: This is a blocking call that runs the asyncio event loop.