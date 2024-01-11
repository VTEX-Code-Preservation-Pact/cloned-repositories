import ScheduledDelivery from './ScheduledDelivery'
import { DELIVERY, SCHEDULED_DELIVERY, CHEAPEST } from '../constants'
import { Provider } from 'react-redux'

import { IntlProvider } from 'react-intl'
import { mount, shallow } from 'enzyme'

import messages from '../../messages/pt.json'

import MockDate from 'mockdate'
import React from 'react'

import 'moment-timezone'
import moment from 'moment'

moment.tz.setDefault('America/Los_Angeles')

describe('ScheduledDelivery', () => {
  let state, store, props

  beforeEach(() => {
    state = {
      componentActivity: {
        triedCompleteOmnishipping: false,
      },
      delivery: {
        activeDeliveryOption: CHEAPEST,
        CHEAPEST: [
          {
            slas: [
              {
                deliveryChannel: DELIVERY,
                name: SCHEDULED_DELIVERY,
                price: 1,
                shippingEstimate: '0bd',
                id: SCHEDULED_DELIVERY,
                availableDeliveryWindows: [
                  {
                    endDateUtc: '2017-07-14T00:00:00+00:00',
                    lisPrice: 200,
                    price: 200,
                    startDateUtc: '2017-07-14T18:00:00+00:00',
                    tax: 20,
                  },
                  {
                    endDateUtc: '2017-07-13T00:00:00+00:00',
                    lisPrice: 200,
                    price: 200,
                    startDateUtc: '2017-07-13T18:00:00+00:00',
                    tax: 20,
                  },
                  {
                    endDateUtc: '2017-07-15T00:00:00+00:00',
                    lisPrice: 200,
                    price: 200,
                    startDateUtc: '2017-07-15T18:00:00+00:00',
                    tax: 20,
                  },
                  {
                    endDateUtc: '2017-07-16T00:00:00+00:00',
                    lisPrice: 200,
                    price: 200,
                    startDateUtc: '2017-07-16T18:00:00+00:00',
                    tax: 20,
                  },
                ],
                deliveryWindow: {
                  endDateUtc: '2017-07-14T18:00:00+00:00',
                  lisPrice: 200,
                  price: 200,
                  startDateUtc: '2017-07-14T15:00:00+00:00',
                  tax: 20,
                },
              },
            ],
          },
        ],
      },
      orderForm: {
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
        shippingData: {
          logisticsInfo: [
            {
              slas: [
                {
                  deliveryChannel: DELIVERY,
                  name: SCHEDULED_DELIVERY,
                  price: 1,
                  shippingEstimate: '0bd',
                  id: SCHEDULED_DELIVERY,
                  availableDeliveryWindows: [
                    {
                      endDateUtc: '2017-07-14T00:00:00+00:00',
                      lisPrice: 200,
                      price: 200,
                      startDateUtc: '2017-07-14T18:00:00+00:00',
                      tax: 20,
                    },
                    {
                      endDateUtc: '2017-07-13T00:00:00+00:00',
                      lisPrice: 200,
                      price: 200,
                      startDateUtc: '2017-07-13T18:00:00+00:00',
                      tax: 20,
                    },
                    {
                      endDateUtc: '2017-07-15T00:00:00+00:00',
                      lisPrice: 200,
                      price: 200,
                      startDateUtc: '2017-07-15T18:00:00+00:00',
                      tax: 20,
                    },
                    {
                      endDateUtc: '2017-07-16T00:00:00+00:00',
                      lisPrice: 200,
                      price: 200,
                      startDateUtc: '2017-07-16T18:00:00+00:00',
                      tax: 20,
                    },
                  ],
                  deliveryWindow: {
                    endDateUtc: '2017-07-14T18:00:00+00:00',
                    lisPrice: 200,
                    price: 200,
                    startDateUtc: '2017-07-14T15:00:00+00:00',
                    tax: 20,
                  },
                },
              ],
            },
          ],
        },
      },
      windowOptions: [
        {
          startDateUtc: '2017-07-14T18:00:00+00:00',
          endDateUtc: '2017-07-14T00:00:00+00:00',
          lisPrice: 100,
        },
      ],
      selectedWindow: {
        endDateUtc: '2017-07-14T12:00:00+00:00',
        lisPrice: 200,
        price: 200,
        startDateUtc: '2017-07-14T06:00:00+00:00',
        tax: 20,
      },
      selectedDate: '2017-07-14T00:00:00+00:00',
      minDate: {
        endDateUtc: '2017-07-14T00:00:00+00:00',
        lisPrice: 200,
        price: 200,
        startDateUtc: '2017-07-14T18:00:00+00:00',
        tax: 20,
      },
      maxDate: {
        endDateUtc: '2017-07-14T00:00:00+00:00',
        lisPrice: 200,
        price: 200,
        startDateUtc: '2017-07-14T18:00:00+00:00',
        tax: 20,
      },
    }
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => state),
    }
    props = {
      selectDeliveryWindow: jest.fn(),
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
      index: 0,
      sla: {
        deliveryChannel: DELIVERY,
        name: SCHEDULED_DELIVERY,
        price: 1,
        shippingEstimate: '0bd',
        id: SCHEDULED_DELIVERY,
        availableDeliveryWindows: [
          {
            endDateUtc: '2017-07-14T00:00:00+00:00',
            lisPrice: 200,
            price: 200,
            startDateUtc: '2017-07-14T18:00:00+00:00',
            tax: 20,
          },
          {
            endDateUtc: '2017-07-13T00:00:00+00:00',
            lisPrice: 200,
            price: 200,
            startDateUtc: '2017-07-13T18:00:00+00:00',
            tax: 20,
          },
          {
            endDateUtc: '2017-07-15T00:00:00+00:00',
            lisPrice: 200,
            price: 200,
            startDateUtc: '2017-07-15T18:00:00+00:00',
            tax: 20,
          },
          {
            endDateUtc: '2017-07-16T00:00:00+00:00',
            lisPrice: 200,
            price: 200,
            startDateUtc: '2017-07-16T18:00:00+00:00',
            tax: 20,
          },
        ],
        deliveryWindow: {
          endDateUtc: '2017-07-14T18:00:00+00:00',
          lisPrice: 200,
          price: 200,
          startDateUtc: '2017-07-14T15:00:00+00:00',
          tax: 20,
        },
      },
    }
  })

  it('should render self and subcomponents', done => {
    MockDate.set(Date.UTC(2017, 6, 14, 18, 0, 0, 0), 180)
    const wrapper = shallow(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
          <ScheduledDelivery {...props} />
        </IntlProvider>
      </Provider>
    )

    process.nextTick(() => {
      try {
        wrapper.update()
        expect(wrapper.getElement()).toMatchSnapshot()
      } catch (e) {
        return done(e)
      }
      done()
    })
  })

  it('should trigger handleRadioChange clicking a time', done => {
    MockDate.set(Date.UTC(2017, 6, 14, 18, 0, 0, 0), 180)

    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider
          locale="pt"
          messages={{ ...messages, ...{ 'country.BRA': 'BRA' } }}>
          <ScheduledDelivery {...props} store={store} />
        </IntlProvider>
      </Provider>
    )

    process.nextTick(() => {
      try {
        wrapper.update()
        const event = { target: { value: '2017-07-14T18:00:00+00:00' } }

        wrapper.find('input[type="radio"]').simulate('change', event)

        expect(wrapper.state('selectedWindow')).toMatchSnapshot()
      } catch (e) {
        return done(e)
      }
      done()
    })
  })
})
