import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'

import store from './contexts/global-context/store'
import client from './services/ApolloClientConfig'
import { UserDataProvider } from './contexts/UserDataProvider'
import { ActionsProvider } from './contexts/ActionsProviderV2'
import Modal from './components/Modal/ModalContainer'
import { I18nProvider } from './i18n'
import type { InitialProps } from './interfaces'
import { useScript } from './hooks/useScript'
import constants from './utils/constants'
import { Params } from './components/Params/Params'
import useCustomCss from './hooks/useCustomCss'
import StoreSetup from './containers/StoreSetup'
import { Simulation } from './containers/Simulation'

export const KuikpayWrapper = (props: InitialProps) => {
  useCustomCss(props.runtime.account, props.sandbox)
  useEffect(() => {
    useScript(constants.MYCHECKOUT_CSS[0], constants.MYCHECKOUT_CSS[1])
  }, [])

  return (
    <Provider store={store}>
      <ActionsProvider {...props}>
        <UserDataProvider>
          <ApolloProvider client={client(props.sandbox, props.runtime)}>
            <StoreSetup {...props}>
              <Simulation>
                <Params />
                <I18nProvider locale={props.language}>
                  <Modal {...props} />
                </I18nProvider>
              </Simulation>
            </StoreSetup>
          </ApolloProvider>
        </UserDataProvider>
      </ActionsProvider>
    </Provider>
  )
}
