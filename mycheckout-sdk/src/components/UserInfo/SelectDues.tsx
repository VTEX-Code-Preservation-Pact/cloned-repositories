import React from 'react'
import { useDispatch } from 'react-redux'

import { setInstallments } from '../../contexts/global-context/reducers/orderFormDataSlice'
import type { InstallmentOptionsSimulation } from '../../interfaces/simulation'
import { Select } from '../shared'
import styles from './userInfo-module.css'

interface Props {
  className?: string
  dues: any
  installments: InstallmentOptionsSimulation[]
  showPlaceholder?: boolean
}

export const SelectDues = (props: Props) => {
  const { dues, installments, showPlaceholder = true } = props
  const dispatch = useDispatch()

  const onBlurDues = () => {
    dues.setIsValid(!!dues?.value && dues?.value?.value !== '')
  }

  const onChange = () => {
    if (dues?.value?.value) {
      dispatch(setInstallments(Number.parseInt(dues?.value?.value, 10)))
    }
  }

  const duesOptions = installments?.map(({ count }) => {
    return {
      label: `${count}`,
      value: `${count}`,
    }
  })

  return (
    <div className={`${props.className} ${styles.selectDuesContainer}`}>
      <Select
        errorMessage="store/checkoutless.register.card.duesError"
        isDisabled={installments.length === 0}
        isLoading={false}
        onBlur={onBlurDues}
        onInputChange={onChange}
        options={duesOptions}
        placeholder={`${
          showPlaceholder ? 'store/checkoutless.register.card.dues' : ''
        }`}
        {...dues}
      />
    </div>
  )
}
