import React from 'react'
import { shallowWithIntl, loadTranslation } from 'enzyme-react-intl'

import { WaitingState } from './WaitingState'

loadTranslation('../../messages/en.json')

describe('WaitingState', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallowWithIntl(<WaitingState />)

    expect(wrapper.getElement()).toMatchSnapshot()
  })
})
