# Root object fields

The FastStore API provides access to additional data fields that are not included in the [native FastStore GraphQL schema](/reference/api/queries). These fields can be accessed through the root object of each query. You can find more information on the available fields below.

:::caution
Keep in mind that the fields below may not be available in the [native FastStore GraphQL schema](/reference/api/queries). To use the ones that are not available in the native schema, you must [extend the schema](/how-to-guides/faststore-api/extending-the-faststore-api).

Learn more about how you can [use the root object fields in your storefront](/how-to-guides/faststore-api/extending-the-faststore-api#using-root-object-fields).
:::

## Product query root

See below the root fields available on the `product` FastStore API Product query.

### Root (Product)

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Videos</td>
      <td>[String]</td>
      <td>An array of video URLs related to the item.</td>
    </tr>
    <tr>
      <td>attachments</td>
      <td>[<a href="#attachment">Attachment</a>]</td>
      <td>An array of attachments related to the item.</td>
    </tr>
    <tr>
      <td>attachmentsValues</td>
      <td>[<a href="#attachment">Attachment</a>] or undefined</td>
      <td>An array of attachments values related to the item or undefined if there are no attachments.</td>
    </tr>
    <tr>
      <td>complementName</td>
      <td>String</td>
      <td>The complement name of the item.</td>
    </tr>
    <tr>
      <td>ean</td>
      <td>String</td>
      <td>The EAN (European Article Number) of the item.</td>
    </tr>
    <tr>
      <td>images</td>
      <td>[<a href="#image">Image</a>]</td>
      <td>An array of images related to the item.</td>
    </tr>
    <tr>
      <td>isKit</td>
      <td>Boolean</td>
      <td>Indicates whether the item is a kit or not.</td>
    </tr>
    <tr>
      <td>isVariantOf</td>
      <td><a href="#product">Product</a></td>
      <td>The product that this item is a variant of.</td>
    </tr>
    <tr>
      <td>itemId</td>
      <td>String</td>
      <td>The unique identifier of the item.</td>
    </tr>
    <tr>
      <td>kitItems</td>
      <td>[<a href="#kititem">KitItem</a>] or undefined</td>
      <td>An array of associated kit items or undefined if the item is not a kit.</td>
    </tr>
    <tr>
      <td>measurementUnit</td>
      <td>String</td>
      <td>The measurement unit of the item.</td>
    </tr>
    <tr>
      <td>modalType</td>
      <td>any</td>
      <td>The modal type of the item.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>The name of the item.</td>
    </tr>
    <tr>
      <td>nameComplete</td>
      <td>String</td>
      <td>The complete name of the item.</td>
    </tr>
    <tr>
      <td>referenceId</td>
      <td>[<a href="#referenceid">ReferenceId</a>]</td>
      <td>An array of reference IDs related to the item.</td>
    </tr>
    <tr>
      <td>sellers</td>
      <td>[<a href="#seller">Seller</a>]</td>
      <td>An array of sellers that sell the item.</td>
    </tr>
    <tr>
      <td>unitMultiplier</td>
      <td>Number</td>
      <td>The unit multiplier of the item.</td>
    </tr>
    <tr>
      <td>variations</td>
      <td>[Variation]</td>
      <td>An array of variations related to the item.</td>
    </tr>
  </tbody>
</table>

### Attachment

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>Number</td>
      <td>A unique identifier for the attachment.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>The name of the attachment.</td>
    </tr>
    <tr>
      <td>required</td>
      <td>Boolean</td>
      <td>Specifies whether the attachment is required or optional.</td>
    </tr>
    <tr>
      <td>domainValues</td>
      <td>String</td>
      <td>Domain values of the attachment.</td>
    </tr>
  </tbody>
</table>

### Image

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>imageId</td>
      <td>String</td>
      <td>A unique identifier for the image.</td>
    </tr>
    <tr>
      <td>imageLabel</td>
      <td>String</td>
      <td>A descriptive label for the image.</td>
    </tr>
    <tr>
      <td>imageTag</td>
      <td>String</td>
      <td>A tag or keyword associated with the image.</td>
    </tr>
    <tr>
      <td>imageText</td>
      <td>String</td>
      <td>Text associated with the image, such as a caption or description.</td>
    </tr>
    <tr>
      <td>imageUrl</td>
      <td>String</td>
      <td>The URL where the image can be accessed.</td>
    </tr>
  </tbody>
</table>

### Product

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>brand</td>
      <td>String</td>
      <td>The name of the product brand.</td>
    </tr>
    <tr>
      <td>brandId</td>
      <td>Number</td>
      <td>The unique identifier of the brand.</td>
    </tr>
    <tr>
      <td>cacheId</td>
      <td>String or undefined</td>
      <td>The unique identifier of the cached product.</td>
    </tr>
    <tr>
      <td>categories</td>
      <td>[String]</td>
      <td>The list of categories that the product belongs to.</td>
    </tr>
    <tr>
      <td>categoriesIds</td>
      <td>[String]</td>
      <td>The list of category IDs that the product belongs to.</td>
    </tr>
    <tr>
      <td>categoryId</td>
      <td>String</td>
      <td>The ID of the primary category that the product belongs to.</td>
    </tr>
    <tr>
      <td>clusterHighlights</td>
      <td>Record&lt;String, any&gt;</td>
      <td>Cluster highlights associated with the product.</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String</td>
      <td>The description of the product.</td>
    </tr>
    <tr>
      <td>items</td>
      <td>[Item]</td>
      <td>The list of items associated with the product.</td>
    </tr>
    <tr>
      <td>link</td>
      <td>String</td>
      <td>The link to the product page.</td>
    </tr>
    <tr>
      <td>linkText</td>
      <td>String</td>
      <td>The text for the link to the product page.</td>
    </tr>
    <tr>
      <td>priceRange</td>
      <td><a href="#pricerange">PriceRange</a></td>
      <td>The price range of the product.</td>
    </tr>
    <tr>
      <td>productClusters</td>
      <td>Record&lt;String, String&gt;</td>
      <td>The list of product clusters associated with the product.</td>
    </tr>
    <tr>
      <td>productId</td>
      <td>String</td>
      <td>The unique identifier of the product.</td>
    </tr>
    <tr>
      <td>productName</td>
      <td>String</td>
      <td>The name of the product.</td>
    </tr>
    <tr>
      <td>productReference</td>
      <td>String</td>
      <td>The reference code of the product.</td>
    </tr>
    <tr>
      <td>properties</td>
      <td>[<a href="#property">Property</a>]</td>
      <td>The list of properties associated with the product.</td>
    </tr>
    <tr>
      <td>releaseDate</td>
      <td>String</td>
      <td>The release date of the product.</td>
    </tr>
    <tr>
      <td>selectedProperties</td>
      <td>[<a href="#property">Property</a>]</td>
      <td>The list of selected properties associated with the product.</td>
    </tr>
    <tr>
      <td>skuSpecifications</td>
      <td>[<a href="#skuspecification">SkuSpecification</a>] or undefined</td>
      <td>The list of SKU specifications associated with the product or undefined if there are no specifications.</td>
    </tr>
    <tr>
      <td>specificationGroups</td>
      <td>[SpecificationGroup]</td>
      <td>The list of specification groups associated with the product.</td>
    </tr>
  </tbody>
</table>

### PriceRange

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>listPrice</td>
      <td><a href="#price">Price</a></td>
      <td>The original or suggested price of the product.</td>
    </tr>
    <tr>
      <td>sellingPrice</td>
      <td><a href="#price">Price</a></td>
      <td>The current selling price of the product.</td>
    </tr>
  </tbody>
</table>

### Price

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>highPrice</td>
      <td>Number or null</td>
      <td>The highest price available for the product or service, or null if not available.</td>
    </tr>
    <tr>
      <td>lowPrice</td>
      <td>Number or null</td>
      <td>The lowest price available for the product or service, or null if not available.</td>
    </tr>
  </tbody>
</table>

### Property

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>The name of the property.</td>
    </tr>
    <tr>
      <td>values</td>
      <td>[String]</td>
      <td>The possible values that the property can have.</td>
    </tr>
  </tbody>
</table>

### SkuSpecification

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>field</td>
      <td><a href="#skuspecificationfield">SKUSpecificationField</a></td>
      <td>SKU specification field object.</td>
    </tr>
    <tr>
      <td>value</td>
      <td>[<a href="#skuspecificationvalue">SKUSpecificationValue</a>]</td>
      <td>Values associated with the SKU specification field.</td>
    </tr>
  </tbody>
</table>

### SKUSpecificationField

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>String or undefined</td>
      <td>The unique identifier for the SKU specification.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>The name of the SKU specification.</td>
    </tr>
    <tr>
      <td>originalName</td>
      <td>String or undefined</td>
      <td>The original name of the SKU specification before any modifications.</td>
    </tr>
  </tbody>
</table>

### SKUSpecificationValue

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fieldId</td>
      <td>String or undefined</td>
      <td>The unique identifier for the field associated with the SKU specification value.</td>
    </tr>
    <tr>
      <td>id</td>
      <td>String or undefined</td>
      <td>The unique identifier for the SKU specification value.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>The name of the SKU specification value.</td>
    </tr>
    <tr>
      <td>originalName</td>
      <td>String or undefined</td>
      <td>The original name of the SKU specification value before any modifications were made.</td>
    </tr>
  </tbody>
</table>

### KitItem

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>itemId</td>
      <td>String</td>
      <td>Unique identifier for the kit item.</td>
    </tr>
    <tr>
      <td>amount</td>
      <td>Number</td>
      <td>The quantity of the kit item included in the kit.</td>
    </tr>
  </tbody>
</table>

### ReferenceId

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Key</td>
      <td>String</td>
      <td>The unique identifier for the reference.</td>
    </tr>
    <tr>
      <td>Value</td>
      <td>String</td>
      <td>The value associated with the reference.</td>
    </tr>
  </tbody>
</table>

### Seller

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>addToCartLink</td>
      <td>String</td>
      <td>The URL to add the product to cart for this seller.</td>
    </tr>
    <tr>
      <td>comertialOffer</td>
      <td><a href="#comertialoffer">ComertialOffer</a></td>
      <td>The commercial offer details for this seller.</td>
    </tr>
    <tr>
      <td>sellerDefault</td>
      <td>Boolean</td>
      <td>Indicates whether this seller is the default seller for the product.</td>
    </tr>
    <tr>
      <td>sellerId</td>
      <td>String</td>
      <td>The unique identifier of the seller.</td>
    </tr>
    <tr>
      <td>sellerName</td>
      <td>String</td>
      <td>The name of the seller.</td>
    </tr>
  </tbody>
</table>

### ComertialOffer

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AvailableQuantity</td>
      <td>Number</td>
      <td>The quantity of this item that is available for purchase.</td>
    </tr>
    <tr>
      <td>BuyTogether</td>
      <td>[Any]</td>
      <td>An array of items that can be purchased together with this item.</td>
    </tr>
    <tr>
      <td>CacheVersionUsedToCallCheckout</td>
      <td>String</td>
      <td>The version of the cache used to call the checkout API.</td>
    </tr>
    <tr>
      <td>DeliverySlaSamples</td>
      <td>[<a href="#deliveryslasample">DeliverySlaSample</a>]</td>
      <td>An array of delivery SLA (Service Level Agreement) samples for this item.</td>
    </tr>
    <tr>
      <td>DeliverySlaSamplesPerRegion</td>
      <td>Record&lt;string, DeliverySlaSamples&gt;</td>
      <td>Delivery SLA samples for this item per region.</td>
    </tr>
    <tr>
      <td>DiscountHighLight</td>
      <td>Array of any</td>
      <td>An array of discount highlights for this item.</td>
    </tr>
    <tr>
      <td>GetInfoErrorMessage</td>
      <td>Any</td>
      <td>An error message returned when trying to get information about this item.</td>
    </tr>
    <tr>
      <td>GiftSkuIds</td>
      <td>[String]</td>
      <td>An array of SKU (Stock Keeping Unit) IDs for gift items associated with this item.</td>
    </tr>
    <tr>
      <td>Installments</td>
      <td>[<a href="#installment">Installment</a>]</td>
      <td>An array of installment options available for this item.</td>
    </tr>
    <tr>
      <td>ItemMetadataAttachment</td>
      <td>[Any]</td>
      <td>An array of item metadata attachments for this item.</td>
    </tr>
    <tr>
      <td>ListPrice</td>
      <td>Number</td>
      <td>The list price of this item.</td>
    </tr>
    <tr>
      <td>Price</td>
      <td>Number</td>
      <td>The price of this item.</td>
    </tr>
    <tr>
      <td>PriceValidUntil</td>
      <td>String</td>
      <td>The date until which the price of this item is valid.</td>
    </tr>
    <tr>
      <td>PriceWithoutDiscount</td>
      <td>Number</td>
      <td>The price of this item without any discounts applied.</td>
    </tr>
    <tr>
      <td>RewardValue</td>
      <td>Number</td>
      <td>The reward value for this item.</td>
    </tr>
    <tr>
      <td>Tax</td>
      <td>Number</td>
      <td>The tax applied to the price of this item.</td>
    </tr>
    <tr>
      <td>Teasers</td>
      <td>Array of Record&lt;string, unknown&gt;</td>
      <td>An array of teaser information for this item.</td>
    </tr>
    <tr>
      <td>spotPrice</td>
      <td>Number</td>
      <td>The spot price of this item.</td>
    </tr>
    <tr>
      <td>teasers</td>
      <td>[Record&lt;string, unknown&gt;] or undefined</td>
      <td>An array of teaser information for this item or undefined if there are no teasers available.</td>
    </tr>
  </tbody>
</table>

### DeliverySlaSample

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DeliverySlaPerTypes</td>
      <td>[Any]</td>
      <td>An array of delivery service level agreements (SLAs) for different types of deliveries.</td>
    </tr>
    <tr>
      <td>Region</td>
      <td>Any</td>
      <td>The region where the delivery service is available.</td>
    </tr>
  </tbody>
</table>

### Installments

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>InterestRate</td>
      <td>Number</td>
      <td>The interest rate for the installment plan.</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>String</td>
      <td>The name of the installment plan.</td>
    </tr>
    <tr>
      <td>NumberOfInstallments</td>
      <td>Number</td>
      <td>The number of installments in the plan.</td>
    </tr>
    <tr>
      <td>PaymentSystemGroupName</td>
      <td>String</td>
      <td>The name of the payment system group associated with the installment plan.</td>
    </tr>
    <tr>
      <td>PaymentSystemName</td>
      <td>String</td>
      <td>The name of the payment system associated with the installment plan.</td>
    </tr>
    <tr>
      <td>TotalValuePlusInterestRate</td>
      <td>Number</td>
      <td>The total value of the purchase including the interest rate for the installment plan.</td>
    </tr>
    <tr>
      <td>Value</td>
      <td>Number</td>
      <td>The value of each installment in the plan.</td>
    </tr>
  </tbody>
</table>

## All products query root

The `allProducts` query root object contains the [native schema product query fields](/reference/api/queries/product) and the [product query root fields](#product-query-root) detailed above.

## Collection query root

See below the root fields available on the `collection` FastStore API Product query. Since collections may have different types, there are different fields associated with each of them: [Brand](#root-brand), [CategoryTree](#root-categorytree), and [CollectionPageType](#root-collectionpagetype).

### Root (Brand)

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>Number</td>
      <td>A unique identifier for the brand.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>The name of the brand.</td>
    </tr>
    <tr>
      <td>isActive</td>
      <td>Boolean</td>
      <td>Indicates whether the brand is currently active or not.</td>
    </tr>
    <tr>
      <td>title</td>
      <td>String</td>
      <td>The title of the brand, used for SEO purposes.</td>
    </tr>
    <tr>
      <td>metaTagDescription</td>
      <td>String</td>
      <td>The meta tag description for the brand, used for SEO purposes.</td>
    </tr>
    <tr>
      <td>imageURL</td>
      <td>String or null</td>
      <td>The URL of the brand image, if available.</td>
    </tr>
  </tbody>
</table>

### Root (CategoryTree)

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MetaTagDescription</td>
      <td>String</td>
      <td>The meta tag description for the category page.</td>
    </tr>
    <tr>
      <td>Title</td>
      <td>String</td>
      <td>The title of the category page.</td>
    </tr>
    <tr>
      <td>children</td>
      <td>[<a href="#root-categorytree">CategoryTree</a>]</td>
      <td>An array of child categories for the current category.</td>
    </tr>
    <tr>
      <td>haschildren</td>
      <td>Boolean</td>
      <td>A flag indicating whether the current category has child categories.</td>
    </tr>
    <tr>
      <td>id</td>
      <td>String</td>
      <td>The unique identifier for the category.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>The name of the category.</td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>The URL of the category page.</td>
    </tr>
  </tbody>
</table>

### Root (CollectionPageType)

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>Number</td>
      <td>A unique identifier for the collection page.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>The name of the collection page.</td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>The URL of the collection page.</td>
    </tr>
    <tr>
      <td>title</td>
      <td>String</td>
      <td>The title of the collection page.</td>
    </tr>
    <tr>
      <td>MetaTagDescription</td>
      <td>String</td>
      <td>The meta tag description of the collection page.</td>
    </tr>
    <tr>
      <td>pageType</td>
      <td>String</td>
      <td>The type of the collection page.</td>
    </tr>
  </tbody>
</table>

## All collections query root

The `allCollections` query root object contains the [native schema collection query fields](/reference/api/queries/collection) and the [collection query root fields](#collection-query-root) detailed above.

## Search query root

See below the root fields available on the `search` FastStore API Product query.

### Root (Search)

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>productSearchPromise</td>
      <td>Promise&lt;<a href="#productsearchresult">ProductSearchResult</a>&gt;</td>
      <td>A promise that resolves to the search results for a product.</td>
    </tr>
    <tr>
      <td>searchArgs</td>
      <td>Omit&lt;<a href="#searchargs">SearchArgs</a>, 'type'&gt;</td>
      <td>The search arguments used to filter and sort the product search results.</td>
    </tr>
  </tbody>
</table>

### ProductSearchResult

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>correction</td>
      <td><a href="#correction">Correction</a> or undefined</td>
      <td>Specifies whether a correction was made to the search query, or if it is undefined.</td>
    </tr>
    <tr>
      <td>fuzzy</td>
      <td>String</td>
      <td>Fuzzy search term used in the query.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>String</td>
      <td>Locale used for the search query.</td>
    </tr>
    <tr>
      <td>operator</td>
      <td>String</td>
      <td>Operator used in the search query.</td>
    </tr>
    <tr>
      <td>options</td>
      <td><a href="#options">Options</a></td>
      <td>Search options used in the query.</td>
    </tr>
    <tr>
      <td>pagination</td>
      <td><a href="#pagination">Pagination</a></td>
      <td>Pagination settings used for the search results.</td>
    </tr>
    <tr>
      <td>products</td>
      <td>[<a href="#product">Product</a>]</td>
      <td>Contains an array of product objects that match the search query.</td>
    </tr>
    <tr>
      <td>query</td>
      <td>String</td>
      <td>Original search query string.</td>
    </tr>
    <tr>
      <td>recordsFiltered</td>
      <td>Number</td>
      <td>Specifies the total number of products that match the search query.</td>
    </tr>
    <tr>
      <td>sampling</td>
      <td>Boolean</td>
      <td>Indicates whether the search results are a random sample of the total matching products.</td>
    </tr>
    <tr>
      <td>translated</td>
      <td>Boolean</td>
      <td>Indicates whether the search query was automatically translated.</td>
    </tr>
  </tbody>
</table>

### Correction

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>misspelled</td>
      <td>Boolean</td>
      <td>A flag indicating whether a word is misspelled or not.</td>
    </tr>
  </tbody>
</table>

### Options

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>counts</td>
      <td>[<a href="#count">Count</a>]</td>
      <td>An array of counts that represent the number of items in a search.</td>
    </tr>
    <tr>
      <td>sorts</td>
      <td>[<a href="#sort">Sort</a>]</td>
      <td>An array of sorts that represent the sorting options available for a search.</td>
    </tr>
  </tbody>
</table>

### Count

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>count</td>
      <td>Number</td>
      <td>The number of items in the search that the API endpoint is returning.</td>
    </tr>
    <tr>
      <td>proxyURL</td>
      <td>String</td>
      <td>A URL that can be used to retrieve the same resource through a proxy server.</td>
    </tr>
  </tbody>
</table>

### Sort

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>active</td>
      <td>Boolean or undefined</td>
      <td>Determines if the sorting feature is active or not.</td>
    </tr>
    <tr>
      <td>field</td>
      <td>String</td>
      <td>Field to be sorted.</td>
    </tr>
    <tr>
      <td>order</td>
      <td>String</td>
      <td>Specifies the order in which the data should be sorted.</td>
    </tr>
    <tr>
      <td>proxyURL</td>
      <td>String</td>
      <td>Specifies the URL of the proxy server to be used for sorting.</td>
    </tr>
  </tbody>
</table>

### Pagination

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>after</td>
      <td>[<a href="#page">Page</a>]</td>
      <td>Array of pages after the current page.</td>
    </tr>
    <tr>
      <td>before</td>
      <td>[<a href="#page">Page</a>]</td>
      <td>Array of pages before the current page.</td>
    </tr>
    <tr>
      <td>count</td>
      <td>Number</td>
      <td>The total number of items across all pages.</td>
    </tr>
    <tr>
      <td>current</td>
      <td>Page</td>
      <td>Information about the current page.</td>
    </tr>
    <tr>
      <td>first</td>
      <td><a href="#page">Page</a></td>
      <td>Information about the first page.</td>
    </tr>
    <tr>
      <td>last</td>
      <td><a href="#page">Page</a></td>
      <td>Information about the last page.</td>
    </tr>
    <tr>
      <td>next</td>
      <td>Page</td>
      <td>Information about next page.</td>
    </tr>
    <tr>
      <td>perPage</td>
      <td>Number</td>
      <td>The number of items per page.</td>
    </tr>
    <tr>
      <td>previous</td>
      <td><a href="#page">Page</a></td>
      <td>Information about the previous page.</td>
    </tr>
  </tbody>
</table>

### Page

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>index</td>
      <td>Number</td>
      <td>The index of the item in the list.</td>
    </tr>
    <tr>
      <td>proxyURL</td>
      <td>String</td>
      <td>The URL of the proxy server to be used.</td>
    </tr>
  </tbody>
</table>

### searchArgs

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>count</td>
      <td>Number</td>
      <td>The number of search results to return. </td>
    </tr>
    <tr>
      <td>fuzzy</td>
      <td>String or undefined</td>
      <td>A string used for fuzzy search.</td>
    </tr>
    <tr>
      <td>hideUnavailableItems</td>
      <td>Boolean or undefined</td>
      <td>Indicates whether unavailable items should be hidden. </td>
    </tr>
    <tr>
      <td>page</td>
      <td>Number</td>
      <td>The page number of the search results to return. </td>
    </tr>
    <tr>
      <td>query</td>
      <td>String or undefined</td>
      <td>A string used for keyword search. </td>
    </tr>
    <tr>
      <td>selectedFacets</td>
      <td>[<a href="#selectedfacet">SelectedFacet</a>] or undefined</td>
      <td>An array of selected facets used to filter the search results. </td>
    </tr>
    <tr>
      <td>sort</td>
      <td><a href="#sort">Sort</a> or undefined</td>
      <td>A sort object used to sort the search results. </td>
    </tr>
  </tbody>
</table>

### SelectedFacet

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>key</td>
      <td>String</td>
      <td>The name of the selected facet.</td>
    </tr>
    <tr>
      <td>value</td>
      <td>String</td>
      <td>The value of the selected facet.</td>
    </tr>
  </tbody>
</table>
