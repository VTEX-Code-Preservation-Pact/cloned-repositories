# Template App

This app and all affiliated services are provided “as is”, without warranty of any kind, either express or implied. Neither the publisher nor its partners, affiliates, employees, or contractors guarantee that this app will meet your requirements, provide uninterrupted use, or operate without delay or without error. Neither the publisher nor its partners, affiliates, employees, or contractors assume any responsibility for any errors and malfunctions within the app and will not provide support or maintenance of any kind.

All provisions and warranties of any kind, express or implied, including but not limited to any guarantees of performance, process integrity, or particular functionalities, are hereby disclaimed and excluded unless otherwise prohibited or restricted by applicable law.

# RelevanC

### What is RelevanC

RelevanC is an ad-tech SaaS provider based in Paris, France. It markets a customised retail media solution under a white label to retailers and advertisers worldwide. With Sponsored Products for marketplaces, it combines truly relevant ads and maximum reach using advanced AI for the best of both worlds.

### RelevanC integration

#### Search results and category pages

Using VTEX Intelligent Search Middleware feature, this integration connects to RelevanC AdServer to get Sponsored Products to promote them in the search results and the category[^1] pages.

---

### Integration Setup

_Note: You must already have a RelevanC account set up and ready._

After the app is installed on your VTEX account, you can set it up following these steps.

#### Categories Map

The integration makes use of a categories map that is generated from the account's catalog to improve performance. This categories map is necessary for the integration to work.

You can check and generate/update this categories map using the following endpoint[^2].

- Check the categories map

```
GET https://app.io.vtex.com/vtex.relevanc/v0/{{account}}/{{workspace}}/_v/relevanc/categories-map
```

- Generate/update the categories map:

```
PUT https://app.io.vtex.com/vtex.relevanc/v0/{{account}}/{{workspace}}/_v/relevanc/categories-map
```

#### Integration settings

You can customize the behaviour for the integration using the following settings:

| Property name                                      | Description                                                                                                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RelevanC AdServer name <br /> (`adServerName`)     | This is the name of RelevanC's AdServer (without `ads.peps.relevanc.io`)                                                                                |
| Product property <br /> (`boostType`)              | Product property to use to add/promote the products returned from the AdServer                                                                          |
| Max number of offers <br /> (`maxOffersToDisplay`) | Maximum number of products to be added to the search results                                                                                            |
| Add all products <br />(`addAllProducts`)          | By default, only products that are part of the search results are promoted. Check to add all products returned by the AdServer to the search result[^3] |

[^1]: Category pages that use collections or are custom are not supported.
[^2]: This endpoints is private and requires the `vtexIdClientAutCookie` header.
[^3]: Only supported for search page.
