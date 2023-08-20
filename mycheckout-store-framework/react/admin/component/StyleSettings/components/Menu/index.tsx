import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'vtex.styleguide'
import { messages, defineMessages, useIntl } from 'react-intl'

import { PayButtonMenu } from './PayButtonMenu'
import { ModalMenu } from './ModalMenu'
import { useStyleSettings } from '../../hooks'
import styles from './styles.css'

const messages = defineMessages({
  saveLabel: {
    id: 'checkoutless.button-save',
  },
  restoreLabel: {
    id: 'checkoutless.button-restore',
  },
  yesLabel: {
    id: 'checkoutless.button-yes',
  },
  cancelLabel: {
    id: 'checkoutless.button-cancel',
  },
  restoreConfirmationMessage: {
    id: 'checkoutless.styleSettings.menu-restore-confirmation-message',
  },
  updateConfirmationMessage: {
    id: 'checkoutless.styleSettings.menu-update-confirmation-message',
  },
  updateSuccessMessage: {
    id: 'checkoutless.styleSettings.success-update-styles',
  },
  restoreSuccessMessage: {
    id: 'checkoutless.styleSettings.success-restore-styles',
  },
})

export const Menu = () => {
  const {
    componentSelected,
    updateStyles,
    restoreStyles,
    setAlert,
    loadingStyles,
  } = useStyleSettings()

  const { formatMessage } = useIntl()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoadinConfirmBtn, setIsLoadinConfirmBtn] = useState(false)
  const [modalMessage, setModalMessage] = useState({
    title: {
      id: '',
    },
    description: {
      id: '',
    },
  })

  const handleCloseModal = () => setIsModalOpen(false)

  const handleOpenModal = (
    title: { id: string },
    description: { id: string }
  ) => {
    setModalMessage({ title, description })
    setIsModalOpen(true)
  }

  const handleUpdateStyles = async () => {
    setIsLoadinConfirmBtn(true)
    await updateStyles()
    setIsLoadinConfirmBtn(false)
    handleCloseModal()
    setAlert({
      message: messages.updateSuccessMessage,
      type: 'success',
    })
  }

  const handleRestoreStyles = async () => {
    setIsLoadinConfirmBtn(true)
    await restoreStyles()
    setIsLoadinConfirmBtn(false)
    handleCloseModal()
    setAlert({
      message: messages.restoreSuccessMessage,
      type: 'success',
    })
  }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.settingsContainer}>
        {loadingStyles ? (
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        ) : componentSelected === 'payButton' ? (
          <PayButtonMenu />
        ) : (
          <ModalMenu />
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <div className="mb3">
          <Button
            variation="primary"
            onClick={() =>
              handleOpenModal(
                messages.saveLabel,
                messages.updateConfirmationMessage
              )
            }
            block
          >
            {formatMessage(messages.saveLabel)}
          </Button>
        </div>
        <div>
          <Button
            variation="secondary"
            onClick={() =>
              handleOpenModal(
                messages.restoreLabel,
                messages.restoreConfirmationMessage
              )
            }
            block
          >
            {formatMessage(messages.restoreLabel)}
          </Button>
          <Modal
            isOpen={isModalOpen}
            title={modalMessage.title.id && formatMessage(modalMessage.title)}
            responsiveFullScreen
            bottomBar={
              <div className="nowrap">
                <span className="mr4">
                  <Button variation="tertiary" onClick={handleCloseModal}>
                    {formatMessage(messages.cancelLabel)}
                  </Button>
                </span>
                <span>
                  <Button
                    variation="primary"
                    onClick={
                      modalMessage.title === messages.restoreLabel
                        ? handleRestoreStyles
                        : handleUpdateStyles
                    }
                    isLoading={isLoadinConfirmBtn}
                  >
                    {formatMessage(messages.yesLabel)}
                  </Button>
                </span>
              </div>
            }
            onClose={handleCloseModal}
          >
            <div className="flex flex-column flex-row-ns">
              {modalMessage.description.id && (
                <p>{formatMessage(modalMessage.description)}</p>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}
