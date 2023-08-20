import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'

import type { Product, ProductItem, Runtime } from './interfaces'
import store from './contexts/global-context/store'
import client from './services/ApolloClientConfig'
import QuotaInformativeComponentContainer from './components/QuotaInformativeComponent/QuotaInformativeComponentContainer'

interface Props {
  sandbox?: boolean
  language?: string
  theme: string
  selectedItem?: ProductItem
  product?: Product
  runtime: Runtime
}

export const KuikpayQuotaInformative = (props: Props) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client(props.sandbox, props.runtime)}>
        <QuotaInformativeComponentContainer {...props} />
      </ApolloProvider>
    </Provider>
  )
}
