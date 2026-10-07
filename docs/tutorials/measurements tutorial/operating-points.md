---
title: Operating Points
sidebar_label: Operating Points
sidebar_position: 3
description: Learn how to evaluate custom expressions against circuit or component parameters at a specific operating point.
---

## Overview

**Used for:** evaluating a custom expression against circuit or component parameters at a specific operating point (such as a bias condition or sweep value) — useful for derived quantities, such as a ratio or difference between component parameters, rather than a value pulled from simulation waveform data.

**How it works:** an operating-point expression is configured using a Sweep Variable, Sweep Value, Component Signature, and Parameters, then evaluated as a named Expression against those parameters.

**How to use it:** click the Plus (**+**) icon to create a new operating-point expression, provide an expression name, and define the expression using the available circuit parameters. Multiple expressions can be added as needed.
