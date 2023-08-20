/* eslint-disable no-loop-func */
import React from 'react'

import Packages from './Packages'
import { usePackages } from './usePackagesNew'
import { PackagesManagerContext } from './usePackagesManager'

const PackagesContainer = () => {
  const packages = usePackages()

  return (
    <PackagesManagerContext.Provider
      value={{
        packageManager: packages.packageManager,
        handleContinue: packages.handleContinue,
        actualItems: packages.actualItems,
        packageNumber: packages.packageNumber,
        deliveryChannel: packages.deliveryChannel,
        setDeliveryChannel: packages.setDeliveryChannel,
        setPackageManager: packages.setPackageManager,
        disable: packages.disable,
      }}
    >
      <Packages global={packages.global} isEdit={packages.isEdit} />
    </PackagesManagerContext.Provider>
  )
}

export default PackagesContainer
