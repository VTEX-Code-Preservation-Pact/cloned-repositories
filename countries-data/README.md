# Countries Data

Monorepo containing the configuration apps for each country. These apps configure
the [`vtex.country-data-settings`](https://github.com/vtex-apps/country-data-settings) service app,
which is currently being used to power Checkout's profile and shipping forms.

## Adding a new country

To add a new country configuration app, use the script `./scripts/create-country-app.js`. The syntax
supported by this script is the following:

```sh
# here you can supply multiple countries if needed
./scripts/create-country-app.js [...country]
```

You must supply the country [ISO-3 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) in lowercase,
which will be used to create the app name and the folder inside `./packages`.

After running the script, you must then fill the configuration for that country inside
`./packages/[country-code]/vtex.country-data-settings/configuration.json`. You can take a look
at how this was done for other countries and go from there.
