import React from 'react'
import ReactDOM from 'react-dom'

import Button from './QuickpayButton'
import Wrapper from './KuikpayWrapper'
import { search } from './services'
import { formatItems, useRender } from './utils'

export const pagination = () => {
  const { elements, item, wrapper, items } = useRender()

  if (!wrapper) return

  ReactDOM.render(<Wrapper />, wrapper)

  if (elements.length) {
    const searchQuery = items
      .map((parameter: string) => `fq=skuId:${parameter}&`)
      .join('')

    search(searchQuery, 0, 49).then((products) => {
      const sortedProducts: any = []

      items.forEach((itemId: string) => {
        products.forEach((product: any) => {
          product.items.forEach((sku: any) => {
            if (sku.itemId === itemId) sortedProducts.push(product)
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
      })
    })
  }

  if (item) {
    ReactDOM.render(<Button />, item)
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      pagination()
    }
  })
})

const list = document.getElementsByClassName('prateleira')[0]

if (list) {
  observer.observe(list, {
    childList: true,
  })
}
