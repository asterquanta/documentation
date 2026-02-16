# Two-Stage Op-Amp

## Creating a New Project

![Circuit Tutorial 1](/img/CT1/ct1.jpg)

![Circuit Tutorial 2](/img/CT1/ct2.jpg)

Create a new project by clicking "Add New Project". A single project can contain multiple related circuits.

Upon clicking "Add New Project", you will be prompted to enter:

- **Project Type** - Select Analog
- **Project Name** - Enter the project name
- **Description** - Write a short note on the project
- **Project Tags** - Used for better organization of your projects
- **Project Image** - Click on Upload image to add a project image (Image of the base circuit)

After that, you are redirected to the Upload Circuit page.

### Base Circuit Details

- **Base Circuit Name** - Enter the base circuit name
- **Tool** - Select the schematic/simulation tool being used. For this tutorial, Ngspice is selected
- **Description** - Enter a description for the base circuit
- **Circuit Image** - Upload an image of the base circuit

![Circuit Tutorial 3a](/img/CT1/ct3a.jpg)

### Test Bench Details

- **Circuit Schematic** - Upload the `.spice` (netlist) file corresponding to your circuit. In this tutorial, a two-stage op-amp (`two_stage_opamp`) is used
- **Circuit Image** - Upload schematic images or screenshots. You may upload:
  - Circuit schematics
  - Input waveforms
  - Output waveforms

![Circuit Tutorial 3b](/img/CT1/ct3b.jpg)

### Circuit Dependencies

For your circuit dependencies, make sure for this specific project, you add the two required ones:

- **Models** - Which you will get from the PDK Files in the resources (Upload `design.ngspice`)
- **Libraries** - Which you will also get from the PDK Files in the resources (Upload `sm141064.ngspice`)

Complete the process by clicking "Save Circuit".
:::info View all the resources required for this step
[PDK Files](/resources/ct1_pdk_files.zip)
:::

## DC Analysis

After uploading the circuit, click on the testbench from the left-hand panel under Circuits.
(In this tutorial, `two_stage_closed_DC` is used.)

The following tabs will be visible:

- Netlist
- Design Parameters
- Environment Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained in the sections below.

![Circuit Tutorial 4](/img/CT1/ct4.jpg)

### Netlist

![Circuit Tutorial 5](/img/CT1/ct5.jpg)
![Circuit Tutorial 6](/img/CT1/ct6.jpg)

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Edit button, if changes are required for different simulation results.

Uploaded circuit images can be viewed by clicking the Image icon next to the Edit button.

### Design Parameters

![Circuit Tutorial 7](/img/CT1/ct7.jpg)

This tab displays all parameters defined in the uploaded netlist along with their current values.

For optimization purposes, you can specify a range for each parameter by modifying:

- Minimum Value
- Maximum Value

By default, these are set to half and twice the typical parameter value.

Select the testbench (`two_stage_closed_DC`) and enable the parameters that should be optimized by the AI agent.

**Note:** Design Parameter values can only be changed by accessing the Design Parameters tab from the Base Circuit page, not from the Design Parameters tab within the Test Bench Circuit page.

### Environment Parameters

![Circuit Tutorial 8](/img/CT1/ct8.jpg)

This tab is used to define simulation conditions such as:

- Process corner
- Temperature

For this tutorial, the temperature is set to a default value of 27°C.

### Measurements

![Circuit Tutorial 9](/img/CT1/ct9.jpg)

Measurement statements define what values should be evaluated during simulation.

The type of measurement depends on the requirement:

- Scalar
- Vector

Under DC Analysis, click the Custom button and provide a variable name.

Enter the measurement statement in the generated input box.

For this tutorial, a vector measurement is used to evaluate values at multiple instances.

Voltage values can be:

- Entered manually, or
- Uploaded using a CSV file via the menu icon beside DC Analysis.

Click the menu icon in the top-right corner of the measurement box and enable Vector Mode.

