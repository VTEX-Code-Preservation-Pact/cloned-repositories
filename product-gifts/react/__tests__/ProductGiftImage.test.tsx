/* eslint-disable jest/no-mocks-import */
import React from 'react'
import { act } from 'react-dom/test-utils'
import wait from 'waait'

import ProductGifts from '../ProductGifts'
import ProductGiftList from '../ProductGiftList'
import ProductGiftImage from '../ProductGiftImage'
import { itemWithOneGift } from '../__mocks__/products'
import { productGiftsQueryResultWithOneGift } from '../__mocks__/productGiftsQueryResult'
import { renderWithProductContext } from '../__mocks__/testUtils'

describe('ProductGifts component', () => {
  it('should render image with correct label', async () => {
    const { queryByText } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems={3}>
          <ProductGiftList>
            <ProductGiftImage imageLabel="frame-2" />
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

    expect(
      queryByText(
        'This should be an image with src: https://storecomponents.vteximg.com.br/arquivos/ids/155476/Frame-2.jpg?v=636793808441900000'
      )
    ).toBeTruthy()
  })

  it('should render first available image if no label is received', async () => {
    const { queryByText } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems={3}>
          <ProductGiftList>
            <ProductGiftImage />
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

    expect(
      queryByText(
        'This should be an image with src: https://storecomponents.vteximg.com.br/arquivos/ids/155476/Frame-4.jpg?v=636793808441900000'
      )
    ).toBeTruthy()
  })

  it('should render first available image if no image matches received label', async () => {
    const { queryByText } = renderWithProductContext({
      Component: (
        <ProductGifts maxVisibleItems={3}>
          <ProductGiftList>
            <ProductGiftImage imageLabel="this-is-not-a-valid-label" />
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

    expect(
      queryByText(
        'This should be an image with src: https://storecomponents.vteximg.com.br/arquivos/ids/155476/Frame-4.jpg?v=636793808441900000'
      )
    ).toBeTruthy()
  })
})
