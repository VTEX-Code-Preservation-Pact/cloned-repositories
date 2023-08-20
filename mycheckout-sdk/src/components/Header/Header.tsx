import React, { Fragment } from 'react'

import { LiteClose, ArrowBack } from '../Icons'
import { LogoMyCheckout } from '../Icons/LogoMycheckout'
import global from '../../myCheckout-styles.module.css'
import styles from './header.css'

interface Props {
  className?: string
  hideBackArrow: boolean
  loadingOrder: boolean
  handleMinimize: () => void
  onClick: () => void
}

const Header = ({
  className,
  hideBackArrow,
  loadingOrder,
  handleMinimize,
  onClick,
}: Props) => {
  return (
    <div className={`${styles.headerContainer} ${className}`}>
      {!loadingOrder && (
        <Fragment>
          <div className={`${styles.headerContent} ${styles.headerBoxShadow}`}>
            <div className={styles.headerFlex}>
              {hideBackArrow && (
                <a onClick={onClick}>
                  <ArrowBack
                    className={`${global.cursorPointer} ${styles.headerIcon}`}
                    fill={global.iconAlternative}
                  />
                </a>
              )}
            </div>

            <LogoMyCheckout className={styles.headerLogo} />

            <div className={`${styles.headerIconClose} ${styles.headerFlex}`}>
              <a onClick={handleMinimize}>
                <LiteClose
                  className={`${global.cursorPointer} ${styles.headerIcon}`}
                  background={global.iconBackground}
                  fill={global.iconAlternative}
                />
              </a>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Header
