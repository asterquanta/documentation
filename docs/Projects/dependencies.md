---
id: dependencies
title: Dependencies
sidebar_position: 8
---

# Dependencies 

## Circuit Dependencies

Dependencies are additional files or resources that a circuit needs in order to work correctly during simulation and optimization. While the main schematic or netlist defines the structure of the circuit, dependencies provide the supporting information that tells the simulator how individual components behave, how complex blocks are constructed, and how symbols are displayed.

Adding the correct dependencies ensures that:

- All components are recognized by the simulator
- Simulations run without errors or missing references
- Circuit behavior matches real-world performance
- Optimization and analysis results are accurate and reliable

Depending on your circuit, dependencies can belong to one or more of the following categories:

### Models

Models describe how individual electronic components behave electrically. They define characteristics such as voltage–current relationships, timing behavior, temperature effects, and non-ideal properties.

Examples include transistor models, diode models, or IC behavioral models. Without the correct models, the simulator cannot accurately predict how components will perform.

**Use Models when** your circuit contains components that require specific electrical behavior definitions beyond basic ideal elements.

### Sub-Circuits

Sub-Circuits are reusable circuit blocks built from smaller components. They allow complex designs to be broken down into manageable, modular sections.

Examples include amplifier stages, filters, power supply blocks, or custom-designed functional units. Sub-circuits make designs cleaner, easier to understand, and easier to modify or reuse across multiple projects.

**Use Sub-Circuits when** your design includes repeated or complex functional blocks.

### Libraries

Libraries are collections of predefined models, sub-circuits, or component definitions bundled together in a single resource. They simplify circuit creation by providing ready-to-use components instead of defining everything from scratch.

Libraries often include standard components such as resistors, capacitors, logic gates, or commonly used ICs supported by the selected simulation tool.

**Use Libraries when** your circuit depends on standard or vendor-provided components.

### Symbols

Symbols define how components or sub-circuits appear visually in the schematic editor. They control the graphical representation but do not affect the electrical behavior of the circuit.

Symbols make schematics easier to read, understand, and navigate, especially when working on large designs or collaborating with others.

**Use Symbols when** your circuit relies on custom components or when the default schematic symbols are not available.

### Why Dependencies Matter

Correctly adding dependencies ensures that your circuit is complete, portable, and reproducible. It allows anyone opening the project—whether it's a teammate, instructor, or future version of yourself—to simulate and optimize the circuit without missing files or configuration issues.