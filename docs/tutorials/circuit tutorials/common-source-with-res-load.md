# Common Source with Resistive Load

## Creating a New Project

![Circuit Tutorial 1](/img/CT2/ct1.jpg)
![Circuit Tutorial 2](/img/CT2/ct2.jpg)

Create a new project by clicking "Add New Project". A single project can contain multiple related circuits, allowing you to organize different variations or analyses of the same basic circuit topology under one umbrella.

Upon clicking "Add New Project", you will be prompted to enter the following information:

- **Project Type** – Select the appropriate type (Analog, Digital, or Mixed-Signal). For this tutorial, Analog is selected since we are working with a Common Source amplifier circuit.
- **Project Name** – Enter a suitable project name that clearly identifies your circuit. This helps in organizing and finding your projects later.
- **Description** – Provide a brief description of the project. This should summarize the circuit's purpose, topology, and any key features or objectives.
- **Project Tags** – Used for better organization and searchability of projects. Add relevant tags that make it easier to locate this project among others in your workspace.

Once the project is created, you will be redirected to the **Upload Circuit** page where you'll provide detailed information about your circuit.

On the **Upload Circuit** page, you need to fill in the following fields:

- **Base Circuit Name** – Enter the circuit name (e.g., CS_resistive_load). This serves as the identifier for your base circuit and should be descriptive of the circuit topology.
- **Tool** – Select the schematic/simulation tool used to create the circuit. This ensures compatibility and proper interpretation of the uploaded files.
- **Circuit Image** – Upload screenshots of the circuit schematic, input waveform, and output waveform. These visual references are helpful for understanding the circuit behavior and serve as documentation.
- **Circuit Schematic** – Upload the .spice file corresponding to the circuit. This netlist file contains all the circuit components, connections, and simulation commands.
- **Circuit Dependencies** – Include the required models and libraries used for the circuit (e.g., PDK_180nm). These dependencies are essential for accurate simulation as they define the device characteristics and behavior.

Complete the process by clicking **Save Circuit**. This uploads all the information and makes your circuit available for analysis and optimization.

## Testbenches and Design Parameters

![Circuit Tutorial 3](/img/CT2/ct3.jpg)
![Circuit Tutorial 4](/img/CT2/ct4.jpg)

The uploaded circuit can be found under the **Testbenches** section within the circuit page. A testbench represents a specific analysis configuration for your circuit, such as DC, AC, or transient analysis.

Additional testbenches can be added by clicking the **Plus (+)** icon. This allows you to create multiple analysis scenarios for the same base circuit without duplicating the entire project.

For this tutorial, DC, Transient, and AC analyses are created for the Common Source with Resistive Load circuit. Each testbench can have different simulation parameters, measurement goals, and optimization targets.

In the **Design Parameters** tab:

- All parameters declared in the circuit netlist are displayed along with their default (typical) values. These parameters represent the design variables that can be adjusted to optimize circuit performance.
- The **Minimum** and **Maximum** values define the range within which the AI agent can sweep during optimization. This constrains the search space to physically realizable and practical values.
- These default ranges can be modified as required based on your design constraints, technology limitations, or specific optimization requirements.
- For each testbench, select the parameters to be optimized by enabling the corresponding checkboxes. This tells the AI agent which design variables it is allowed to modify during the optimization process.

![Circuit Tutorial 5](/img/CT2/ct5.jpg)

## Netlist

![Circuit Tutorial 6](/img/CT2/ct6.jpg)

Each testbench contains a **Netlist** tab that displays:

- The uploaded netlist file, which contains the complete SPICE description of your circuit including all components, their values, connections, and simulation commands.
- The associated circuit images, which provide visual reference for understanding the circuit topology and expected behavior.

You can edit the netlist by clicking the **Edit** option if modifications are required to obtain different simulation results. This is useful when you need to adjust simulation parameters, add new measurement statements, or modify circuit components without re-uploading the entire file.

The images shown include the circuit schematic, input voltage (Vin), and output voltage (Vout) plots obtained from Xschem simulations for the DC testbench of the Common Source with Resistive Load circuit. These plots serve as reference waveforms showing the expected circuit behavior.

