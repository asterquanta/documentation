---
sidebar_position: 15
title: Agent Settings
---

# Agent Settings

Agent metadata and optional runtime options live in `settings.json` at the project root. The file is
created by `genie setup`. Edit it directly, then run `genie update` to push metadata changes to the
AsterQuanta platform without restarting the agent.

## Standard fields

| Field | Description |
|-------|-------------|
| `name` | Agent name shown on the platform. |
| `description` | Short description of the agent. |
| `hyper_parameters` | Default hyper-parameters copied into new models and used as a baseline for training. |
| `is_public` | Whether the agent is visible to other users on the platform. |

Example:

```json
{
    "name": "MyAgent",
    "description": "RL optimizer for analog circuits",
    "hyper_parameters": {
        "learning_rate": 0.0003
    },
    "is_public": false
}
```

## Resource usage logging

You can enable periodic **CPU and memory** logging for a running agent. When enabled, the ADK writes
one JSON line per sample to a local log file while the agent is connected to the platform. Samples
are taken on the agent heartbeat, so logging respects the configured interval rather than writing on
every internal event.

This is useful when running agents on shared machines, in Docker, or when you want a local record of
load during long optimizations.

### Configuration

Add or edit `resource_logging_options` in `settings.json`:

```json
{
    "name": "MyAgent",
    "resource_logging_options": {
        "enabled": true,
        "file_name": "logs/resources.log",
        "interval_seconds": 10,
        "max_size": 10000000,
        "backup_count": 10,
        "child_process_names": []
    }
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `false` | Turn resource logging on or off. |
| `file_name` | `logs/resources.log` | Path to the JSONL log file (parent directories are created automatically). |
| `interval_seconds` | `10` | Minimum seconds between samples. |
| `max_size` | `10000000` | Maximum log file size in bytes before rotation. |
| `backup_count` | `10` | Number of rotated backup files to keep. |
| `child_process_names` | `[]` | Optional process name substrings. Matching child processes are included in memory totals (for example simulator or worker processes started by your agent). |
| `service_name` | *(agent name)* | Label written into each log record. Defaults to the agent `name` when omitted. |

Changes take effect the next time you start the agent (`genie run` or `python src/main.py`).

### Log format

Each line is a JSON object. Typical fields include:

| Field | Description |
|-------|-------------|
| `ts` | UTC timestamp of the sample. |
| `cpu_pct` | Process CPU usage percentage. |
| `load_1m` | System load average (1 minute). |
| `process_rss_mb` | Resident memory of the agent process (MB). |
| `children_rss_mb` | Resident memory of matched child processes (MB). |
| `child_count` | Number of matched child processes. |
| `service` | Service name (usually your agent name). |
| `agent_name` | Agent name from settings. |
| `active_optimizations` | Number of optimizations currently running in this process. |

Example record:

```json
{"ts":"2026-06-23T12:00:00Z","cpu_pct":12.5,"load_1m":0.42,"process_rss_mb":256.0,"children_rss_mb":0.0,"child_count":0,"service":"MyAgent","agent_name":"MyAgent","active_optimizations":1}
```

:::tip
Add `logs/` to your `.gitignore` if you enable resource logging in development and do not want log
files committed to version control.
:::
