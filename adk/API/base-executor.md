---
sidebar_position: 3
title: "BaseExecutor"
---


# class BaseExecutor
Abstract class that serves as the foundation for executing optimization tasks. Extends `Thread` and `ABC` to provide concurrent execution capabilities for optimization workflows.


## Import
```py
from adk.base_executor import BaseExecutor
```


## Members

- ### `controller: DomainController`
    + **Description**: The domain controller responsible for managing the optimization workflow, including communication with the platform and system execution.

&nbsp;

- ### `optimization_spec: OptimizationSpec`
    + **Description**: The specification defining the optimization problem, including parameters, targets, and system behavior. Retrieved from the controller.

&nbsp;

- ### `is_reset: bool`
    + **Description**: Flag indicating whether the executor is in a reset state.

&nbsp;

- ### `satisfied_flag: Event`
    + **Description**: Threading event used to signal when the optimization has been satisfied or should stop execution.


## Methods

- ### __init__
    + **Description**: Initialize the BaseExecutor with optimization configuration and connection details. Sets up the domain controller, loads the Genie model, and prepares the execution environment.
    + **Takes**:
        + `optimization: Optimization`: The optimization configuration containing project, target, and model information.
        + `connection: WsThread`: WebSocket connection thread for communication with the platform.
    + **Returns: Nothing**

&nbsp;

- ### run
    + **Description**: Abstract method defining the main execution loop. Must be implemented by subclasses to define specific optimization behavior.
    + **Takes: Nothing**
    + **Returns: Nothing**

&nbsp;

- ### update_display
    + **Description**: Update the display/UI with current agent statistics and progress information.
    + **Takes**:
        + `stats: AgentStats`: Statistics object containing current agent performance metrics and state.
    + **Returns: Nothing**

&nbsp;

- ### stop
    + **Description**: Signal the executor to stop execution by setting the satisfied flag.
    + **Takes: Nothing**
    + **Returns: Nothing**

&nbsp;

- ### send_error
    + **Description**: Send an error message to the platform through the controller.
    + **Takes**:
        + `code: int`: Error code identifying the type of error.
        + `message: str`: Human-readable error message describing what went wrong.
    + **Returns: Nothing**

&nbsp;

- ### restart
    + **Description**: Restart the executor after an error has occurred, delegating to the controller for restart logic.
    + **Takes**:
        + `error: Exception`: The exception that triggered the restart.
    + **Returns: Nothing**

&nbsp;

- ### satisfied
    + **Description**: Block execution until the satisfied flag is set, typically used to wait for optimization completion or stop signal.
    + **Takes: Nothing**
    + **Returns: Nothing**