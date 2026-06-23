---
sidebar_position: 16
title: Environment Settings
---

# Environment Settings

Local runtime configuration for the ADK lives in `.env` at the project root. This file is created by
`genie setup`. Values here affect how the agent connects to AsterQuanta on **this machine only**.
They are not pushed to the platform with `genie update`.

## Standard variables

| Variable | Description |
|----------|-------------|
| `SECRET` | Client key for the AsterQuanta platform. Required for `genie run` and API access. |
| `AES_HOST` | Platform hostname (without scheme), for example `genie.asterquanta.com`. |
| `AES_PORT` | Platform port, usually `443`. |
| `SSL_ENABLED` | `1` for HTTPS/WSS, `0` for plain HTTP/WS in local development. |

Optional logging variables (see [Agents — Logging](agents.md#logging)):

| Variable | Description |
|----------|-------------|
| `ADK_LOG_LEVEL` / `LOG_LEVEL` | Console log verbosity, for example `DEBUG`. |

## Instance ID (multi-instance deployments)

`INSTANCE_ID` identifies a **single running agent process** when more than one copy of the same
agent shares the same `SECRET` (for example multiple containers, VMs, or machines serving the same
registered agent).

| Variable | Description |
|----------|-------------|
| `INSTANCE_ID` | Unique id for this process. Usually left empty on first setup. |

### How it works

1. On first connection, if `INSTANCE_ID` is not set, the platform may assign one and the ADK saves it
   to `.env` for future runs.
2. Subsequent heartbeats include this id so the platform can route work and track capacity per
   process.

You normally **do not need to set `INSTANCE_ID` manually**.

### Running multiple copies of one agent

Use the same project layout and `SECRET` on each machine or container, but give each **running
process** its own identity:

- **New deployment** — leave `INSTANCE_ID` unset (or remove it from `.env`). Each process receives
  its own id on first connect.
- **Cloning an agent directory** — copy `settings.json` and source code as needed, but do **not**
  copy another machine's `INSTANCE_ID` into a second concurrent process. Two live processes must not
  share the same instance id.

This lets you scale horizontally: several agent processes can accept optimizations in parallel while
the platform treats them as separate workers under one registration.

:::note
Editing `.env` requires restarting the agent for changes to take effect.
:::
