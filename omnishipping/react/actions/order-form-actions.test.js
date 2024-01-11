import * as actions from './order-form-actions'
import * as types from './action-types'
import { PICKUP } from '../constants'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import addressFormInStore from './__mocks__/address-form-multiple-addresses.json'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('OrderForm Actions', () => {
  it('should create an action change active tab from a product', () => {
    const actionParams = {
      index: 0,
      tabOption: PICKUP,
    }

    expect(
      actions.changeActiveTab(actionParams.index, actionParams.tabOption)
    ).toMatchSnapshot()
  })

  it('should create an action change active SLAOption from a product', () => {
    expect(
      actions.changeActiveSLAOption({
        slaOption: PICKUP,
        sellerId: '1',
        logisticsInfoIndex: 0,
      })
    ).toMatchSnapshot()
  })

  it('should create an action update orderForm object', () => {
    expect(actions.updateOrderForm({ test: '' })).toMatchSnapshot()
  })

  it('should dispatch a action to selected one address', () => {
    const store = mockStore({
      address: {
        addressId: 'master',
        addressType: 'residential',
        city: 'Rio de Janeiro',
        complement: '100',
        country: 'BRA',
        geoCoordinates: [],
        neighborhood: 'Tijuca',
        number: '',
        postalCode: '333333333',
        receiverName: 'bananinha',
        reference: null,
        state: 'RJ',
        street: 'Rua Andrade Neves',
      },
    })

    store.dispatch(actions.selectAddressItemAction())

    const getActions = store.getActions()

    expect(getActions[0].type).toBe(types.SELECT_ADDRESS_ITEM)
  })

  it('should create an action to tell if orderForm is updated', () => {
    const store = mockStore({
      orderForm: {
        canEditData: true,
        shippingData: {
          logisticsInfo: [],
        },
        storePreferencesData: {
          countryCode: 'BRA',
        },
      },
    })

    const shippingData = [
      'shippingData',
      { logisticsInfo: [], selectedAddresses: [] },
    ]
    const spy = jest.spyOn(window.vtexjs.checkout, 'sendAttachment')

    return store
      .dispatch(actions.updateShippingData(shippingData[1]))
      .then(() => {
        expect(spy).toHaveBeenCalledWith(shippingData[0], shippingData[1])
      })
  })

  it('should create an action to remove items with the api', () => {
    const store = mockStore({ orderForm: [] })
    const logisticsInfo = [
      {
        itemIndex: 0,
      },
    ]
    const items = [{ index: 0, quantity: 0 }]
    const spy = jest.spyOn(window.vtexjs.checkout, 'removeItems')

    return store
      .dispatch(actions.removeItemsFromCart({ logisticsInfo }))
      .then(() => {
        expect(spy).toHaveBeenCalledWith(items)
      })
  })

  it('should select search address if item has pickup', () => {
    const mocks = {
      addressForm: addressFormInStore,
      items: [
        {
          uniqueId: '648B2D52FF0B462B9227CEFF75DA3875',
        },
      ],
      logisticsInfo: [
        {
          itemIndex: 0,
          addressId: '1533305916381',
          selectedDeliveryChannel: 'pickup-in-point',
        },
      ],
      deliveryAddress: {
        addressId: '1234',
        addressType: 'residential',
      },
      searchAddress: {
        addressId: '4321',
        addressType: 'search',
      },
      isSimulation: false,
    }

    const expected = [
      {
        deliveryWindow: undefined,
        addressId: '4321',
        itemIndex: 0,
        selectedDeliveryChannel: 'pickup-in-point',
        selectedSla: undefined,
      },
    ]

    const {
      addressForm,
      items,
      logisticsInfo,
      deliveryAddress,
      searchAddress,
      isSimulation,
    } = mocks

    expect(
      actions.getLogisticsInfoForRequest({
        addressForm,
        items,
        logisticsInfo,
        deliveryAddress,
        searchAddress,
        isSimulation,
      })[0].addressId
    ).toBe(expected[0].addressId)
  })

  it('should select residential address if item is delivery', () => {
    const mocks = {
      addressForm: addressFormInStore,
      items: [
        {
          uniqueId: '648B2D52FF0B462B9227CEFF75DA3875',
        },
      ],
      logisticsInfo: [
        {
          itemIndex: 0,
          addressId: '4585178548905',
          selectedDeliveryChannel: 'delivery',
        },
      ],
      deliveryAddress: {
        addressId: '4321',
        addressType: 'residential',
      },
      searchAddress: {
        addressId: '1234',
        addressType: 'search',
      },
      isSimulation: false,
    }

    const expected = [
      {
        deliveryWindow: undefined,
        addressId: '4321',
        itemIndex: 0,
        selectedDeliveryChannel: 'delivery',
        selectedSla: undefined,
      },
    ]

    const {
      addressForm,
      items,
      logisticsInfo,
      deliveryAddress,
      searchAddress,
      isSimulation,
    } = mocks

    expect(
      actions.getLogisticsInfoForRequest({
        addressForm,
        items,
        logisticsInfo,
        deliveryAddress,
        searchAddress,
        isSimulation,
      })[0].addressId
    ).toBe(expected[0].addressId)
  })
})
