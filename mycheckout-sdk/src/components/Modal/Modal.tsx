import React, { Fragment } from 'react'

import Portal from '../Portal'
import { Alert } from '../shared'
import { ModalSteps } from './ModalSteps'
import FloatingButton from '../FloatingButton'
import Header from '../Header/HeaderContainer'
import type { ResponseValidateItem } from '../../interfaces'
import styles from './modal.css'

interface Props {
  errorOrder: string
  isFullscreen: boolean
  isModalOpen: boolean
  showFloatButton: boolean
  showingBuyButton: boolean
  clearOrderFormProfile: () => void
  validateItems?: () => ResponseValidateItem[] | []
}

export const Modal = ({
  errorOrder,
  isFullscreen,
  isModalOpen,
  showFloatButton,
  showingBuyButton,
  clearOrderFormProfile,
  validateItems,
}: Props) => {
  return (
    <Fragment>
      {isModalOpen && (
        <Portal>
          <div
            id="kuikpay-modal"
            className={`${styles.modalContainer} ${
              isFullscreen ? styles.modalFull : styles.modalAuto
            }`}
          >
            <Header clearOrderFormProfile={clearOrderFormProfile} />
            <div
              className={styles.modalBodyWrapper}
              data-showing-buy={showingBuyButton}
            >
              {errorOrder && (
                <Alert
                  duration={20}
                  enableAutoClose={true}
                  text="store/checkoutless.register.checkoutErrorTitle"
                  description="store/checkoutless.register.checkoutError"
                  type="relevant"
                  className="containerRelevant"
                  classNameText="textRelevant"
                  classNameDescription="textRelevant"
                />
              )}

              <ModalSteps validateItems={validateItems} />
            </div>
          </div>
        </Portal>
      )}
      {showFloatButton && (
        <Portal>
          <div className={styles.modal}>
            <FloatingButton />
          </div>
        </Portal>
      )}
    </Fragment>
  )
}
