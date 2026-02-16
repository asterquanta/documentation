# V2I

## Creating a New Project

![Circuit Tutorial 1](/img/CT3/ct1.jpg)
![Circuit Tutorial 2](/img/CT3/ct2.jpg)

Create a new project by clicking "Add New Project". A single project can contain multiple related circuits.

Upon clicking "Add New Project", you will be prompted to enter:

- **Project Type** – Select the appropriate classification (Analog, Digital, or Mixed-Signal)
- **Project Name** – Enter the project name
- **Description** – Provide a short description of the project
- **Project Tags** – Used for organizing projects
- **Project Image** – Upload an image of the base circuit

After completing the details, click "Save Project".

You will then be redirected to the Upload Circuit page.

### Base Circuit Details

- **Base Circuit Name** – Enter the base circuit name
- **Tool** – Select the schematic/simulation tool. For this tutorial, Ngspice is used
- **Description** – Enter a description of the circuit
- **Circuit Schematic** – Upload the .spice (netlist) file. In this tutorial, `dc_netlist.spice` is uploaded
- **Circuit Image** – Upload schematic screenshots. You may include:
  - Circuit schematics
  - Input waveforms
  - Output waveforms

For this tutorial, the circuit considered is "V2I_converter".

### Circuit Dependencies

Upload the required models and libraries. For this tutorial, the Global Foundries 180nm models and libraries are included.

Complete the process by clicking "Save Circuit".

:::info View all the resources required for this step
[PDK Files](/resources/ct3_pdk_files.zip)
:::

## DC Analysis

After uploading the circuit, click on the testbench from the left-hand panel under Circuits. (In this tutorial, V2I_dc_analysis is used.)

The following tabs will be visible:

- Netlist
- Design Parameters
- Environment Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained below.

![Circuit Tutorial 3](/img/CT3/ct3.jpg)

### Netlist

You can view the uploaded netlist file in the Netlist tab.

You can edit the netlist by clicking the Edit button, if changes are required for different simulation results.

Uploaded circuit images can be viewed by clicking the Image icon next to the Edit button.

![Circuit Tutorial 4](/img/CT3/ct4.jpg)
![Circuit Tutorial 5](/img/CT3/ct5.jpg)

### Design Parameters

![Circuit Tutorial 6](/img/CT3/ct6.jpg)

This tab displays all parameters defined in the uploaded netlist along with their respective values.

For optimization, you can define the allowed range for each parameter by modifying:

- Minimum Value
- Maximum Value

By default, these values are set to half and twice the typical parameter value.

Select the testbench (V2I_dc_analysis) and enable the parameters that should be optimized by the AI agent.

### Environment Parameters

![Circuit Tutorial 7](/img/CT3/ct7.jpg)

This tab is used to define simulation conditions such as:

- Process corner
- Temperature

For this tutorial, the temperature is set to 27°C.

### Measurements

![Circuit Tutorial 8](/img/CT3/ct8.jpg)

Measurement statements define the values that will be evaluated during simulation.

The measurement type depends on the requirement:

- Scalar
- Vector

Under DC Analysis, click the Custom button and provide a variable name.

Enter the measurement statement in the generated input box.

For this tutorial, a vector measurement is used to evaluate values at multiple instances.

The required voltage values can be:

- Entered manually, or
- Uploaded using a CSV file via the menu icon beside DC Analysis

To enable vector measurement:

1. Click the menu icon in the top-right corner of the measurement box
2. Enable Vector Mode

Provide:

- The variable name (e.g., [voltage])
- The instances at which measurements are taken, separated by commas

### Simulation Setup

![Circuit Tutorial 9](/img/CT3/ct9.jpg)

Before running the simulation, Manage Dependencies must be completed.

To include dependencies:

1. Click the menu button below Publish Project (top-right corner)
2. Select Manage Dependencies
3. Click the Chain icon to connect the required models and libraries

After linking dependencies:

1. Click Simulate
2. View the results in the Log file

