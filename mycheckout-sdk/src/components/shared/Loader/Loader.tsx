import React, { Fragment } from 'react'

import { MycheckoutSymbolAnimation } from '../../Animations'
import useFormatMessage from '../../../i18n/useFormatMessage'
import globalStyles from '../../../myCheckout-styles.module.css'
import style from './loader.module.css'

interface Props {
  text?: string
}

const Loader = ({ text }: Props) => {
  return (
    <Fragment>
      <div className={style.placeholder} />
      <div className={style.loading}>
        <MycheckoutSymbolAnimation />
        {text && (
          <p className={`${style.message} ${globalStyles.textXl}`}>
            {useFormatMessage(text)}
          </p>
        )}
      </div>
    </Fragment>
  )
}

export default Loader
