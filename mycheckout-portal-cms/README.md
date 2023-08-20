# Kuikpay

> Implementation in VTEX Legacy stores

[![NPM](https://img.shields.io/npm/v/kuikpay-sdk.svg)](https://www.npmjs.com/package/kuikpay-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

:warning: This guide is only for VTEX Legacy stores or Checkout that use the traditional development model with HTML, JavaScript and CSS. If you have a VTEX Legacy store with an implementation of React or another Framework that allows you to install npm dependencies, use Kuikpay as a dependency of your project. https://www.npmjs.com/package/kuikpay-sdk

## Install

Install my-checkout app to add settings and to enable services.

```tsx
vtex install kuikpay.my-checkout
```

## Usage


### Modal

Add a div element with kuikpayWrapper id in the pages where you want to show the app. You can add the element anywhere on the page but we recommend to add at the bottom of the </body>.

```tsx
<body>
    ...
    <div id="kuikpayWrapper"></ div>
</body>
```

### Produc Detail Page
In the HTML of the product page, add the following Script just before the closing of the </body> tag.
```tsx
<body>
    ...
    <script src="https://d279u1zwhmlz42.cloudfront.net/mycheckout-bundle.js" type="text/javascript"></script>
</body>
```

Add a div element with the kuikpay class in the DOM element where you want the Kuikpay button to be displayed.
```tsx
<body>
    ...
    <div id="kuikpay"></div>
    ...
</body>
```

### Produc List Page
In the HTML of the category page, add the following Script just before the closing of the </body> tag.
```tsx
<body>
    ...
    <script src="https://d279u1zwhmlz42.cloudfront.net/mycheckout-bundle.js" container={container} type="text/javascript"></script>
</body>
```

### `Script attributes`

| Attribute name         | Type   | Description                                                                                                                                                           | Default value |
| ----------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `container` | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) In the PLP (Product List Page) it is mandatory to add this attribute. The value refers to the class name of the parent element of the product list. | `undefined`   |

In the Shelve Template responsible for displaying the showcases of your store, add a div element with the kuikpay class and kuikpay-{idSku} id in the DOM element where you want the Kuikpay button to be displayed.
```tsx
#set($idSku = $product.productVariantId)
...
<div class="kuikpay" id="kuikpay-$idSku"></div>
```

## License

MIT © [](https://github.com/)
