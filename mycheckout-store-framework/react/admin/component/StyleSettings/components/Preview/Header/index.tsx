import React from 'react'
import { ActionMenu, Divider } from 'vtex.styleguide'
import { useIntl, messages, defineMessages } from 'react-intl'

import DesktopIcon from '../../../../../assets/icons/desktop.svg'
import PhoneIcon from '../../../../../assets/icons/mobile.svg'
import styles from './styles.css'
import { useStyleSettings } from '../../../hooks'

const messages = defineMessages({
  modalLabel: { id: 'checkoutless.styleSettings.preview-modal' },
  buttonLabel: { id: 'checkoutless.styleSettings.preview-button' },
  buttonDesignLabel: { id: 'checkoutless.styleSettings.preview-button-design' },
  modalDesignLabel: { id: 'checkoutless.styleSettings.preview-modal-design' },
})

export const Header = () => {
  const { formatMessage } = useIntl()
  const {
    deviceSelected,
    componentSelected,
    setComponentSelected,
    setDeviceSelected,
  } = useStyleSettings()

  const options = [
    {
      label: formatMessage(messages.buttonDesignLabel),
      onClick: () => setComponentSelected('payButton'),
    },
    {
      label: formatMessage(messages.modalDesignLabel),
      onClick: () => setComponentSelected('modal'),
    },
  ]

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <ActionMenu
          label={formatMessage(
            componentSelected === 'payButton'
              ? messages.buttonLabel
              : messages.modalLabel
          )}
          align="left"
          buttonProps={{
            variation: 'tertiary',
          }}
          options={options}
        />
      </div>

      <div className={styles.devicesContainer}>
        <button
          data-selected={deviceSelected === 'mobile'}
          onClick={() => {
            setDeviceSelected('mobile')
          }}
        >
          <img src={PhoneIcon} alt="mobile" />
        </button>
        <button
          data-selected={deviceSelected === 'desktop'}
          onClick={() => {
            setDeviceSelected('desktop')
          }}
        >
          <img src={DesktopIcon} alt="desktop" />
        </button>
      </div>
      <div className="mv6">
        <Divider orientation="horizontal" />
      </div>
    </div>
  )
}
