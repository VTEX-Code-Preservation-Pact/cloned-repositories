import {
  getCheapestSlas,
  getCombinedSlas,
  getFastestSlas,
} from './lean-shipping-selectors'

import { getSelectedSlaInSlas } from '../utils/SlasUtils'
import mock from './__mocks__/logistics-info-mock.json'

const logisticsInfoMock = mock.orderForm.shippingData.logisticsInfo

describe('Lean Shipping Selectors', () => {
  it('should return combinedSlas from logisticsInfo', () => {
    const result = getCombinedSlas(logisticsInfoMock)

    const selectedSlasFromResult = result.map(li => {
      const selectedSla = getSelectedSlaInSlas(li)
      return {
        selectedSla: li.selectedSla,
        shippingEstimate: selectedSla.shippingEstimate,
        price: selectedSla.price,
      }
    })

    expect(selectedSlasFromResult).toEqual([
      {
        selectedSla: 'Sedex',
        shippingEstimate: '5bd',
        price: 290,
      },
      { selectedSla: 'Sedex', shippingEstimate: '5bd', price: 338 },
      {
        selectedSla: 'Sedex',
        shippingEstimate: '5bd',
        price: 300,
      },
      { selectedSla: 'Sedex', shippingEstimate: '5bd', price: 658 },
    ])
  })

  it('should return cheapest Slas from logisticsInfo', () => {
    const result = getCheapestSlas(logisticsInfoMock)
    const selectedSlasFromResult = result.map(li => {
      const selectedSla = getSelectedSlaInSlas(li)
      return {
        selectedSla: li.selectedSla,
        shippingEstimate: selectedSla.shippingEstimate,
        price: selectedSla.price,
      }
    })

    expect(selectedSlasFromResult).toEqual([
      { price: 257, selectedSla: 'PAC', shippingEstimate: '10bd' },
      { price: 0, selectedSla: 'Expressa', shippingEstimate: '1bd' },
      { price: 265, selectedSla: 'PAC', shippingEstimate: '10bd' },
      { price: 0, selectedSla: 'Expressa', shippingEstimate: '1bd' },
    ])
  })

  it('should return fastest Slas form logisticsInfo', () => {
    const result = getFastestSlas(logisticsInfoMock)

    const selectedSlasFromResult = result.map(li => {
      const selectedSla = getSelectedSlaInSlas(li)
      return {
        selectedSla: li.selectedSla,
        shippingEstimate: selectedSla.shippingEstimate,
        price: selectedSla.price,
      }
    })

    expect(selectedSlasFromResult).toEqual([
      { selectedSla: 'Sedex', shippingEstimate: '5bd', price: 290 },
      { selectedSla: 'Expressa', shippingEstimate: '1bd', price: 0 },
      { selectedSla: 'Sedex', shippingEstimate: '5bd', price: 300 },
      { selectedSla: 'Expressa', shippingEstimate: '1bd', price: 0 },
    ])
  })
})
