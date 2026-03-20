---
title: Transfer Learning
sidebar_position: 9
---

# Transfer Learning

Transfer Learning allows you to transfer knowledge from one agent (source model) to another (target model). This provides the new agent with a strong starting point, reducing the time and effort required to train or optimize it from scratch.

## Step 1: Search for the Source Model

Begin by searching for the model from which you want to transfer knowledge.

![Search for the Source Model](/img/tlss1.jpg)

## Step 2: Open Model Details

![Initiate Model Transfer](/img/tlss2.jpg)

Once you have selected the desired model, navigate to the **Model Details** page. This page contains all the configurations and information related to the selected model.

## Step 3: Initiate Model Transfer

Click on the **"Initiate Model Transfer"** option to begin the transfer learning process.

![Create Target Model - Step 1](/img/tlss3.jpg)

## Step 4: Create the Target Model

Enter a name for the target model. A new model will be created based on the selected source model.

![Create Target Model - Step 2](/img/tlss4.jpg)

## Step 5: Review Design Parameters

Navigate to the **Design Parameters** section. At this stage, you will observe that parameters from both the source model and the target model are present.

![Review Design Parameters](/img/tlss5.jpg)

## Step 6: Remove Source Parameters

Delete all parameters that belong to the source model, keeping only those relevant to the target model.

![Remove Source Parameters](/img/tlss6.jpg)

:::info Important Notes
- If there are common parameters between the source and target, they will not be duplicated.
- Only a single instance of shared parameters will be present.
:::

:::caution
After completing changes in the **Design Parameters** section, proceed directly to the next step. Do not return to this page later, as doing so may result in duplication of parameters.
:::

## Step 7: Go to Target Specifications

Navigate to the **Target Specifications** section.

![Go to Target Specifications](/img/tlss7.jpg)

## Step 8: Modify Target Specifications

Remove all specifications that belong to the source model. You may also adjust the precision values if required. Ensure you save any changes made.

![Modify Target Specifications](/img/tlss8.jpg)

## Step 9: Transfer the Model

Click on **"Transfer Model"** to finalize the transfer learning process.

![Transfer the Model](/img/tlss9.jpg)

## Step 10: Refresh the Page

After completing the transfer, refresh the page to ensure that all updates are properly applied and reflected.