![Circuit Tutorial 10](/img/CT3/ct10.jpg)
![Circuit Tutorial 11](/img/CT3/ct11.jpg)

The results displayed correspond to the default design parameter values specified in the Design Parameters tab.

### Genie

![Circuit Tutorial 12](/img/CT3/ct12.jpg)

The Genie page is where circuit optimization is performed.

Measurement variables (both scalar and vector) defined earlier are displayed on the top-left of the Genie page.

You may rename expressions if required.

To configure optimization:

1. Click Enter Expression
2. Select the measurement variable
3. Define the optimization goal:
   - Minimum
   - Maximum
   - Range
   - Equal to a value

Provide the target value or range for scalar measurements.

Multiple expressions can be added using the Plus (+) icon.

For vector measurements, targets must be assigned using Graph Mode, since optimization occurs across multiple instances.

Click Open Graph.

![Circuit Tutorial 13](/img/CT3/ct13.jpg)

Select the X-axis label (current). The instances defined in the Measurements tab will be listed automatically.

Set Y-values either:

- Manually (for a small number of points), or
- By uploading a CSV file (for larger datasets)

![Circuit Tutorial 14](/img/CT3/ct14.jpg)

Targets can also be assigned by importing a JSON file using Import from File.

The required JSON files are available in the Resources section of this document.

![Circuit Tutorial 15](/img/CT3/ct15.jpg)

On the bottom-left of the Genie page, select the appropriate agent for optimization. For this tutorial, the agent v2i_8p44_dc is used.

Click Genie Optimize at the bottom-right of the page.

Open the Chart view to monitor:

- Current iteration measurement
- Best measurement achieved
- Target value

Each optimization iteration is displayed in real time. Previous iterations can be viewed by enabling Show Trail.

Once the target is achieved, download the optimized netlist by clicking the Download icon below the agent selection panel.

:::info View all the resources required for DC Analysis
[DC Analysis](/resources/ct3_dc_analysis.zip)
:::

## Transient Analysis

![Circuit Tutorial 16](/img/CT3/ct16.jpg)

Add a new testbench by clicking the Plus (+) icon.

Upload the required .spice file along with the waveform images, then click Save Circuit.

After uploading, click on the testbench. The following tabs will be visible:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained below.

### Netlist

![Circuit Tutorial 17](/img/CT3/ct17.jpg)

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Pencil (Edit) icon, if changes are required.

Uploaded images can be viewed by clicking the Image icon next to the Edit icon.

The images uploaded for the transient analysis are shown below:

![Circuit Tutorial 18](/img/CT3/ct18.jpg)
![Circuit Tutorial 19](/img/CT3/ct19.jpg)
![Circuit Tutorial 20](/img/CT3/ct20.jpg)

### Design Parameters

![Circuit Tutorial 21](/img/CT3/ct21.jpg)

This tab displays all parameters defined in the uploaded netlist along with their respective values.

Select the parameters that the AI agent is allowed to modify.

For each enabled parameter, specify its optimization range by adjusting:

- Minimum Value
- Maximum Value

By default, these values are set to half and twice the typical parameter value.

### Measurements

![Circuit Tutorial 22](/img/CT3/ct22.jpg)

Measurement statements define the values that will be evaluated during simulation.

The measurement type depends on the requirement:

- Scalar
- Vector

Under Transient Analysis, click the Custom button and provide a variable name.

Enter the measurement statement in the generated input box.

For this tutorial, a vector measurement is used.

The required values can be:

- Entered manually, or
- Uploaded using a CSV file via the menu icon beside Transient Analysis

To enable vector measurement:

1. Click the menu icon in the top-right corner
2. Enable Vector Mode

Provide:

- The variable name (e.g., [time])
- The instances separated by commas

### Simulation Setup

![Circuit Tutorial 23](/img/CT3/ct23.jpg)

Before running the simulation, Manage Dependencies must be completed.

