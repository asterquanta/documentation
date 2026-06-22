---
sidebar_position: 4
title: "World Controls"
---

# WorldControlSpec

```py
class WorldControlSpec(BaseModel)
```

A dataclass that is helpful in defining the action space and mapping design parameters.


## Definition
```py
class WorldControlSpec(BaseModel):
    label: str
    description: str
    order: int
```


## Members

### label

```py
label: str
```

A unique identifier which can be used to map user defined world controls (on the web interface) to actual agent specifications.

### description

```py
description: str
```

Human-readable description describing the purpose of this world control. For informal purposes only.

### order

```py
order: int
```

Used to sort world controls before being provided to the agent, ensures data integrity.