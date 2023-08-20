import React from 'react'
import { render } from '@vtex/test-tools/react'
import NumberOfReviews from './NumberOfReviews'

test("should render when there's zero", () => {
  const { getByText } = render(<NumberOfReviews number={0} linkTo="#foo" />)

  expect(getByText('No Reviews')).toBeTruthy()
})

test("should render when there's reviews", () => {
  const { getByText, rerender } = render(
    <NumberOfReviews number={1} linkTo="#foo" />
  )

  expect(getByText('1 Review')).toBeTruthy()

  rerender(<NumberOfReviews number={2} linkTo="#foo" />)

  expect(getByText('2 Reviews')).toBeTruthy()
})
