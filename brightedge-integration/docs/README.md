📢 Use this project, [contribute](https://github.com/vtex-apps/brightedge-integration) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# BrightEdge

This app implements BrightEdge AutoPilot - Self Connecting Pages within VTEX IO. The app provides a block which can be placed in your store layout and which will be populated with dynamic link content designed to improve SEO.

## Configuration

1. [Install](https://vtex.io/docs/recipes/store/installing-an-app) `vtex.brightedge-integration` in the desired account.
2. In your account's admin dashboard, go to `Apps > My Apps` and then click the box for `BrightEdge`.
3. Enter your BrightEdge `Account ID` in the provided settings field and then click Save.
4. In your `store-theme`, add BrightEdge as a dependency:

```json
"dependencies": {
    "vtex.brightedge-integration": "0.x"
  }
```

5. In your `store-theme`'s `store/` folder, place the `brightedge` block in the desired location (BrightEdge recommends displaying their link content in the store's footer). For example:

```json
"footer-layout.desktop": {
    "children": [
      "brightedge",
      "flex-layout.row#footer-1-desktop",
      "flex-layout.row#footer-2-desktop",
      "flex-layout.row#footer-3-desktop"
    ]
  },
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
