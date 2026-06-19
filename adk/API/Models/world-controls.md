---
sidebar_position: 4
title: "World Controls"
---

# class WorldControlSpec

A dataclass that is helpful in defining the action space and mapping design parameters.

## Definition

```python
class WorldControlSpec(BaseModel):
    label: str
    description: str = ""
    order: int
```

## Members

- ### `label: str`
  - **Description**: A unique identifier which can be used to map user defined world controls
    (on the web interface) to actual agent definitions. Maximum 100 characters.

&nbsp;

- ### `description: str = ""`
  - **Description**: Human-readable description describing the purpose of this world control. For
    informal purposes only. Defaults to an empty string. Maximum 256 characters.

&nbsp;

- ### `order: int`
  - **Description**: Used to sort world controls before being provided to the agent, ensures data
    integrity.