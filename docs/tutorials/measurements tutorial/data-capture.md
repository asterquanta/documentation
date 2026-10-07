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

