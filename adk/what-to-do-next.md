---
sidebar_position: 2
---

# What To Do Next

Now that you have your agent set up and running, let's go beyond the basics and explore advanced development features. You'll learn how to add, modify, commit, and delete models — as well as how to restore deleted models.

## Adding a model

To add a new model to your agent:

1. In your agent directory, run the following:
    ```sh
    genie model add MyNewModel
    ```

    You should now see a new `models/` directory with the following structure created by `genie`:

    ```
    models/
    └── MyNewModel
        ├── hyper_parameters.json
        ├── metadata.json
        ├── models
        ├── target_specifications.json
        └── world_control_specifications.json
    ```

2. Modify `models/MyNewModel/metadata.json` to be:
    ```json
    {
        "description": "My new model for testing advanced workflows",
        "state": "learnt",
        "nn_arch": {},
        "is_global": false,
        "is_public": false,
        "bypass": true,
        "specifics": {},
        "name": "MyNewModel"
    }
    ```

3. Now, register your model with:
    ```sh
    genie model register MyNewModel
    ```

    Your model is now available for use by your agent and visible on the AsterQuanta platform.

See [Models](adk\Basics\models.md) for more information about model structure and configuration.

## Changing a model and committing it

When you want to modify an existing model — for example, to update parameters, architecture, or target specifications — do the following:

1. Make your desired changes to the model files (for example, edit `hyper_parameters.json`, `metadata.json`, `world_control_specifications.json`, or `target_specifications.json`).

2. Once done, commit the changes:
    ```sh
    genie model commit MyNewModel
    ```

    The client/UI will automatically reflect the latest version of the model after committing.

## Deleting a model

To delete a model from your agent, run:

```sh
genie model delete MyOldModel
```

This command will:

1. Unregister the model from your local agent configuration.
2. Move the corresponding directory under `models/` to `models/.trash` after confirmation.

To verify that the model was removed successfully, use:

```sh
genie model list
```

You should no longer see the deleted model in the output.

## Restoring a deleted model

If you've deleted a model and need to restore it from the trash, use:

```sh
genie model restore MyOldModel
```

This command will move the model back from `models/.trash` to the active `models/` directory and re-register it with your agent.