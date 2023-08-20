import React, { useContext, useState } from 'react'
import { Dropdown } from 'vtex.styleguide'

import EstablishmentContext from '../../context/EstablishmentContext'

interface Props {
  name: string
  label: string
  options: Array<{ value: string | boolean; label: string }>
}

function EstablishmentDropdown({ name, label, options }: Props) {
  const provider = useContext(EstablishmentContext)
  const [text, setText] = useState('')

  const validation = async (event: {
    target: { value?: string | boolean }
  }) => {
    const value = await provider.validationFuntion({
      [name]: event.target.value ?? '',
    })

    setText(value)
  }

  const updateValue = (event: { target: { value?: string | boolean } }) => {
    if (event.target.value === 'true')
      provider.setEstablishment({ [name]: true ?? '' })
    else if (event.target.value === 'false')
      provider.setEstablishment({ [name]: false ?? '' })
    else provider.setEstablishment({ [name]: event.target.value ?? '' })
    validation({ target: { value: event.target.value } })
  }

  if (provider.validationValues[name]) {
    validation({ target: { value: provider.establishment[name] } })
  }

  return (
    <div className="mb5">
      <Dropdown
        name={name}
        label={`${label}*`}
        placeholder={label}
        size="large"
        options={options}
        value={provider.establishment[name] ?? ''}
        onChange={updateValue}
      />
      <p className="mt2" style={{ color: 'red', fontSize: '12px' }}>
        {text}
      </p>
    </div>
  )
}

export default EstablishmentDropdown
