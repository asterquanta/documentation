# Frequently Asked Questions (FAQs)

## What is a Project in the platform?

A project is the main workspace where users build, simulate, and manage circuit-based or AI-driven workflows. It contains circuits, agents, simulations, optimization runs, and results, all organized under a single design environment.

## How can I create a new Project?

1. Sign in to the platform dashboard
2. Click "Create Project"
3. Enter a project name, choose the design template
4. Click Create to initialize your workspace

## What is a Circuit and where can I create one?

A circuit is a modular block containing components, connections, and parameters.

To create a circuit:
1. Open your project
2. Navigate to the Circuits section
3. Click "New Circuit"
4. Upload a circuit schematic or netlist

## What is a Simulation and how do I run it?

A simulation evaluates your circuit or workflow against fixed design parameters.

To run a simulation:
1. Open your circuit
2. Click Simulate
3. Set the input parameters
4. View results in the simulation output panel

## What is AI Optimization?

AI Optimization uses intelligent agents to automatically search and select optimal parameters for your circuit or workflow. The system evaluates multiple combinations of parameters and converges on the best-performing solution.

## How do I run AI Optimization in my project?

1. Navigate to Genie → AI-Driven Mode
2. Set scalar or vector targets
3. Define constraints or parameter search ranges
4. Click Start Optimization

The AI agent handles all iterations automatically.

## What are Scalar Targets?

Scalar targets represent single-value performance goals such as:
- Power
- Gain
- Latency

## What are Vector Targets?

Vector targets represent multi-point or curve-based measurements such as:
- VIN vs VOUT curves
- Frequency response curves
- Load regulation sweeps

These are used when performance must be measured across a range of input values.

## What is an Agent in the platform?

An agent is an AI-driven module that performs specialized tasks such as:
- Parameter optimization
- Data processing

Agents automate repetitive or complex steps in your design.

## How do I manage multiple circuits within a project?

You can manage circuits using the Circuits sidebar.

Options include:
- Copy circuit
- Rename circuit
- Create sub-circuits
- Delete unused circuits

This helps maintain an organized design hierarchy for complex projects.

## How do I publish a project?

1. Go to your project
2. Click on 'Publish Project'
3. Enter a name for your project
4. Click 'Proceed'

## What does optimizing do to my project parameters?

Optimizing a project, either locally or globally, will change your project parameters, specifically, your project's Design Parameters.

## How do I add people to my project?

You can add team members to your project by going to the 'Update Project' page in your project. Under which, you can search for and add team members. You can also assign them roles, if you are the owner of the project.

## Is it possible to access pre-existing projects or circuits?

Yes, it is possible to access pre-existing projects and circuits.

1. Navigate to the 'Public Projects' page. This page contains projects that have been authorised for publishing and public viewing by the authors
2. Click on 'Clone' and enter a name for the project
3. The project is now cloned in your dashboard with the name you have provided

## Is it compulsory to add tags to all my projects?

No, it is not compulsory to add tags to your projects. Tags are simply to help users easily identify and locate projects.

## What are the electronic circuit simulators that the platform supports that I can use to create circuits for my project?

The electronic circuit simulators that the platform supports that you can use to create circuits for your project are ngSpice and ltSpice.

## Can I retrieve a deleted project?

No, you can not retrieve a deleted project.

## How do I know which agent to use?

Depending on what circuit you are trying to optimize, a list of models are available to choose from to optimize your appropriate circuit.

## Is it possible to edit circuits or projects after uploading the schematic or netlist?

Yes, it is possible to edit circuits or projects after uploading the schematic or netlist. Navigate to the Netlist tab in a circuit and click on 'Edit'. Once you are done making changes, click on the tick option.

## What is import and export feature?

Import and export feature allows you to either import pre-existing values for the circuit from elsewhere onto the project or export the current values for the circuit from the project to elsewhere.