---
title: "Breaking change: image resizing and cropping domain change and performance improvement"
description: "VTEX is improving FastStore image resizing and cropping performance. To achieve this, `assets.vtex.app` is being deprecated."
tags: [faststore]
hide_table_of_contents: false
---

Stores using FastStore have access to an image resizing and cropping service provided by VTEX, that caches the result on edge, which improves storefront performance.

VTEX is simplifying the domain layer of this capability in order to improve it. This means deprecating the current domain in favor of a new one.

## What is changing?

By the end of May 2023 the endpoint `assets.vtex.app` will stop working. The correct domain to use the image resizing and cropping feature is now `{accountName}.vtexassets.com`.

## Why are we making this change?

VTEX has identified oportunities to improve performance that required the change of domain.

Namely, you can expect requests to this service to have decreased latency on cache misses, an increased cache hit ratio, and improved availability after implementing the new domain.

## What needs to be done?

You must replace all instances of `assets.vtex.app` for `{accountName}.vtexassets.com` in your FastStore project code by the end of May 2023. Otherwise your images may not be displayed correctly, returning a `status 404` error.

> Note that the new domain includes your [account name](https://help.vtex.com/en/tutorial/what-is-an-account-name--i0mIGLcg3QyEy8OCicEoC#).

See some examples of how to implement this replacements, considering a store with an account name of `examplestore`.

| Old domain | New domain |
| ---------- | ---------- |
| `https://assets.vtex.app` | `https://examplestore.vtexassets.com` | 
| `https://assets.vtex.app/example/path` | `https://examplestore.vtexassets.com/example/path` |