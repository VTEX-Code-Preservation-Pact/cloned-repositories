import React, { useContext } from 'react'

import type { ItemMC } from '../../../interfaces/orderForm'
import type {
  LogisticInfoSimulation,
  SlaSimulation,
} from '../../../interfaces/simulation'

export const PackagesManagerContext = React.createContext<PackageContext>({
  packageManager: {
    delivery: {
      selectedSla: null,
      addressId: '',
      availableSlas: [],
      currentItems: [],
      remainingItems: [],
    },
    pickUp: {
      selectedSla: null,
      addressId: '',
      availableSlas: [],
      currentItems: [],
      remainingItems: [],
    },
  },
  handleContinue: null,
  actualItems: [],
  packageNumber: 0,
  deliveryChannel: 'delivery',
  setDeliveryChannel: null,
  setPackageManager: null,
  disable: true,
})

export interface PackageManagerOptions {
  selectedSla: SlaSimulation
  addressId: string
  availableSlas: SlaSimulation[]
  availableSlasId?: string[]
  currentItems: ItemMC[]
  currentIndexes?: number[]
  remainingItems: Array<{
    item: ItemMC
    logisticInfo: LogisticInfoSimulation
  }>
}

export interface PackageManager {
  delivery: PackageManagerOptions
  pickUp: PackageManagerOptions
}

export interface PackageContext {
  handleContinue: (selectedLogistic: PackageManagerOptions) => void
  packageManager: PackageManager
  actualItems: ItemMC[]
  packageNumber: number
  deliveryChannel: 'delivery' | 'pickUp'
  setDeliveryChannel: React.Dispatch<
    React.SetStateAction<'delivery' | 'pickUp'>
  >
  setPackageManager: React.Dispatch<React.SetStateAction<PackageManager>>
  disable: boolean
}

export const usePackagesManager = () => {
  return useContext(PackagesManagerContext)
}
