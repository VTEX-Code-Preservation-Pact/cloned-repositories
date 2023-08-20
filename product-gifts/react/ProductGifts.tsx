import React, { createContext, useContext, useMemo } from 'react'
import { defineMessages } from 'react-intl'
import { useQuery } from 'react-apollo'
import {
  useResponsiveValue,
  MaybeResponsiveInput,
} from 'vtex.responsive-values'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'

import ProductGiftsQuery from './graphql/product.graphql'

interface Props {
  maxVisibleItems?: MaybeResponsiveInput<number | 'showAll'>
}

interface State {
  gifts: Gift[]
  maxVisibleItems: number | 'showAll'
}

const GiftsStateContext = createContext<State>({
  gifts: [],
  maxVisibleItems: 0,
})

const CSS_HANDLES = ['productGiftsContainer'] as const

const ProductGifts: StoreFunctionComponent<Props> = ({
  children,
  maxVisibleItems = 'showAll',
}) => {
  const productContext: Maybe<ProductContextState> = useProduct()
  const { data, loading, error } = useQuery<ProductGiftsQueryResponse>(
    ProductGiftsQuery,
    {
      variables: {
        identifier: { field: 'id', value: productContext?.product?.productId },
      },
      skip: productContext?.product?.productId == null,
    }
  )
  const selectedItemId = productContext?.selectedItem?.itemId
  const handles = useCssHandles(CSS_HANDLES)
  const staticMaxVisibleItems = useResponsiveValue<number | 'showAll'>(
    maxVisibleItems
  )

  const selectedItemFromProductQuery = data?.product.items.find(
    item => item.itemId === selectedItemId
  )
  const sellers = selectedItemFromProductQuery?.sellers ?? []

  const gifts = sellers.reduce(
    (acc: Gift[], curr) => acc.concat(curr.commertialOffer.gifts ?? []),
    []
  )

  const state = useMemo(
    () => ({ gifts, maxVisibleItems: staticMaxVisibleItems }),
    [gifts, staticMaxVisibleItems]
  )

  if (!productContext) {
    console.error(
      'Could not find a ProductContext value. Make sure this component is being used inside a ProductContextProvider.'
    )
  }

  if (error) {
    console.error(error)
  }

  if (loading || state.gifts.length === 0) {
    return null
  }

  return (
    <GiftsStateContext.Provider value={state}>
      <div className={handles.productGiftsContainer}>{children}</div>
    </GiftsStateContext.Provider>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.product-gifts.title',
    defaultMessage: '',
  },
  description: {
    id: 'admin/editor.product-gifts.description',
    defaultMessage: '',
  },
  maxVisibleItems: {
    id: 'admin/editor.product-gifts.maxVisibleItems.title',
    defaultMessage: '',
  },
  maxVisibleItemsDescription: {
    id: 'admin/editor.product-gifts.maxVisibleItems.description',
    defaultMessage: '',
  },
})

ProductGifts.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    maxVisibleItems: {
      default: 'showAll',
      title: messages.maxVisibleItems.id,
      description: messages.maxVisibleItemsDescription.id,
      type: 'string',
    },
  },
}

export function useProductGiftsState() {
  const context = useContext(GiftsStateContext)
  if (context === undefined) {
    throw new Error(
      'useProductGiftsState must be used within a ProductGiftsContextProvider'
    )
  }
  return context
}

export default ProductGifts
