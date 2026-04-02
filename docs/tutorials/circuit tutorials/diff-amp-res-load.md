---
sidebar_position: 5
---

# Differential Op-Amp Resistive Load

## Creating a New Project

![Create Project Step 1](/img/CT4/ct1.jpg)
![Create Project Step 2](/img/CT4/ct2.jpg)

Create a new project by clicking **Add New Project**. A single project can contain multiple related circuits.

Upon clicking **Add New Project**, you will be prompted to enter:

- **Project Type** – Select the appropriate classification (Analog, Digital, or Mixed-Signal)
- **Project Name** – Enter the project name

After completing the details, click **Save Project**.

You will then be redirected to the Upload Circuit page.

---

## Base Circuit Details

- **Base Circuit Name** – Enter the base circuit name
- **Tool** – Select the schematic/simulation tool. For this tutorial, Ngspice is used
- **Circuit Schematic** – Upload the `.spice` (netlist) file (`dc_netlist.spice` is used in this tutorial)
- **Circuit Image** – Upload schematic screenshots, including input and output waveforms

For this tutorial, the circuit considered is **Diff_Amp**.

### Circuit Dependencies

Upload the required models and libraries. For this tutorial, the Global Foundries 180nm models and libraries are included.

Complete the process by clicking **Save Circuit**.

![DC Analysis Tabs](/img/CT4/ct4.jpg)
---

## DC Analysis

After uploading the circuit, click on the testbench from the left-hand panel under **Circuits**. (In this tutorial, `Diff_Amp_DC_tb` is used.)

The following tabs will be visible:

- Netlist
- Design Parameters
- Environment Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

![Netlist View](/img/CT4/ct5.jpg)

---

### Netlist

You can view the uploaded netlist file in the **Netlist** tab.

- Click the **Edit** button to make changes to the netlist if required.
- Click the **Image** icon next to the Edit button to view uploaded circuit images.

![Netlist Edit](/img/CT4/ct6.jpg)
![Design Parameters](/img/CT4/ct7.jpg)

---

### Design Parameters

![Environment Parameters](/img/CT4/ct8.jpg)

This tab displays all parameters defined in the uploaded netlist along with their respective values.

For optimization, you can define the allowed range for each parameter by modifying:

- **Minimum Value**
- **Maximum Value**

By default, these values are set to half and twice the typical parameter value.

Select the testbench (`Diff_Amp_DC_tb`) and enable the parameters that should be optimized by the AI agent.

---

### Environment Parameters

![Measurements](/img/CT4/ct9.jpg)

This tab is used to define simulation conditions such as process corner and temperature.

For this tutorial, the temperature is set to **27°C**.

---

### Measurements

![Data Capture 1](/img/CT4/ct10.jpg)

Measurement statements define the values that will be evaluated during simulation.

The measurement type depends on the requirement:

- **Scalar**
- **Vector**

Under **DC Analysis**, click the **Custom** button and provide a variable name. Enter the measurement statement in the generated input box.

For this tutorial, a vector measurement is used to evaluate values at multiple instances.

The required voltage values can be:
- Entered manually, or
- Uploaded using a CSV file via the menu icon beside **DC Analysis**

To enable vector measurement:
1. Click the menu icon in the top-right corner of the measurement box
2. Enable **Vector Mode**
3. Provide the variable name (e.g., `Vout1`) and the instances at which measurements are taken, separated by commas

#### Data Capture

![Data Capture 2](/img/CT4/ct11.jpg)
![Simulation Setup 1](/img/CT4/ct12.jpg)

To extract variables defined in the netlist (such as `pm`), **Data Capture** is used. In this tutorial, variables are calculated using `let` statements, so Data Capture is required.

To add a Data Capture measurement:

1. Click the **Plus (+)** icon under **Data Capture**
2. Enter the variable name exactly as defined in the netlist

Vector measurements can also be used by:
- Changing the measurement type from **Scalar** to **Vector**
- Entering multiple variable names separated by commas

---

### Simulation Setup

![Simulation Setup 2](/img/CT4/ct13.jpg)
![Genie 1](/img/CT4/ct14.jpg)

Before running the simulation, **Manage Dependencies** must be completed.

To include dependencies:
1. Click the menu button below **Publish Project**
2. Select **Manage Dependencies**
3. Click the **Chain** icon to connect the required models and libraries

After linking dependencies:
1. Click **Simulate**
2. View the results in the **Log file**

The results correspond to the default design parameter values defined in the **Design Parameters** tab.

---

### Genie

![Genie 2](/img/CT4/ct15.jpg)
![Open Graph](/img/CT4/ct16.jpg)

The **Genie** page is where circuit optimization is performed.

Measurement variables (both scalar and vector) defined earlier are displayed on the top-left of the Genie page.

To configure optimization:
1. Click **Enter Expression**
2. Select the measurement variable
3. Define the optimization goal:
   - Minimum
   - Maximum
   - Range
   - Equal to a value
4. Provide the target value or range for scalar measurements

Multiple expressions can be added using the **Plus (+)** icon.

For vector measurements, targets must be assigned using **Graph Mode**:

1. Click **Open Graph**

![Graph Y-values](/img/CT4/ct17.jpg)

