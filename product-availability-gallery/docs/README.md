##  ⚠️ Maintenance ⚠️
*Starting September 1st 2022, this application will no longer be maintained by VTEX. Code is released for free under the GNU/PL Agreement for you to use and modify at your convenience. The VTEX repository shall remain unchanged with the original version.*

---

# Product Availability Gallery

## Description

The Product Availability component shows the available amount of products. It also implements the needed services to request availability using the inventory API and validating USERS using masterdata.
**IMPORTANT** This block was built to work only in account: ```arvital``` , however it can be easily evolved to support other customers.

It is available to be used in product page, gallery , category and search.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request

## Table of Contents

- [Usage](#usage)
    - [Blocks API](#blocks-api)
        - [Configuration](#configuration)
    - [Styles API](#styles-api)
        - [CSS Namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app or override the default CSS you need import it in your dependencies on `manifest.json` file.

```json
  "dependencies": {
    "vtexarg.product-availability-gallery-gallery": "1.x"
  }
```

Then, add `product-availability-gallery-gallery` block to your `blocks.json`

Now, you can change the behavior of the `product-availability-gallery-gallery` block.


See an example of how to configure **showing availability**:

```json
"product-availability-gallery-gallery": {
  "props": {
    "showAvailability": true,
    "showAvailabilityMessage": "Available items:"
  }
}
```

### Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within product-availability-gallery-gallery and describes if they are required or optional.

```json
{
  "product-availability-gallery-gallery": {
    "component": "ProductAvailability"
  }
}
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the product-availability-gallery's behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name           | Type      | Description                                                                                 |
| ------------------- | --------- | ------------------------------------------------------------------------------------------- |
| `threshold`     | `Number` | DefineMinimum quantity that makes low stock message appear (if message is set). Default: 0    |
| `lowStockMessage`        | `String` | String to be shown to user when stock is lower than threshold. Should have {quantity} inside the given string, to be replaced for the threshold property. Example: \"Only {quantity} left!\". Leave empty to not show. Default: ""              |
| `highStockMessage`  | `String` | String to be shown when stock is higher or equal than threshold. If left empty, won\'t show. Default: ""                                                              |
| `showAvailability`  | `Boolean` | Enables the possibility to show the available items instead of lowStockMessage or highStockMessage. Default: false                                                              |
| `showAvailabilityMessage`  | `String` | String to be shown when show available option is true. If left empty, won\'t show. Default: ""                                                              |

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.product-availability-gallery.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS Namespaces

Below, we describe the namespaces that are defined in the product-availability-gallery.

| Token name                 | Component                                                                                                                                                                                                                                                                                                                                                                     | Description                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `container`                | [index](https://github.com/vtex-apps/product-availability-gallery/blob/master/react/components/ProductAvailability.tsx) | The main container of `ProductAvailability`                      |
| `lowStockText`          | [index](https://github.com/vtex-apps/product-availability-gallery/blob/master/react/components/LowStock.tsx)    |  Normal text for the low stock message.
| `lowStockHighlight`           | [index](https://github.com/vtex-apps/product-availability-gallery/blob/master/react/components/LowStock.tsx)   |  Number of the low stock message that is supposed to be highlighted.  |
| `highStockText`           | [index](https://github.com/vtex-apps/product-availability-gallery/blob/master/react/components/HighStock.tsx)   | Text of the hight stock message.    |
| `showAvailableText`           | [index](https://github.com/vtex-apps/product-availability-gallery/blob/master/react/components/ShowAvailable.tsx)   | Text of the show available message.    |

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/product-availability-gallery-gallery/issues). Also feel free to [open issues](https://github.com/vtex-apps/product-availability-gallery/issues/new) or contribute with pull requests.

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/product-availability-gallery.svg?branch=master)](https://travis-ci.org/vtex-apps/product-availability-gallery)
[![Coverage Status](https://coveralls.io/repos/github/vtex-apps/product-availability-gallery/badge.svg?branch=master)](https://coveralls.io/github/vtex-apps/product-availability-gallery?branch=master)


<!-- DOCS-IGNORE:start -->
___

## Contributors ✨

Thanks goes to these wonderful people:
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<table>
  <tr>
    <td align="center"><a href="https://github.com/tomymehdi"><img src="https://avatars.githubusercontent.com/u/774112?v=4" width="100px;" alt=""/><br /><sub><b>Tomás Alfredo Mehdi</b></sub></a><br /><a href="https://github.com/vtex-apps/vtex-logger-react/commits?author=tomymehdi" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
