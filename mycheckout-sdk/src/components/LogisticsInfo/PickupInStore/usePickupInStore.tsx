import React, { useState, useEffect } from 'react'

import { Store } from '../../Icons'
import { formatter } from '../../../utils'
import { useSelectValue } from '../../../hooks/useSelectValue'
import useFormatMessage from '../../../i18n/useFormatMessage'
import global from '../../../myCheckout-styles.module.css'
import { usePackagesManager } from '../Packages/usePackagesManager'

const usePickupInStore = () => {
  const { packageManager, setPackageManager } = usePackagesManager()

  const [formatedStore, setFormatedStore] = useState([
    {
      label: '',
      value: '',
    },
  ])

  const store: any = useSelectValue({
    label: useFormatMessage('store/checkoutless.logistics.chooseStore'),
    value: 'placeholder',
  })

  useEffect(() => {
    setFormatedStore(
      packageManager.pickUp.availableSlas.map((sla) => {
        if (packageManager.pickUp.selectedSla.id === sla.id) {
          store.setValue({
            label: `${sla.pickupStoreInfo?.friendlyName} ${sla.pickupStoreInfo?.address?.street}`,
            value: sla.id,
          })
        }

        const price = formatter.format(sla.price)

        return {
          label: `${sla.pickupStoreInfo?.friendlyName} ${sla.pickupStoreInfo?.address?.street} - (${price})`,
          value: sla.id,
        }
      })
    )
  }, [packageManager.pickUp])

  useEffect(() => {
    if (
      store.value.value !== 'placeholder' &&
      store.value.value !== packageManager.pickUp.selectedSla.id
    ) {
      setPackageManager({
        ...packageManager,
        pickUp: {
          ...packageManager.pickUp,
          selectedSla: packageManager.pickUp.availableSlas.find(
            (sla) => sla.id === store.value.value
          ),
        },
      })
    }
  }, [store.value.value])

  const selectIcon = () => {
    return (
      <Store
        width={22}
        height={22}
        fill={
          packageManager.pickUp.selectedSla
            ? global.iconPrimary
            : global.iconTerciary
        }
      />
    )
  }

  return {
    formatedStore,
    selectIcon,
    store,
    selectedSla: packageManager.pickUp.selectedSla,
  }
}

export default usePickupInStore
