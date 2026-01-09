# Two-Stage Op-Amp

:::info Resources
All files needed for this tutorial can be accessed from this link: [https://drive.google.com/drive/folders/1AF0CRgLRTJzCPkyfKrpjCE--CNfL3W-x](https://drive.google.com/drive/folders/1AF0CRgLRTJzCPkyfKrpjCE--CNfL3W-x)
:::

## Creating a New Project

![Circuit Tutorial 1](/img/ct1.jpg)

![Circuit Tutorial 2](/img/ct2.jpg)

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

![Circuit Tutorial 3a](/img/ct3a.jpg)

### Test Bench Details

- **Circuit Schematic** - Upload the `.spice` (netlist) file corresponding to your circuit. In this tutorial, a two-stage op-amp (`two_stage_opamp`) is used
- **Circuit Image** - Upload schematic images or screenshots. You may upload:
  - Circuit schematics
  - Input waveforms
  - Output waveforms

![Circuit Tutorial 3b](/img/ct3b.jpg)

### Circuit Dependencies

For your circuit dependencies, make sure for this specific project, you add the two required ones:

- **Models** - Which you will get from the PDK Files in the resources (Upload `design.ngspice`)
- **Libraries** - Which you will also get from the PDK Files in the resources (Upload `sm141064.ngspice`)

Complete the process by clicking "Save Circuit".

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

![Circuit Tutorial 4](/img/ct4.jpg)

### Netlist

![Circuit Tutorial 5](/img/ct5.jpg)
![Circuit Tutorial 6](/img/ct6.jpg)

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Edit button, if changes are required for different simulation results.

Uploaded circuit images can be viewed by clicking the Image icon next to the Edit button.

### Design Parameters

![Circuit Tutorial 7](/img/ct7.jpg)

This tab displays all parameters defined in the uploaded netlist along with their current values.

For optimization purposes, you can specify a range for each parameter by modifying:

- Minimum Value
- Maximum Value

By default, these are set to half and twice the typical parameter value.

Select the testbench (`two_stage_closed_DC`) and enable the parameters that should be optimized by the AI agent.

### Environment Parameters

![Circuit Tutorial 8](/img/ct8.jpg)

This tab is used to define simulation conditions such as:

- Process corner
- Temperature

For this tutorial, the temperature is set to a default value of 27°C.

### Measurements

![Circuit Tutorial 9](/img/ct9.jpg)

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

![Circuit Tutorial 10](/img/ct10.jpg)

![Circuit Tutorial 11](/img/ct11.jpg)

To extract variables defined within the netlist (such as offset), a Data Capture measurement is used.

This method is suitable for measurements involving let statements.

Click the Plus (+) icon under Data Capture.

Enter the variable name exactly as defined in the netlist (e.g., `offset`).

Vector measurements can also be used in Data Capture by:

- Changing the measurement type from Scalar to Vector
- Entering multiple variable names separated by commas

### Simulation Setup

![Circuit Tutorial 12](/img/ct12.jpg)

Manage Dependencies must be completed before running simulations.

Click the menu button below Publish Project (top-right corner).

Select Manage Dependencies, then click the Chain Icon to link the required models and libraries.

Once dependencies are connected, click Simulate.

Simulation results can be viewed in the Log file.

![Circuit Tutorial 13](/img/ct13.jpg)

The results displayed correspond to the default design parameter values specified in the Design Parameters tab.

### Genie (Optimization)

![Circuit Tutorial 14](/img/ct14.jpg)
![Circuit Tutorial 15](/img/ct15.jpg)

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

For vector measurements, targets must be assigned using Graph Mode, since optimization occurs across multiple instances.

Click Open Graph to assign vector targets.

![Circuit Tutorial 16](/img/ct16.jpg)

Select the X-axis label (e.g., `output_dc`).

The instances defined earlier will be listed automatically.

Set Y-values either:

- Manually (for a small number of points), or
- By uploading a CSV file (for larger datasets)

![Circuit Tutorial 17](/img/ct17.jpg)

Targets can also be assigned by importing a JSON file using the Import from File option.

The required JSON files are available in the Resources section of this document.

![Circuit Tutorial 18](/img/ct18.jpg)

Select the appropriate optimization agent.
(For this tutorial, `two_stage_closed_dc` is used.)

Click Genie Optimize at the bottom-right of the page.

Open the Chart view to monitor:

- Current iteration measurement
- Best measurement achieved
- Target value

Each optimization iteration is displayed in real time.

Previous iterations can be viewed by enabling Show Trail.

Once the target is achieved, download the optimized netlist by clicking the Download icon below the agent selection panel.