1. Click the menu button below Publish Project.
2. Select Manage Dependencies.
3. Click the Chain icon to connect the required models and libraries.

Then click Simulate and view the results in the Log file.

### Genie

![Circuit Tutorial 24](/img/CT3/ct24.jpg)

The Genie page is used for optimization.

Measurement variables defined earlier are displayed on the top-left.

Click Enter Expression and select the measurement variable.

Define the optimization goal:

- Minimum
- Maximum
- Range
- Equal to a value

Provide the target value or range for scalar measurements.

For vector measurements, click Open Graph.

![Circuit Tutorial 25](/img/CT3/ct25.jpg)

Select the X-axis label (output). The defined instances will be listed automatically.

Set Y-values manually or upload a CSV file.

![Circuit Tutorial 26](/img/CT3/ct26.jpg)

Targets can also be assigned using Import from File (JSON format).

![Circuit Tutorial 27](/img/CT3/ct27.jpg)

Select the appropriate agent. For this tutorial, the agent V2I_tran is used.

Click Genie Optimize.

Open Chart to monitor progress.

Once the target is achieved, download the optimized netlist using the Download icon.

:::info View all the resources required for Transient Analysis
[Transient Analysis](/resources/ct3_transient_analysis.zip)
:::

## AC Analysis

![Circuit Tutorial 28](/img/CT3/ct28.jpg)

Add a new testbench by clicking the Plus (+) icon.

Upload the required .spice file along with waveform images, then click Save Circuit.

After uploading, click on the testbench. The following tabs will be visible:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

### Netlist

![Circuit Tutorial 29](/img/CT3/ct29.jpg)

The Netlist tab displays the uploaded netlist file.

You can edit the netlist using the Pencil icon.

Uploaded images can be viewed using the Image icon.

![Circuit Tutorial 30](/img/CT3/ct30.jpg)
![Circuit Tutorial 31](/img/CT3/ct31.jpg)

### Design Parameters

![Circuit Tutorial 32](/img/CT3/ct32.jpg)

This tab displays all parameters defined in the netlist along with their values.

Select the parameters that the AI agent is allowed to modify.

Specify the optimization range by adjusting:

- Minimum Value
- Maximum Value

By default, these values are set to half and twice the typical parameter value.

### Measurements

![Circuit Tutorial 33](/img/CT3/ct33.jpg)

Measurement statements define the values evaluated during simulation.

Under AC Analysis, click the Custom button and provide a variable name.

Enter the measurement statement.

For this tutorial, a vector measurement is used to evaluate values at multiple frequency instances.

Values can be:

- Entered manually, or
- Uploaded using a CSV file

To enable vector measurement:

1. Click the menu icon
2. Enable Vector Mode

Provide:

- The variable name (e.g., [freq])
- The frequency instances separated by commas

### Data Capture

![Circuit Tutorial 34](/img/CT3/ct34.jpg)
![Circuit Tutorial 35](/img/CT3/ct35.jpg)

To extract variables directly from the netlist, use Data Capture.

In this tutorial, the variables ubw, pm, and gm are calculated using let statements. Therefore, Data Capture is used.

To add a Data Capture measurement:

1. Click the Plus (+) icon under Data Capture
2. Enter the variable name exactly as defined in the netlist

Vector measurements can also be used by changing the measurement type from Scalar to Vector and entering multiple variable names separated by commas.

### Simulation Setup

![Circuit Tutorial 36](/img/CT3/ct36.jpg)

Before running the simulation, complete Manage Dependencies.

1. Click the menu button below Publish Project.
2. Select Manage Dependencies.
3. Click the Chain icon to link required models and libraries.

Click Simulate and view results in the Log file.

### Genie

![Circuit Tutorial 37](/img/CT3/ct37.jpg)

The Genie page is used to assign optimization targets.

Measurement variables are displayed on the top-left.

Click Enter Expression and select the measurement variable.

Define the optimization goal:

