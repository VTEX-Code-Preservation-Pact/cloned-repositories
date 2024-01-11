import { loadTranslation, shallowWithIntl } from 'enzyme-react-intl'

import { ProductItems } from './ProductItems'
import React from 'react'

loadTranslation('../../messages/en.json')

describe('ProductItems', () => {
  it('should render self and subcomponents', () => {
    const props = {
      items: [
        {
          name: 'title',
          imageUrl:
            'https://basedevmkp.vteximg.com.br/arquivos/ids/168552-55-55/3413316.jpg',
          uniqueId: '10',
        },
      ],
    }
    const wrapper = shallowWithIntl(<ProductItems {...props} />)

    expect(wrapper.find('img').prop('src')).toBe(
      '//basedevmkp.vteximg.com.br/arquivos/ids/168552-50-50'
    )

    expect(wrapper.find('img').prop('alt')).toBe('title')
  })
})
