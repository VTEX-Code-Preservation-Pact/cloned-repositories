import { useCallback, useMemo, useState } from 'react'
import { pathOr } from 'ramda'

import type { ProductItem } from '../../interfaces'

interface Quota {
  quotas: number
  value: number
}

const useQuotaInformative = (selectedItem: ProductItem | null) => {
  const [open, setOpen] = useState(false)

  const priceProduct = useMemo(
    () => pathOr(0, ['sellers', 0, 'commertialOffer', 'Price'], selectedItem),
    [selectedItem]
  )

  const onCalculateQuota = useCallback(
    (quantity: number, price: number) => {
      return {
        quotas: quantity,
        value: price / quantity,
      }
    },
    [priceProduct]
  )

  const quota = useMemo<Quota>(() => {
    if (priceProduct < 100000) {
      return onCalculateQuota(3, priceProduct)
    }

    if (priceProduct > 100001 && priceProduct < 1000000) {
      return onCalculateQuota(6, priceProduct)
    }

    return onCalculateQuota(9, priceProduct)
  }, [priceProduct])

  const handleModal = () => setOpen(!open)

  return {
    handleModal,
    open,
    quota,
  }
}

export default useQuotaInformative