- Minimum
- Maximum
- Range
- Equal to a value

Provide the target value or range.

![Circuit Tutorial 38](/img/CT3/ct38.jpg)
![Circuit Tutorial 39](/img/CT3/ct39.jpg)

Select the appropriate agent. For this tutorial, the agent v2i_8p44_ac is used.

Click Genie Optimize.

Open Chart to monitor iterations and target progress.

Once the target is achieved, download the optimized netlist using the Download icon.

:::info View all the resources required for AC Analysis
[AC Analysis](/resources/ct3_stability_analysis.zip)
:::

## Noise Analysis

![Circuit Tutorial 40](/img/CT3/ct40.jpg)

Add a new testbench by clicking the Plus (+) icon.

Upload the required .spice file along with the waveform images for the noise analysis, then click Save Circuit.

After uploading, click on the testbench. The following tabs will be visible:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained below.

### Netlist

![Circuit Tutorial 41](/img/CT3/ct41.jpg)

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Pencil (Edit) icon, if changes are required for different simulation results.

Uploaded images can be viewed by clicking the Image icon next to the Edit icon.

The images uploaded for the noise analysis are shown below:

![Circuit Tutorial 42](/img/CT3/ct42.jpg)
![Circuit Tutorial 43](/img/CT3/ct43.jpg)

### Design Parameters

![Circuit Tutorial 44](/img/CT3/ct44.jpg)

This tab displays all parameters defined in the uploaded netlist along with their respective values.

Select the parameters that the AI agent is allowed to modify.

For each enabled parameter, specify the optimization range by adjusting:

- Minimum Value
- Maximum Value

By default, these values are set to half and twice the typical parameter value.

### Measurements

Measurement statements define the values that will be evaluated during simulation.

The measurement type depends on the requirement:

- Scalar
- Vector

### Data Capture

![Circuit Tutorial 45](/img/CT3/ct45.jpg)
![Circuit Tutorial 46](/img/CT3/ct46.jpg)

To extract variables directly from the netlist, use Data Capture.

In this tutorial, the variables value_ten, value_hun, value_thou, value_tenthou, value_hunthou, value_onemeg, and value_tenmeg are calculated using let statements. Therefore, Data Capture is used to measure these variables.

To add a Data Capture measurement:

1. Click the Plus (+) icon under Data Capture.
2. Enter the variable name exactly as defined in the netlist.

Vector measurements can also be used in Data Capture by:

- Changing the measurement type from Scalar to Vector.
- Entering multiple variable names separated by commas.

### Simulation Setup

![Circuit Tutorial 47](/img/CT3/ct47.jpg)

This tab displays the results of the measurement statements added under the Measurements tab.

Before running the simulation, Manage Dependencies must be completed.

To include dependencies:

1. Click the menu button below Publish Project (top-right corner).
2. Select Manage Dependencies.
3. Click the Chain icon to connect the required models and libraries.

After linking dependencies:

1. Click Simulate.
2. View the results in the Log file.

### Genie

![Circuit Tutorial 48](/img/CT3/ct48.jpg)

The Genie page is where circuit optimization is performed.

Measurement variables (both scalar and vector) defined earlier are displayed on the top-left of the Genie page.

You may rename expressions if required.

To configure optimization:

1. Click Enter Expression.
2. Select the measurement variable.
3. Define the optimization goal:
   - Minimum
   - Maximum
   - Range
   - Equal to a value

Provide the target value or range for scalar measurements.

Multiple expressions can be added using the Plus (+) icon.

For vector measurements, targets must be assigned using Graph Mode, since optimization occurs across multiple instances.

Click Open Graph.

![Circuit Tutorial 49](/img/CT3/ct49.jpg)

Select the X-axis label (output). The defined instances will be listed automatically.

Set Y-values either:

- Manually (for a small number of points), or
- By uploading a CSV file (for larger datasets).

![Circuit Tutorial 50](/img/CT3/ct50.jpg)

