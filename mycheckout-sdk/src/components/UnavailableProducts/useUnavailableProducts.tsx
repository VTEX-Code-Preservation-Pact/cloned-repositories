import { useDispatch, useSelector } from 'react-redux'

import { closeModal } from '../../contexts/global-context/reducers/modalSlice'
import {
  resetFlow,
  selectLoadingAction,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import { setNewOrderform } from '../../contexts/global-context/reducers/orderFormDataSlice'
import { resetSimulation } from '../../contexts/global-context/reducers/simulationSlice'

export const useUnavailableProducts = () => {
  const dispatchGlobal = useDispatch()
  const loadingAction = useSelector(selectLoadingAction)

  const handleClose = () => {
    dispatchGlobal(closeModal())
    dispatchGlobal(resetFlow())
    dispatchGlobal(setNewOrderform())
    dispatchGlobal(resetSimulation())
  }

  return {
    handleClose,
    loadingAction,
  }
}
