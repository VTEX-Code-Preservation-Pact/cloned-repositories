import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectBlockedShipping } from '../contexts/global-context/reducers/checkoutFormSlice'
import { selectItems } from '../contexts/global-context/reducers/orderFormDataSlice'

const useLogisticBlock = () => {
  const items = useSelector(selectItems)

  const [logisticsBlocked, setLogisticsBlocked] = useState(false)

  const blockedShipping = useSelector(selectBlockedShipping)

  useEffect(() => {
    blockedShipping.categories.forEach((category) => {
      items.forEach((item) => {
        if (item?.productCategoryIds?.search(category.id) !== -1) {
          setLogisticsBlocked(true)

          return null
        }
      })
    })
  }, [blockedShipping, items])

  return {
    logisticsBlocked,
  }
}

export default useLogisticBlock
