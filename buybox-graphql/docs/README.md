# Buybox GraphQL

This app exports a GraphQL schema to sort sellers on [buybox-context](https://github.com/vtex-apps/buybox-context).

### Installation

To use it in your app, add the following dependency in the `manifest.json` file:
```json
  "dependencies": {
    "vtex.buybox-graphql": "0.x"
  }
```

> This app is used on [buybox-context](https://github.com/vtex-apps/buybox-context), but do you may then use it in your front end component as well.

To resolve this query, you must have installed in your workspace an app that implements the GraphQL interface. Currently, those are the available resolvers:

- [buybox-resolver](https://github.com/vtex-apps/buybox-resolver)

> 📣 Having zero or more than one resolver installed will result in an error.

### Examples

Using this resolver do you can provide informations about the `Product` and `Shipping` to get an array with sorted sellers. The array returned is a list of `sellerId`.

```graphql
query SortSellersProtocol {
  sortSellers(skuId: "33", postalCode: "00000000", country: "BRA", salesChannel: 1) {
    sellers
  }
}
```

This returns sellers id's inside the `Product`. Here's a possible response for the execution of this query:

```graphql
{
  "data": {
    "sortSellers": {
      sellers: ["seller1", "seller3", "seller4", "otherSeller"]
    }
  }
}
```
