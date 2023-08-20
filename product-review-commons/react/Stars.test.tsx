import React from 'react'
import { render } from '@vtex/test-tools/react'
import Stars from './Stars'

test('should render stars', () => {
  const { container, rerender } = render(<Stars rating={0} />)
  let empty = container.querySelectorAll('.star--empty')
  expect(empty).toHaveLength(5)

  rerender(<Stars rating={1} />)
  let filled = container.querySelectorAll('.star--filled')
  empty = container.querySelectorAll('.star--empty')
  expect(filled).toHaveLength(1)
  expect(empty).toHaveLength(4)

  rerender(<Stars rating={2} />)
  filled = container.querySelectorAll('.star--filled')
  empty = container.querySelectorAll('.star--empty')
  expect(filled).toHaveLength(2)
  expect(empty).toHaveLength(3)

  rerender(<Stars rating={3} />)
  filled = container.querySelectorAll('.star--filled')
  empty = container.querySelectorAll('.star--empty')
  expect(filled).toHaveLength(3)
  expect(empty).toHaveLength(2)

  rerender(<Stars rating={4} />)
  filled = container.querySelectorAll('.star--filled')
  empty = container.querySelectorAll('.star--empty')
  expect(filled).toHaveLength(4)
  expect(empty).toHaveLength(1)

  rerender(<Stars rating={5} />)
  filled = container.querySelectorAll('.star--filled')
  empty = container.querySelectorAll('.star--empty')
  expect(filled).toHaveLength(5)
  expect(empty).toHaveLength(0)
})
