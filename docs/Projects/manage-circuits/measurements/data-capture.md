---
title: Data Capture
sidebar_label: Data Capture
sidebar_position: 2
description: Learn how to capture let-defined variables and raw simulator data from the netlist using the Data Capture section.
---

The **Data Capture** section allows users to capture variables that are defined directly within the netlist. This feature is commonly used with variables created using `let` statements, allowing the values to be referenced elsewhere in the project.

The Data Capture panel lets you pull raw or `let`-defined variables straight out of the netlist without writing a measurement statement at all.

## Overview

**Used for:** pulling values directly out of the netlist or simulator output — either a variable defined with a `let` statement, or raw simulator-generated node/branch data — without writing a measurement statement at all.

**How it works:** three entry types are available — **Scalar** (a single `let`-defined value, identified by name), **Vector** (a series of values, identified by comma-separated data labels), and **Raw** (simulator node/branch data referenced directly by net name, e.g. `v(vout)`). For Scalar and Vector entries, the underlying `let`-defined variable must also be printed in the netlist in `name = value` format so it appears in the simulation log and can be read.

**How to use it:** click the Plus (**+**) icon in the Data Capture panel, choose the entry type, and enter the variable name, data labels, or net names as appropriate. The sections below give the full walkthrough.

## Printing Variables in the Netlist

For a `let`-defined variable to be captured, it must also be **printed** in the netlist so it appears in the simulation log file, in `name = value` format. For example, a variable named `offset` must be printed such that the log contains a line like:

```text
offset = 1.000000e-05
```

Data Capture reads the variable's value from this printed log line — if the variable is defined but never printed, it will not be available to capture.

## Adding a Data Capture Entry

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

Clicking the Plus (**+**) icon opens the entry-type dropdown, where you choose between **Scalar**, **Vector**, or **Raw**:

![Measurements Tutorial 13](/img/MT/mt13.png)

### Scalar Entries

To add a **Scalar** entry, select **Scalar** from the dropdown and enter the variable name exactly as it appears as a `let`-defined variable in the netlist (e.g. `offset`). The value field next to the entry is not user-configurable — it always shows `0` and does not need to be edited. As noted above, the variable must also be printed in `name = value` format in the netlist for its value to be readable from the log.

![Measurements Tutorial 12](/img/MT/mt12.png)

### Vector Entries

To add a **Vector** entry, select **Vector** from the dropdown and enter a name for the entry, then confirm:

![Measurements Tutorial 14](/img/MT/mt14.png)

In the field below the new entry, enter the data labels for the values to capture, separated by commas (e.g. `meas1, meas2, ...`).

![Measurements Tutorial 15](/img/MT/mt15.png)

### Raw Entries

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

- Variables defined using Data Capture can be referenced by other features within the application.