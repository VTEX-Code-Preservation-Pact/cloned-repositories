import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useOwnerBlockCssHandles } from 'vtex.render-runtime'

const handleNames = ['numberOfReviews', 'numberOfReviews--zero']

const NumberOfReviews: FunctionComponent<NumberOfReviewsProps> = ({
  number,
  linkTo,
}) => {
  const handles = useOwnerBlockCssHandles(handleNames)

  if (number === 0) {
    return (
      <span
        className={`${handles.numberOfReviews} ${handles['numberOfReviews--zero']} c-muted-2 t-small`}
      >
        <FormattedMessage id="numberOfReviews" values={{ number }} />
      </span>
    )
  }

  return (
    <Link
      to={linkTo || '#reviews'}
      className={`${handles.numberOfReviews} c-link t-small`}
    >
      <FormattedMessage id="numberOfReviews" values={{ number }} />
    </Link>
  )
}

interface NumberOfReviewsProps {
  number: number
  linkTo: string
}

export default NumberOfReviews
