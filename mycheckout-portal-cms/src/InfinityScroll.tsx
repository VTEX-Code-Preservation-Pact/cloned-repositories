import React from 'react'
import ReactDOM from 'react-dom'

import Button from './QuickpayButton'
import { renderWrapper } from './Wrapper'
import { search } from './services'
import { formatItems, useRender } from './utils'

const container = document.currentScript.getAttribute('container')

renderWrapper()

export const infiniteScroll = () => {
  const { elements, item, items, undockedElements } = useRender()

  if (elements.length) {
    const intervalItems: any = []
    const interval = 50

    for (let i = 0; i < items.length; i += interval) {
      const intervalItem = items.slice(i, i + interval)

      intervalItems.push(intervalItem)
    }

    const searchQueries = intervalItems.map((intervalItem: string[]) => {
      return intervalItem
        .map((parameter: string) => `fq=skuId:${parameter}&`)
        .join('')
    })

    searchQueries.forEach(async (searchQuery: string) => {
      const products = await search(searchQuery, 0, 49)

      const sortedProducts: any = []

      intervalItems.forEach((intervalItem: any) => {
        intervalItem.forEach((itemId: string) => {
          products.forEach((product: any) => {
            product.items.forEach((sku: any) => {
              if (sku.itemId === itemId) sortedProducts.push(product)
            })
          })
        })
      })

      sortedProducts.forEach((product: any, index: number) => {
        const { selectedItem, itemsFormatted, variations } = formatItems(
          product,
          items[index]
        )

        if (selectedItem) {
          const itemInfo = {
            id: selectedItem.itemId,
            seller: selectedItem.sellers[0].sellerId,
          }

          ReactDOM.render(
            <Button
              key={selectedItem.itemId}
              itemInfo={itemInfo}
              product={{ ...product, items: itemsFormatted }}
              selectedItem={{ ...selectedItem, variations }}
            />,
            elements[index]
          )
        }

        elements[index].className = 'kuikpay-rendered'
      })
    })
  }

  if (item) {
    ReactDOM.render(<Button />, item)
  }

  if (undockedElements) {
    undockedElements.forEach((undockedElement: any) =>
      ReactDOM.render(<Button />, undockedElement)
    )
  }
}

const observer = new MutationObserver((mutations) => {
  if (mutations.length) {
    infiniteScroll()
  }
})

// const list = document.getElementsByClassName('showcases__grid')[1]
const list = document.getElementsByClassName(container)[0]

if (list) {
  observer.observe(list, {
    childList: true,
    subtree: true,
  })
}
