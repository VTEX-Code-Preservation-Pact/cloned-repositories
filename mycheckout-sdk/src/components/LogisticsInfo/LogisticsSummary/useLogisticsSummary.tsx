import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import {
  selectEmptyCart,
  selectPackages,
} from '../../../contexts/global-context/reducers/orderFormDataSlice'
import { selectSimulationStatus } from '../../../contexts/global-context/reducers/simulationSlice'

const useLogisticsSummary = () => {
  const intl = useIntl()
  const packages = useSelector(selectPackages)
  const emptyCart = useSelector(selectEmptyCart)
  const simulationStatus = useSelector(selectSimulationStatus)

  return {
    emptyCart,
    packages,
    intl,
    isLoading:
      simulationStatus === 'loading' || simulationStatus === 'preloading',
  }
}

export default useLogisticsSummary