:::info Download JSON Files
Click here to download the Netlist for every node:
[Download Netlists for every node (ZIP)](/resources/netlist_for_every_node.zip)
:::

### DC Analysis

![Circuit Tutorial 7](/img/CT2/ct7.jpg)
![Circuit Tutorial 8](/img/CT2/ct8.jpg)

The DC analysis testbench performs a DC sweep to characterize the static transfer characteristics of the Common Source amplifier. This analysis reveals important DC parameters such as the DC gain, biasing point, and voltage transfer characteristics.

### Transient Analysis

![Circuit Tutorial 9](/img/CT2/ct9.jpg)
![Circuit Tutorial 10](/img/CT2/ct10.jpg)
![Circuit Tutorial 11](/img/CT2/ct11.jpg)

The transient analysis testbench examines the time-domain behavior of the circuit. This analysis shows how the circuit responds to time-varying input signals and is essential for understanding dynamic behavior, settling time, and transient distortion.

### AC Analysis

![Circuit Tutorial 12](/img/CT2/ct12.jpg)
![Circuit Tutorial 13](/img/CT2/ct13.jpg)

The AC analysis testbench characterizes the frequency response of the amplifier. This analysis is critical for understanding gain, bandwidth, frequency response characteristics, and other small-signal AC performance metrics.

Similarly, the respective netlists and required images for different testbenches can be viewed from their corresponding **Netlist** tabs. Each testbench maintains its own netlist and associated documentation, allowing for independent configuration and analysis.

## Measurements

### DC Analysis

For DC analysis, Vin is swept from 0 to VDD using NGSpice syntax. This sweep allows you to observe the complete DC transfer characteristic of the amplifier, showing how the output voltage varies as the input voltage changes across its full range.

An instance variable `v_bias` is created for the AI agent to operate on. This instance serves as the output parameter to be optimized and represents a key performance metric extracted from the DC simulation.

The statement `.dc vin 0 3.3 0.01` sweeps Vin from 0 V to 3.3 V with a step size of 0.01 V. This fine step size ensures smooth and accurate characterization of the DC transfer curve, capturing any non-linearities or transition regions in the circuit's response.

The measurement statement `.meas dc v_bias WHEN v(vin) = v(vout)` evaluates `v_bias` when Vin equals Vout. While this condition may not always occur exactly during the discrete voltage sweep, it is used as a standard measurement practice to identify the unity-gain point or transition region of the amplifier. This measurement is particularly useful for determining the DC operating point where the input and output voltages are equal.

![Circuit Tutorial 14](/img/CT2/ct14.jpg)
*DC measurement statement*

### Transient Analysis

The measurement statement for the transient analysis of `cs_resistive_load_tran_tb` is shown below.

![Circuit Tutorial 15](/img/CT2/ct15.jpg)

To capture multiple data points (vector measurements) across the transient simulation:

- Click the menu icon in the top-right corner of the measurement setup box to access additional options.
- Enable **Vector Mode**, which allows you to capture values at multiple time instances rather than just a single scalar value.
- The `[time]` array specifies the time instances at which the output values are evaluated. These time points should be chosen to capture the critical features of the transient response, such as rise time, fall time, overshoot, and settling behavior.

Vector measurements are essential for characterizing time-domain behavior comprehensively, as they provide a complete picture of how the output waveform evolves over time. This information is crucial for optimizing transient performance metrics like signal fidelity, distortion, and dynamic range.

### AC Analysis

![Circuit Tutorial 16](/img/CT2/ct16.jpg)

For AC analysis, the frequency response is measured at multiple frequency points to plot the AC response of the circuit. This provides a complete characterization of the amplifier's small-signal frequency-dependent behavior.

The frequency points should be strategically chosen to capture important features of the frequency response, including:
- Low-frequency gain (DC gain)
- The -3dB frequency (bandwidth)
- Gain roll-off characteristics
- Any resonant peaks or notches in the response

By measuring at multiple frequency points, you can construct the complete Bode plot (magnitude and phase versus frequency) which is essential for understanding the amplifier's AC performance and stability characteristics.

## Simulation Setup

![Circuit Tutorial 17](/img/CT2/ct17.jpg)

The **Simulation Setup** tab displays the results of the measurement statements added across different testbenches. This provides a centralized view of all the performance metrics extracted from your simulations.

