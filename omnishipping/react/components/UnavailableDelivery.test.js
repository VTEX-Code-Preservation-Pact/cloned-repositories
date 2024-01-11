import { CHEAPEST, DELIVERY } from '../constants'
import { loadTranslation, mountWithIntl } from 'enzyme-react-intl'

import ConnectedUnavailableDelivery from './UnavailableDelivery'
import React from 'react'

loadTranslation('../../messages/en.json')

describe('UnavailableDelivery', () => {
  let state, store, props

  beforeEach(() => {
    state = {
      delivery: {
        activeDeliveryOption: CHEAPEST,
        CHEAPEST: [
          {
            itemIndex: 0,
            selectedSla: null,
            slas: [],
            deliveryChannels: [],
          },
        ],
      },
      componentActivity: {
        activeDeliveryChannel: DELIVERY,
      },
      addressForm: {
        addresses: {
          '10': {},
          '11': {
            postalCode: {
              value: '10',
            },
          },
        },
        searchId: '10',
        residentialId: '11',
      },
      orderForm: {
        items: [
          {
            seller: '1',
            name: 'title',
            imageUrl:
              'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413316.jpg',
            uniqueId: '10',
          },
        ],
        shippingData: {
          logisticsInfo: [
            {
              itemIndex: 0,
              selectedSla: null,
              slas: [],
              deliveryChannels: [],
            },
          ],
        },
      },
    }
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => state),
    }
    props = {
      itemsByPackages: [
        {
          firstLogisticsInfo: {
            itemIndex: 1,
            itemId: '1',
          },
          selectedSlaItem: {
            id: 'normal',
            shippingEstimate: '10bd',
          },
          items: [
            {
              name: 'title',
              imageUrl:
                'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413316.jpg',
              uniqueId: '10',
            },
          ],
        },
      ],
      removeItemsFromCart: jest.fn(),
      postalCode: '2222222',
      items: [{}, {}],
      focusOnInput: jest.fn(),
      logisticsInfo: [{}],
    }
  })

  it('should render the connected UnavailableDelivery component without crashing', () => {
    mountWithIntl(<ConnectedUnavailableDelivery store={store} {...props} />)
  })
})
