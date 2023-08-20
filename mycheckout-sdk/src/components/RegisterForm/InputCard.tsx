import React from 'react'

import vtexStyles from './vtex-styles.module.css'
import kuikpayStyles from './kuikpay-styles.module.css'
import genericStyles from './generic-styles.module.css'

interface InputCardProps {
  theme: string
  isValid: boolean | null
  imgCard?: string | null
  itemId: string
}

const InputCard = (props: InputCardProps) => {
  const {
    theme,
    isValid,
    itemId,
    // imgCard
  } = props

  let styles = kuikpayStyles

  if (theme === 'vtex') {
    styles = vtexStyles
  } else if (theme === 'generic') {
    styles = genericStyles
  }

  return (
    <div
      id={`card-number-container${itemId}`}
      className={styles.secureField__inputContainer}
    >
      <div
        id={`card-number-placeholder${itemId}`}
        className={`${styles.secureField__input} ${
          isValid === false ? styles.secureFieldInvalidLite : null
        } ${isValid === true ? styles.secureFieldValidLite : null} ${
          styles.secureFieldLite
        }`}
      ></div>
    </div>
  )
}

export default InputCard
