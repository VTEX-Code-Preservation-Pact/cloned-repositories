import React, { Fragment } from 'react'

import EmailForm from './EmailForm'
import useEmailForm from './useEmailForm'

const Email = () => {
  const emailForm = useEmailForm()

  return (
    <Fragment>
      <EmailForm {...emailForm} />
    </Fragment>
  )
}

export default Email
