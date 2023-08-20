# Affiliates Program

Affiliates app allows your store to work with a partner structure. The app creates affiliates stores, that has an access page and url parameter for them to share with their clients. When something is bought, it generates a commission related to their clients purchase.
The app also adds configuration and management pages for the store owner and affiliates as well.

![Affiliate page](https://user-images.githubusercontent.com/53904010/192868993-8967062b-b140-4d0e-95e1-b5c3c4e9f79a.png)<br/>
_**Example of an affiliate page**_<br/>
This is the main page that will be shared by the affiliate with their clients. It's a page that can be customized to show some products and guide the customer.
<br/>
<br/>

## Configuration

5. Your affiliates can send any URL with the parameter **targeting** with their slug as value, it will adds this affiliate information to be linked to the purchase

| Example URL                                           | Behavior                                                       |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| https://mystore.com/product/p                         | Just a simple product URL                                      |
| https://mystore.com/product/p?targeting=affiliateName | URL with the parameter, will link this client to the affiliate |

6. If you want to change the parameter that will be used for the affiliate to share, you can edit the parameter property from the `Affiliate Monitoring` block inside the Site Editor.

![Parameter Editing](https://user-images.githubusercontent.com/53904010/191607498-a58c11ba-57f9-4d1c-aa65-b3d4c82c0c90.png)

> ℹ️ \_After the affiliate send their URL for the client, their Affiliate ID will be linked to this client for some time and will be prioritized even if another Affiliate send an URL to the same client, the time the Affiliate ID usually persists is 60 days

## Advanced configurations

According to the Affiliate app composition, the `/affiliates/:slug` page can be highly customizable using other blocks. Currently, its default implementation is as follows:

`store.affiliates` interface for the route `/affiliates/:slug`

**store.affiliates**

```json
{
  "store.affiliates": {
    "blocks": ["affiliate-validator"]
  },

  "affiliate-validator": {
    "props": {
      "Valid": "affiliate-template",
      "Invalid": "affiliate-invalid-template"
    }
  },

  "affiliate-template": {
    "children": [
      "affiliate-store-name",
      "flex-layout.row#banner",
      "affiliate-profile-button",
      "search-result-layout.customQuery#affiliate"
    ]
  },

  "flex-layout.row#banner": {
    "children": ["image#affiliate-banner"]
  },

  "image#affiliate-banner": {
    "props": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/400px-VTEX_Logo.svg.png"
    }
  },

  "search-result-layout.customQuery#affiliate": {
    "props": {
      "querySchema": {
        "skusFilter": "ALL_AVAILABLE",
        "simulationBehavior": "default",
        "queryField": "137",
        "mapField": "productClusterIds",
        "facetsBehavior": "Dynamic"
      }
    },
    "blocks": [
      "search-result-layout.desktop",
      "search-result-layout.mobile",
      "search-not-found-layout"
    ]
  },

  "affiliate-invalid-template": {
    "children": ["rich-text#invalid-affiliate"]
  },

  "rich-text#invalid-affiliate": {
    "props": {
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "text": "**Affiliate does not exist or has not been approved**",
      "font": "t-heading-1"
    }
  }
}
```

## Customization

In order to apply CSS customizations to this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles              |
| ------------------------ |
| `affiliateStoreName`     |
| `affiliateProfileDetails`  |
| `profileButtonContainer` |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
