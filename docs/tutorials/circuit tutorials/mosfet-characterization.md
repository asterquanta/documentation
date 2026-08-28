---
title: Mosfets_3v3_Char
---

# Mosfets_3v3_Char

## Creating a New Project

![Circuit Tutorial 1](/img/CT5/ct1.jpg)

![Circuit Tutorial 2](/img/CT5/ct2.jpg)

Create a new project by clicking "Add New Project". A single project can contain multiple related circuits.

Upon clicking "Add New Project", you will be prompted to enter:

- **Project Type** – Select Analog
- **Project Name** – Enter the project name
- **Description** – Write a short note on the project
- **Project Tags** – Used for better organization of your projects
- **Project Image** – Click on Upload image to add a project image (image of the base circuit)

After that, you are redirected to the Upload Circuit page.

**Base Circuit Details**

- **Base Circuit Name** – Enter the base circuit name (mosfets_3v3_char)
- **Tool** – Select the schematic/simulation tool being used
- **Description** – Enter a description for the base circuit
- **Circuit Image** – Upload an image of the base circuit

![Circuit Tutorial 3](/img/CT5/ct3.jpg)

Rather than uploading a single testbench schematic by hand, this base circuit is brought in as a complete package using the "Import Circuit" option in the top-right corner of the Upload Circuit page. This lets you import a base circuit — along with all of its testbenches — directly from a previously exported .zip file, which is useful when a circuit already contains multiple testbenches, as mosfets_3v3_char does with pmos_char and nmos_char.

Click on 'Import Circuit' and enter the following details:

- **Circuit name** – mosfets_3v3_char
- **Tool** – ngspice-cluster
- **Circuit export file** – Browse and select the exported .zip file (mosfets_3v3_char_base_circuit_export.zip)

![Circuit Tutorial 4](/img/CT5/ct4.jpg)

You can access the required zip file here (provide link)

Then click on 'Proceed'.

You will see the following pop up on your screen, which will indicate that the circuit importing was done successfully:

![Circuit Tutorial 5](/img/CT5/ct5.jpg)

Once the import completes, both testbenches — pmos_char and nmos_char — appear automatically under the mosfets_3v3_char base circuit in the left-hand panel. The base circuit itself exposes Design Parameters, Environment Parameters, Genie, and Analytics tabs, which apply across both testbenches.

## PMOS_char

The pmos_char testbench characterizes a single 3.3V PMOS device (pfet_03v3) from the GF180MCU PDK. Click on the pmos_char testbench from the left-hand panel under Circuits to access it. The following tabs are available: Netlist, Design Parameters, Environment Parameters, Measurements, Run Simulation, Genie, and Analytics.

:::note
This tutorial does not use the Genie (Optimization) tab, since the goal here is to observe and verify device characteristics rather than optimize a circuit toward a target specification.
:::

### Netlist

![Circuit Tutorial 6](/img/CT5/ct6.jpg)

![Circuit Tutorial 7](/img/CT5/ct7.jpg)

The Netlist tab displays the uploaded netlist for this testbench. This instantiates a single pfet_03v3 device (W = 0.22µ, L = 0.28µ, nf = 1):

- **Gate (vg)** – biased at a fixed DC voltage of 1.65V
- **Source (vs1)** – tied to VDD (3.3V), as is standard for a PMOS device
- **Body (vb)** – tied to VDD (3.3V)
- **Drain (vd)** – swept from 0V to 3.3V

The simulation itself is defined by a nested DC sweep in the .control block:

```
dc vd 0 3.3 0.01 vg 0 3.3 0.3
plot i(vd)
write test_nfet_03v3.raw
```

This sweeps the drain voltage (Vd) from 0V to 3.3V in 0.01V steps, for each of several gate voltage (Vg) steps from 0V to 3.3V in 0.3V increments. The result is a family of Id–Vds curves — one curve per Vgs step — which is the standard way to visualize a MOSFET's output characteristics across its full gate-bias range. The models used are included via .include and .lib statements pointing to the GF180MCU design.ngspice and sm141064.ngspice (typical corner) files.

### Design Parameters

![Circuit Tutorial 8](/img/CT5/ct8.jpg)

This tab lists the parameters defined in the netlist for the XM2 device: length and width. In this testbench, width is the Active (enabled) parameter, with a Min value of 0.22 and a Max value of 1, while length is left inactive with a Min/Max range of 0.14 and 0.56. Enabling a parameter here makes it available for use in Genie's optimization sweeps, even though this particular tutorial does not run a Genie optimization.

### Environment Parameters

![Circuit Tutorial 9](/img/CT5/ct9.jpg)

