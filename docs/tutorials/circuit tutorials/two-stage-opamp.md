# Two-Stage Operational Amplifier

This tutorial walks through the complete workflow of creating, simulating, and analyzing a Two-Stage Operational Amplifier project on the platform. It covers project creation, circuit upload, testbench configuration, parameter selection, measurements, and simulation setup.

---

## 1. Creating a New Project

Begin by creating a new [projects](/docs/category/projects) from the Projects tab. A single project can contain multiple related circuits, allowing you to organize and manage designs efficiently.

1. Click **Add New Project**.
2. Enter the **Project Name**.
3. Select the **Project Type** — Analog, Digital, or Mixed Signal, depending on your design.
4. Save the project.

Once the project is created, you will be automatically redirected to the Upload Circuit page.

![Creating a new project](/img/ct1.jpg)

![Project configuration](/img/ct2.jpg)

---

## 2. Uploading the Circuit

On the Upload Circuit page, create your circuit for this tutorial, named `two_stage_opamp`.

**Tool**: Select the schematic/simulation tool used. For this tutorial, NGSpice is selected.

**Circuit Image**: Upload screenshots of:
- Circuit schematic
- Input waveform
- Output waveform

**Circuit Schematic**: Upload the `.spice` netlist file of the circuit.

**Circuit Dependencies**: Include all required models and libraries used in the circuit (for example: PDK_180nm).

Click **Save Circuit** to complete the circuit creation process.

---

## 3. Testbenches and Design Parameters

After saving the circuit, the uploaded circuit appears under the Testbenches section. You can add additional testbenches using the "+" (plus) icon. For this circuit, the following analyses are added:
- DC Analysis
- Transient Analysis
- AC Analysis

![Testbenches overview](/img/ct3.jpg)

### Design Parameters

All parameters declared in the circuit netlist automatically appear in the Design Parameters tab. **Typical Value** represents the default value from the netlist. **Minimum and Maximum Values** define the sweep range for the AI agent during optimization. These limits can be modified based on design requirements. For each testbench, select the parameters to be optimized using the checkboxes provided.

![Design parameters](/img/ct4.jpg)

---

## 4. Netlist View

Each testbench has a dedicated Netlist page where you can view the uploaded netlist, view associated circuit images, and edit the netlist if required to obtain different simulation results.

[Netlist for every testbench - click here](https://drive.google.com/drive/folders/1yKyh52W7lp1iC7JU4ApIiqivkggZTCbB)

For example, the DC testbench netlist page displays the circuit schematic, input voltage (Vin) plot, and output voltage (Vout) plot obtained from Xschem simulations for the `two_stage_opamp`.

![Netlist view](/img/ct5.jpg)

---

## 5. Testbench Results Overview

The netlist page of each testbench displays its respective simulation outputs.

### DC Analysis

![DC Analysis schematic](/img/ct6.jpg)

![DC Analysis results](/img/ct7.jpg)

### Transient Analysis

![Transient Analysis schematic](/img/ct8.jpg)

![Transient Analysis results](/img/ct9.jpg)

### AC Analysis

![AC Analysis schematic](/img/ct10.jpg)

![AC Analysis results](/img/ct11.jpg)

These images provide quick visual verification of circuit behavior under different analyses.

---

## 6. Measurements

### DC Analysis

A vector measurement is used to measure the output at multiple points. All measured points are considered during optimization. To enable vector mode, change the measurement type using the menu icon at the top-right of the measurement setup box. The `[voltage]` array specifies the voltage points at which output values are captured.

![DC measurements setup](/img/ct12.jpg)

#### Data Capture

Data Capture is used when values are calculated directly within the netlist, not from waveform plots. In this tutorial, the scalar variable `offset` is calculated in the netlist and captured using Data Capture. Data Capture also supports vector mode, allowing multiple values to be captured by selecting vector mode from the dropdown during setup.

![Data Capture configuration](/img/ct13.jpg)

### Transient Analysis

The transient measurement statement captures output values at multiple time instants. Vector mode is enabled using the measurement setup menu. The `[time]` array defines the specific time points at which output values are measured.

![Transient measurements](/img/ct14.jpg)

### AC Analysis

Vector measurements are used to capture frequency-domain behavior. Output magnitude is measured using `vdb(vout)`. The `freq` array specifies the frequency points at which measurements are taken.

![AC measurements](/img/ct15.jpg)

---

## 7. Simulation Setup

The Simulation Setup page displays the results of all measurement statements defined across testbenches. Vector results (for example, switching current at multiple time instants) are shown clearly. This allows quick validation of measurement definitions and simulation correctness.

![Simulation setup](/img/ct16.jpg)

---

## 8. Managing Dependencies and Running Simulations

Before viewing simulation results, ensure that all required dependencies are correctly linked.

1. Click the menu button below **Publish Project** (top-right corner).
2. Select **Manage Dependencies**.
3. Click on the **chain icon** to connect the dependencies for the simulation.
4. After this click on **Simulate** and then you can view the results by checking the log.

---

## 9. GENIE – Circuit Optimization

The GENIE section is where the AI-driven optimization of your circuit takes place. This module allows you to define optimization goals based on the measurements extracted from your testbenches and automatically tune circuit parameters to meet those goals.

### 9.1 Defining Optimization Targets

On the left panel, you will see a list of all available measurement variables derived from the testbenches. You may change the expression name if you want. Click on **Enter Expression** and select the measurement variable you want to optimize in your circuit. You can choose how you want it to optimize (min, max, range, equals) in the bar next to the enter measurement and give your targeted range or value.

### 9.2 Importing Targets Using JSON

Instead of manually entering target values, you can import a JSON file containing predefined optimization targets.

- Click the **Import JSON** option in the GENIE interface.
- Upload the appropriate JSON file to automatically populate the target definitions.

You can find the JSON files required [here](https://drive.google.com/drive/u/1/folders/1Q5rts7lC_lA7nJ90dF__C3sh8y4cMeAo?pli=1).

![JSON import location](/img/ct17.jpg)

This approach is especially useful for complex designs with multiple optimization objectives.

### 9.3 Graph-Based Targets for Transient Behavior

For time-dependent (transient) optimization, GENIE provides a graph mode. Click the menu icon in the expression tab and select **Graph Mode**. Select your variable in the X-axis. Here you can give the time instances that you gave in the measurement tab previously and then the target values that you want at the respective time instances.

![DC targets](/img/ct18.jpg)

![Transient targets](/img/ct19.jpg)

![AC targets](/img/ct20.jpg)

### 9.4 Running Optimization

Now all that's left is to let the AI agent optimize your circuit. Select an agent that is suitable for your circuit and then click on **Genie Optimize** in the bottom-right. You can see every iteration that the agent does in real time in the **Chart**, and if you wish to see the previous iterations you can by toggling the **Show Trail** button.

### 9.5 Exporting the Optimized Circuit

To get the parameters of the circuit with your targeted output, you can click on **Download Netlist** under the **Agent** tab.

![Download optimized netlist](/img/ct21.jpg)