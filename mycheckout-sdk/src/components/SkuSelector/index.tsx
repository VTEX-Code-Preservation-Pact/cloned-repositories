import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import type { IntlShape } from 'react-intl'

import { Alert, Button } from '../shared'
import { formatter } from '../../utils'
import type { LoadingAlertProps } from './useSkuSelector'
import SkuSelector from './SkuSelector/SkuSelectorContainer'
import type { ProductItem } from '../../interfaces'
import styles from './skuSelector.module.css'

interface Props {
  disabled: boolean
  intl: IntlShape
  loadingAlert: LoadingAlertProps
  selectedItem: ProductItem
  handleClickAlert: () => void
  handleClickClose: () => void
  handleClickContinue: () => void
  setDisabled: Dispatch<SetStateAction<boolean>>
}

const index = (props: Props) => {
  const {
    disabled,
    intl,
    loadingAlert,
    selectedItem,
    handleClickAlert,
    handleClickClose,
    handleClickContinue,
    setDisabled,
  } = props

  return (
    <div className={styles.skuSelectorContainer}>
      {loadingAlert?.loading && (
        <Alert
          className={styles.skuSelectorAlert}
          type="warning"
          text={loadingAlert.message}
        />
      )}
      <div className={styles.skuSelectorInfo}>
        <div className={styles.skuSelectorContentImage}>
          <img
            src={selectedItem?.images[0]?.imageUrl}
            alt={selectedItem?.images[0]?.imageText}
          />
        </div>
        <div className={styles.skuSelectorInfoDetail}>
          <div className={styles.skuSelectorDetail}>
            <p>
              {selectedItem?.nameComplete
                ? selectedItem?.nameComplete
                : selectedItem?.name}
            </p>
            <p>
              {formatter.format(
                selectedItem?.sellers[0]?.commertialOffer?.Price
              )}
            </p>
          </div>
          <SkuSelector setDisabled={setDisabled} />
        </div>
      </div>
      <div className={styles.skuSelectorActionsContent}>
        <Button
          value={'store/checkoutless.attachment.add'}
          onClick={handleClickContinue}
          disabled={disabled}
        />

        <a
          className={styles.skuSelectorlinkAdd}
          onClick={disabled ? handleClickAlert : handleClickClose}
        >
          {intl.formatMessage({ id: 'store/checkoutless.skuSelector.close' })}
        </a>
      </div>
    </div>
  )
}

export default index
