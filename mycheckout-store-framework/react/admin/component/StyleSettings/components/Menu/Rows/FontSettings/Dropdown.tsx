import React, { useState } from 'react'
import { IconCaretDown } from 'vtex.styleguide'

import styles from './styles.css'

interface Option {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface Props {
  options: Option[]
  button?: JSX.Element
  value: string
}

export const Dropdown = ({ options, button, value }: Props) => {
  const [showOptions, setShowOptions] = useState(false)

  const handleClick = (option: Option) => {
    if (option?.onClick) {
      option.onClick()
    }

    setShowOptions(!showOptions)
  }

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownInputContainer}>
        <button
          className={styles.dropdownInput}
          onClick={() => setShowOptions(!showOptions)}
          onBlur={() => setTimeout(() => setShowOptions(false), 200)}
        >
          <p>{value}</p>
        </button>
        <div
          className={`c-action-primary ${styles.dropdownInputIconContainer}`}
        >
          <IconCaretDown />
        </div>
      </div>

      {showOptions && (
        <div className={styles.modalContainer}>
          {button && (
            <div className={styles.dropdownButtonContainer}>{button}</div>
          )}

          <div className={styles.dropdownElementContainer}>
            {options.map((option, i) => (
              <div
                key={`${option.label}_${i}`}
                className={`${styles.dropdownElement} ${
                  value && styles.labelContainer
                }`}
              >
                <button
                  className={`${styles.dropdownButton} ${
                    value === option.label && styles.dropdownButtonSelected
                  } `}
                  disabled={option?.disabled}
                  onClick={() => handleClick(option)}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
