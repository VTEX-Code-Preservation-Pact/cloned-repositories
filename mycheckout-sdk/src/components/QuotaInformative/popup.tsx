import React from 'react'

import Style from './quotaInformative.css'
import useFormatMessage from '../../i18n/useFormatMessage'
import {
  QuotaInformative,
  BagQuotaInformative,
  CardQuotaInformative,
  SelectQuotaInformative,
  Close,
} from '../Icons'

interface PopupProps {
  open: boolean
  handleModal: () => void
}

const Popup = ({ open, handleModal }: PopupProps) => {
  const stop = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return open ? (
    <div className={Style.quotaInformationOverlay} onClick={handleModal}>
      <div className={Style.quotaInformationModalContainer} onClick={stop}>
        <div className={Style.quotaInformationModalClose} onClick={handleModal}>
          <Close />
        </div>
        <div className={Style.quotaInformationModalTitle}>ORION</div>
        <div className={Style.quotaInformationModalDescription}>
          {useFormatMessage('store/quota.modal.quotainformation.description', {
            store: <span>ORION</span>,
          })}
        </div>
        <div className={Style.quotaInformationModalList}>
          <div className={Style.quotaInformationModalItem}>
            <div className={Style.quotaInformationModalItemIcon}>
              <BagQuotaInformative />
            </div>
            <div className={Style.quotaInformationModalItemDescription}>
              {useFormatMessage(
                'store/quota.modal.quotainformation.instruction-1'
              )}
            </div>
          </div>
          <div className={Style.quotaInformationModalItem}>
            <div className={Style.quotaInformationModalItemIcon}>
              <SelectQuotaInformative />
            </div>
            <div className={Style.quotaInformationModalItemDescription}>
              {useFormatMessage(
                'store/quota.modal.quotainformation.instruction-2'
              )}
            </div>
          </div>
          <div className={Style.quotaInformationModalItem}>
            <div className={Style.quotaInformationModalItemIcon}>
              <QuotaInformative />
            </div>
            <div className={Style.quotaInformationModalItemDescription}>
              {useFormatMessage(
                'store/quota.modal.quotainformation.instruction-3'
              )}
            </div>
          </div>
          <div className={Style.quotaInformationModalItem}>
            <div className={Style.quotaInformationModalItemIcon}>
              <CardQuotaInformative />
            </div>
            <div className={Style.quotaInformationModalItemDescription}>
              {useFormatMessage(
                'store/quota.modal.quotainformation.instruction-4'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Popup
