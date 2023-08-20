/* eslint-disable jest/no-mocks-import */
import React from 'react'
import { act } from 'react-dom/test-utils'
import wait from 'waait'

import ProductGifts from '../ProductGifts'
import ProductGiftList from '../ProductGiftList'
import { itemWithThreeGifts, itemWithFourGifts } from '../__mocks__/products'
import { renderWithProductContext } from '../__mocks__/testUtils'
import {
  productGiftsQueryResultWithThreeGifts,
  productGiftsQueryResultWithFourGifts,
} from '../__mocks__/productGiftsQueryResult'

describe('ProductGiftList component', () => {
  it('should render correct number of ProductGift components if maxVisibleItems is a number', async () => {
    const { queryAllByTestId } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems={2}>
          <ProductGiftList />
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

    expect(queryAllByTestId('giftListItem')).toHaveLength(2)
  })

  it('should render all gifts components if maxVisibleItems is equal to "showAll"', async () => {
    const { queryAllByTestId } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems="showAll">
          <ProductGiftList />
        </ProductGifts>
      ),
      selectedItem: itemWithFourGifts,
      productId: '4',
      graphqlConfig: {
        identifier: '4',
        result: productGiftsQueryResultWithFourGifts,
      },
    })

    /**
     * This is necessary because of state changes triggered by react-apollo hooks
     * */
    await act(async () => {
      await wait(0)
    })

    expect(queryAllByTestId('giftListItem')).toHaveLength(4)
  })

  it('should render all gifts components if no maxVisibleItems is received', async () => {
    const { queryAllByTestId } = renderWithProductContext({
      Component: (
        <ProductGifts>
          <ProductGiftList />
        </ProductGifts>
      ),
      selectedItem: itemWithFourGifts,
      productId: '4',
      graphqlConfig: {
        identifier: '4',
        result: productGiftsQueryResultWithFourGifts,
      },
    })

    /**
     * This is necessary because of state changes triggered by react-apollo hooks
     * */
    await act(async () => {
      await wait(0)
    })

    expect(queryAllByTestId('giftListItem')).toHaveLength(4)
  })
})
