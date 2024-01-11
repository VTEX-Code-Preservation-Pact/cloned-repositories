import { CHEAPEST, DELIVERY, PICKUP_IN_STORE } from '../constants'
import { setLocale } from 'enzyme-react-intl'

import BRA from '@vtex/address-form/lib/country/BRA'
import ConnecteSummary from './Summary'
import { IntlProvider } from 'react-intl'
import messages from '../../messages/pt.json'
import { Provider } from 'react-redux'
import React from 'react'
import { addValidation } from '@vtex/address-form'
import renderer from 'react-test-renderer'

setLocale('pt')

describe('Summary', () => {
  let state, store, props, onModifyDeliveryOptions
  const address = {
    addressType: 'residential',
    receiverName: null,
    addressId: '10',
    postalCode: '22222222',
    city: 'Rio de janeiro',
    state: 'RJ',
    country: 'BRA',
    street: 'Av das Américas',
    number: '',
    neighborhood: 'Barra da Tijuca',
    complement: 'Loja Barra da Tijuca',
    reference: null,
    geoCoordinates: [],
    addressQuery: 'query',
  }
  const logisticsInfo = {
    itemIndex: 0,
    selectedSla: '3',
    selectedDeliveryChannel: DELIVERY,
    deliveryChannels: [
      {
        id: PICKUP_IN_STORE,
      },
      {
        id: DELIVERY,
      },
    ],
    slas: [
      {
        id: '1',
        deliveryChannel: DELIVERY,
        name: 'test',
        price: 100,
        shippingEstimate: '1bd',
        availableDeliveryWindows: [],
      },
      {
        id: '2',
        deliveryChannel: DELIVERY,
        name: 'test',
        price: 100,
        shippingEstimate: '1bd',
        availableDeliveryWindows: [],
      },
      {
        id: '3',
        deliveryChannel: DELIVERY,
        name: 'test',
        price: 100,
        shippingEstimate: '1bd',
        availableDeliveryWindows: [],
      },
    ],
  }

  beforeEach(() => {
    onModifyDeliveryOptions = jest.fn()
    jest.mock('../utils/Currency', () => 'R$ 1,00')

    state = {
      delivery: {
        activeDeliveryOption: CHEAPEST,
        CHEAPEST: [logisticsInfo, logisticsInfo, logisticsInfo],
      },
      addressForm: {
        residentialId: address.addressId,
        addresses: {
          [address.addressId]: addValidation(address),
        },
      },
      addressRules: {
        rules: {
          BRA,
        },
        selectedRules: BRA,
      },
      orderForm: {
        canEditData: true,
        clientPreferencesData: {
          locale: 'pt-BR',
        },
        items: [
          { seller: '1', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
          { seller: '1', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
          { seller: '1', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
        ],
        sellers: [{ id: '1' }],
        shippingData: {
          logisticsInfo: [logisticsInfo, logisticsInfo, logisticsInfo],
        },
        storePreferencesData: {
          countryCode: 'BRA',
          currencyCode: 'BRL',
          currencySymbol: 'R$',
          currencyFormatInfo: {
            currencyDecimalDigits: 2,
            currencyDecimalSeparator: ',',
            currencyGroupSeparator: '.',
            currencyGroupSize: 3,
            startsWithCurrencySymbol: true,
          },
        },
      },
    }
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => state),
    }
    props = {
      onModifyDeliveryOptions,
      address,
      sellerId: '1',
      selectedRules: BRA,
      logisticsInfo: {
        selectedSla: '3',
        selectedDeliveryChannel: DELIVERY,
        deliveryChannels: [
          {
            id: PICKUP_IN_STORE,
          },
          {
            id: DELIVERY,
          },
        ],
        slas: [
          {
            name: 'test',
            id: '1',
            deliveryChannel: DELIVERY,
            price: 100,
            shippingEstimate: '1bd',
            availableDeliveryWindows: [],
          },
          {
            name: 'test',
            id: '2',
            deliveryChannel: DELIVERY,
            price: 100,
            shippingEstimate: '1bd',
            availableDeliveryWindows: [],
          },
        ],
      },
      index: 0,
      storePreferencesData: {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        currencySymbol: 'R$',
        currencyFormatInfo: {
          currencyDecimalDigits: 2,
          currencyDecimalSeparator: ',',
          currencyGroupSeparator: '.',
          currencyGroupSize: 3,
          startsWithCurrencySymbol: true,
        },
      },
    }
  })

  it('should render only with DELIVERY and one seller', () => {
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <IntlProvider
            locale="pt"
            messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
            <ConnecteSummary {...props} rules={BRA} />
          </IntlProvider>
        </Provider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render only with PICKUP_IN_STORE and one seller', () => {
    const logisticsInfo = {
      itemIndex: 0,
      selectedSla: '3',
      selectedDeliveryChannel: PICKUP_IN_STORE,
      deliveryChannels: [
        {
          id: PICKUP_IN_STORE,
        },
      ],
      slas: [
        {
          id: '1',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: {
            friendlyName: 'test',
            address,
          },
        },
        {
          id: '2',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: {
            friendlyName: 'test',
            address,
          },
        },
        {
          id: '3',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: {
            friendlyName: 'test',
            address,
          },
        },
      ],
    }

    state = {
      delivery: {
        activeDeliveryOption: CHEAPEST,
        CHEAPEST: [logisticsInfo, logisticsInfo, logisticsInfo],
      },
      addressForm: {
        residentialId: address.addressId,
        addresses: {
          [address.addressId]: addValidation(address),
        },
      },
      addressRules: {
        rules: {
          BRA,
        },
        selectedRules: BRA,
      },
      orderForm: {
        canEditData: true,
        clientPreferencesData: {
          locale: 'pt-BR',
        },
        items: [
          { seller: '1', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
          { seller: '1', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
          { seller: '1', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
        ],
        sellers: [{ id: '1' }],
        shippingData: {
          logisticsInfo: [logisticsInfo, logisticsInfo, logisticsInfo],
        },
        storePreferencesData: {
          countryCode: 'BRA',
          currencyCode: 'BRL',
          currencySymbol: 'R$',
          currencyFormatInfo: {
            currencyDecimalDigits: 2,
            currencyDecimalSeparator: ',',
            currencyGroupSeparator: '.',
            currencyGroupSize: 3,
            startsWithCurrencySymbol: true,
          },
        },
      },
    }
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <IntlProvider
            locale="pt"
            messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
            <ConnecteSummary {...props} rules={BRA} />
          </IntlProvider>
        </Provider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render only with DELIVERY and PICKUP and two sellers', () => {
    const logisticsInfo = {
      itemIndex: 0,
      selectedSla: '2',
      selectedDeliveryChannel: PICKUP_IN_STORE,
      deliveryChannels: [{ id: PICKUP_IN_STORE }],
      slas: [
        {
          id: '1',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: 'test', address },
        },
        {
          id: '2',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test-1',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: 'test', address },
        },
        {
          id: '3',
          deliveryChannel: DELIVERY,
          name: 'test-2',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: null, address: null },
        },
      ],
    }

    const logisticsInfo2 = {
      itemIndex: 1,
      selectedSla: '3',
      selectedDeliveryChannel: DELIVERY,
      deliveryChannels: [{ id: DELIVERY }, { id: PICKUP_IN_STORE }],
      slas: [
        {
          id: '1',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: 'test', address },
        },
        {
          id: '2',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test-1',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: 'test', address },
        },
        {
          id: '3',
          deliveryChannel: DELIVERY,
          name: 'test-2',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: null, address: null },
        },
      ],
    }

    const logisticsInfo3 = {
      itemIndex: 2,
      selectedSla: '3',
      selectedDeliveryChannel: DELIVERY,
      deliveryChannels: [{ id: DELIVERY }, { id: PICKUP_IN_STORE }],
      slas: [
        {
          id: '1',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: 'test', address },
        },
        {
          id: '2',
          deliveryChannel: PICKUP_IN_STORE,
          name: 'test-1',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: 'test', address },
        },
        {
          id: '3',
          deliveryChannel: DELIVERY,
          name: 'test-2',
          price: 100,
          shippingEstimate: '1bd',
          availableDeliveryWindows: [],
          pickupStoreInfo: { friendlyName: null, address: null },
        },
      ],
    }

    state = {
      delivery: {
        activeDeliveryOption: CHEAPEST,
        CHEAPEST: [logisticsInfo, logisticsInfo2, logisticsInfo3],
      },
      addressForm: {
        residentialId: address.addressId,
        addresses: {
          [address.addressId]: addValidation(address),
        },
      },
      addressRules: {
        rules: {
          BRA,
        },
        selectedRules: BRA,
      },
      orderForm: {
        canEditData: true,
        clientPreferencesData: {
          locale: 'pt-BR',
        },
        items: [
          { seller: '1', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
          { seller: '1', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
          { seller: '2', imageUrl: '1', name: 'xablau', uniqueId: 'test' },
        ],
        sellers: [{ id: '1' }, { id: '2' }],
        shippingData: {
          logisticsInfo: [logisticsInfo, logisticsInfo2, logisticsInfo3],
        },
        storePreferencesData: {
          countryCode: 'BRA',
          currencyCode: 'BRL',
          currencySymbol: 'R$',
          currencyFormatInfo: {
            currencyDecimalDigits: 2,
            currencyDecimalSeparator: ',',
            currencyGroupSeparator: '.',
            currencyGroupSize: 3,
            startsWithCurrencySymbol: true,
          },
        },
      },
    }

    props = {
      onModifyDeliveryOptions,
      address,
      sellerId: '1',
      deliveryChannel: DELIVERY,
      selectedRules: BRA,
      index: 0,
      storePreferencesData: {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        currencySymbol: 'R$',
        currencyFormatInfo: {
          currencyDecimalDigits: 2,
          currencyDecimalSeparator: ',',
          currencyGroupSeparator: '.',
          currencyGroupSize: 3,
          startsWithCurrencySymbol: true,
        },
      },
    }
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <IntlProvider
            locale="pt"
            messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
            <ConnecteSummary {...props} rules={BRA} />
          </IntlProvider>
        </Provider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
