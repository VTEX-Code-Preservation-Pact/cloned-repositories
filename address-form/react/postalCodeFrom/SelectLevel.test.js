import React from 'react'
import { mount } from 'test-utils'
import { IntlProvider } from 'react-intl'

import SelectLevel from './SelectLevel'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'
import MockInput from '../inputs/DefaultInput/__mocks__/Input'
import pt from '../../messages/pt.json'

describe('SelectLevel', () => {
  it('render it right', () => {
    const wrapper = mount(
      <IntlProvider locale="pt" messages={pt}>
        <SelectLevel
          level={0}
          Input={MockInput}
          address={address}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      </IntlProvider>
    )

    expect(wrapper.find('PureInput')).toHaveLength(1)
  })

  it('should call handleChange', () => {
    const Component = jest.fn(({ onChange }) => {
      onChange('Beni')

      return <div />
    })

    const handleChange = jest.fn()

    mount(
      <SelectLevel
        level={0}
        Input={Component}
        address={address}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />
    )

    expect(handleChange).toHaveBeenCalled()
  })

  it('should call handleChange and clear dependent fields', () => {
    const Component = jest.fn(({ onChange }) => {
      onChange('II Región')

      return <div />
    })

    const handleChange = jest.fn()

    mount(
      <SelectLevel
        level={0}
        Input={Component}
        address={{
          ...address,
          state: { value: 'I Región ' },
          city: { value: 'Calama' },
          postalCode: { value: '1390000' },
        }}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />
    )

    expect(handleChange).toHaveBeenCalledWith({
      state: {
        value: 'II Región',
        geolocationAutoCompleted: undefined,
        postalCodeAutoCompleted: undefined,
      },
      city: { value: null },
      neighborhood: { value: null },
      postalCode: { value: null },
    })
  })
})
