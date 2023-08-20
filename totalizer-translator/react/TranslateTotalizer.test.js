import React from 'react'
import TranslateTotalizer from './TranslateTotalizer'
import { renderWithIntl, cleanup } from '../test-utils' // eslint-disable-line import/named

const TotalizersMock = {
  NoID: {
    name: 'Mock Tax',
    value: 10,
  },
  NoName: {
    id: 'CustomTax',
    name: '',
    value: 10.24,
  },
  Interest: {
    id: 'Interest',
    name: 'Total de juros',
    value: 0,
  },
  CustomTax: {
    id: 'CustomTax',
    name: 'COFINS-RETIDO',
    value: 29.97,
  },
}

describe('TranslateTotalizer', () => {
  afterEach(cleanup)

  it('should translate when a valid id is provided', () => {
    const { getByText } = renderWithIntl(<TranslateTotalizer id="Discounts" />)

    const text = getByText('Discount')
    expect(text).toBeDefined()
  })

  it("should return the id when it's not translated", () => {
    const { getByText } = renderWithIntl(<TranslateTotalizer id="Foo" />)

    const text = getByText('Foo')
    expect(text).toBeDefined()
  })

  it('should allow to pass a totalizer object and translate by its id', () => {
    const { getByText } = renderWithIntl(
      <TranslateTotalizer totalizer={TotalizersMock.Interest} />
    )

    const text = getByText('Interest')
    expect(text).toBeDefined()
  })

  it('should render name if id unknown', () => {
    const { getByText } = renderWithIntl(
      <TranslateTotalizer totalizer={TotalizersMock.CustomTax} />
    )

    const text = getByText('COFINS-RETIDO')
    expect(text).toBeDefined()
  })

  it('should render id as a fallback if no name is present', () => {
    const { getByText } = renderWithIntl(
      <TranslateTotalizer totalizer={TotalizersMock.NoName} />
    )

    const text = getByText('CustomTax')
    expect(text).toBeDefined()
  })

  it('should render name as fallback if no id is present', () => {
    const { getByText } = renderWithIntl(
      <TranslateTotalizer totalizer={TotalizersMock.NoID} />
    )

    const text = getByText('Mock Tax')
    expect(text).toBeDefined()
  })
})
