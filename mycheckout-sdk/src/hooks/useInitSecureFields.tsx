import { useState, useEffect } from 'react'

import { useScript } from './useScript'
import { usePCIScript } from './usePCIScript'

export const useInitSecureFields = (
  _: string,
  paymentMethod?: string,
  cvcRequired?: boolean
) => {
  const [loadPaymentForm, setLoadPaymentForm] = useState(false)
  const { PCI_PROXY_SCRIPT } = usePCIScript()

  useEffect(() => {
    if (paymentMethod === 'tc' && cvcRequired) {
      if (!(window as any).SecureFieldsCVCLoad) {
        useScript(PCI_PROXY_SCRIPT[0], PCI_PROXY_SCRIPT[1]).then(() => {
          // eslint-disable-next-line prettier/prettier
          ;(window as any).SecureFieldsCVCLoad = true
          setLoadPaymentForm(true)
        })
      }

      if ((window as any).SecureFieldsCVCLoad && !loadPaymentForm) {
        setLoadPaymentForm(true)
      }
    }
  }, [])

  return { loadPaymentForm }
}
