# Common Source with Resistive Load

## Creating a New Project

![Circuit Tutorial 1](/img/CT2/ct1.jpg)

![Circuit Tutorial 2](/img/CT2/ct2.jpg)

Create a new project by clicking Add New Project, where you can group multiple related circuits under a single project.

Upon clicking Add New Project, you will be prompted to specify the project name and classification (Analog, Digital, or Mixed-Signal). Complete the setup by clicking Save Project.

After creating the project, you will be redirected to the Upload Circuit page.

On the Upload Circuit page:

- Enter the Base Circuit Name.
- In the Tool section, select the schematic/simulation tool used to create the circuit. For this tutorial, Ngspice is used.
- Upload the Circuit Schematic by selecting the .spice (netlist) file of the circuit (here, dc_netlist.spice).
- Upload circuit images by clicking the Circuit Image option. You may upload screenshots of the schematic along with input and output waveforms.
- Upload Circuit Dependencies. For this tutorial, the Global Foundries 180 nm models and libraries are included.
- Complete the process by clicking Save Circuit.

![Circuit Tutorial 3](/img/CT2/ct3.jpg)

:::info Download JSON Files
Click here to download the Netlist for every node:
[Download Netlists for every node (ZIP)](/resources/netlist_for_every_node.zip)
:::

## DC Analysis

After uploading the circuit, click on the DC testbench from the left-hand panel under Circuits (here, cs_resistive_load_DC_tb). The following tabs will be visible:

- Netlist
- Design Parameters
- Environment Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained below.

![Circuit Tutorial 4](/img/CT2/ct4.jpg)

### Netlist

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Edit button at the bottom of the netlist box if changes are required for different simulation results.

Uploaded circuit images can be viewed by clicking the Image icon located next to the Edit button.

![Circuit Tutorial 5](/img/CT2/ct5.jpg)

![Circuit Tutorial 6](/img/CT2/ct6.jpg)

### Design Parameters

![Circuit Tutorial 7](/img/CT2/ct7.jpg)

This tab displays all parameters defined in the uploaded netlist along with their respective values.

For optimization, you can specify the range of values each parameter can take by modifying the Minimum Value and Maximum Value, which are set by default to half and twice the typical parameter value.

Select the DC testbench (cs_resistive_load_DC_tb) and enable the parameters that should be optimized by the AI agent.

### Environment Parameters

![Circuit Tutorial 8](/img/CT2/ct8.jpg)

This tab is used to specify simulation conditions such as process corner and temperature.

For this tutorial, the temperature is set to a default value of 27°C.

### Measurements

Measurement statements define the values to be evaluated during simulation.

The measurement type may be Scalar or Vector, depending on the requirement.

Under DC Analysis, click the Custom button and provide a variable name.

![Circuit Tutorial 9](/img/CT2/ct9.jpg)

Enter the measurement statement in the generated input box.

For this tutorial, a vector measurement is used to evaluate values at multiple instances.

Voltage values can be:

- Entered manually, or
- Uploaded using a CSV file via the menu icon beside DC Analysis.

Click the menu icon in the top-right corner of the measurement box and enable Vector Mode.

Provide:

- The variable name (e.g., [voltage])
- The instances at which measurements are taken, separated by commas

### Simulation Setup

Manage Dependencies must be completed before running the simulation.

Click the menu button below Publish Project (top-right corner), select Manage Dependencies, and click the Chain icon to link the required models and libraries.

![Circuit Tutorial 12](/img/CT2/ct12.jpg)

After linking the dependencies, click Simulate.

Simulation results can be viewed in the Log file.

![Circuit Tutorial 13](/img/CT2/ct13.jpg)

The results displayed correspond to the default design parameter values specified in the Design Parameters tab.

### Genie (Optimization)

This page is used to perform circuit optimization and assign targets for the AI agent.

![Circuit Tutorial 14](/img/CT2/ct14.jpg)

![Circuit Tutorial 15](/img/CT2/ct15.jpg)

Measurement variables (scalar and vector) defined earlier are displayed in the top-left section of the Genie page.

You may rename expressions if required.

Click Enter Expression, select the measurement variable, and define the optimization objective:

- Minimum
- Maximum
- Range
- Equal to a value

Provide the target value or range for scalar variables.

Multiple expressions can be added using the Plus (+) icon.

For vector measurements:

- Targets must be assigned using Graph Mode, since optimization occurs across multiple instances.
- Click Open Graph to configure vector targets.

![Circuit Tutorial 16](/img/CT2/ct16.jpg)

Select the X-axis label (e.g., v_out).

The instances defined earlier in the Measurements tab will be listed automatically.

Set Y-values either:

- Manually (for a small number of points), or
- By uploading a CSV file (for larger datasets).

![Circuit Tutorial 17](/img/CT2/ct17.jpg)

Targets can also be assigned by importing a JSON file using Import from File.

The required JSON files are available in the Resources section of this document.

![Circuit Tutorial 18](/img/CT2/ct18.jpg)

Select the appropriate optimization agent. For this DC analysis, the agent CS_res_load_DC is used.

Click Genie Optimize at the bottom-right of the Genie page.

Open the Chart view to monitor:

- Current iteration measurement
- Best measurement achieved
- Target value

Optimization iterations are displayed in real time. Previous iterations can be viewed by enabling Show Trail.