Provide:

- The variable name (e.g., `[voltage]`)
- The instances at which measurements are taken, separated by commas

#### Data Capture

![Circuit Tutorial 10](/img/CT1/ct10.jpg)

![Circuit Tutorial 11](/img/CT1/ct11.jpg)

To extract variables defined within the netlist (such as offset), a Data Capture measurement is used.

This method is suitable for measurements involving let statements.

Click the Plus (+) icon under Data Capture.

Enter the variable name exactly as defined in the netlist (e.g., `offset`).

Vector measurements can also be used in Data Capture by:

- Changing the measurement type from Scalar to Vector
- Entering multiple variable names separated by commas

### Simulation Setup

![Circuit Tutorial 12](/img/CT1/ct12.jpg)

Manage Dependencies must be completed before running simulations.

Click the menu button below Publish Project (top-right corner).

Select Manage Dependencies, then click the Chain Icon to link the required models and libraries.

Once dependencies are connected, click Simulate.

Simulation results can be viewed in the Log file.

![Circuit Tutorial 13](/img/CT1/ct13.jpg)
![Circuit Tutorial 14](/img/CT1/ct14.jpg)

The results displayed correspond to the default design parameter values specified in the Design Parameters tab.

### Genie (Optimization)

![Circuit Tutorial 15](/img/CT1/ct15.jpg)

The Genie page is where circuit optimization is performed.

Measurement variables (both scalar and vector) defined earlier are displayed on the top-left of the Genie page.

You may rename expressions if required.

Click Enter Expression, select the measurement variable, and define the optimization goal:

- Minimum
- Maximum
- Range
- Equal to a value

Provide the target value or range for scalar measurements.

Multiple expressions can be added using the Plus (+) icon.

For vector measurements, targets can be assigned using Graph Mode, since optimization occurs across multiple instances.

Click Open Graph to assign vector targets.

![Circuit Tutorial 16](/img/CT1/ct16.jpg)

Select the X-axis label (e.g., `output_dc`).

The instances defined earlier will be listed automatically.

Set Y-values either:

- Manually (for a small number of points), or
- By uploading a CSV file (for larger datasets)

![Circuit Tutorial 17a](/img/CT1/ct17a.jpg)
![Circuit Tutorial 17b](/img/CT1/ct17b.jpg)
Targets can also be assigned by importing a JSON file using the Import from File option.

The required JSON files are available in the Resources section of this document.

![Circuit Tutorial 18](/img/CT1/ct18.jpg)

On the bottom left of the Genie page, you can select the appropriate agent for optimization.
(For this tutorial, `two_stage_closed_dc` is used.)

Click Genie Optimize at the bottom-right of the page.

Open the Chart view to monitor:

- Current iteration measurement
- Best measurement achieved
- Target value

Each optimization iteration is displayed in real time.

Previous iterations can be viewed by enabling Show Trail.

Once the target is achieved, download the optimized netlist by clicking the Download icon below the agent selection panel.
:::info View all the resources required for DC Analysis
[DC Analysis](/resources/ct1_dc_analysis.zip)
:::

## Transient Analysis

After uploading the circuit, add a new testbench by clicking the Plus (+) icon.

![Circuit Tutorial 19](/img/CT1/ct19.jpg)

Upload the required `.spice` file along with the waveform images for the analysis, then click Save Circuit.

Once saved, click on the newly created testbench. The following tabs will be available:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained in the sections below.

### Netlist

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Pencil (Edit) icon, if changes are required for different simulation results.

Uploaded circuit images can be viewed by clicking the Image icon next to the Edit icon.

![Circuit Tutorial 20](/img/CT1/ct20.jpg)

The images uploaded for the transient analysis are shown below:

![Circuit Tutorial 21](/img/CT1/ct21.jpg)
![Circuit Tutorial 22](/img/CT1/ct22.jpg)

### Design Parameters

