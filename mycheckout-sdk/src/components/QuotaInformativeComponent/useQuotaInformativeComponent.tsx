import { useMemo } from 'react'
import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'

import { useHandleVisualization } from '../../hooks/useHandleVisualization'
import { useValidateStyles } from '../../hooks/useValidateStyles'
import { selectSettings } from '../../contexts/global-context/reducers/uiSettingsSlice'
import type { Product } from '../../interfaces'

const useQuotaInformativeComponent = (product?: Product) => {
  const settings = useSelector(selectSettings)
  const styles = useValidateStyles()
  const { hidde, initialStyle } = useHandleVisualization(product)

  const orion = useMemo(() => pathOr(false, ['orion'], settings), [settings])

  return {
    hidde,
    initialStyle,
    orion,
    styles,
  }
}

export default useQuotaInformativeComponent
