import {
  onePickupPackageState,
  pickupAndPickupUnavailablePackageState,
  pickupAndUnavailablePackageState,
  scheduledDeliveryPickupPackageState,
} from './__mocks__/pickup-packages'

import { IntlProvider } from 'react-intl'
import PickupContainer from './PickupContainer'
import { Provider } from 'react-redux'
import React from 'react'
import messages from '../../messages/pt.json'
import { oneDeliveryPackageState } from '../components/__mocks__/delivery-packages'
import { render } from 'enzyme'
import BRA from '@vtex/address-form/lib/country/BRA'

describe('PickupContainer', () => {
  let store, props

  it('should render only one pickup package', () => {
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => onePickupPackageState),
    }
    props = {}
    const wrapper = render(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
          <PickupContainer {...props} rules={BRA} />
        </IntlProvider>
      </Provider>
    )

    expect(wrapper.find('.pickup-point-name').text()).toEqual(
      'loja rio de janeiro'
    )
    expect(wrapper.find('#details-pickup-button').text()).toEqual(
      'Ver mais detalhes'
    )
    expect(wrapper.find('#change-pickup-button').text()).toEqual(
      'Ver todos os pontos de retirada'
    )
    expect(wrapper.find('.address-summary .street').text()).toEqual(
      'Av das Américas'
    )
    expect(wrapper.find('.shp-option-text-price').text()).toEqual('R$ 1,00')

    expect(wrapper.find('img')).not.toBeUndefined()
  })

  it('should render only one pickup package with scheduled delivery', () => {
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => scheduledDeliveryPickupPackageState),
    }
    props = {}
    const wrapper = render(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
          <PickupContainer {...props} rules={BRA} />
        </IntlProvider>
      </Provider>
    )

    expect(wrapper.find('.pickup-point-name').text()).toEqual(
      'loja rio de janeiro'
    )
    expect(wrapper.find('#details-pickup-button').text()).toEqual(
      'Ver mais detalhes'
    )
    expect(wrapper.find('#change-pickup-button').text()).toEqual(
      'Ver todos os pontos de retirada'
    )
    expect(wrapper.find('.address-summary .street').text()).toEqual(
      'Av das Américas'
    )

    expect(wrapper.find('img')).not.toBeUndefined()
  })

  it('should render one pickup package and one unavailable package', () => {
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => pickupAndUnavailablePackageState),
    }
    props = {}
    const wrapper = render(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
          <PickupContainer {...props} rules={BRA} />
        </IntlProvider>
      </Provider>
    )
    expect(wrapper.find('#unavailable-delivery-disclaimer').text()).toEqual(
      'O item a seguir está com entrega indisponível para o CEP escolhido. Escolha outro ponto de retirada ou remova o item do carrinho.'
    )
    expect(wrapper.find('.pickup-point-name').text()).toEqual(
      'loja rio de janeiro'
    )
    expect(wrapper.find('#details-pickup-button').text()).toEqual(
      'Ver mais detalhes'
    )
    expect(wrapper.find('#change-pickup-button').text()).toEqual(
      'Ver todos os pontos de retirada'
    )
    expect(wrapper.find('.address-summary .street').text()).toEqual(
      'Av das Américas'
    )
    expect(wrapper.find('.shp-option-text-price').text()).toEqual('R$ 1,00')

    expect(wrapper.find('img')).not.toBeUndefined()
  })

  it('should render one pickup package and one unavailable pickup package', () => {
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => pickupAndPickupUnavailablePackageState),
    }
    props = {}
    const wrapper = render(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
          <PickupContainer {...props} rules={BRA} />
        </IntlProvider>
      </Provider>
    )

    expect(wrapper.find('#unavailable-delivery-disclaimer').text()).toEqual(
      'O item a seguir está com entrega indisponível para o CEP escolhido. Escolha outro ponto de retirada ou remova o item do carrinho.'
    )
    expect(wrapper.find('.pickup-point-name').text()).toEqual(
      'loja rio de janeiro'
    )
    expect(wrapper.find('#details-pickup-button').text()).toEqual(
      'Ver mais detalhes'
    )
    expect(wrapper.find('#change-pickup-button').text()).toEqual(
      'Ver todos os pontos de retirada'
    )
    expect(wrapper.find('.address-summary .street').text()).toEqual(
      'Av das Américas'
    )
    expect(wrapper.find('.shp-option-text-price').text()).toEqual('R$ 1,00')

    expect(wrapper.find('img')).not.toBeUndefined()
  })

  it('shouldnt render anything if has only delivery selected', () => {
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => oneDeliveryPackageState),
    }
    props = {}
    const wrapper = render(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
          <PickupContainer {...props} rules={BRA} />
        </IntlProvider>
      </Provider>
    )

    expect(wrapper.find('.deliveryGroup').children()).toHaveLength(0)
  })
})
