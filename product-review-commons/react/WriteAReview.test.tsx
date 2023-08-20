import React from 'react'
import { render } from '@vtex/test-tools/react'
import WriteAReview from './WriteAReview'

test("should render when there's zero", () => {
  const { getByText } = render(<WriteAReview number={0} linkTo="#foo" />)

  expect(getByText('Write the first review')).toBeTruthy()
})

test("should render when there's reviews", () => {
  const { getByText } = render(<WriteAReview number={1} linkTo="#foo" />)

  expect(getByText('Write a review')).toBeTruthy()
})
