import vtexTheme from '../vtex-styles.module.css'
import kuikpayTheme from '../kuikpay-styles.module.css'
import genericTheme from '../generic-styles.module.css'

// Solo aplica esta validación para estilos globales
export const validateStyles = (theme: string) => {
  switch (theme) {
    case 'generic':
      return genericTheme

    case 'vtex':
      return vtexTheme

    case 'kuikpay':
      return kuikpayTheme

    default:
      return genericTheme
  }
}
