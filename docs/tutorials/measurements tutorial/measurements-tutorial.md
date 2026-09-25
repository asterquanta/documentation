---
title: Measurements Tutorial
sidebar_label: Measurements
sidebar_position: 1
description: Learn how to define outputs and performance metrics for DC, AC, and Transient analyses using the Measurements tab.
---

The **Measurements** tab is used to define the outputs and performance metrics that will be evaluated during simulation. Measurements can be configured for DC, AC, and Transient analyses, allowing users to extract circuit performance data for different simulation types.

The Measurements page also provides access to the **Data Capture** and **Component Nets** sections, enabling users to capture simulation variables and reference circuit nets while creating measurements.

At a high level, a measurement is a statement (e.g. `.meas dc output_dc FIND vout at = 0`) that is evaluated against simulation output. A single measurement can be run once, or — using **Vector Mode** — run repeatedly across a list of instance values to produce a full array of results in one pass. Separately, the **Data Capture** panel lets you pull raw or `let`-defined variables straight out of the netlist without writing a measurement statement at all. The sections below cover both approaches for each analysis type.

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

:::info
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
:::

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

:::info
Vector expansion for AC measurements works the same way as described in [DC Analysis](#dc-analysis): the variable name becomes a `[placeholder]` in the measurement statement, and the statement is evaluated once per value in the frequency instance list.

For example:

```text
.meas ac freq_response FIND vdb(vout) at =[freq]
```

with a frequency instance list of `10, 100, 1000, 10000, ...` produces one `freq_response` result per frequency value, in list order.
:::

:::tip
Measurement values may also be imported using a CSV file.
:::

![Measurements Tutorial 3](/img/MT/mt3.jpg)

![Measurements Tutorial 9](/img/MT/mt9.png)

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

## Data Capture

The **Data Capture** section allows users to capture variables that are defined directly within the netlist. This feature is commonly used with variables created using `let` statements, allowing the values to be referenced elsewhere in the project.

To add a Data Capture entry:

1. Scroll to the Data Capture section.
2. Click the Plus (**+**) icon.
3. Select the required data type.
4. Enter the variable name exactly as it appears in the netlist.
5. Click **Add Entry**.

Data Capture supports **Scalar**, **Vector**, and **Raw** measurements.

| Measurement Type | Description |
| --- | --- |
| Scalar | Captures a single simulation value for a `let`-defined variable, identified by name. |
| Vector | Captures a series of values, identified by a comma-separated list of data labels. |
| Raw | Captures simulator-generated node/branch data directly, referenced by net name (e.g. `v(v-sweep)`, `v(vout)`). |

![Measurements Tutorial 11](/img/MT/mt11.png)

To add a **Scalar** entry, click the Plus (**+**) icon, select **Scalar**, and enter the variable name exactly as it appears as a `let`-defined variable in the netlist (e.g. `offset`). The value field next to the entry is not user-configurable — it always shows `0` and does not need to be edited.

![Measurements Tutorial 12](/img/MT/mt12.png)

To add a **Vector** entry, click the Plus (**+**) icon and choose the entry type from the dropdown (**Scalar**, **Vector**, or **Raw**):

![Measurements Tutorial 13](/img/MT/mt13.png)

Select **Vector** and enter a name for the entry, then confirm:

![Measurements Tutorial 14](/img/MT/mt14.png)

In the field below the new entry, enter the data labels for the values to capture, separated by commas (e.g. `meas1, meas2, ...`).

![Measurements Tutorial 15](/img/MT/mt15.png)

When creating a **Raw** measurement, enter the measured nets and vector labels. For example:

```
v(v-sweep)
v(vout)
```

The first term identifies the sweep variable, while the remaining terms represent the measured outputs.

:::note
Vector data captured in this section can later be plotted from the Run Simulation tab.
:::

![Measurements Tutorial 7](/img/MT/mt7.jpg)

## Notes

- Measurements are configured independently for each analysis type.
- Both scalar and vector measurements are supported.
- Vector measurements can be used to capture multiple values across a simulation sweep or time interval — the measurement statement is evaluated once per instance, in the order the instances are listed.
- Variables defined using Data Capture can be referenced by other features within the application.
- The Component Nets panel provides a convenient reference for available circuit nodes while creating measurements.