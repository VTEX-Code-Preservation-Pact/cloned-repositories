import React from 'react'

import RegisterForm from './RegisterForm'
import useRegisterForm from './useRegisterForm'

const RegisterFormContainer = () => {
  const registerFormProps = useRegisterForm()

  return <RegisterForm {...registerFormProps} />
}

export default RegisterFormContainer
