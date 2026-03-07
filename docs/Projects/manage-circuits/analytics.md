---
sidebar_position: 9
---

# Analytics

The Analytics section provides a detailed view of the optimization process carried out by the AI agent. It allows users to monitor performance, analyse trends, and gain insights into how the optimization evolves over time.

## Optimization History

The Analytics page displays a list of all optimization runs associated with the selected circuit. Each entry provides a quick summary of the run, including:

- Status of the optimization (running or completed)
- Total runtime duration
- Number of steps executed
- Error count (if any)
- Timestamp indicating when the optimization started

A run represents a complete execution of the optimization process initiated by the user. Each run may contain multiple episodes during which the AI agent explores different parameter configurations in order to improve circuit performance.

This enables users to track multiple optimization attempts and compare their progress and outcomes.

## Run Overview and Metrics

Upon selecting a specific optimization run, detailed metrics are displayed at the top of the page. These include:

- **Runs** – Total number of runs executed
- **Episode** – Number of episodes completed during the run
- **Terminations** – Number of episodes that ended successfully when the optimization objective or termination condition was reached
- **Truncations** – Number of episodes that ended early due to constraints such as maximum step limits or interruptions
- **Steps in episode** – Number of steps taken within the selected episode
- **Total episode reward** – Overall performance score achieved by the agent during that episode

An episode represents a single optimization attempt within a run. During an episode, the AI agent iteratively adjusts circuit parameters in order to move the design closer to the desired specifications.

The total episode reward reflects how well the circuit satisfies the optimization objectives defined for the task. Higher reward values generally indicate better performance relative to the target specifications. Since reward functions may vary depending on the optimization setup, users typically evaluate performance by observing improvements in reward values across episodes rather than comparing against a fixed benchmark.

These metrics provide a high-level understanding of the agent's behaviour and performance during the optimization process.

## Step Quality Analysis

The Step Quality view visualizes how the optimization progresses over time. It includes:

- **Raw Step Quality** – The direct performance value calculated at each step
- **Average Step Quality** – A smoothed trend that highlights overall improvement across steps

A step represents a single interaction between the AI agent and the circuit environment. During each step:

- The agent applies an action by modifying one or more circuit parameters
- The circuit simulation is executed with the updated parameters
- Observations and a reward value are returned to the agent

Multiple steps together form an episode, and multiple episodes together form a run.

The Step Quality graph helps identify stability, convergence trends, and fluctuations in the optimization process.

Users can:

- Zoom and scroll through steps
- Load additional data for extended analysis

## Step Distribution

The Step Distribution view provides a histogram of step quality values, showing how frequently certain performance levels occur throughout the optimization process.

This helps in:

- Understanding the consistency of the optimization
- Identifying whether the agent frequently reaches high-quality states
- Detecting variability in performance across different steps

A concentration of values in higher-quality ranges may indicate that the optimization process is converging toward improved circuit performance.

## Zen Matrix

The Zen Matrix provides a heatmap representation of parameter interactions and their influence on optimization outcomes.

- Each row represents a controllable circuit parameter
- Colour intensity indicates the strength and direction of the parameter's influence
- Helps identify which parameters contribute positively or negatively to the optimization objective

This visualization is useful for deeper analysis of parameter sensitivity and relationships within the optimization process.

## Selected Step Details

Users can select a specific step from the graph to view detailed information, including:

- Step quality value
- Timestamp of execution
- Option to view observations and actions

This allows for granular inspection of individual optimization steps and provides insight into how the agent behaved at a specific point during the optimization process.

## Observations and Actions

For a selected step, users can view:

- **Scalar Observations** – Key measured values obtained from the simulation (for example threshold voltages or other performance metrics)
- **Actions** – Parameter adjustments applied by the AI agent during that step

This information provides transparency into how the agent is making decisions and modifying the circuit parameters during optimization.

## Error Monitoring

The Analytics page includes an Errors panel that displays:

- Error count for the selected run
- Error codes and messages (if any)
- Timestamp of when the error occurred

This helps users quickly diagnose issues such as failed simulations, missing files, or configuration errors that may interrupt the optimization process.

## Continuous Analysis and Data Exploration

The Analytics interface supports continuous monitoring and exploration of optimization data:

- Scroll through large step sequences
- Load additional data dynamically
- Compare different runs from the history

By analysing trends across runs, episodes, and steps, users can better understand how the AI agent is exploring the design space and whether the optimization is progressing toward improved circuit performance.