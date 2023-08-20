import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'

import { useHandleVisualization } from './hooks/useHandleVisualization'
import { MyCheckoutButtonContainer } from './components/MyCheckoutButton/MyCheckoutButtonContainer'
import type { ItemToAdd, Product, ProductItem, Runtime } from './interfaces'
import store from './contexts/global-context/store'
import client from './services/ApolloClientConfig'
import ButtonMessageContainer from './components/ButtonMessage/ButtonMessageContainer'
import styles from './myCheckout-styles.module.css'

interface Props {
  addToCart: (item: ItemToAdd) => void
  itemToAdd?: ItemToAdd
  isVisible?: boolean
  disabled?: boolean
  validateBeforeOfAdd?: () => boolean | undefined
  multipleAvailableSKUs: boolean
  onClickBehavior?: 'ensure-sku-selection'
  product?: Product
  selectedItem?: ProductItem
  handleSelectedItem?: (item: ProductItem) => void
  forceOpenModal?: boolean
  styles?: any
  sandbox?: boolean
  runtime: Runtime
  isPreview?: boolean
  text?: string
}

const Component = (props: Props) => {
  const { isPreview, isVisible, product } = props
  const { hidde, initialStyle } = useHandleVisualization(product)

  if (!styles || hidde) return null

  return (
    <div className={styles.Checkoutless} style={isPreview ? {} : initialStyle}>
      <MyCheckoutButtonContainer {...props} />
      <ButtonMessageContainer isVisible={isVisible} />
    </div>
  )
}

export const Kuikpay = (props: Props) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client(props.sandbox, props.runtime)}>
        <Component {...props} />
      </ApolloProvider>
    </Provider>
  )
}
