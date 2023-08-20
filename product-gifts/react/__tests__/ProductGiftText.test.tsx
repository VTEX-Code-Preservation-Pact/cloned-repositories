/* eslint-disable jest/no-mocks-import */
import React from 'react'
import { act } from 'react-dom/test-utils'
import wait from 'waait'

import ProductGifts from '../ProductGifts'
import GiftText from '../GiftText'
import ProductGiftList from '../ProductGiftList'
import ProductGiftImage from '../ProductGiftImage'
import { itemWithThreeGifts } from '../__mocks__/products'
import { renderWithProductContext } from '../__mocks__/testUtils'
import { productGiftsQueryResultWithThreeGifts } from '../__mocks__/productGiftsQueryResult'

describe('ProductGiftText component', () => {
  it('should pass the correct values to IOMessage component', async () => {
    const { queryByText } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems={1}>
          <GiftText text="This is a message ID" />
          <ProductGiftList>
            <ProductGiftImage />
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

    const expectedValues = {
      totalGifts: 3,
      exceedingItems: 2,
      visibleItems: 1,
    }
    const expectedId = 'This is a message ID'

    const expectedStringResult = `Received message id: ${expectedId} and the following values (totalGifts, exceedingItems, visibleItems): ${Object.values(
      expectedValues
    )}`

    expect(queryByText(expectedStringResult)).toBeDefined()
  })
})
