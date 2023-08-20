import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useOwnerBlockCssHandles } from 'vtex.render-runtime'

const handleNames = ['writeAReview']

const WriteAReview: FunctionComponent<Props> = ({ number, linkTo }) => {
  const handles = useOwnerBlockCssHandles(handleNames)

  return (
    <Link
      to={linkTo || '#reviews'}
      className={`${handles.writeAReview} c-link t-small`}
    >
      <FormattedMessage id="writeAReview" values={{ number }} />
    </Link>
  )
}

interface Props {
  number: number
  linkTo: string
}

export default WriteAReview
