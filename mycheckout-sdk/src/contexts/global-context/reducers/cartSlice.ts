import { createSlice } from '@reduxjs/toolkit'

import type { ItemToAdd, Product, ProductItem } from '../../../interfaces'

const slice = createSlice({
  name: 'cart',
  initialState: {
    itemToAdd: null,
    product: null,
    selectedItem: null,
    email: null,
    variationSelected: null,
  },
  reducers: {
    newItemSelection: (state, action) => {
      state.itemToAdd = action.payload.itemToAdd
      state.product = action.payload.product
      state.selectedItem = action.payload.selectedItem
      state.variationSelected = null
    },
    updateSelectedItem: (state, action) => {
      state.itemToAdd = action.payload.itemToAdd
      state.product = action.payload.product
      state.selectedItem = action.payload.selectedItem
    },
    updateEmail: (state, action) => {
      state.email = action.payload
    },
    setVariationSelected: (state, action) => {
      state.variationSelected = action.payload
      state.selectedItem = action.payload
    },
    updateItemToAdd: (state, action) => {
      state.itemToAdd = action.payload
    },
  },
})

export const {
  updateSelectedItem,
  setVariationSelected,
  newItemSelection,
  updateItemToAdd,
} = slice.actions

export default slice.reducer

export const selectItemData = (
  state: any
): { product: Product; itemToAdd: ItemToAdd; selectedItem: ProductItem } => ({
  itemToAdd: state.cart.itemToAdd,
  product: state.cart.product,
  selectedItem: state.cart.selectedItem,
})

export const selectEmail = (state: any): string => state.cart.email
export const selectVariationSelected = (state: any) =>
  state.cart.variationSelected
