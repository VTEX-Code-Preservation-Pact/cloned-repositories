import { loadTranslation, mountWithIntl, setLocale } from 'enzyme-react-intl'

import BRA from '@vtex/address-form/lib/country/BRA'
import ConnectedAddressList from '../components/AddressList'
import { IntlProvider } from 'react-intl'
import messages from '../../messages/pt.json'

import { Provider } from 'react-redux'
import { RESIDENTIAL } from '../constants'
import React from 'react'
import newAddress from '../utils/__mocks__/newAddress'
import renderer from 'react-test-renderer'

setLocale('pt')

loadTranslation('./messages/en.json')

jest.unmock('../utils/__mocks__/newAddress')

describe('AddressList', () => {
  let state, store, props

  const address = {
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
  }

  beforeEach(() => {
    state = {
      addressRules: {
        rules: {
          BRA,
        },
        selectedRules: BRA,
      },
      componentActivity: {
        editAddressActive: false,
        newAddressActive: false,
      },
      orderForm: {
        canEditData: false,
        loggedIn: true,
        storePreferencesData: {
          accountName: 'test',
        },
        clientProfileData: {
          email: 'test@test.com',
        },
        clientPreferencesData: {
          locale: 'pt-BR',
        },
        shippingData: {
          availableAddresses: [
            {
              addressId: 'master',
              addressType: RESIDENTIAL,
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
              addressType: RESIDENTIAL,
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
      selectedRules: BRA,
      locale: 'pt-BR',
      availableDeliveryAddresses: [
        {
          addressId: 'bananinha1234',
          addressType: 'residential',
          city: 'São Paulo',
          complement: '100',
          country: 'BRA',
          geoCoordinates: [],
          neighborhood: 'Tijuca',
          number: '',
          postalCode: '555555555',
          receiverName: 'bananinha',
          reference: null,
          state: 'SP',
          street: 'Rua Andrade Nevex',
        },
        {
          addressId: 'banana11234',
          addressType: 'residential',
          city: 'Rio de Janeiro',
          complement: '200',
          country: 'BRA',
          geoCoordinates: [],
          neighborhood: 'Vila Isabel',
          number: '100',
          postalCode: '66666666',
          receiverName: 'bananinha 2',
          reference: null,
          state: 'RJ',
          street: 'Rua Gonzaga Bastos',
        },
      ],
      selectedShippingAddress: address,
      changeSelectedAddressForm: jest.fn(),
      addDeliveryAddress: jest.fn(),
      selectedAddresses: [address],
    }
  })

  it('should render AddressList and components ', function() {
    const wrapper = renderer
      .create(
        <Provider store={store}>
          <IntlProvider
            locale="pt"
            messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
            <ConnectedAddressList {...props} rules={BRA} />
          </IntlProvider>
        </Provider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger changeSelectedAddressForm if click on address-edit', done => {
    const mockChangeSelectedAddressForm = jest.fn()
    const props = {
      address: address,
      changeSelectedAddressForm: mockChangeSelectedAddressForm,
    }
    const wrapper = mountWithIntl(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
          <ConnectedAddressList {...props} rules={BRA} />
        </IntlProvider>
      </Provider>
    )

    const locateEdit = wrapper.find('.address-edit')

    locateEdit.simulate('click')
    process.nextTick(() => {
      try {
        wrapper.update()
        expect(mockChangeSelectedAddressForm).toHaveBeenCalledWith(
          props.selectedAddress[0]
        )
        expect(mockChangeSelectedAddressForm.mock.calls).toHaveLength(1)
      } catch (e) {
        return done(e)
      }
      done()
    })
  })

  it('should trigger addDeliveryAddress if click on address-create', done => {
    const mockAddDeliveryAddress = jest.fn()
    const props = {
      address: newAddress(),
      addDeliveryAddress: mockAddDeliveryAddress,
    }
    const wrapper = mountWithIntl(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'Brazil' } }}>
          <ConnectedAddressList {...props} rules={BRA} />
        </IntlProvider>
      </Provider>
    )

    const locateCreate = wrapper.find('.address-create')

    locateCreate.simulate('click')
    process.nextTick(() => {
      try {
        wrapper.update()
        expect(mockAddDeliveryAddress).toHaveBeenCalledWith(props.address)
        expect(mockAddDeliveryAddress.mock.calls).toHaveLength(1)
      } catch (e) {
        return done(e)
      }
      done()
    })
  })
})
