import React from 'react'
import { render } from '@vtex/test-tools/react'

import ApprovedMessage from './Greeting'

test('greets Fred', () => {
  const { queryByText } = render(<ApprovedMessage name="Fred" />)

  expect(queryByText('Hey, Fred')).toBeInTheDocument()
})
