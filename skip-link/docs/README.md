📢 Use this project, [contribute](https://github.com/{OrganizationName}/{AppName}) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Skip Link

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

Implements Skip-Link blocks.

## Configuration 

1. Adding this app as a theme dependency in the `manifest.json` file;
2. Add `skip-link` block to the upmost position possible. For example:
```
"header-layout.desktop": {
    "children": [
      "skip-link",
      "flex-layout.row#1-desktop",
      "flex-layout.row#2-desktop",
      "flex-layout.row#3-desktop",
      "sticky-layout#4-desktop"
    ]
  },
 ``` 
2. Add the anchor block `skip-link-anchor` in a given template where you want the link navigating to. For example:
```
"store.home": {
  "blocks": [
    "skip-link-anchor",
    "list-context.image-list#demo",
    /* You can make references to blocks defined in other files.
     * For example, `flex-layout.row#deals` is defined in the `deals.json` file. */
    "__fold__.experimentalLazyAssets",
    "flex-layout.row#deals",
    "rich-text#shelf-title",
    "flex-layout.row#shelf",
    "info-card#home",
    "rich-text#question",
    "rich-text#link",
    "newsletter"
  ]
},
```

### `skip-link-anchor` props

None so far.

## Modus Operandi

Do NOT place **more than one** `skip-link-anchor` block within the same template. Probably, there is no guarantee that the link will scroll correctly.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ----------- | 
| `skiplink` | 


<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
