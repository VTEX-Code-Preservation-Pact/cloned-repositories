import { useSelector } from 'react-redux'

import vtexTheme from '../vtex-styles.module.css'
import kuikpayTheme from '../kuikpay-styles.module.css'
import genericTheme from '../generic-styles.module.css'
import global from '../myCheckout-styles.module.css'
import { selectTheme } from '../contexts/global-context/reducers/uiSettingsSlice'

// Solo aplica esta validación para estilos globales
export const useValidateStyles = (globalStyle = false) => {
  const theme = useSelector(selectTheme)

  if (globalStyle) {
    return global
  }

  switch (theme) {
    case 'generic':
      return genericTheme

    case 'vtex':
      return vtexTheme

    case 'kuikpay':
      return kuikpayTheme

    default:
      return global
  }
}
