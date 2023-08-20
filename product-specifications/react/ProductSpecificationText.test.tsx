import React from 'react'
import { render } from '@vtex/test-tools/react'
import { useProduct, ProductContext } from 'vtex.product-context'

import ProductSpecificationGroup from './ProductSpecificationGroup'
import ProductSpecification from './ProductSpecification'
import ProductSpecificationValues from './ProductSpecificationValues'
import ProductSpecificationText from './ProductSpecificationText'

const mockUseProduct = useProduct as jest.Mock<ProductContext>

test('ProductSpecificationText should render only the context it has available', () => {
  mockUseProduct.mockImplementation(() => ({
    product: {
      specificationGroups: [
        {
          name: 'Group',
          originalName: 'Group',
          specifications: [
            {
              name: 'Specification 1',
              originalName: 'Specification 1',
              values: ['Value 1'],
            },
          ],
        },
      ],
    },
  }))

  const { getByText, queryByText, rerender } = render(
    <ProductSpecificationGroup>
      <ProductSpecificationText message="{groupName} {specificationName} {specificationValue}" />
    </ProductSpecificationGroup>
  )

  expect(getByText('Group')).toBeInTheDocument()
  expect(queryByText('Specification 1')).not.toBeInTheDocument()
  expect(queryByText('Value 1')).not.toBeInTheDocument()

  rerender(
    <ProductSpecificationGroup>
      <ProductSpecification>
        <ProductSpecificationText message="{groupName} {specificationName} {specificationValue}" />
      </ProductSpecification>
    </ProductSpecificationGroup>
  )

  expect(getByText('Group')).toBeInTheDocument()
  expect(getByText('Specification 1')).toBeInTheDocument()
  expect(queryByText('Value 1')).not.toBeInTheDocument()

  rerender(
    <ProductSpecificationGroup>
      <ProductSpecification>
        <ProductSpecificationValues>
          <ProductSpecificationText message="{groupName} {specificationName} {specificationValue}" />
        </ProductSpecificationValues>
      </ProductSpecification>
    </ProductSpecificationGroup>
  )

  expect(getByText('Group')).toBeInTheDocument()
  expect(getByText('Specification 1')).toBeInTheDocument()
  expect(getByText('Value 1')).toBeInTheDocument()
})

test('ProductSpecificationText should render first and last handles', () => {
  mockUseProduct.mockImplementation(() => ({
    product: {
      specificationGroups: [
        {
          name: 'Group',
          originalName: 'Group',
          specifications: [
            {
              name: 'Specification 1',
              originalName: 'Specification 1',
              values: ['Value 1', 'Value 2', 'Value 3'],
            },
          ],
        },
      ],
    },
  }))

  const Text = ({ message }: { message: string }) => (
    <ProductSpecificationGroup>
      <ProductSpecification>
        <ProductSpecificationValues>
          <ProductSpecificationText message={message} />
        </ProductSpecificationValues>
      </ProductSpecification>
    </ProductSpecificationGroup>
  )

  const { getByText, queryByText, rerender } = render(
    <Text message="{isFirstSpecificationValue, select, true {{specificationValue}} other { }}" />
  )

  expect(getByText('Value 1')).toBeInTheDocument()
  expect(getByText('Value 1')).toHaveClass('specificationValue--first')
  expect(getByText('Value 1')).not.toHaveClass('specificationValue--last')
  expect(queryByText('Value 2')).not.toBeInTheDocument()
  expect(queryByText('Value 3')).not.toBeInTheDocument()

  rerender(
    <Text message="{isLastSpecificationValue, select, false {{isFirstSpecificationValue, select, false {{specificationValue}} other { } }} other { }}" />
  )

  expect(queryByText('Value 1')).not.toBeInTheDocument()
  expect(getByText('Value 2')).toBeInTheDocument()
  expect(getByText('Value 2')).not.toHaveClass('specificationValue--first')
  expect(getByText('Value 2')).not.toHaveClass('specificationValue--last')
  expect(queryByText('Value 3')).not.toBeInTheDocument()

  rerender(
    <Text message="{isLastSpecificationValue, select, true {{specificationValue}} other { }}" />
  )
  expect(queryByText('Value 1')).not.toBeInTheDocument()
  expect(queryByText('Value 2')).not.toBeInTheDocument()
  expect(getByText('Value 3')).toBeInTheDocument()
  expect(getByText('Value 3')).not.toHaveClass('specificationValue--first')
  expect(getByText('Value 3')).toHaveClass('specificationValue--last')
})
