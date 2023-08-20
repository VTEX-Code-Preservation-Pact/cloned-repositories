import React from 'react'

import AccessKeyForm from './AccessKeyForm'
import useAccessKeyForm from './useAccessKeyForm'

const AccessKeyFormContainer = () => {
  const accessKeyFormProps = useAccessKeyForm()

  return <AccessKeyForm {...accessKeyFormProps} />
}

export default AccessKeyFormContainer