This tab is used to specify simulation conditions such as process corner and temperature. For this tutorial, no process corner override is selected (the netlist's own .lib statement fixes it to the typical corner), and the temperature is left at its default value of 27°C.

### Measurements

![Circuit Tutorial 10](/img/CT5/ct10.jpg)

The Measurements tab is organized by analysis type (AC Analysis, DC Analysis, and Transient Analysis), each offering built-in measurement templates as well as a Custom option. For this testbench, the DC Analysis prefix field reflects the sweep statement directly from the netlist:

```
.dc vd 0 3.3 0.01
```

![Circuit Tutorial 11](/img/CT5/ct11.jpg)

![Circuit Tutorial 12](/img/CT5/ct12.jpg)

A series of custom scalar measurements is defined to sample the drain current at specific points along the Vds sweep:

- i_v_char_0 – `.meas dc i_v_char_0 find i(vd) at=0`
- i_v_char_1 – `.meas dc i_v_char_1 find i(vd) at=1`
- i_v_char_2 – `.meas dc i_v_char_2 find i(vd) at=2`
- i_v_char_3p1 – `.meas dc i_v_char_3p1 find i(vd) at=3.1`

Each measurement extracts the drain current at a fixed Vd value, giving a handful of reference current readings spaced across the sweep range in addition to the full swept curve.

![Circuit Tutorial 13](/img/CT5/ct13.jpg)

Scrolling down, the Data Capture section (for defining additional let-statement variables) and Operating Points section (for defining additional sweep variables or component-level expressions) are both left empty for this testbench, since the nested DC sweep in the netlist already provides the full Id–Vds characteristic.

![Circuit Tutorial 14](/img/CT5/ct14.jpg)

### Run Simulation

![Circuit Tutorial 15](/img/CT5/ct15.jpg)

Click on 'Simulate' to run the simulation.

![Circuit Tutorial 16](/img/CT5/ct16.jpg)

Once the simulation completes, a confirmation banner appears, and the run is listed with its start time, completion time, and elapsed time. Click on Logs to view the simulation data, or Graph to view the plotted Id–Vds output.

## NMOS_char

Explanation here

Similar to PMOS_char above, but characterizing a single 3.3V NMOS device (nfet_03v3) instead. Click on the nmos_char testbench from the left-hand panel under Circuits to access it. The same set of tabs is available: Netlist, Design Parameters, Environment Parameters, Measurements, Run Simulation, Genie, and Analytics — and, as with PMOS_char, the Genie tab is not used in this tutorial.

### Netlist

![Circuit Tutorial 17](/img/CT5/ct17.jpg)

![Circuit Tutorial 18](/img/CT5/ct18.jpg)

This netlist instantiates a single nfet_03v3 device (W = 0.22µ, L = 0.28µ, nf = 1):

- **Gate (vg)** – biased at a fixed DC voltage of 1.65V
- **Source (vs)** – tied to ground, as is standard for an NMOS device
- **Body (vb)** – tied to ground
- **Drain (vd)** – swept from 0V to 3.3V

As with pmos_char, the simulation is defined by the same nested DC sweep structure in the .control block:

```
dc vd 0 3.3 0.01 vg 0 3.3 0.3
plot -i(vd)
write test_nfet_03v3.raw
```

This produces a family of Id–Vds curves for the NMOS device across the same Vgs step range (0V to 3.3V in 0.3V increments). The current is plotted as -i(vd) here to reflect the opposite conventional current direction into the drain compared to the PMOS testbench. The same GF180MCU dependencies (design.ngspice, sm141064.ngspice typical corner) are used.

### Design Parameters

![Circuit Tutorial 19](/img/CT5/ct19.jpg)

As with pmos_char, width is the Active parameter (Min 0.22, Max 1) and length is left inactive (Min 0.14, Max 0.56) for the XM1 device.

### Environment Parameters

![Circuit Tutorial 20](/img/CT5/ct20.jpg)

No process corner override is selected, and temperature is left at the default value of 27°C, matching pmos_char.

### Measurements

![Circuit Tutorial 21](/img/CT5/ct21.jpg)

The same DC Analysis prefix is used to reflect the sweep in the netlist:

```
.dc vd 0 3.3 0.01
```

![Circuit Tutorial 22](/img/CT5/ct22.jpg)

![Circuit Tutorial 23](/img/CT5/ct23.jpg)

The identical set of custom scalar measurements is defined:

- i_v_char_0 – `.meas dc i_v_char_0 find i(vd) at=0`
- i_v_char_1 – `.meas dc i_v_char_1 find i(vd) at=1`
- i_v_char_2 – `.meas dc i_v_char_2 find i(vd) at=2`
- i_v_char_3p1 – `.meas dc i_v_char_3p1 find i(vd) at=3.1`

![Circuit Tutorial 24](/img/CT5/ct24.jpg)

As with pmos_char, the Data Capture and Operating Points sections are left empty, since the nested sweep already produces the full characteristic curve.

![Circuit Tutorial 25](/img/CT5/ct25.jpg)

### Run Simulation

![Circuit Tutorial 26](/img/CT5/ct26.jpg)

Click on 'Simulate' to run simulation.

![Circuit Tutorial 27](/img/CT5/ct27.jpg)

Click on Logs to view the simulation data.

![Circuit Tutorial 28](/img/CT5/ct28.jpg)

The Logs popup reports the captured measurement data for each defined measurement, along with the simulator's raw output — including the simulation temperature, the linear solver used, and the number of data rows produced by the sweep:

```
Connector captured data:
  i_v_char_0  =  7.321986e-21
  i_v_char_1  = -3.996891e-05
  i_v_char_2  = -4.415759e-05
  i_v_char_3p1 = -4.745658e-05
```