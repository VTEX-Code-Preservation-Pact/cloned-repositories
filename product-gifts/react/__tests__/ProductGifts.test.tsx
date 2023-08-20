/* eslint-disable jest/no-mocks-import */
import React from 'react'
import { act } from 'react-dom/test-utils'
import wait from 'waait'

import ProductGifts from '../ProductGifts'
import GiftText from '../GiftText'
import ProductGiftList from '../ProductGiftList'
import ProductGiftDescription from '../ProductGiftDescription'
import ProductGiftImage from '../ProductGiftImage'
import ProductGiftName from '../ProductGiftName'
import { itemWithNoGifts, itemWithThreeGifts } from '../__mocks__/products'
import { renderWithProductContext } from '../__mocks__/testUtils'
import {
  productGiftsQueryResultWithOneGift,
  productGiftsQueryResultWithThreeGifts,
} from '../__mocks__/productGiftsQueryResult'

describe('ProductGifts component', () => {
  it('should not render component if product has no gifts', async () => {
    const { container } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems={3}>
          <GiftText text="{test} {dynamic}" />
          <ProductGiftList>
            <ProductGiftDescription />
            <ProductGiftImage />
            <ProductGiftName linkToProductPage={false} />
          </ProductGiftList>
        </ProductGifts>
      ),
      selectedItem: itemWithNoGifts,
      productId: '1',
      graphqlConfig: {
        identifier: '1',
        result: productGiftsQueryResultWithOneGift,
      },
    })

    /**
     * This is necessary because of state changes triggered by react-apollo hooks
     * */
    await act(async () => {
      await wait(0)
    })

    expect(container.children).toHaveLength(0)
  })

  it('should render child components if product has gifts', async () => {
    const { container } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems={3}>
          <GiftText text="{test} {dynamic}" />
          <ProductGiftList>
            <ProductGiftDescription />
            <ProductGiftImage />
            <ProductGiftName linkToProductPage={false} />
          </ProductGiftList>
        </ProductGifts>
      ),
      selectedItem: itemWithThreeGifts,
      productId: '3',
      graphqlConfig: {
        identifier: '3',
        result: productGiftsQueryResultWithThreeGifts,
      },
    })

    /**
     * This is necessary because of state changes triggered by react-apollo hooks
     * */
    await act(async () => {
      await wait(0)
    })

    expect(container.children).toHaveLength(1)
  })
})
