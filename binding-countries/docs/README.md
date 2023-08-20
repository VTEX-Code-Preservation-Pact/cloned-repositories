# Binding Countries

When this app is installed and configured, render-server will do a redirect to the binding corresponding to the viewer country.

## Configuration

Example:

```json
{
  "bindings": [
    {
      "canonicalBaseAddress": "www.store.com/ar",
      "targetCountries": ["AR"]
    },
    {
      "canonicalBaseAddress": "www.store.com/br",
      "targetCountries": ["BR", "*"]
    },
    {
      "canonicalBaseAddress": "www.store.com/co",
      "targetCountries": ["CO", "CH", "PY", "UY"]
    },
    {
      "canonicalBaseAddress": "www.store.com",
      "targetCountries": null
    }
  ]
}
```

If the request comes from www.store.com it will be redirected to some binding depending on viewer's country (`AR` => `/ar`, `BR` => `/br`, etc.). If there is no specific binding for viewer's country, it will be redirect to the one registered with `wildcard` (`*`), in this case (`CX` => `/br`)