2. Select the X-axis label (`vout_values`). The defined instances will be listed automatically.
3. Set Y-values either manually or by uploading a CSV file

![Import from File](/img/CT4/ct18.jpg)

Targets can also be assigned using **Import from File** (JSON format). The required JSON files are available in the **Resources** section.

![Transient Netlist](/img/CT4/ct19.jpg)

4. Select the appropriate agent. For this tutorial, the agent `Diff_Amp_DC` is used.
5. Click **Genie Optimize**

Open **Chart** to monitor:
- Current iteration measurement
- Best measurement achieved
- Target value

Each iteration is displayed in real time. Previous iterations can be viewed by enabling **Show Trail**.

Once the target is achieved, download the optimized netlist using the **Download** icon.

---

## Transient Analysis

Add a new testbench by clicking the **Plus (+)** icon.

Upload the required `.spice` file along with waveform images, then click **Save Circuit**.

After uploading, click on the testbench. The following tabs will be visible:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

---

### Netlist

![Transient Netlist Edit](/img/CT4/ct20.jpg)

The **Netlist** tab displays the uploaded netlist file.

- Click the **Pencil (Edit)** icon to edit the netlist.
- Click the **Image** icon to view uploaded images.

![Transient Netlist Image](/img/CT4/ct21.jpg)
![Transient Design Parameters](/img/CT4/ct22.jpg)

---

### Design Parameters

![Transient Measurements](/img/CT4/ct23.jpg)

This tab displays all parameters defined in the netlist along with their values.

Select the parameters that the AI agent is allowed to modify, and specify the optimization range by adjusting:

- **Minimum Value**
- **Maximum Value**

---

### Measurements

![Transient Simulation Setup](/img/CT4/ct24.jpg)

Measurement statements define the values evaluated during simulation.

Under **Transient Analysis**, click the **Custom** button and provide a variable name. Enter the measurement statement.

For this tutorial, a vector measurement is used. Values can be entered manually or uploaded using a CSV file.

To enable vector measurement:
1. Click the menu icon and enable **Vector Mode**
2. Provide the variable name (e.g., `[time]`) and the instances separated by commas

---

### Simulation Setup

![Transient Genie](/img/CT4/ct25.jpg)

Before running the simulation, complete **Manage Dependencies**:

1. Click the menu button below **Publish Project**
2. Select **Manage Dependencies**
3. Click the **Chain** icon to connect dependencies

Click **Simulate** and view results in the **Log file**.

---

### Genie

![Transient Graph](/img/CT4/ct26.jpg)

The **Genie** page is used for optimization.

1. Click **Enter Expression** and select the measurement variable
2. Define the optimization goal and provide target values
3. For vector measurements, click **Open Graph**

![Transient Import](/img/CT4/ct27.jpg)

4. Select the X-axis label (`output`)
5. Set Y-values manually or upload a CSV file

![Transient Agent](/img/CT4/ct28.jpg)

Targets can also be assigned using **Import from File** (JSON format).

![AC Add Testbench](/img/CT4/ct29.jpg)

6. Select the appropriate agent (`Diff_Amp_tran_tb`) and click **Genie Optimize**
7. Open **Chart** to monitor progress

Once the target is achieved, download the optimized netlist.

---

## AC Analysis

Add a new testbench by clicking the **Plus (+)** icon.

![AC Netlist 1](/img/CT4/ct30.jpg)

Upload the required `.spice` file and waveform images, then click **Save Circuit**.

---

### Netlist

![AC Netlist 2](/img/CT4/ct31.jpg)
![AC Netlist 3](/img/CT4/ct32.jpg)
![AC Design Parameters](/img/CT4/ct33.jpg)

The **Netlist** tab displays the uploaded netlist file.

- Click the **Pencil** icon to edit the netlist.
- Click the **Image** icon to view uploaded images.

---

### Design Parameters

![AC Measurements](/img/CT4/ct34.jpg)

This tab displays all parameters defined in the netlist along with their values.

Select the parameters for optimization and define their ranges.

---

### Measurements
![AC Data Capture 1](/img/CT4/ct35.jpg)

Measurement statements define the values evaluated during simulation.

Under **AC Analysis**, click the **Custom** button and provide a variable name. Enter the measurement statement.

For this tutorial, a vector measurement is used. Provide:
- The variable name (e.g., `[freq]`)
- The frequency instances separated by commas

#### Data Capture

![AC Data Capture 2](/img/CT4/ct36.jpg)
![AC Simulation Setup](/img/CT4/ct37.jpg)

To extract variables defined in the netlist (such as `ubw` and `pm`), **Data Capture** is used.

1. Click the **Plus (+)** icon under **Data Capture**
2. Enter the variable name

Vector measurements can also be used if required.

---

### Simulation Setup

![AC Genie 1](/img/CT4/ct38.jpg)

Complete **Manage Dependencies** before simulation.

Click **Simulate** and view results in the **Log file**.

---

### Genie

![AC Genie 2](/img/CT4/ct39.jpg)

The **Genie** page is used to assign optimization targets.

1. Select the measurement variable and define optimization goals
2. Select the appropriate agent (`Diff_Amp_AC_tb`) and click **Genie Optimize**
3. Open **Chart** to monitor progress

Once the target is achieved, download the optimized netlist.