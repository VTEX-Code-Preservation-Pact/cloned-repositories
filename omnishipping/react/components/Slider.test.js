import React from 'react'
import Slider from './Slider'
import Slide from './Slide'
import { IntlProvider } from 'react-intl'
import { shallow } from 'enzyme'
import { loadTranslation } from 'enzyme-react-intl'
import messages from '../../messages/pt.json'

loadTranslation('../../messages/en.json')

describe('Slider', () => {
  it('Should render correct number of items', () => {
    const props = {
      intl: {},
      selectedPackages: null,
      selectedDeliveryPackageSlider: 0,
      onHandleSetSelectedPackage: jest.fn(),
    }

    const wrapper = shallow(
      <IntlProvider locale="pt" messages={messages}>
        <Slider {...props}>
          <Slide>
            <div className="package-item">test</div>
          </Slide>
          <Slide>
            <div className="package-item">test</div>
          </Slide>
        </Slider>
      </IntlProvider>
    )

    wrapper.setState({
      showSlider: true,
    })

    expect(wrapper.find('.package-item')).toHaveLength(2)
  })
})
