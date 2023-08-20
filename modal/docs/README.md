
# VTEX Modal ![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red)

:warning: **The modal block has been deprecated in favor of the [Modal Layout](https://vtex.io/docs/components/all/vtex.modal-layout) app**. Although support for this block is still granted, we strongly recommend you to update your store theme with the Modal Layout's blocks in order to keep up with the component's evolution.

## Description

The VTEX Modal is the block to use when you want to display another block in a VTEX app.

It renders a button and when you click it, it opens the modal with its children component rendered.

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
    "vtex.modal": "0.x"
  }
```

Then, use the `modal` block in your `blocks.json` like:

```json
"modal": {
    "children": ["rich-text"],
    "props": { 
	   "centered": true,
	   "blockClass": "home-modal",
	   "buttonClass": "t-heading-5",
	   "showCloseIcon": false
	}
  }

```

### Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within modal and describes if they are required or optional.

```json
{
  "modal": {
    "allowed": "*",
    "component": "index",
    "composition": "children"
  }
}
```

For now this block does not have any required or optional blocks. It allows you to render any block as its children.

#### Configuration

Through the Storefront, you can change the modal's behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name           | Type      | Description                                                                                 |
| ------------------- | --------- | ------------------------------------------------------------------------------------------- |
| `centered`     | `Boolean` | Set to true if component should be centered on screen. Default: `false`    |
| `closeOnEsc`     | `Boolean` | Set to true if modal should close when esc key is pressed. Default: `true`                                          |
| `closeOnOverlayClick`        | `Boolean` | Set to true if modal should close when pressing on outside area. Default: `true`              |
| `showCloseIcon`  | `Boolean` | Set to true if modal should display close icon. Default: `true`                                                                |
| `buttonLabel`       | `String` | Set the label displayed on button to open modal Default: `""`   
| `buttonClass`       | `String` | Pass extra tachyon classes to button container. Default: `null`
| `blockClass`       | `String` | Unique class name to be appended to block classes. Default: `null`                                                           |

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.rich-text.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS Namespaces

Below, we describe the namespaces that are defined in the modal.

| Token name                 | Component                                                                                                                                                                                                                                                                                                                                                                     | Description                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `container`                | [index](https://github.com/vtex-apps/modal/blob/master/react/index.tsx) | The container that encloses the whole `<Modal>` component                     |                                   
| `childrenContainer`           | [index](https://github.com/vtex-apps/modal/blob/master/react/index.tsx)   |  It represents the view that encloses the children rendered inside the container  |
| `button`           | [index](https://github.com/vtex-apps/modal/blob/master/react/index.tsx)   | It is inserted in the view that encloses the button used to open the modal  |

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/modal/issues). Also feel free to [open issues](https://github.com/vtex-apps/modal/issues/new) or contribute with pull requests.

## Tests

To execute our tests go to `react/` folder and run `yarn test`

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/modal.svg?branch=master)](https://travis-ci.org/vtex-apps/rich-text)
[![Coverage Status](https://coveralls.io/repos/github/vtex-apps/modal/badge.svg?branch=master)](https://coveralls.io/github/vtex-apps/rich-text?branch=master)
