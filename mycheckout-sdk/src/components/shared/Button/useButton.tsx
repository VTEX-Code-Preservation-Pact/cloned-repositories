import { useSelector } from 'react-redux'

import {
  selectIsMobile,
  selectSettings,
} from '../../../contexts/global-context/reducers/uiSettingsSlice'

const useButton = () => {
  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)

  return {
    isLiteVersion,
    isMobile,
  }
}

export default useButton