![Circuit Tutorial 23](/img/CT1/ct23.jpg)

This tab displays all parameters defined in the uploaded netlist along with their current values.

For optimization, you can select the parameters that the AI agent is allowed to modify.

You can also define the allowed range of each parameter by adjusting:

- Minimum Value
- Maximum Value

By default, these are set to half and twice the typical parameter value.

### Measurements

![Circuit Tutorial 24](/img/CT1/ct24.jpg)

Measurement statements define the values that will be evaluated during simulation.

The measurement type depends on the requirement:

- Scalar
- Vector

Under Transient Analysis, click the Custom button and provide a variable name.

Enter the measurement statement in the generated input box.

For this tutorial, a vector measurement is used to evaluate values at multiple instances.

The required voltage/time values can be:

- Entered manually, or
- Uploaded using a CSV file (via the menu icon beside Transient Analysis)

To enable vector measurement:

- Click the menu icon in the top-right corner of the measurement box
- Enable Vector Mode
- Provide:
  - The variable name (e.g., `[time]`)
  - The instances at which measurements are taken, separated by commas

### Simulation Setup

This tab displays the results of the measurement statements added under the Measurements tab.

Before running the simulation, Manage Dependencies must be completed.

To add dependencies:

- Click the menu button below Publish Project (top-right corner)
- Select Manage Dependencies
- Click the Chain icon to connect the required models and libraries

After linking dependencies:

- Click Simulate
- View the results in the Log file

![Circuit Tutorial 25](/img/CT1/ct25.jpg)

### Genie (Optimization)

This page is where circuit optimization is performed, and targets are assigned for the AI agent to achieve.

![Circuit Tutorial 26](/img/CT1/ct26.jpg)

All measurement variables (both scalar and vector) defined earlier will be displayed on the top-left of the Genie page.

You may rename expressions if required.

To configure optimization:

- Click Enter Expression
- Select the measurement variable
- Define the optimization goal:
  - Minimum
  - Maximum
  - Range
  - Equal to a value
- Provide the target value/range (for scalar measurements)

Multiple expressions can be added using the Plus (+) icon.

For vector measurements, targets can be assigned using Graph Mode, since optimization occurs across multiple instances.

Click Open Graph to assign vector targets.

![Circuit Tutorial 27](/img/CT1/ct27.jpg)

Select the X-axis label (e.g., `output`). The instances entered in the Measurements tab will be listed automatically.

Targets (Y-values) can be set:

- Manually (for a small number of points), or
- By uploading a CSV file (for larger datasets)

![Circuit Tutorial 28](/img/CT1/ct28.jpg)

Targets can also be assigned by importing a JSON file using Import from File.

![Circuit Tutorial 29](/img/CT1/ct29.jpg)

On the bottom left of the Genie page, you can select the appropriate agent for optimization. For this tutorial, the agent `two_stage_closed_transient` is used.

Then click Genie Optimize at the bottom-right of the Genie page.

Open the Chart view to monitor:

- Current iteration measurement
- Best measurement achieved
- Target value

Each optimization iteration is displayed in real time. Previous iterations can be viewed by enabling Show Trail.

Once the target is achieved, download the optimized netlist by clicking the Download icon below the agent selection panel.
:::info View all the resources required for Transient Analysis
[Transient Analysis](/resources/ct1_transient_analysis.zip)
:::

## AC Analysis

Add a new testbench by clicking the Plus (+) icon.

![Circuit Tutorial 30](/img/CT1/ct30.jpg)

Upload the required `.spice` file along with the waveform images, then click Save Circuit.

After uploading, click on the testbench. The following tabs will be visible:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained in the sections below.

### Netlist

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Pencil (Edit) icon, if changes are required for different simulation results.

Uploaded circuit images can be viewed by clicking the Image icon next to the Edit icon.

![Circuit Tutorial 31](/img/CT1/ct31.jpg)

