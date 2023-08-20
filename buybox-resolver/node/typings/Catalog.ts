interface SearchProduct {
  productId: string
  productName: string
  brand: string
  brandId: number
  linkText: string
  productReference: string
  categoryId: string
  productTitle: string
  metaTagDescription: string
  clusterHighlights: Record<string, string>
  productClusters: Record<string, string>
  searchableClusters: Record<string, string>
  categories: string[]
  categoriesIds: string[]
  link: string
  description: string
  items: SearchItem[]
  itemMetadata: {
    items: SearchMetadataItem[]
  }
  titleTag: string
  Specifications?: string[]
  allSpecifications?: string[]
  allSpecificationsGroups?: string[]
  completeSpecifications?: CompleteSpecification[]
  skuSpecifications?: SkuSpecification[]
}

interface SearchItem {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: Array<{ Key: string; Value: string }>
  measurementUnit: string
  unitMultiplier: number
  modalType: any | null
  images: SearchImage[]
  Videos: string[]
  variations: string[]
  sellers: Seller[]
  attachments: Array<{
    id: number
    name: string
    required: boolean
    domainValues: string
  }>
  isKit: boolean
  kitItems?: Array<{
    itemId: string
    amount: number
  }>
}

interface CompleteSpecification {
  Values: Array<{
    Id: string
    Position: number
    Value: string
  }>
  Name: string
  Position: number
  IsOnProductDetails: boolean
  FieldId: string
}

interface SkuSpecification {
  field: SKUSpecificationField
  values: SKUSpecificationValue[]
}

interface SKUSpecificationField {
  name: string
  id: string
}

interface SKUSpecificationValue {
  name: string
  id: string
  fieldId: string
}

interface SearchImage {
  imageId: string
  imageLabel: string | null
  imageTag: string
  imageUrl: string
  imageText: string
}

interface SearchInstallment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

interface CommertialOffer {
  DeliverySlaSamplesPerRegion: Record<
    string,
    { DeliverySlaPerTypes: any[]; Region: any | null }
  >
  Installments: SearchInstallment[]
  DiscountHighLight: any[]
  GiftSkuIds: string[]
  Teasers: any[]
  BuyTogether: any[]
  ItemMetadataAttachment: any[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  Tax: number
  DeliverySlaSamples: Array<{
    DeliverySlaPerTypes: any[]
    Region: any | null
  }>
  GetInfoErrorMessage: any | null
  CacheVersionUsedToCallCheckout: string
}

interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}
