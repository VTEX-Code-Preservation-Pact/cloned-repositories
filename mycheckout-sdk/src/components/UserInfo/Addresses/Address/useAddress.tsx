import { useSelector } from 'react-redux'

import vtexStyles from '../../vtex-styles.module.css'
import kuikpayStyles from '../../userInfo-module.css'
import genericStyles from '../../generic-styles.module.css'
import { useUserData } from '../../../../contexts/UserDataProvider'
import { useValidateStyles } from '../../../../hooks/useValidateStyles'
import {
  selectIsMobile,
  selectSettings,
} from '../../../../contexts/global-context/reducers/uiSettingsSlice'

const useAddress = () => {
  const { theme } = useUserData()
  const { isLiteVersion } = useSelector(selectSettings)
  const isMobile = useSelector(selectIsMobile)

  const global = useValidateStyles()

  let styles = kuikpayStyles

  if (theme === 'vtex') {
    styles = vtexStyles
  } else if (theme === 'generic') {
    styles = genericStyles
  }

  return {
    styles,
    global,
    theme,
    isLiteVersion,
    isMobile,
  }
}

export default useAddress
