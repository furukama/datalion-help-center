---
title: API Reference
description: API Reference. DataLion provides a comprehensive REST API...
keywords:
  - integrations
  - reference
  - datalion
  - help
  - documentation
sidebar_label: API Reference
sidebar_position: 30
tags:
  - Integrations
  - authentication
  - endpoints
---

# API Reference

DataLion provides a comprehensive REST API for integration.


## Authentication


All API requests require authentication using an API key:


```bash

curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.datalion.com/v1/data


```



## Endpoints



### GET /api/v1/dashboards


Retrieve all dashboards for the authenticated user.


### POST /api/v1/data


Upload data to DataLion.


```json

{
  "dataset": "sales",
  "data": [
    {"date": "2024-01-01", "revenue": 1000},
    {"date": "2024-01-02", "revenue": 1500}
  ]
}


```
