import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import { mount } from 'enzyme'
import AddressItem from './AddressItem'
import messages from '../../messages/pt.json'

describe('AddressItem', () => {
  let state, store, props

  const address = {
    abbr: 'BR',
    addressId: 'TESTE',
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
    summary: [
      [
        {
          name: 'street',
        },
        {
          delimiter: ' ',
          name: 'number',
        },
        {
          delimiter: ', ',
          name: 'complement',
        },
      ],
      [
        {
          name: 'neighborhood',
        },
        {
          delimiter: ' - ',
          name: 'city',
        },
        {
          delimiter: ' - ',
          name: 'state',
        },
      ],
      [
        {
          name: 'postalCode',
        },
      ],
    ],
  }

  beforeEach(() => {
    state = {
      orderForm: {
        shippingData: {
          availableAddresses: [
            {
              addressId: 'TESTE',
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
            {
              addressId: 'TESTE 2',
              addressType: 'residential',
              city: 'São Paulo',
              complement: '200',
              country: 'BRA',
              geoCoordinates: [],
              neighborhood: 'Grajaú',
              number: '100',
              postalCode: '999999999',
              receiverName: 'bananinha 2',
              reference: null,
              state: 'SP',
              street: 'Rua Grajaú',
            },
          ],
          selectedAddresses: [address],
        },
      },
    }
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => state),
    }
    props = {
      address: address,
      selectAddressItem: jest.fn(),
      rules: address,
    }
  })

  it('should render AddressItem and components', function() {
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <IntlProvider
            locale="pt"
            messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
            <AddressItem {...props} />
          </IntlProvider>
        </Provider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger selectAddressItem if click address-item', done => {
    const mockChangeSelectedAdressItem = jest.fn()
    const props = {
      address: address,
      selectAddressItem: mockChangeSelectedAdressItem,
      rules: address,
    }
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
          <AddressItem {...props} />
        </IntlProvider>
      </Provider>
    )

    const locateItem = wrapper.find('.address-item')

    locateItem.simulate('click')
    process.nextTick(() => {
      try {
        wrapper.update()
        expect(mockChangeSelectedAdressItem).toHaveBeenCalledWith(
          props.selectedAddress[0]
        )
        expect(mockChangeSelectedAdressItem.mock.calls).toHaveLength(1)
      } catch (e) {
        return done(e)
      }
      done()
    })
  })
})
