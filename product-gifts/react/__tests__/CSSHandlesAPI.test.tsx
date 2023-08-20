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
import { itemWithOneGift } from '../__mocks__/products'
import {
  renderWithProductContext,
  findCSSHandles,
} from '../__mocks__/testUtils'
import { productGiftsQueryResultWithOneGift } from '../__mocks__/productGiftsQueryResult'

const CSS_HANDLES_API = [
  'giftDescription',
  'productGiftListContainer',
  'giftNameLink',
  'giftNameText',
  'productGiftsContainer',
  'productGiftText',
  'giftListItem',
]

/**
 * It is not good practice to test the CSS and it goes against
 * the philosophy behind react-testing-library, but it is useful in our
 * case because our CSS handles are a public API.
 */
describe('CSS handles API', () => {
  it('should have all expected CSS handles', async () => {
    const { container } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems={3}>
          <GiftText text="{test} {dynamic}" />
          <ProductGiftList>
            <ProductGiftDescription />
            <ProductGiftImage />
            <ProductGiftName linkToProductPage />
          </ProductGiftList>
        </ProductGifts>
      ),
      selectedItem: itemWithOneGift,
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

    const foundHandles = findCSSHandles(container, CSS_HANDLES_API)
    expect(foundHandles).toEqual(CSS_HANDLES_API)
  })
})
