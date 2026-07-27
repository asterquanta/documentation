---
title: Measurements Tutorial
sidebar_label: Measurements
sidebar_position: 1
description: Learn how to define outputs and performance metrics for DC, AC, and Transient analyses using the Measurements tab.
---

The **Measurements** tab is used to define the outputs and performance metrics that will be evaluated during simulation. Measurements can be configured for DC, AC, and Transient analyses, allowing users to extract circuit performance data for different simulation types.

The Measurements page also provides access to the **Data Capture**, **Operating Points**, and **Component Nets** sections, enabling users to capture simulation variables, define operating-point expressions, and reference circuit nets while creating measurements.

![Measurements Tutorial 1](/img/MT/mt1.jpg)

## DC Analysis

The DC Analysis section is used to define measurements that will be evaluated during a DC sweep simulation.

The available measurement templates include:

- `Current@t`
- `Imax`
- `Vol@i`
- `Custom`

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

:::tip
Measurement values may be entered manually or imported using a CSV file.
:::

![Measurements Tutorial 2](/img/MT/mt2.jpg)

## AC Analysis

The AC Analysis section is used to define measurements that will be evaluated during AC simulations.

The available measurement templates include:

- `Vol@f`
- `Vmax@Frange`
- `Freq@Vol`
- `Vdiff`
- `Vavg@Frange`
- `AUC`
- `Freq@Vol@F`
- `Ternary`
- `Vrms`
- `Custom`

Select the required measurement template based on the analysis to be performed. If a predefined measurement does not meet the required evaluation, click **Custom** and enter the measurement statement manually.

For vector measurements, enable **Vector Mode** and specify the required frequency instances.

:::tip
Measurement values may also be imported using a CSV file.
:::

![Measurements Tutorial 3](/img/MT/mt3.jpg)

## Transient Analysis

The Transient Analysis section is used to define measurements that will be evaluated during transient simulations.

The available measurement templates include:

- `PD`
- `T-diff`
- `Slew`
- `Ternary`
- `Time@V`
- `Time@V(x)`
- `Time@V(x)2F`
- `Time@V(x)LF`
- `Vol@t`
- `Vmin`
- `Vavg`
- `AUC`
- `Vrms`
- `Custom`

Select the required measurement template, or click **Custom** to define a custom measurement statement.

For vector measurements:

1. Enable **Vector Mode**.
2. Specify the required time instances.
3. Alternatively, import the measurement values using a CSV file.

![Measurements Tutorial 4](/img/MT/mt4.jpg)

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

## Data Capture

The **Data Capture** section allows users to capture variables that are defined directly within the netlist. This feature is commonly used with variables created using `let` statements, allowing the values to be referenced elsewhere in the project.

To add a Data Capture entry:

1. Scroll to the Data Capture section.
2. Click the Plus (**+**) icon.
3. Select the required data type.
4. Enter the variable name exactly as it appears in the netlist.
5. Click **Add Entry**.

Data Capture supports both **Scalar** and **Vector** measurements.

| Measurement Type | Description |
| --- | --- |
| Scalar | Captures a single simulation value. |
| Vector | Captures multiple values across a simulation sweep or time interval. |

When creating a vector measurement, select **Raw** as the data type. Enter the measured nets and vector labels. For example:

```
v(v-sweep)
v(vout)
```

The first term identifies the sweep variable, while the remaining terms represent the measured outputs.

:::note
Vector data captured in this section can later be plotted from the Run Simulation tab.
:::

![Measurements Tutorial 7](/img/MT/mt7.jpg)

## Operating Points

The Operating Points section is used to define operating-point based evaluations.

Users can configure:

- Sweep Variable
- Sweep Value
- Component Signature
- Parameters
- Expression Name
- Expression

Click the Plus (**+**) icon to create a new operating-point expression. Provide an expression name and define the required expression using the available circuit parameters. Multiple operating-point expressions can be added as required.

![Measurements Tutorial 8](/img/MT/mt8.jpg)

## Notes

- Measurements are configured independently for each analysis type.
- Both scalar and vector measurements are supported.
- Vector measurements can be used to capture multiple values across a simulation sweep or time interval.
- Variables defined using Data Capture can be referenced by other features within the application.
- The Component Nets panel provides a convenient reference for available circuit nodes while creating measurements.