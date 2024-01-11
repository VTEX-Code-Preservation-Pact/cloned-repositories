import PropTypes from 'prop-types'

const { array, arrayOf, number, string, shape, bool } = PropTypes

const additionalInfoShape = shape({
  brandName: string,
  brandId: string,
  offeringInfo: string,
  offeringType: string,
  offeringTypeId: string,
})

export const itemShape = shape({
  additionalInfo: additionalInfoShape,
  attachmentOfferings: array,
  attachments: array,
  availability: string,
  bundleItems: array,
  components: array,
  detailUrl: string,
  ean: string,
  id: string,
  imageUrl: string.isRequired,
  index: number,
  isGift: bool,
  listPrice: number,
  manualPrice: number,
  measurementUnit: string,
  modalType: string,
  name: string.isRequired,
  offerings: array,
  orderRewardStatus: string,
  preSaleDate: string,
  price: number,
  priceTags: array,
  priceValidUntil: string,
  productCategories: shape({
    1: string,
    2: string,
    3: string,
  }),
  productCategoryIds: string,
  productId: string,
  quantity: number,
  refId: string,
  rewardValue: number,
  seller: string,
  sellerChain: arrayOf(string),
  sellingPrice: number,
  skuName: string,
  tax: number,
  uniqueId: string.isRequired,
  unitMultiplier: number,
})
