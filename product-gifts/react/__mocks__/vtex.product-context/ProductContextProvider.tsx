import React, { createContext, FC } from 'react'

export const ProductContext = createContext({})

interface Props {
  value: { product: { productId: string }; selectedItem: ProductContextItem }
}

export const ProductContextProvider: FC<Props> = ({ children, value }) => {
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
