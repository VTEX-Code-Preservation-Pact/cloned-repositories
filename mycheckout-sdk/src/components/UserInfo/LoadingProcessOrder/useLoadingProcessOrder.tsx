import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import { useUserData } from '../../../contexts/UserDataProvider'
import { processInfoPackages } from '../../../utils/packages'
import {
  selectIsMobile,
  selectSettings,
} from '../../../contexts/global-context/reducers/uiSettingsSlice'
import {
  selectDeliveryAddress,
  selectLogisticsInfo,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import { selectTotalValue } from '../../../contexts/global-context/reducers/simulationSlice'

const useLoadingProcessOrder = () => {
  const { slas } = useUserData()
  const total = useSelector(selectTotalValue)
  const intl = useIntl()
  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)
  const logisticsInfo = useSelector(selectLogisticsInfo)
  const selectedAddress = useSelector(selectDeliveryAddress)

  const { summaryChangeLogistics, packagesSummary } = processInfoPackages({
    logisticsInfo,
    intl,
    slas,
  })

  const { deliveryType } = packagesSummary?.[0]

  const changeDelivery = summaryChangeLogistics?.[0]

  const logisticInfo = logisticsInfo?.find(
    (logisticInfoItem) =>
      logisticInfoItem?.selectedDeliveryChannel === 'pickup-in-point'
  )

  return {
    changeDelivery,
    deliveryType,
    isLiteVersion,
    isMobile,
    logisticsInfo,
    packagesSummary,
    selectedAddress,
    slas,
    storeInfo: logisticInfo?.storeName || '',
    summaryChangeLogistics,
    total,
  }
}

export default useLoadingProcessOrder
