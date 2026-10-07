---
title: Measurements Tutorial
sidebar_label: Measurements
sidebar_position: 1
description: Learn how to define outputs and performance metrics for DC, AC, and Transient analyses using the Measurements tab.
---

The **Measurements** tab is used to define the outputs and performance metrics that will be evaluated during simulation. Measurements can be configured for DC, AC, and Transient analyses, allowing users to extract circuit performance data for different simulation types.

The Measurements page also provides access to the **Data Capture** and **Component Nets** sections, enabling users to capture simulation variables and reference circuit nets while creating measurements. Data Capture is covered on its own page — see [Data Capture](./data-capture.md).

At a high level, a measurement is a statement (e.g. `.meas dc output_dc FIND vout at = 0`) that is evaluated against simulation output. A single measurement can be run once, or — using **Vector Mode** — run repeatedly across a list of instance values to produce a full array of results in one pass. The sections below cover both approaches for each analysis type.

## Measurement Types Overview

This page covers two ways of extracting data from a simulation using measurement statements. Each serves a different purpose — the sections below give a quick summary of what each is for, how it works, and when to use it, before the page walks through the detailed steps for each analysis type.

Two other ways to extract data have their own dedicated pages: [Data Capture](./data-capture.md) and [Operating Points](./operating-points.md).

### Scalar Measurement

**Used for:** evaluating a measurement statement at a single, specific condition — e.g. the output voltage at one particular time, frequency, or sweep point.

**How it works:** a measurement statement (such as `.meas dc output_dc FIND vout at = 0`) is evaluated once against the simulation output, producing a single result value.

**How to use it:** select an analysis type (DC, AC, or Transient), choose a measurement template or **Custom**, and enter the statement without enabling **Vector Mode**. See [DC Analysis](#dc-analysis), [AC Analysis](#ac-analysis), or [Transient Analysis](#transient-analysis) below.

### Vector Measurement

**Used for:** evaluating the same measurement statement across a list of values — e.g. output voltage at every point in a sweep — in a single pass, rather than configuring a separate measurement for each point.

**How it works:** enabling **Vector Mode** inserts the variable name into the measurement statement as a `[placeholder]`. The statement is then evaluated once per value in the corresponding instance list, in list order, producing one result per instance (e.g. `output_dc_vec_0`, `output_dc_vec_1`, ...) as well as a combined result array.

**How to use it:** click the menu icon on a measurement card, enable **Vector Mode**, enter the variable name, and specify the instances (comma-separated, or imported via CSV). See the Vector Mode callouts in [DC Analysis](#dc-analysis), [AC Analysis](#ac-analysis), and [Transient Analysis](#transient-analysis).

When Vector Mode is enabled, the variable name you enter is inserted into the measurement statement inside square brackets — e.g. `[voltage]`. This acts as a placeholder that is expanded at simulation time: the measurement statement is evaluated once for **each value** in the corresponding instance list, in the order the values are listed, producing one result per instance.

For example, given the measurement statement:

```text
.meas dc output_dc FIND vout at = [voltage]
```

and the voltage instance list `0, 0.0181818182, 0.0363636364, ...`, the platform generates one evaluation per value — first `vout at = 0`, then `vout at = 0.0181818182`, and so on. Each result is labeled `output_dc_vec_N`, where `N` is the zero-based position of the corresponding value in the instance list:

```text
output_dc_vec_0 = 0.2331445
output_dc_vec_1 = 0.2331678
output_dc_vec_2 = 0.2331924
...
```

The full set of results is also available as the array `output_dc`, in the same order as the instance list — `output_dc[0]` corresponds to `output_dc_vec_0`, and so on.

![Measurements Tutorial 1](/img/MT/mt1.jpg)

## DC Analysis

The DC Analysis section is used to define measurements that will be evaluated during a DC sweep simulation.

For this tutorial, a **Custom** measurement is used.

1. Click **Custom** under the DC Analysis section.
2. Enter a variable name for the measurement.
3. Provide the measurement statement in the generated input field.

For this tutorial, a vector measurement is used to evaluate multiple voltage values on the `vout` net. A measurement label named `output_dc` is assigned to the measurement. The analysis performs a DC sweep using the voltage source `V1`.

To configure a vector measurement:

1. Click the menu icon on the measurement card.
2. Enable **Vector Mode**.
3. Enter the variable name.
4. Specify the measurement instances, separated by commas.

![Measurements Tutorial 2](/img/MT/mt2.jpg)

## AC Analysis

The AC Analysis section is used to define measurements that will be evaluated during AC simulations.

Select the required measurement template based on the analysis to be performed. If a predefined measurement does not meet the required evaluation, click **Custom** and enter the measurement statement manually.

For vector measurements, enable **Vector Mode** and specify the required frequency instances.

:::info
Vector expansion for AC measurements works the same way as described in [DC Analysis](#dc-analysis): the variable name becomes a `[placeholder]` in the measurement statement, and the statement is evaluated once per value in the frequency instance list.

For example:

```text
.meas ac freq_response FIND vdb(vout) at =[freq]
```

with a frequency instance list of `10, 100, 1000, 10000, ...` produces one `freq_response` result per frequency value, in list order.
:::

![Measurements Tutorial 3](/img/MT/mt3.jpg)

![Measurements Tutorial 9](/img/MT/mt9.png)

## Transient Analysis

The Transient Analysis section is used to define measurements that will be evaluated during transient simulations.

Select the required measurement template, or click **Custom** to define a custom measurement statement.

For vector measurements:

1. Enable **Vector Mode**.
2. Specify the required time instances.
3. Alternatively, import the measurement values using a CSV file.

:::info
Vector expansion for transient measurements works the same way as described in [DC Analysis](#dc-analysis): the variable name becomes a `[placeholder]` in the measurement statement, and the statement is evaluated once per value in the time instance list.

For example:

```text
.meas tran output FIND v(vout) at = [time]
```

with a time instance list of `0, 5.050505051e-8, 1.01010101e-7, ...` produces one `output` result per time value, in list order.
:::

![Measurements Tutorial 4](/img/MT/mt4.jpg)

![Measurements Tutorial 10](/img/MT/mt10.png)

## Component Nets

The **Component Nets** panel is located on the right side of the Measurements page. This panel displays all component connections and circuit nets extracted from the uploaded schematic or netlist.

Examples include:

- `vout`
- `Vdd`
- `GND`

:::info
These nets can be referenced while creating measurements, eliminating the need to manually enter circuit node names.
:::

![Measurements Tutorial 5](/img/MT/mt5.jpg)
![Measurements Tutorial 6](/img/MT/mt6.jpg)

## Notes

- Measurements are configured independently for each analysis type.
- Both scalar and vector measurements are supported.
- Vector measurements can be used to capture multiple values across a simulation sweep or time interval — the measurement statement is evaluated once per instance, in the order the instances are listed.
- The Component Nets panel provides a convenient reference for available circuit nodes while creating measurements.