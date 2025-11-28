---
id: creating-a-project
title: How to create a project
sidebar_label: How to create a project
sidebar_position: 1
---

# How to create a project

The platform allows you to create, configure, and publish circuit design projects. Follow the steps below to set up a new project and upload your circuit files.

## 1. Create a New Project

1. Navigate to the **Projects** page from the Dashboard after logging in.
2. Click **Add New Project**.
3. Enter the required project details:
   - Project Type
   - Project Name
   - Description (optional)
   - Project Tags (optional)
   - Project Image (optional)
4. Click **Save Project** to proceed.

![Project Details](/img/projectdetails.png)

After saving, you will be redirected to the Upload Circuit page.

## 2. Upload Circuit Information

On the Upload Circuit page, you can add circuit files and configuration details.

Enter the following information:
- Base Circuit Name
- Tool
- Description (optional)
- Circuit Image (optional)
- Circuit Schematic
- Circuit Dependencies (optional)

You may also choose to **Import Circuit** if you have a previously saved circuit configuration.

**Available actions:**
- Save Circuit
- Save & Add Another
- Reset Changes

![Upload Circuit](/img/uploadcircuit.png)

## 3. Configure Circuit Parameters

Each circuit includes three key configuration sections:

### Design Parameters

This section contains a table with the following columns:
- Variable
- Component
- Value
- Unit
- Min Value
- Max Value

You can enter values for **Value**, **Min Value**, and **Max Value**. 

**Additional options:**
- Import from File
- Export to File

![Design Parameters](/img/designparameters.png)

### Environment Parameters

Define external simulation conditions such as:
- Process corners
- Temperature variations
- Sweep parameters

These settings allow you to evaluate circuit behavior across different operating scenarios and edge cases.

### Genie

This section provides access to AI-driven optimization:
- Select an **Agent** from the drop-down list to optimize the uploaded circuit.
- Access tools such as:
  - View Log List
  - Download Netlist
- Click **Genie Optimize** to begin the optimization process.

![Environment Parameters](/img/environmentparameters.png)

## 4. Manage Project Settings

At any point, you can open **Project Settings** to edit project-level information:
- Project Name
- Description (optional)
- Project Tags (optional)
- Project Image (optional)

**Available actions:**
- Save Project
- Reset Changes

You can also manage your project team here by adding or removing members (available to the project owner).

![Project Settings](/img/projectsettings.png)

## 5. Publish the Project

1. Return to your project page and click **Publish Project**.
2. Enter a publication name and choose **Proceed** or **Cancel**.

Once submitted:
1. Go to the **Projects** page and open the **Authorize Projects** section.
2. Approve the publication request by clicking the checkmark (✔).

After authorization, the project becomes public and will appear on the **Public Projects** page.