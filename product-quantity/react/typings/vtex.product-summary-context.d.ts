declare module 'vtex.product-summary-context/ProductSummaryContext' {
  export const useProductSummary: () => ProductSummaryContext
  interface ProductSummaryContext {
    selectedQuantity: number
    selectedItem?: SelectedItem
  }

  interface SelectedItem {
    unitMultiplier: number
    measurementUnit: string
    sellers: Array<{
      commertialOffer: {
        AvailableQuantity: number
      }
    }>
  }

  type DispatchFunction = (payload: { type: string; args?: object }) => void
  export const useProductSummaryDispatch: () => DispatchFunction
}
