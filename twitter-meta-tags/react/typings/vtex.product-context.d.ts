declare module 'vtex.product-context' {
  interface ProductContext {
    product: Product
    selectedItem: SKU
  }

  interface Product {
    productName: string
    description: string
  }

  interface SKU {
    images: Array<{
      imageUrl: string
    }>
  }

  export const ProductContext: Context<ProductContext>
}
