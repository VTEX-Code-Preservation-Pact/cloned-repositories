import React from 'react'
import { shallow, mount } from 'test-utils'

import AddressSubmitter from './AddressSubmitter'
import fbAddress from './__mocks__/facebookAddress'
import { addValidation } from './transforms/address'
import usaRules from './country/USA'

describe('AddressSubmitter', () => {
  let onSub
  let onCA
  let address
  let wrapper
  let Component

  beforeEach(() => {
    onSub = jest.fn()
    onCA = jest.fn()
    address = addValidation(fbAddress)
    Component = (
      <AddressSubmitter
        onSubmit={onSub}
        onChangeAddress={onCA}
        address={address}
        rules={usaRules}
      >
        {(onSubmit) => <button className="unique" onClick={onSubmit} />}
      </AddressSubmitter>
    )
    wrapper = shallow(Component).dive().dive()
  })

  it('should render without crashing', () => {
    expect(() => mount(Component)).not.toThrow()
  })

  it('should render its children', () => {
    expect(wrapper.find('.unique')).toHaveLength(1)
  })

  it('should call the received onSubmit function on submission', () => {
    wrapper.find('button').simulate('click')

    expect(onSub).toHaveBeenCalled()
  })

  it('should call the received onChangeAddress function on submission', () => {
    wrapper.find('button').simulate('click')

    expect(onCA).toHaveBeenCalled()
  })

  it('should correctly validate the received address', () => {
    wrapper.find('button').simulate('click')

    expect(onSub).toHaveBeenCalledWith(true, expect.any(Object))
  })
})
