import React, { useContext, useState } from 'react'
import { Input } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'

interface Props {
  name: string
  placeholder?: string
  label?: string
  type?: string
  maxLength?: number
}

function EstablishmentInput({
  name,
  placeholder,
  label,
  type = 'string',
  maxLength,
}: Props) {
  const provider = useContext(EstablishmentContext)
  const [text, setText] = useState('')

  const updateValue = (event: { target: { value?: string } }) => {
    provider.setEstablishment({ [name]: event.target.value ?? '' })
  }

  let required = label

  if (name !== 'suframa' && name !== 'phone') required = `${label}*`

  const validation = async (event: {
    target: { value?: string | boolean }
  }) => {
    const value = await provider.validationFuntion({
      [name]: event.target.value ?? '',
    })

    setText(value)
  }

  if (provider.validationValues[name]) {
    validation({ target: { value: provider.establishment[name] } })
  }

  return (
    <div className="mb3">
      <Input
        name={name}
        placeholder={placeholder}
        label={required}
        size="large"
        value={provider.establishment[name] ?? ''}
        onChange={updateValue}
        type={type}
        onBlur={validation}
        maxLength={maxLength}
      />
      <p className="mt2" style={{ color: 'red', fontSize: '12px' }}>
        {text}
      </p>
    </div>
  )
}

export default EstablishmentInput
