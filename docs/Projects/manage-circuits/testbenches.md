---
title: Testbenches
sidebar_position: 8
---

![Circuit Testbench Interface](/img/testbench.jpg)

# Managing Circuits and Sub-Circuits

## Overview
The **Circuits panel** in the **Manage Circuit** page allows users to organize and manage circuit configurations and their associated **testbench sub-circuits** within a project.  
This section provides an intuitive hierarchical view of all circuits under the current project.

## Interface Layout
- The **Circuits panel** is located on the **left sidebar** of the page.  
- Each circuit group (for example, `vin_vs_vout` or `load_regulation`) can be expanded or collapsed using the arrow icon next to its name.  
- Under each circuit, the corresponding **sub-circuits or testbenches** (for example, `vin_vs_vout_tb` or `load_regulation_tb`) are listed.

## Adding a Sub-Circuit
To add a new sub-circuit or testbench under an existing circuit:

1. Locate the desired circuit group in the **Circuits panel**.  
2. Click the **+™ (plus)** icon next to the circuit name.  
3. Enter the details for the new sub-circuit when prompted (depending on your workflow configuration).  
4. The new sub-circuit will appear **nested** under the selected circuit group.

Each sub-circuit added automatically inherits relevant environment parameters and can be configured independently under the **Design Parameters** or **Environment Parameters** tabs.

## Example
In the example shown:

The project contains two main circuits:
- `vin_vs_vout`
- `load_regulation`

Each of these circuits includes one sub-circuit (testbench):
- `vin_vs_vout_tb`
- `load_regulation_tb`

Users can add more sub-circuits by clicking the **+™** icon beside either `vin_vs_vout` or `load_regulation`.

## Key Notes
- Each circuit can have **multiple associated testbenches or sub-circuits** for various simulation configurations.  
- Changes made in one sub-circuit **do not affect others** under the same circuit group.  
- Sub-circuits can be **renamed or deleted** from their context menu (if available in your current build).


