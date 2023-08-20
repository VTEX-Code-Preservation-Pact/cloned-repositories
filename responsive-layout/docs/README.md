# Responsive Layout
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Responsive Layout allows you to declare layout structures that will only be rendered in a specific screen-size breakpoint.

![responsive-layout-gif](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-responsive-layout-0.gif)

This app defines and exports four blocks:

- `responsive-layout.desktop`
- `responsive-layout.mobile`
- `responsive-layout.tablet`
- `responsive-layout.phone`

Each block has `composition: children`, which means that it expects to receive an array of `children` blocks for rendering if the current screen-size is right for its breakpoint.

## Configuration

1. Import the Responsive Layout app to your theme dependencies in the `manifest.json`. For example:

```json
  "dependencies": {
    "vtex.responsive-layout": "0.x"
  }
```

2. Add the `responsive-layout` block to your theme. For example:

```json
  "store.custom#about-us": {
    "blocks": [
      "responsive-layout.desktop",
      "responsive-layout.tablet",
      "responsive-layout.phone"
    ]
  },

  "responsive-layout.desktop": {
    "children": ["rich-text#desktop"]
  },
  "responsive-layout.tablet": {
    "children": ["rich-text#tablet"]
  },
  "responsive-layout.phone": {
    "children": ["rich-text#phone"]
  },

  "rich-text#desktop": {
    "props": {
      "text": "# This will only show up on desktop.",
      "blockClass": "title"
    }
  },
  "rich-text#tablet": {
    "props": {
      "text": "# This will only show up on tablet.",
      "blockClass": "title"
    }
  },
  "rich-text#phone": {
    "props": {
      "text": "# This will only show up on phone.",
      "blockClass": "title"
    }
  },
```

Note that you could use _any_ array of blocks as `children`, given that they are allowed by the `block` that is directly above `responsive-layout`.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://gabenna.io"><img src="https://avatars1.githubusercontent.com/u/4580524?v=4" width="100px;" alt=""/><br /><sub><b>Micael Pereira</b></sub></a><br /><a href="https://github.com/vtex-apps/responsive-layout/commits?author=micas06gua" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
