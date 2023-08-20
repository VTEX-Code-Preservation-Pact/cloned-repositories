import { useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import { UPDATE_SELECTED_ADDRESS } from '../graphql/mutations'
import {
  selectShipping,
  setUpdateAddresses,
} from '../contexts/global-context/reducers/orderFormDataSlice'

export const useUpdateSelectedAddress = (selectedAddress: string) => {
  const { availableAddresses } = useSelector(selectShipping)
  const dispatch = useDispatch()

  const [updateSelectedAddress] = useMutation(UPDATE_SELECTED_ADDRESS, {
    onCompleted: () => {
      dispatch(
        setUpdateAddresses({
          selectedAddress: availableAddresses?.find(
            (address) => address.id === selectedAddress
          ),
        })
      )
    },
    onError: (e) => {
      console.error('error: ', e)
    },
  })

  return {
    updateSelectedAddress,
  }
}
