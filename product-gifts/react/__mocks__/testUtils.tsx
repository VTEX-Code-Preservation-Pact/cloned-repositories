import React, { ReactElement } from 'react'
import { render } from '@vtex/test-tools/react'

import { ProductContextProvider } from './vtex.product-context/ProductContextProvider'
import ProductGiftsQuery from '../graphql/product.graphql'

interface RenderWithProductContextArgs {
  Component: ReactElement
  selectedItem: ProductContextItem
  productId: string
  graphqlConfig: {
    identifier: string
    result: any
  }
}

export function renderWithProductContext({
  Component,
  selectedItem,
  productId,
  graphqlConfig,
}: RenderWithProductContextArgs) {
  return render(
    <ProductContextProvider value={{ product: { productId }, selectedItem }}>
      {Component}
    </ProductContextProvider>,
    {
      graphql: {
        mocks: [
          {
            request: {
              query: ProductGiftsQuery,
              variables: {
                identifier: { field: 'id', value: graphqlConfig.identifier },
              },
            },
            result: graphqlConfig.result,
          },
        ],
      },
    }
  )
}

export function findCSSHandles(container: HTMLElement, handles: string[]) {
  const foundNodes = handles
    .map(handle => {
      const foundNodesInner = container.getElementsByClassName(handle)
      return foundNodesInner.length > 0 ? handle : ''
    })
    .filter(result => result !== '')

  return foundNodes
}
