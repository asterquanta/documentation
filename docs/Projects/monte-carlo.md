---
title: Monte Carlo
sidebar_position: 10
---

# Monte Carlo

## 1. How to Create a Monte Carlo Dependent Circuit

### Step 1: Log in to Genie

Log in to your AQ account on Genie and navigate to the Projects section.

![](/img/MC/mc1.jpg)

![](/img/MC/mc2.jpg)

### Step 2: Open a Project

Open any project that you have either created or cloned.

![](/img/MC/mc3.jpg)

### Step 3: Select a Test Bench Circuit

Choose any available test bench circuit from the project workspace.

For this specific example, we are using `cs_resistive_load_ac_tb`.

![](/img/MC/mc4.jpg)

### Step 4: Open the Circuit Menu

Click the menu icon located at the top-right corner of the test bench screen.

![](/img/MC/mc5.jpg)

The menu contains multiple circuit management options, including the ability to create dependent circuits.

### Step 5: Create a New Dependent Circuit

From the dropdown menu, select **New Dependent Circuit**.

![](/img/MC/mc6.jpg)

This option allows the creation of dependent test benches.

### Step 6: Configure the Dependent Circuit

The **New Dependent Circuit Setup** window will appear.

![](/img/MC/mc7.jpg)

Enter the following details:

- Name of the dependent test bench
- Type of dependent test bench

Select **Monte Carlo** as the dependent circuit type.

### Step 7: Configure Monte Carlo Runs

After selecting Monte Carlo, additional configuration options will appear.

![](/img/MC/mc8.jpg)

Specify the **Number of Monte Carlo Runs**.

If the parent test bench has optimized values, a checkbox option will be shown to either use the default values from the parent test bench or optimized values from the parent test bench.

After entering the required configuration details, click **Proceed** to create the Monte Carlo dependent circuit.

### Step 8: Monte Carlo Dependent Circuit Created

Once created, the Monte Carlo dependent circuit will appear in the project workspace.

## 2. Understanding the Monte Carlo Setup

Every Monte Carlo dependent circuit shares the same tabs, fields, and behavior described below, regardless of which test bench it was created from.

After creating the Monte Carlo dependent circuit, navigate to the **Design Parameters** tab to view the parameters available for Monte Carlo analysis.

![](/img/MC/mc9.jpg)

Users can view and edit the parameter values directly from this table. Tooltips are available throughout the interface to provide additional information about each field.

The following fields are available:

**Value**

The nominal value used for the Monte Carlo dependent circuit.

This value is seeded from the parent test bench when the dependent circuit is created and is updated every time the parent test bench is optimized. You can also manually update the values.

**Variation**

Defines the amount of variation applied to the parameter during Monte Carlo simulations.

- A value of 1 corresponds to 100% variation from the mean.
- Valid range: 0 to 1

**Number of Sigmas**

Defines the number of sigmas allocated to the specified variation.

Users can adjust this value as required for their Monte Carlo analysis.

### Modifying the Number of Monte Carlo Runs

The number of simulation runs can be updated from the Design Parameters tab.

![](/img/MC/mc10.jpg)

### Optimization Dependency

:::note
A Monte Carlo dependent circuit cannot be optimized unless the parent test bench has already been optimized.
:::

For both Data Capture and all types of Analysis, the corresponding `_mc_mean` and `_mc_variance` measurements are generated only for the measurement (Analysis or Data Capture) that is actually used in a target — not for every measurement configured on the test bench.

