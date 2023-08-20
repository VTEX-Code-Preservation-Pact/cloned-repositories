import React from 'react'

import style from './myCheckoutButton.css'

interface Props {
  disabled: boolean
  text?: string
  handleClick: () => void
  processShowLogo: () => string
}

export const MyCheckoutButton = ({
  disabled,
  text,
  handleClick,
  processShowLogo,
}: Props) => {
  return (
    <div className={style.myCheckoutButtonContainer}>
      <a onClick={handleClick}>
        <div
          className={
            disabled
              ? style.myCheckoutButtonDisabled
              : style.myCheckoutButtonContent
          }
        >
          <span className={style.myCheckoutButtonText}>
            {text || processShowLogo()}
          </span>
        </div>
      </a>
    </div>
  )
}
