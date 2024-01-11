import isString from 'lodash/isString'

export function isFromCurrentSeller({ items, li, seller, sellerId }) {
  const localSellerId = isString(sellerId) ? sellerId : seller && seller.id
  return (
    li && items[li.itemIndex] && items[li.itemIndex].seller === localSellerId
  )
}
