import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'

import {
  selectIsMobile,
  selectSettings,
} from '../../../contexts/global-context/reducers/uiSettingsSlice'
import { usePackagesManager } from '../Packages/usePackagesManager'
import useLogisticBlock from '../../../hooks/useLogisticBlock'
import { selectAddressStore } from '../../../contexts/global-context/reducers/orderFormDataSlice'

const useDeliveryChannel = () => {
  const { packageManager } = usePackagesManager()
  const { logisticsBlocked } = useLogisticBlock()
  const addressAlternative = useSelector(selectAddressStore)
  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const intl = useIntl()

  const availableDelivery = useMemo(
    () =>
      !!packageManager.delivery.currentItems.length &&
      !(logisticsBlocked && addressAlternative),
    [packageManager.delivery]
  )

  const availablePickUp = useMemo(
    () =>
      !!packageManager.pickUp.currentItems.length &&
      !(logisticsBlocked && addressAlternative),
    [packageManager.pickUp]
  )

  return {
    availableDelivery,
    availablePickUp,
    intl,
    isLiteVersion,
    isMobile,
  }
}

export default useDeliveryChannel
