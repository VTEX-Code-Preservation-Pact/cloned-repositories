📢 Use this project, [contribute](https://github.com/vtex-apps/drawer) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Drawer

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The **Drawer** component is a sliding panel that displays additional options and menus when expanded. It is typically used in mobile layouts and responsive web designs where screen space is limited.

![drawer](https://github.com/vtex-apps/reviews-and-ratings/assets/60782333/46358b77-e41a-4014-8443-c65cbe947fc2)

When closed, the **Drawer** component is represented by an icon button positioned at the edge of the screen. Upon interaction, the drawer slides into view, revealing its content. Users can interact with the exposed content, perform actions, and navigate menus. To dismiss the drawer, users can either tap outside the drawer or use the close button.

## Configuration

1. Open your store theme in the code editor of your preference.
2. Open the `manifest.json` file and add the `vtex.store-drawer` app to your store theme dependencies as in the following:

```json
"dependencies": {
  "vtex.store-drawer": "0.x"
}
```

2. Add the `drawer` block to your app. The following example is from the [Store Theme](https://github.com/vtex-apps/store-theme).

```json
"drawer": {
  "children": [
    "menu#drawer"
  ]
},

"menu#drawer": {
  "children": [
    "menu-item#category-clothing",
    "menu-item#category-decoration",
    "menu-item#custom-sale"
  ],
  "props": {
    "orientation": "vertical"
  }
},
```

3. Use the `drawer-trigger` block to customize the icon that triggers the opening of the drawer as follows:

```json
"drawer": {
  "children": [
    "menu#drawer"
  ],
  "blocks": ["drawer-trigger"]
},

"drawer-trigger": {
  "children": ["rich-text#open-drawer"]
},

"rich-text#open-drawer": {
  "props": {
    "text": "Open drawer"
  }
}

"menu#drawer": {
  "children": [
    "menu-item#category-clothing",
    "menu-item#category-decoration",
    "menu-item#custom-sale"
  ],
  "props": {
    "orientation": "vertical"
  }
},
```

4. Use the `drawer-header` block to customize the header containing the button that closes the drawer. For example:

```json
// blocks.json
{
  "drawer": {
    "blocks": ["drawer-header#my-drawer"]
  },
  "drawer-header#my-drawer": {
    "children": [
      // you need to include the block `drawer-close-button` somewhere inside here
      "flex-layout.row#something",
      // ...
      "drawer-close-button"
    ]
  }
}
```

### Using the Drawer as a standalone component

If you are using this component as a standalone module, you will need to import it into the specific component where you want to use it. For example:

```tsx
import { Drawer, DrawerHeader, DrawerCloseButton } from "vtex.store-drawer";

const Menu = () => (
  <Drawer
    header={
      <DrawerHeader>
        <DrawerCloseButton />
      </DrawerHeader>
    }
  >
    <ul>
      <li>Link 1</li>
      <li>Link 2</li>
      <li>Link 3</li>
      <li>Link 4</li>
      <li>Link 5</li>
      <li>Link 6</li>
    </ul>
  </Drawer>
);
```

### Props

#### `drawer`

| Prop name              | Type                                                                       | Description                                                                                                                                                                                                                                                                                                                              | Default value  |
| ---------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `maxWidth`             | `number` or `string`                                                       | Defines the maximum width of the open drawer.                                                                                                                                                                                                                                                                                            | `450`          |
| `isFullWidth`          | `boolean`                                                                  | Controls whether the open drawer should occupy the full available width.                                                                                                                                                                                                                                                                 | `false`        |
| `slideDirection`       | `'horizontal'`&#124;`'vertical'`&#124;`'rightToLeft'`&#124;`'leftToRight'` | Controls the direction of the opening animation for the drawer.                                                                                                                                                                                                                                                                          | `'horizontal'` |
| `backdropMode`         | `'default'`&#124;`'none'`                                                  | Controls whether the backdrop should be displayed when the drawer is open.                                                                                                                                                                                                                                                               |                |
| `renderingStrategy`    | `'lazy'`&#124;`'eager'`                                                    | Controls the rendering strategy for the children of the drawer component. It determines whether the children should be rendered only when the drawer is clicked (`lazy`) or immediately when the page loads (`eager`).  Enabling the `eager` strategy may improve SEO performance. However, it may also result in slower page rendering. | `'lazy'`       |
| `customPixelEventId`   | `string`                                                                   | Defines the store event ID responsible for triggering the `drawer` to automatically open on the interface.                                                                                                                                                                                                                                       | `undefined`    |
| `customPixelEventName` | `string`                                                                   | Defines the store event name responsible for triggering the `drawer` to automatically open on the interface. Some examples are: `'addToCart'` and `'removeFromCart'` events. Note that if no `customPixelEventId` is set, using this prop will cause the drawer to open in every event with the specified name.                                  | `undefined`    |

#### `drawer-close-button`

| Prop name | Type                     | Description                                                                            | Default value |
| --------- | ------------------------ | -------------------------------------------------------------------------------------- | ------------- |
| `size`    | `number`                 | Defines the size of the icon inside the button.                                         | `30`          |
| `type`    | `'filled'`&#124;`'line'` | Defines the type of the icon.                                                           | `'line'`      |
| `text`    | `string`                 | Defines the text inside the button. The icon will not be rendered if `text` is defined. | `undefined`   |

#### `drawer-trigger`

| Prop name            | Type     | Description                                                                        | Default value |
| -------------------- | -------- | ---------------------------------------------------------------------------------- | ------------- |
| `customPixelEventId` | `string` | Defines the event ID to be sent whenever users interact with the Drawer component. | `undefined`   |

## Customization

In order to apply CSS customizations to this and other blocks, follow the instructions in [Using CSS handles for store customizations](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS handles              |
| ------------------------ |
| `drawer`                 |
| `opened`                 |
| `overlay`                |
| `overlay--visible`       |
| `closed`                 |
| `moving`                 |
| `drawerContent`          |
| `drawerHeader`           |
| `drawerTriggerContainer` |
| `openIconContainer`      |
| `closeIconContainer`     |
| `closeIconButton`        |
| `childrenContainer`      |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Radu1749"><img src="https://avatars2.githubusercontent.com/u/51535501?v=4" width="100px;" alt=""/><br /><sub><b>Radu1749</b></sub></a><br /><a href="https://github.com/vtex-apps/drawer/commits?author=Radu1749" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rayra-alencar"><img src="https://avatars0.githubusercontent.com/u/28907161?v=4" width="100px;" alt=""/><br /><sub><b>rayra-alencar</b></sub></a><br /><a href="https://github.com/vtex-apps/drawer/commits?author=rayra-alencar" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/renanguerraa1"><img src="https://avatars2.githubusercontent.com/u/69531548?v=4" width="100px;" alt=""/><br /><sub><b>Renan Guerra</b></sub></a><br /><a href="https://github.com/vtex-apps/drawer/commits?author=renanguerraa1" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
