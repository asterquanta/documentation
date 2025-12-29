# Circuit Tutorial

This tutorial walks you through the complete process of creating a circuit, setting up testbenches, defining parameters and measurements, running simulations, and finally optimizing the circuit using Genie.

---

## 1) Creating a New Circuit

This page is used to create and register a new circuit within a project.

**Circuit Name**: Represents the name of the circuit. In this example, the circuit name is PMOS LDO.

**Simulator Type**: Select the simulator to be used for analysis and optimization. Here, NGSpice is selected.

**Description**: Optional, but recommended. Providing relevant details helps in better documentation and understanding of the circuit later.

**Circuit Schematic**: Upload the circuit netlist that will be used for analysis. For NGSpice, the file must be in `.spice` format.

**Circuit Dependencies**: Includes the required PDK libraries for circuit optimization. Also includes the foundry design files associated with the PDK.

Click **Save** to store the circuit in the current working project.

![Creating a new circuit](./ct_ldo_s1.jpeg)
*Fig. 1 - Creating a new circuit*

---

## 2) Uploading Testbenches

After saving the circuit, testbenches must be uploaded to enable different types of analysis.

In this tutorial, testbenches are created for Transient Analysis and Stability (AC) Analysis of the LDO.

**Circuit Name**: Represents the testbench name.

**Schematic**: Upload the testbench netlist.

**Circuit Image (Recommended)**: Upload a schematic image or plots showing self-designed values. This is useful for post-optimization comparison and analysis.

![Uploading testbenches](./ct_ldo_s2.jpeg)
*Fig. 2 - Uploading testbenches*

---

## 3) Design Parameters

This section lists all tunable parameters declared in the circuit netlist.

Each parameter appears with a **Value** (the default value defined in the netlist) and **Min / Max Values**. These define the allowed range for the AI agent. The agent sweeps within these limits to meet the target measurements.

Properly setting limits ensures stable and meaningful optimization.

![Design parameters](./ct_ldo_s3.jpeg)
*Fig. 3 - Design parameters configuration*

---

## 4) Netlist View

This section displays the complete netlist associated with each testbench. It contains full SPICE component definitions and the connection hierarchy of the circuit. The structure follows the conventions of the selected EDA tool.

This view helps users verify that the uploaded netlist is correct and all components and connections are properly defined.

![Netlist view](./ct_ldo_s4.jpeg)
*Fig. 4 - Netlist view*

---

## 5) Measurements

Measurements define what performance metrics are captured during simulation.

Measurement types vary depending on the testbench. In this example, AC Analysis is used for stability evaluation. Measurements are declared within control statements.

Using the **Data Capture** feature, required values are extracted from simulation logs. These captured values are later used for optimization.

![Measurements configuration](./ct_ldo_s5.jpeg)
*Fig. 5 - Measurements setup*

---

## 6) Simulation

Before optimization, the circuit must be simulated with default parameter values.

This step allows you to verify circuit outputs and ensure results match outputs from external EDA tools. Successful simulation confirms that there are no platform-related issues and the testbench is ready for AI-driven optimization.

![Running simulation](./ct_ldo_s6.jpeg)
*Fig. 6 - Simulation results*

---

## 7) Genie Optimization Setup

This is where optimization targets are defined and the AI agent is configured.

Targets are set based on measured values from default simulations. Two optimization modes are available: **Scalar Mode** (value-based optimization) and **Vector Mode** (graph-based optimization).

In this tutorial, stability optimization uses scalar targets. **Arithmetic Operations** are available for normalized and derived target optimization if required.

**Agent Selection**: The AGENT field must be filled with the appropriate agent for the testbench.

After optimization, generated charts can be analyzed and results can be used to further improve circuit robustness and performance.

![Genie optimization setup - Step 1](./ct_ldo_s7.jpeg)
*Fig. 7 - Genie optimization setup*

![Genie optimization setup - Step 2](./ct_ldo_s8.jpeg)
*Fig. 8 - Optimization configuration*

![Genie optimization setup - Step 3](./ct_ldo_s9.jpeg)
*Fig. 9 - Target measurements*

![Genie optimization setup - Step 4](./ct_ldo_s10.jpeg)
*Fig. 10 - Agent configuration*

![Genie optimization setup - Step 5](./ct_ldo_s11.jpeg)
*Fig. 11 - Optimization parameters*

![Genie optimization setup - Step 6](./ct_ldo_s12.jpeg)
*Fig. 12 - Optimization results*

![Genie optimization setup - Step 7](./ct_ldo_s13.jpeg)
*Fig. 13 - Performance analysis*