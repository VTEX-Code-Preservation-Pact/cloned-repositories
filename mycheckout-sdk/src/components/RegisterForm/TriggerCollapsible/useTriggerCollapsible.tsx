import { useUserData } from '../../../contexts/UserDataProvider'
import type { Section } from '../../ViewValidate'

const useTriggerCollapsible = (id: Section) => {
  const userData = useUserData()

  const validateAddressAlterAndLogistic =
    userData[id]?.addressAlternative &&
    userData?.logisticsInfo?.length > 0 &&
    userData?.logisticsInfo[0].selectedDeliveryChannel === 'pickup-in-point' &&
    !userData?.logisticsInfo?.some(
      (item) => item.selectedDeliveryChannel === 'delivery'
    ) &&
    userData?.clientProfileData?.completed

  return { validateAddressAlterAndLogistic }
}

export default useTriggerCollapsible
