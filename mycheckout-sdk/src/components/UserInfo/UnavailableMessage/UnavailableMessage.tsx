import React, { Fragment } from 'react'

import { Alert } from '../../shared'

interface Props {
  hasError: boolean
  handleClick: () => void
}

const UnavailableMessage = ({ hasError, handleClick }: Props) => {
  return (
    <Fragment>
      {hasError && (
        <Alert
          type="error"
          text="store/checkoutless.userInfo.unavailableProducts"
          link="store/checkoutless.userInfo.unavailableLink"
          handleClick={handleClick}
        />
      )}
    </Fragment>
  )
}

export default UnavailableMessage