Relatedly, when a Monte Carlo dependent circuit is created, any Scalar or Vector target used on the parent test bench is not carried over automatically. Because a Monte Carlo measurement always produces both a mean and a variance, the original single target must be recreated as two separate Scalar target specifications on the dependent circuit — one mapped to the `_mc_mean` measurement and one mapped to the `_mc_variance` measurement. The full walkthrough for this is in [Section 4, Target Specifications](#4-how-to-build-a-model-for-a-monte-carlo-test-bench-target-specifications).

## 3. Examples

The walkthrough above used `cs_resistive_load_ac_tb` as a representative case. The same steps apply to any test bench, but the resulting measurements differ depending on whether a measurement is Scalar or Vector, and whether it comes from Data Capture or Analysis. The four examples below cover all four combinations.

### 3.1 `cs_resistive_load_ac_tb` — Vector under Data Capture

This example is a Data Capture measurement of Vector type. Under **Measurements > Data Capture**, the test bench defines a Vector measurement, `freq_response`, along with two Scalar measurements derived from it, `freq_three_db` and `gain_max`, as shown below.

![](/img/MC/mc11.jpg)

Once the Monte Carlo dependent circuit is created, two new Vector measurements — `freq_response_mc_mean` and `freq_response_mc_variance` — are automatically added alongside the original `freq_response` measurement:

![](/img/MC/mc12.jpg)

**Netlist requirement for Data Capture measurements**

Data Capture measurements require the code that computes them to be wrapped between two comment markers in the netlist:

```
* mc_start
* mc_end
```

Everything between these two markers — including `.tran` / `.ac` / `.dc` statements, `let` expressions, and `print` statements used to compute the measurement — gets re-run on every Monte Carlo iteration. In the example below, the gain calculation (using `vecmax`/`vecmin` on `vout` and `vin`) is wrapped between `* mc_start` and `* mc_end` so it is recomputed for each randomized run.

The user needs to add these two comments in the netlist within the platform. For example:

![](/img/MC/mc13.jpg)

### 3.2 `cs_resistive_load_dc` — Scalar under Analysis

This is a Scalar measurement (`v_bias`) defined directly under DC Analysis rather than Data Capture. Since it is not a Data Capture measurement, no `mc_start` / `mc_end` markers are required in its netlist.

![](/img/MC/mc14.jpg)

![](/img/MC/mc15.jpg)

### 3.3 `cs_resistive_load_tran` — Vector under Analysis

This configures a custom measurement (`v_out`) under Transient Analysis rather than Data Capture. It is a Vector measurement taken over time, so its working differs slightly from the scalar DC example above, but as an Analysis-type measurement it also does not require `mc_start` / `mc_end` markers.

![](/img/MC/mc16.jpg)

![](/img/MC/mc17.jpg)

![](/img/MC/mc18.jpg)

### 3.4 `diff_amp_ac_tb` — Vector under Data Capture

Like `cs_resistive_load_ac_tb`, this is a Data Capture example, but it shows both measurement types together: `gain` and `db_gain` are Scalar Data Captures, while `frequency_response` is a Vector Data Capture. As with any Data Capture measurement, the `mc_start` / `mc_end` netlist markers described earlier are required for the code that computes these values.

![](/img/MC/mc19.jpg)

![](/img/MC/mc20.jpg)

![](/img/MC/mc21.jpg)

![](/img/MC/mc22.jpg)

## 4. How to Build a Model for a Monte Carlo Test Bench (Target Specifications)

Returning to the `cs_resistive_load_ac_tb` example used throughout this guide: once the Monte Carlo dependent circuit exists, its Genie tab exposes the additional `_mc_mean` and `_mc_variance` measurements that are not available on the parent (non-Monte Carlo) test bench.

![](/img/MC/mc23.jpg)

![](/img/MC/mc24.jpg)

### Genie Optimization

Moving on to the Genie AI optimization part.

:::caution
There will be an "Incomplete expression mapping" error that you will face if you use the same agent for both the test bench circuit and the dependent circuit.
:::

![](/img/MC/mc25.jpg)

![](/img/MC/mc26.jpg)

You will have to review the target specifications.

First, click on **Model Details**.

![](/img/MC/mc27.jpg)

Then, click on **Target Specifications**.

![](/img/MC/mc28.jpg)

Click on **Initiate model transfer**.

![](/img/MC/mc29.jpg)

![](/img/MC/mc30.jpg)

![](/img/MC/mc31.jpg)

You will need two target specifications instead of the original single target.

This is because a Monte Carlo measurement always produces two derived values — a mean and a variance — so the original single Vector target can no longer map to just one measurement. Instead of editing it, delete the existing target and create two new Scalar target specifications in its place:

- **Delete the existing target.** Open its detail view and click the trash icon next to `Expression_1`.

![](/img/MC/mc32.jpg)

- **Create two new target specifications** using the `+` control, giving each a clear name and description so they're easy to tell apart. For example: Name "mc_mean", Description "Monte Carlo mean target for freq_response", Target type Scalar, Function Equals, there is also an option to provide Hint `mc_mean`.

![](/img/MC/mc33.jpg)

![](/img/MC/mc34.jpg)

![](/img/MC/mc35.jpg)

![](/img/MC/mc36.jpg)

- **Add the second:** Name "mc_variance", Description "Monte Carlo variance target for freq_response, bounded to stay small", Target type Scalar, Function Max, there is also an option to provide Hint `mc_variance`.

![](/img/MC/mc37.jpg)

![](/img/MC/mc38.jpg)

![](/img/MC/mc39.jpg)

![](/img/MC/mc40.jpg)

Click out of the box and click on the search bar again.

![](/img/MC/mc41.jpg)

Ensure you select the correct agent for that specific test bench circuit's dependent circuit, and when you open up **Target Specifications** under **Model Details**, you should see something like this:

![](/img/MC/mc42.jpg)

After creating both target specifications, map the same expression to both of them using the **Select mapping** dropdown shown above — Genie applies each target's own Function (Equals for the mean, Max for the variance) to that shared mapping.

![](/img/MC/mc43.jpg)

![](/img/MC/mc44.jpg)

![](/img/MC/mc45.jpg)

![](/img/MC/mc46.jpg)

![](/img/MC/mc47.jpg)

![](/img/MC/mc48.jpg)