Once the target is achieved, download the optimized netlist by clicking the Download icon below the agent selection panel.

## Transient Analysis

Add a new testbench by clicking the Plus (+) icon.

![Circuit Tutorial 19](/img/CT2/ct19.jpg)

Upload the required .spice file along with waveform images for the analysis, then click Save Circuit.

After uploading, click on the transient testbench. The following tabs will be available:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

Each tab is explained below.

### Netlist

The Netlist tab displays the uploaded netlist file.

You can edit the netlist by clicking the Pencil (Edit) icon if required.

Uploaded images can be viewed by clicking the Image icon next to the Pencil icon.

![Circuit Tutorial 20](/img/CT2/ct20.jpg)

The images uploaded for the transient analysis are shown below:

![Circuit Tutorial 21](/img/CT2/ct21.jpg)

![Circuit Tutorial 22](/img/CT2/ct22.jpg)

### Design Parameters

![Circuit Tutorial 23](/img/CT2/ct23.jpg)

All parameters defined in the netlist are displayed along with their current values.

Select the parameters that the AI agent is allowed to modify.

Define the allowed range of each parameter using Minimum Value and Maximum Value, which are set by default to half and twice the typical value.

### Measurements

![Circuit Tutorial 24](/img/CT2/ct24.jpg)

Measurement statements define the values evaluated during simulation.

Under Transient Analysis, click Custom and provide a variable name.

Enter the measurement statement in the generated input box.

Vector measurement is used to evaluate values at multiple time instances.

Values can be entered manually or uploaded using a CSV file.

Enable Vector Mode from the menu icon and provide:

- Variable name (e.g., [time])
- Time instances separated by commas

### Simulation Setup

![Circuit Tutorial 25](/img/CT2/ct25.jpg)

This tab displays the results of measurement statements added earlier.

Complete Manage Dependencies before running the simulation.

Click Simulate and view results in the Log file.

### Genie (Optimization)

![Circuit Tutorial 26](/img/CT2/ct26.jpg)

Measurement variables are displayed on the top-left of the Genie page.

Configure optimization objectives using Enter Expression.

Assign vector targets using Graph Mode.

![Circuit Tutorial 27](/img/CT2/ct27.jpg)

Select the X-axis label (e.g., v_out).

Assign Y-values manually or via CSV upload.

![Circuit Tutorial 28](/img/CT2/ct28.jpg)

Targets can also be assigned using Import from File.

![Circuit Tutorial 29](/img/CT2/ct29.jpg)

Select the optimization agent CS_ResLoad_Tran.

Click Genie Optimize.

Monitor optimization progress in the Chart view.

Download the optimized netlist once the target is achieved.

## AC Analysis

Add a new testbench by clicking the Plus (+) icon.

![Circuit Tutorial 30](/img/CT2/ct30.jpg)

Upload the required .spice file and waveform images, then click Save Circuit.

After uploading, click on the AC testbench. The following tabs will be visible:

- Netlist
- Design Parameters
- Measurements
- Simulation Setup
- Genie
- Analytics

### Netlist

View and edit the uploaded netlist using the Pencil (Edit) icon.

View uploaded images using the Image icon.

![Circuit Tutorial 31](/img/CT2/ct31.jpg)

![Circuit Tutorial 32](/img/CT2/ct32.jpg)

![Circuit Tutorial 33](/img/CT2/ct33.jpg)

### Design Parameters

![Circuit Tutorial 34](/img/CT2/ct34.jpg)

View all parameters and select those allowed for optimization.

Define optimization ranges using Minimum Value and Maximum Value.

### Measurements

![Circuit Tutorial 35](/img/CT2/ct35.jpg)

Under AC Analysis, click Custom and provide a variable name.

Enter the measurement statement.

Use Vector Mode to evaluate multiple frequency instances.

Provide the variable name (e.g., [freq]) and frequency points separated by commas.

### Data Capture

![Circuit Tutorial 36](/img/CT2/ct36.jpg)

![Circuit Tutorial 37](/img/CT2/ct37.jpg)

Data Capture is used to extract variables directly from the netlist, especially those defined using let statements.

In this tutorial, freq_three_db and three_db_gain are captured using Data Capture.

Click the Plus (+) icon under Data Capture and enter the variable name exactly as defined in the netlist.

Vector mode can also be used by selecting multiple variables separated by commas.

### Simulation Setup

![Circuit Tutorial 38](/img/CT2/ct38.jpg)

Complete Manage Dependencies before running simulations.

Click Simulate and view results in the Log file.

### Genie (Optimization)

![Circuit Tutorial 39](/img/CT2/ct39.jpg)

Configure optimization objectives using Enter Expression.

Add multiple expressions if required.

![Circuit Tutorial 40](/img/CT2/ct40.jpg)


Select the optimization agent CS_ResLoad_AC.

Click Genie Optimize and monitor progress in the Chart view.

Download the optimized netlist once the target is reached.

:::info Download JSON Files
Click here to download the required JSON Files:
[Download JSON Files (ZIP)](/resources/json_files.zip)
:::

:::info Download All Tutorial Resources
Click here to download the complete tutorial resource package:
[Download Tutorial Resources (ZIP)](/resources/circuit_tutorial_2_resources.zip)
:::