The images uploaded for the AC analysis are shown below:

![Circuit Tutorial 32](/img/CT1/ct32.jpg)
![Circuit Tutorial 33](/img/CT1/ct33.jpg)

### Design Parameters

![Circuit Tutorial 34](/img/CT1/ct34.jpg)

This tab displays all parameters defined in the uploaded netlist along with their current values.

For optimization, select the parameters that the AI agent is allowed to modify.

For each enabled parameter, specify its optimization range by adjusting:

- Minimum Value
- Maximum Value

By default, these values are set to half and twice the typical parameter value.

### Measurements

![Circuit Tutorial 35](/img/CT1/ct35.jpg)

Measurement statements define the values that will be evaluated during simulation.

The measurement type depends on the requirement:

- Scalar
- Vector

Under AC Analysis, click the Custom button and provide a variable name.

Enter the measurement statement in the generated input box.

For this tutorial, a vector measurement is used to evaluate values at multiple frequency instances.

The required values can be:

- Entered manually, or
- Uploaded using a CSV file (via the menu icon beside AC Analysis)

To enable vector measurement:

- Click the menu icon in the top-right corner of the measurement box
- Enable Vector Mode
- Provide:
  - The variable name (e.g., `[freq]`)
  - The frequency instances separated by commas

#### Data Capture

![Circuit Tutorial 36](/img/CT1/ct36.jpg)

To extract variables directly from the netlist, a Data Capture measurement is used.

This method is suitable for measurements involving let statements.

![Circuit Tutorial 37](/img/CT1/ct37.jpg)

In this tutorial, the variables `ubw` and `pm` are calculated using let statements. Therefore, Data Capture is used.

To add a Data Capture measurement:

- Click the Plus (+) icon under Data Capture
- Enter the variable name exactly as defined in the netlist

Vector measurements can also be used in Data Capture by:

- Changing the measurement type from Scalar to Vector
- Entering multiple variable names separated by commas

### Simulation Setup

This tab displays the results of the measurement statements added under the Measurements tab.

Before running the simulation, Manage Dependencies must be completed.

To include dependencies:

- Click the menu button below Publish Project (top-right corner)
- Select Manage Dependencies
- Click the Chain icon to connect the required models and libraries

After linking dependencies:

- Click Simulate
- View the results in the Log file

![Circuit Tutorial 38](/img/CT1/ct38.jpg)

### Genie (Optimization)

This page is where circuit optimization is performed, and targets are assigned for the AI agent.

![Circuit Tutorial 39](/img/CT1/ct39.jpg)

All measurement variables (both scalar and vector) defined earlier will be visible on the top-left of the Genie page.

You may rename expressions if required.

To configure optimization:

- Click Enter Expression
- Select the measurement variable
- Define the optimization goal:
  - Minimum
  - Maximum
  - Range
  - Equal to a value
- Provide the target value/range (for scalar measurements)

Multiple expressions can be added using the Plus (+) icon.

![Circuit Tutorial 40](/img/CT1/ct40.jpg)
![Circuit Tutorial 41](/img/CT1/ct41.jpg)

On the bottom left of the Genie page, you can select the appropriate agent for optimization. For this tutorial, the agent `two_stage_closed_ac` is used.

Click Genie Optimize at the bottom-right of the Genie page.

Open the Chart view to monitor:

- Current iteration measurement
- Best measurement achieved
- Target value

Each optimization iteration is displayed in real time. Previous iterations can be viewed by enabling Show Trail.

Once the target is achieved, download the optimized netlist by clicking the Download icon below the agent selection panel.
:::info View all the resources required for AC Analysis
[AC Analysis](/resources/ct1_stability_analysis.zip)
:::

## Global Resources

:::info Download All Tutorial Resources
Click here to download the complete tutorial resource package:
[Download Tutorial Resources (ZIP)](/resources/circuit_tutorial_1_resources.zip)
:::