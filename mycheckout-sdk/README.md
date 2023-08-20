# Kuikpay

[![NPM](https://img.shields.io/npm/v/kuikpay-sdk.svg)](https://www.npmjs.com/package/kuikpay-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save kuikpay-sdk
```

## Usage

### KuikpayButton Props

| Prop name                  | Type          | Description                                                                                                                                                                                                                                          | Default value          |
| -------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `addToCart`                | `function`    | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Function that adds a product to your cart                                                                                                                | `undefined`            |
| `itemToAdd`                | `ItemToAdd`   | Product to be added to your cart                                                                                                                                                                                                                     | `undefined`            |
| `isVisible`                | `boolean`     | Option to hide the button according to your needs, for example if a product has no inventory                                                                                                                                                         | `true`                 |
| `disabled`                 | `boolean`     | Option to enable button                                                                                                                                                                                                                              | `false`                |
| `validateBeforeOfAdd`      | `function`    | Function in which you want to execute something before adding. Returns `(true)` if you want to add the product to the cart.                                                                                                                          | `undefined`            |
| `multipleAvailableSKUs`    | `boolean`     | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Indicates if the product has several skus available                                                                                                      | `false or undefined`   |
| `onClickBehavior`          | `string`      | Controls what happens when users click on the button. (If multiple SKUs are available, users will see a product window to select the desired one. If the product only has 1 SKU available, it will be added to the cart once the button is clicked.) | `ensure-sku-selection` |
| `product`                  | `Product`     | Product Information                                                                                                                                                                                                                                  | `undefined`            |
| `selectedItem`             | `ProductItem` | Information of the selected product                                                                                                                                                                                                                  | `undefined`            |
| `handleSelectedItem`       | `function`    | This function is executed when the product has several SKUS and you select one of them.                                                                                                                                                              | `undefined`            |
| `processOpenCoverageModal` | `function`    | Function that allows you to open a geolocation window if the store has this type of functionality.                                                                                                                                                   | `undefined`            |
| `forceOpenModal`           | `boolean`     | Force open the kuikpay modal.                                                                                                                                                                                                                        | `undefined`            |
| `runtime`                  | `Runtime`     | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Account information and workspace in which you are working. If you are `VTEX` you can take it from the `__RUNTIME__` variable.                           | `undefined`            |
| `sandbox`                  | `boolean`     | Option to change enviroments. Example `(true)` It is to use both the account and the workspace for development, `(false)` only workspace                                                                                                             | `false`                |

### KuikpayWrapper Props

| Prop name                  | Type               | Description                                                                                                                                                                                                                               | Default value |
| -------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `updateSelectedAddress`    | `function`         | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Function to update selected address for the user                                                                                              | `undefined`   |
| `cartSimulation`           | `function`         | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Function to make the cart simulations in your store                                                                                           | `undefined`   |
| `sandbox`                  | `boolean`          | Option to change enviroments. Example `(true)` It is to use both the account and the workspace for development, `(false)` only workspace                                                                                                  | `false`       |
| `language`                 | `string`           | Language in which the messages will be displayed                                                                                                                                                                                          | `undefined`   |
| `theme`                    | `enum`             | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Allows you to change templates, styles and more. Possible values are: `kuikpay`, `vtex` and `generic`                                         | `undefined`   |
| `runtime`                  | `Runtime`          | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Account information and workspace in which you are working. If you are `VTEX` you can take it from the `__RUNTIME__` variable.                | `undefined`   |
| `children`                 | `JSX.Element`      | child components of the wrapper                                                                                                                                                                                                           | `undefined`   |
| `orderForm`                | `OrderForm`        | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Information to make the order                                                                                                                 | `undefined`   |
| `clearData`                | `function`         | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Function to reset your store information after making the order                                                                               | `undefined`   |
| `updateItems`              | `function`         | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Function that removes products from your cart                                                                                                 | `undefined`   |
| `validateItems`            | `function`         | Function that returns the items that cannot be paid with `kuikpay` and is executed when you add a product to the cart.                                                                                                                    | `undefined`   |
| `insertCoupon`             | `function`         | Function that inserts a coupon, for discount issues.                                                                                                                                                                                      | `undefined`   |
| `addItemOffering`          | `function`         | Function that adds a service of a product.                                                                                                                                                                                                | `undefined`   |
| `removeItemOffering`       | `function`         | Function that removes a service from a product.                                                                                                                                                                                           | `undefined`   |
| `customData`               | `CustomData`       | Personalized information.                                                                                                                                                                                                                 | `undefined`   |
| `config`                   | `Config`           | Store configuration settings.                                                                                                                                                                                                             | `undefined`   |
| `handleGetDocumentsClient` | `function`         | Function that allows to obtain the last time the user logged in and in that case update it. (**This is for specific clients that require it**).                                                                                           | `undefined`   |
| `updateOrderFormProfile`   | `function`         | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Function to update the user in your cart                                                                                                      | `undefined`   |
| `manageBag`                | `function`         | Function that manages the bag process, this function receives three parameters: `item`, `addToCart`, `updateItems`. It should allow adding a bag or updating the quantity of the bag and should return the quantity and price of the bag. | `undefined`   |
| `clearOrderFormProfile`    | `function`         | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Function that remove info user from your cart                                                                                                 | `undefined`   |
| `skuSelectorProps`         | `SkuSelectorProps` | configurate sku selector                                                                                                                                                                                                                  | `undefined`   |

### Types

### `SkuSelectorProps` Type

| Property            | Type       | Description                     |
| ------------------- | ---------- | ------------------------------- |
| `visibleVariations` | `string[]` | list of variations name to show |
| `useImageInColor`   | `boolean`  | show image in color             |

### `ItemToAdd` Type

| Property   | Type             | Description     |
| ---------- | ---------------- | --------------- |
| `id`       | `number, string` | Sku ID          |
| `quantity` | `number`         | Quantity to add |
| `seller`   | `string`         | Seller ID       |

### `OrderForm` Type

| Property            | Type                                                          | Description                                                              |
| ------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `clientProfileData` | `ClientProfileData`                                           | Client information                                                       |
| `items`             | `Item[]`                                                      | Items added to cart                                                      |
| `totalizers`        | `Totalizer[]`                                                 | Totals                                                                   |
| `shippingData`      | `{ selectedAddress?: Address, addressAlternative?: Address }` | Information on the shipping method (address or pick up in store or more) |
| `value`             | `number`                                                      | Amount to be paid                                                        |
| `paymentData`       | `PaymentData`                                                 | Payment method information                                               |
| `messages`          | `Message[]`                                                   | Information, error, caution and more messages                            |
| `marketingData`     | `MarketingData`                                               | Marketing information                                                    |

### `ClientProfileData` Type

| Property | Type     | Description  |
| -------- | -------- | ------------ |
| `email`  | `string` | Client email |

### `Item` Type

| Property            | Type           | Description                                                      |
| ------------------- | -------------- | ---------------------------------------------------------------- |
| `uniqueId`          | `string`       | SKU Unique Id                                                    |
| `id`                | `string`       | SKU ID                                                           |
| `name`              | `string`       | Name SKU                                                         |
| `quantity`          | `number`       | Quantity to add                                                  |
| `sellingPrice`      | `number`       | Price in the seller                                              |
| `imageUrl`          | `string`       | URL image                                                        |
| `availability`      | `string`       | Enabled Product. Possible values are: `available`, `unavailable` |
| `index`             | `number`       | Position located in the cart                                     |
| `seller`            | `string`       | Seller ID                                                        |
| `offerings`         | `Offering[]`   | List of available services associated with the SKU               |
| `bundleItems`       | `BundleItem[]` | List of ??                                                       |
| `isGift`            | `boolean`      | Valid if the sku is a gift                                       |
| `price`             | `number`       | SKU price                                                        |
| `productCategories` | `any[]`        | Product categories                                               |
| `skuSpecifications` | `any[]`        | SKU specification list. Example: size, color                     |
| `listPrice`         | `number`       | List price ?? `(Optional)`                                       |

### `Offering` Type

| Property           | Type      | Description  |
| ------------------ | --------- | ------------ |
| `allowGiftMessage` | `boolean` | Message Gift |
| `id`               | `string`  | Offering ID  |
| `name`             | `string`  | Name         |
| `price`            | `number`  | Price        |
| `type`             | `string`  | Type         |

### `BundleItem` Type

| Property | Type     | Description    |
| -------- | -------- | -------------- |
| `id`     | `string` | Bundle item ID |
| `name`   | `string` | Name           |
| `price`  | `number` | Price          |

### `Totalizer` Type

| Property | Type     | Description                                      |
| -------- | -------- | ------------------------------------------------ |
| `id`     | `string` | Totalizer ID. Options `Items`, `Shipping`, `Tax` |
| `name`   | `string` | Totalizer name                                   |
| `value`  | `number` | Value                                            |

### `Address` Type

| Property         | Type             | Description                                             |
| ---------------- | ---------------- | ------------------------------------------------------- |
| `addressId`      | `string`         | Address identifier                                      |
| `addressType`    | `string`         | Type of address                                         |
| `city`           | `string`         | city                                                    |
| `complement`     | `string`         | Additional information about the location. `(Optional)` |
| `completed`      | `Boolean`        | Information completed                                   |
| `country`        | `string`         | Country                                                 |
| `geoCoordinates` | `GeoCoordinates` | Geo coordinates (latitude, longitude)                   |
| `isDisposable`   | `boolean`        | The location is available `(Optional)`                  |
| `neighborhood`   | `string`         | neighborhood                                            |
| `number`         | `string`         | Code `(Optional)` ??                                    |
| `postalCode`     | `string`         | Postal code                                             |
| `receiverName`   | `string`         | Name of the person who receives the purchase            |
| `reference`      | `string`         | Reference ?? `(Optional)`                               |
| `state`          | `string`         | State or department or province                         |
| `street`         | `string`         | Full address                                            |

### `GeoCoordinates` Type

| Property    | Type     | Description |
| ----------- | -------- | ----------- |
| `latitude`  | `string` | Latitude    |
| `longitude` | `string` | Longitude   |

### `PaymentData` Type

| Property                       | Type                  | Description                                                                              |
| ------------------------------ | --------------------- | ---------------------------------------------------------------------------------------- |
| `availablePaymentMethods`      | `PaymentMethod[]`     | User available payment methods                                                           |
| `selectedPaymentMethod`        | `PaymentMethod`       | Selected payment methods                                                                 |
| `paymentMethod`                | `PaymentMethod`       | Payment method information ??                                                            |
| `completed`                    | `boolean`             | Completed process ??                                                                     |
| `otherAvailablePaymentMethods` | `PaymentMethod[]`     | Other payment methods available to the user                                              |
| `bin`                          | `string`              | Get the first 5 digits of the credit card. (This only applies to payment by credit card) |
| `installmentOptions`           | `InstallmentOption[]` | List of fees with respect to credit cards enabled for the store.                         |

### `PaymentMethod` Type

| Property        | Type     | Description                                                                              |
| --------------- | -------- | ---------------------------------------------------------------------------------------- |
| `id`            | `string` | Credit card                                                                              |
| `gateway`       | `string` | ?? `(Optional)`                                                                          |
| `email`         | `string` | Email `(Optional)`                                                                       |
| `franchise`     | `string` | Franchise credit card. Example: visa                                                     |
| `number`        | `string` | Get the last 4 digits of the credit card. (This only applies to payment by credit card)  |
| `ccToken`       | `string` | Token ??                                                                                 |
| `paymentMethod` | `string` | Payment method                                                                           |
| `card`          | `string` | `(Optional)`                                                                             |
| `bin`           | `string` | Get the first 5 digits of the credit card. (This only applies to payment by credit card) |

### `InstallmentOption` Type

| Property       | Type            | Description                                                                              |
| -------------- | --------------- | ---------------------------------------------------------------------------------------- |
| `bin`          | `string`        | Get the first 5 digits of the credit card. (This only applies to payment by credit card) |
| `installments` | `Installment[]` | List of installments, their price in each installment and the total including interest   |
| `paymentName`  | `string`        | Payment method name                                                                      |
| `value`        | `number`        | Total purchase price paying with that franchise                                          |

### `Installment` Type

| Property | Type     | Description                                         |
| -------- | -------- | --------------------------------------------------- |
| `count`  | `number` | Installment number                                  |
| `value`  | `number` | Order value including interest depending on the fee |
| `total`  | `number` | Total price if you pay with that fee                |

### `Message` Type

| Property | Type     | Description |
| -------- | -------- | ----------- |
| `code`   | `string` | Code        |

### `MarketingData` Type

| Property | Type     | Description |
| -------- | -------- | ----------- |
| `coupon` | `string` | Coupon      |

### `CustomData` Type

| Property     | Type          | Description              |
| ------------ | ------------- | ------------------------ |
| `customApps` | `CustomApp[]` | Personalized information |

### `CustomApp` Type

| Property | Type               | Description                |
| -------- | ------------------ | -------------------------- |
| `id`     | `string`           | ID                         |
| `fields` | `CustomAppField[]` | Inputs to add in the store |
| `major`  | `number`           | Version or number ?        |

### `CustomAppField` Type

| Property | Type     | Description           |
| -------- | -------- | --------------------- |
| `key`    | `string` | Identification or key |
| `value`  | `string` | Description           |

### `Config` Type

| Property            | Type                      | Description                            |
| ------------------- | ------------------------- | -------------------------------------- |
| `bagId`             | `string`                  | If the store implements bag add the ID |
| `mainSellerId`      | `string`                  | Main seller id                         |
| `oneBagForProducts` | `number`                  | Number of bags per product             |
| `salesChannel`      | `string`                  | Channel identifier seller              |
| `productCategories` | `ProductCategoriesConfig` | Categories to apply the bag            |

### `ProductCategoriesConfig` Type

| Property          | Type       | Description                           |
| ----------------- | ---------- | ------------------------------------- |
| `market`          | `string[]` | List of market identifiers            |
| `healthAndBeauty` | `string[]` | List of health and beauty identifiers |

### `Product` Type

| Property            | Type                                                      | Description                                                             |
| ------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| `items`             | `ProductItem[]`                                           | Information of the items that this product contains. Example: SKUS      |
| `skuSpecifications` | `SkuSpecification[]`                                      | Information about SKUS specifications. Example: color, size             |
| `categories`        | `string[]`                                                | Information on categories and subcategories where the product is found. |
| `priceRange`        | `{ listPrice: { highPrice?: number, lowPrice: number } }` | It shows different price channels.                                      |

### `ProductItem` Type

| Property       | Type                                                                     | Description               |
| -------------- | ------------------------------------------------------------------------ | ------------------------- |
| `itemId`       | `string`                                                                 | Item identification       |
| `name`         | `string`                                                                 | Name                      |
| `images`       | `Image[]`                                                                | List of image information |
| `variations`   | `Array<{ name: string, values: string[] }>`                              | Variety of types          |
| `sellers`      | `Array<{ sellerDefault: boolean, commertialOffer: ProductItemSellers }>` | Distributions             |
| `nameComplete` | `string`                                                                 | Name                      |

### `Image` Type

| Property     | Type     | Description |
| ------------ | -------- | ----------- |
| `imageId`    | `string` |             |
| `imageLabel` | `string` |             |
| `imageTag`   | `string` |             |
| `imageUrl`   | `string` |             |
| `imageText`  | `string` |             |

### `ProductItemSellers` Type

| Property            | Type     | Description        |
| ------------------- | -------- | ------------------ |
| `Price`             | `number` | Price item         |
| `ListPrice`         | `number` | List price item    |
| `AvailableQuantity` | `number` | Quantity available |

### `SkuSpecification` Type

| Property | Type                       | Description                   |
| -------- | -------------------------- | ----------------------------- |
| `field`  | `SkuSpecificationField`    | Information specification SKU |
| `values` | `SkuSpecificationValues[]` | Information specification SKU |

### `SkuSpecificationField` Type

| Property       | Type     | Description |
| -------------- | -------- | ----------- |
| `name`         | `string` |             |
| `originalName` | `string` |             |

### `SkuSpecificationValues` Type

| Property       | Type     | Description |
| -------------- | -------- | ----------- |
| `name`         | `string` |             |
| `originalName` | `string` |             |

### `Runtime` Type

| Property    | Type     | Description                                    |
| ----------- | -------- | ---------------------------------------------- |
| `account`   | `string` | Vtex account                                   |
| `workspace` | `string` | Vtex workspace                                 |
| `platform`  | `string` | Vtex platform. . Options `vtex-io`, `vtex-cms` |

```tsx
import React, { Component } from 'react'

import { Kuikpay, KuikpayWrapper } from 'kuikpay-sdk'
import 'kuikpay-sdk/dist/index.css'

class Example extends Component {
  render() {
    return (
      <Kuikpay {...props} />
      <KuikpayWrapper {...props} />
    )
  }
}
```

## License

MIT © [](https://github.com/)