Targets can also be assigned by importing a JSON file using Import from File.

The required JSON files are available in the Resources section.

![Circuit Tutorial 51](/img/CT3/ct51.jpg)

On the bottom-left of the Genie page, select the appropriate agent. For this tutorial, the agent V2I_noise is used.

Click Genie Optimize at the bottom-right of the page.

Open the Chart view to monitor:

- Current iteration measurement
- Best measurement achieved
- Target value

Each optimization iteration is displayed in real time. Previous iterations can be viewed by enabling Show Trail.

Once the target is achieved, download the optimized netlist by clicking the Download icon below the agent selection panel.

:::info View all the resources required for AC Analysis
[Noise Analysis](/resources/ct3_noise_analysis.zip)
:::

## PSRR Analysis

![Circuit Tutorial 52](/img/CT3/ct52.jpg)

Add a new testbench by clicking the Plus (+) icon.

Upload the required .spice file along with the waveform images, then click Save Circuit.

After uploading, click on the testbench. The following tabs will be visible:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained below.

### Netlist

![Circuit Tutorial 53](/img/CT3/ct53.jpg)

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Pencil (Edit) icon, if changes are required.

Uploaded images can be viewed by clicking the Image icon next to the Edit icon.

![Circuit Tutorial 54](/img/CT3/ct54.jpg)

### Design Parameters

![Circuit Tutorial 55](/img/CT3/ct55.jpg)

This tab displays all parameters defined in the uploaded netlist along with their respective values.

Select the parameters that the AI agent is allowed to modify.

For each enabled parameter, specify the optimization range by adjusting:

- Minimum Value
- Maximum Value

By default, these values are set to half and twice the typical parameter value.

### Measurements

Measurement statements define the values that will be evaluated during simulation.

The measurement type depends on the requirement:

- Scalar
- Vector

### Data Capture

![Circuit Tutorial 56](/img/CT3/ct56.jpg)

To extract variables directly from the netlist, use Data Capture.

In this tutorial, the variable psrr is calculated using a let statement. Therefore, Data Capture is used.

To add a Data Capture measurement:

1. Click the Plus (+) icon under Data Capture.
2. Enter the variable name exactly as defined in the netlist.

Vector measurements can also be used by changing the measurement type from Scalar to Vector and entering multiple variable names separated by commas.

### Simulation Setup

![Circuit Tutorial 57](/img/CT3/ct57.jpg)

This tab displays the results of the measurement statements added under the Measurements tab.

Before running the simulation, complete Manage Dependencies.

1. Click the menu button below Publish Project.
2. Select Manage Dependencies.
3. Click the Chain icon to connect the required models and libraries.

Click Simulate and view the results in the Log file.

### Genie

![Circuit Tutorial 58](/img/CT3/ct58.jpg)

The Genie page is used to assign optimization targets.

Measurement variables are displayed on the top-left of the Genie page.

You may rename expressions if required.

Click Enter Expression and select the measurement variable.

Define the optimization goal:

- Minimum
- Maximum
- Range
- Equal to a value

Provide the target value or range for scalar measurements.

Multiple expressions can be added using the Plus (+) icon.

![Circuit Tutorial 59](/img/CT3/ct59.jpg)

Select the appropriate agent. For this tutorial, the agent v2i_psrr is used.

Click Genie Optimize.

![Circuit Tutorial 60](/img/CT3/ct60.jpg)

Open the Chart view to monitor:

- Current iteration measurement
- Best measurement achieved
- Target value

Each optimization iteration is displayed in real time. Previous iterations can be viewed by enabling Show Trail.

Once the target is achieved, download the optimized netlist using the Download icon.

:::info View all the resources required for AC Analysis
[PSRR Analysis](/resources/ct3_psrr_analysis.zip)
:::

:::info Download All Tutorial Resources
Click here to download the complete tutorial resource package:
[Download Tutorial Resources (ZIP)](/resources/circuit_tutorial_3_resources.zip)
:::
