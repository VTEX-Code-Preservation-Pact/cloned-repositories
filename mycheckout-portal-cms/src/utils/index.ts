export const CONSTANTS = {
  workspace: 'master',
  platform: 'vtex-cms',
}

export const useRender = () => {
  const elements = Array.from(document.getElementsByClassName('kuikpay'))
  const undockedElements = Array.from(
    document.getElementsByClassName('kuikpay-undocked')
  )

  const item = document.getElementById('kuikpay')
  const wrapper = document.getElementById('kuikpayWrapper')
  const items = elements.map((e) => e.id.split('-')[1])

  return {
    elements,
    item,
    wrapper,
    items,
    undockedElements,
  }
}

export const formatItems = (product: any, itemId: any) => {
  const selectedItem = product.items.find(
    (itemInfo: any) => itemInfo.itemId === itemId
  )

  const itemsFormatted = product?.items?.map((sku: any) => {
    const variations = sku?.variations?.map((variation: any) => {
      return {
        name: variation,
        values: sku[variation],
      }
    })

    return {
      ...sku,
      variations,
    }
  })

  const variations = selectedItem?.variations?.map((variation: any) => {
    return {
      name: variation,
      values: selectedItem[variation],
    }
  })

  return {
    selectedItem,
    itemsFormatted,
    variations,
  }
}
