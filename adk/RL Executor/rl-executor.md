---
sidebar_position: 1
---

# Step Quality

The Reinforcement Learning (RL) executor tracks optimization progress using two metrics:
- **Satisfaction Quality**
- **Step Quality**

These values are updated after every environment step and are used to report optimization progress during training and inference.


## Satisfaction Quality
Satisfaction Quality represents the cumulative progress towards satisfying the optimization targets. It is expected to be a normalized value between `0.0` and `1.0`, where:

| Value | Meaning |
|-------|---------|
| `0.0` | No progress towards satisfying the optimization targets. |
| `1.0` | All optimization targets have been satisfied. |

If an environment provides a `satisfaction_quality` value in the `info` dictionary returned by `step()`, the RL executor uses that value directly. Before storing it, the value is clamped to the range `0.0` to `1.0`.

### Environment requirements
Every environment may return additional metadata through the `info` dictionary produced by `step()`.

For optimization progress tracking, environments should include:
```python
info = {
    "satisfaction_quality": <float between 0.0 and 1.0>
}
```

Providing this value allows the executor to accurately measure incremental progress towards the optimization objective.


## Step Quality
Step Quality is not supplied by the environment. Instead, it is calculated automatically by the RL executor as the change in satisfaction quality between consecutive environment steps:
```
step_quality = current_satisfaction_quality - previous_satisfaction_quality
```

This represents the amount of progress made by the most recent action.

For example:

| Previous Satisfaction Quality | Current Satisfaction Quality | Step Quality |
|-------------------------------|-------------------------------|---------------|
| 0.20 | 0.25 | +0.05 |
| 0.25 | 0.25 | 0.00 |
| 0.80 | 1.00 | +0.20 |

A positive value indicates progress towards the optimization objective, while a value of `0.0` indicates that the most recent step did not improve the current level of satisfaction.


## Default behaviour
If an environment does not provide `satisfaction_quality` in the `info` dictionary returned by `step()`, the RL executor computes a default measure of optimization progress.

The default implementation estimates the satisfaction quality by applying the sigmoid function to the reward returned by the environment. The resulting value is normalized to the range `0.0` to `1.0`, allowing the executor to estimate optimization progress even when the environment does not explicitly provide a `satisfaction_quality` value.

After determining the current satisfaction quality, the executor calculates the step quality as the difference between the current and previous satisfaction quality values:
```
step_quality = current_satisfaction_quality - previous_satisfaction_quality
```

This approach provides a consistent mechanism for tracking optimization progress across environments, regardless of whether the environment supplies its own `satisfaction_quality` value or relies on the executor's default calculation.

:::tip Recommendation
Environments that can accurately determine optimization progress should provide `satisfaction_quality` explicitly in the `info` dictionary. This enables the executor to report progress using environment-specific information. Otherwise, the executor automatically estimates the satisfaction quality from the reward returned by the environment before calculating the corresponding `step_quality`.
:::