**Manage Dependencies** must be completed before running simulations. Dependencies include the device models, process design kit (PDK) files, and any library files required for accurate simulation of the circuit components.

To properly configure dependencies:

- Click the menu button below **Publish Project** (top-right corner) to access project management options.
- Select **Manage Dependencies**, which opens the dependency management interface.
- Click the **Chain** icon to connect the required models and libraries to your project. This establishes the links between your circuit and the necessary technology files.

After linking the dependencies:
- Click **Simulate** to run the simulation with the current design parameters.
- Simulation results can be viewed in the **Log file**, which contains detailed output from the SPICE simulator including all measured values, warnings, and convergence information.

The simulation results shown correspond to the default (typical) design parameter values specified in the Design Parameters tab, providing a baseline for comparison during optimization.

## Genie (Optimization)

This section is used to perform circuit optimization using the AI agent. The Genie feature leverages artificial intelligence to automatically adjust design parameters to meet specified performance targets.

Measurement variables defined earlier in the Measurements tab are displayed on the left side of the Genie page. These variables represent the performance metrics that you want to optimize or constrain.

You may rename expressions if required to make them more descriptive or meaningful for your specific optimization objectives.

Click **Enter Expression**, select the measurement variable, and define the optimization objective:

- **Minimum** – Instruct the agent to minimize this parameter (useful for metrics like power consumption, noise, or distortion)
- **Maximum** – Instruct the agent to maximize this parameter (useful for metrics like gain, bandwidth, or signal-to-noise ratio)
- **Range** – Constrain the parameter to fall within a specified range (useful when you need the parameter to be neither too high nor too low)
- **Equal to a value** – Target a specific value for the parameter (useful for precise specifications like a specific gain or bias voltage)

Provide the target value or range as required for your optimization goals.

Targets can also be assigned by importing a JSON file instead of entering values manually. This is particularly convenient when you have many optimization targets or when you want to reuse target specifications across multiple projects.

![Circuit Tutorial 18](/img/CT2/ct18.jpg)

The required JSON files can be accessed from the **Resources** section, which provides pre-configured optimization targets for common circuit performance specifications.

For transient behavior targets, which involve time-domain waveform matching:

- Click the menu icon in the expression tab to access advanced options.
- Select **Graph Mode**, which provides a graphical interface for specifying target waveforms.
- Choose the variable for the X-axis (typically time for transient analysis).
- Enter the same time instances defined earlier in the **Measurements** tab and assign the corresponding target values for each time point. This allows you to specify a desired output waveform that the optimizer will attempt to match.

![Circuit Tutorial 19](/img/CT2/ct19.jpg)
![Circuit Tutorial 20](/img/CT2/ct20.jpg)
![Circuit Tutorial 21](/img/CT2/ct21.jpg)

Graph mode is particularly powerful for optimizing circuits to produce specific waveform shapes, such as matching a reference signal, achieving a particular pulse response, or minimizing distortion compared to an ideal output.

Finally:

- Select the appropriate AI agent for the circuit from the agent selection panel on the bottom left. Different agents may use different optimization algorithms or strategies, so choose the one best suited to your circuit type and optimization objectives.
- Click **Genie Optimize** at the bottom-right of the page to begin the optimization process.

Optimization progress can be monitored in real time using the **Chart** view, which provides visual feedback on how the optimization is progressing. The chart shows the evolution of performance metrics as the agent explores the design space.

Previous iterations can be reviewed by enabling **Show Trail**, which displays the complete optimization history. This allows you to see the path the optimizer took through the design space and understand how different parameter combinations affected the circuit performance.

Once the target is achieved (when the performance metrics meet or exceed your specified goals), download the optimized netlist by clicking **Download Netlist** under the agent selection panel. This netlist contains the optimized parameter values that you can use for further simulation, verification, or implementation.

![Circuit Tutorial 22](/img/CT2/ct22.jpg)

:::info Download JSON Files
Click here to download the required JSON Files:
[Download JSON Files (ZIP)](/resources/json_files.zip)
:::

:::info Download All Tutorial Resources
Click here to download the complete tutorial resource package:
[Download Tutorial Resources (ZIP)](/resources/circuit_tutorial_2_resources.zip)
:::