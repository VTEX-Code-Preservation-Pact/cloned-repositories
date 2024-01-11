import {
  newAddress,
  addPostalCodeAutoCompleted,
  removePostalCodeAutoCompleted,
} from './AddressFormUtils'
import MockDate from 'mockdate'
import getGGUID from './Gguid'
import { addValidation } from '@vtex/address-form/lib/transforms/address'
describe('newAddress', () => {
  it('should return country past as parameter', () => {
    MockDate.set(Date.UTC(2017, 6, 14, 18, 0, 0, 0), 180)
    const country = 'ARG'
    const addressId = getGGUID()
    const expectedResultAddress = {
      addressId,
      addressType: 'residential',
      city: null,
      complement: null,
      country: 'ARG',
      geoCoordinates: [],
      neighborhood: null,
      number: null,
      postalCode: null,
      receiverName: null,
      reference: null,
      state: null,
      street: null,
      addressQuery: '',
    }

    expect(
      JSON.stringify(
        newAddress({
          addressId,
          country,
        })
      )
    ).toEqual(JSON.stringify(expectedResultAddress))
  })

  it('should return address with postalCodeAutoCompleted', () => {
    MockDate.set(Date.UTC(2017, 6, 14, 18, 0, 0, 0), 180)
    const country = 'ARG'
    const addressId = getGGUID()

    const expectedResultAddress = {
      addressId: { value: addressId },
      addressType: { value: 'residential' },
      city: { value: null },
      complement: { value: null },
      country: {
        value: 'ARG',
        postalCodeAutoCompleted: true,
      },
      geoCoordinates: { value: [] },
      neighborhood: { value: 'eita', postalCodeAutoCompleted: true },
      number: { value: '1234' },
      postalCode: { value: null },
      receiverName: { value: null },
      reference: { value: null },
      state: { value: null },
      street: { value: null },
      addressQuery: { value: '' },
    }

    const result = JSON.stringify(
      addPostalCodeAutoCompleted(
        addValidation(
          newAddress({
            addressId,
            country,
            neighborhood: 'eita',
            number: '1234',
          })
        )
      )
    )

    expect(result).toEqual(JSON.stringify(expectedResultAddress))
  })

  it('should return address without postalCodeAutoCompleted', () => {
    MockDate.set(Date.UTC(2017, 6, 14, 18, 0, 0, 0), 180)
    const country = 'ARG'
    const addressId = getGGUID()

    const expectedResultAddress = {
      addressId: { value: addressId },
      addressType: { value: 'residential' },
      city: { value: null },
      complement: { value: null },
      country: { value: 'ARG' },
      geoCoordinates: { value: [] },
      neighborhood: { value: 'eita' },
      number: { value: '1234' },
      postalCode: { value: null },
      receiverName: { value: null },
      reference: { value: null },
      state: { value: null },
      street: { value: null },
      addressQuery: { value: '' },
    }

    const result = JSON.stringify(
      removePostalCodeAutoCompleted({
        addressId: { value: addressId },
        addressType: { value: 'residential' },
        city: { value: null },
        complement: { value: null },
        country: { value: country },
        geoCoordinates: { value: [] },
        neighborhood: {
          value: 'eita',
          postalCodeAutoCompleted: true,
        },
        number: {
          value: '1234',
        },
        postalCode: { value: null },
        receiverName: { value: null },
        reference: { value: null },
        state: { value: null },
        street: { value: null },
        addressQuery: { value: '' },
      })
    )

    expect(result).toEqual(JSON.stringify(expectedResultAddress))
  })
})
