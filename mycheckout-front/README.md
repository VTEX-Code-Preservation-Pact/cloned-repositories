# Kuikpay

> Implementation in VTEX IO stores

[![NPM](https://img.shields.io/npm/v/checkoutless.svg)](https://www.npmjs.com/package/checkoutless) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

:warning: This guide is only for VTEX IO stores.

## Install

- [Kuikpay](#kuikpay)
  - [Install](#install)
  - [Usage](#usage)
    - [kuikpay-button](#kuikpay-button)
    - [kuikpay-quota-information](#kuikpay-quota-information)
  - [Styles](#Styles)

## Usage

In the manifest.json of your store theme add the following peer dependency.

```tsx
"kuikpay.my-checkout": "0.x"
```

### kuikpay-wrapper

Wrapper component for handling the data that is shared between each of the kuikpay-button components.

This block must be added at least once in each page where you show a product-summary. For example we can choose to add the block once in the header but it will be instantiate in every page, or you can add in some specifics templates.

```tsx
"store.product": {
  "children": [
    ...
    "kuikpay-wrapper"
  ]
}
```

```tsx
"header-layout.desktop": {
  "children": [
    "kuikpay-wrapper",
    ...
  ]
}
```

```tsx
"header-layout.mobile": {
  "children": [
    "kuikpay-wrapper",
    ...
  ]
}
```

NOTE: You must be sure that the wrapper is instantiated just once.

### kuikpay-button

Button component which is responsible for adding to the cart and having the possibility of making the purchase in the same window.

### `kuikpay-button props`

| Prop name         | Type   | Description                                                                                                                                                           | Default value |
| ----------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `onClickBehavior` | `enum` | Controls what happens when users click on the button. Possible value is: `ensure-sku-selection` (if multiple SKUs are available, the SKU selector will be displayed). | `undefined`   |

In the product.json file or any block file of your choice, declare the following block.

```tsx
"flex-layout.row#kuikpay": {
  "props": {
    "marginTop": 4,
    "marginBottom": 4
  },
  "children": ["kuikpay-button"]
}
```

- `Product Detail Page`

Add the "flex-layout.row#kuikpay" block in your product.jsonc file where you want the button to be displayed.

```tsx
"flex-layout.col#right-col": {
  "children": [
    ...
    "flex-layout.row#kuikpay",
    ...
  ]
}
```

- `Product List Page`

Add the "flex-layout.row#kuikpay" block in your product-summary.jsonc file at the position where you want the button to be displayed.

```tsx
"product-summary.shelf": {
  "children": [
    ...
    "flex-layout.row#kuikpay",
    ...
  ]
}
```

### kuikpay-quota-information

Information that allows you to know if the product can be paid with **Orion**.

```tsx
"flex-layout.row#kuikpay-quota-information": {
  "children": [
    "kuikpay-quota-information"
  ]
}
```

### Styles

If you want to change the app styles from your store theme, you can create a new folder called my-checkout containing two files:

- my-checkout
  - kuikpay.my-checkout.css
  - my-checkout.css

#### kuikpay.my-checkout.css

It is only for import my-checkout.css

```tsx
@import url("./my-checkout.css");
```

#### my-checkout.css

Change styles, for example

```tsx
:global(._kuikpay__src-kuikpay-styles-module__floatButton) {
    position: fixed;
    bottom: 100px;
    right: 20px;
    cursor: pointer;
    width: 94px;
    height: 94px;
    z-index: 99;
  }
```
