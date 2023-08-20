import { useMutation } from '@apollo/client'

import { ECOMMERCE } from '../graphql/mutations'

export const useEcommerce = () => {
  const [ecommerce] = useMutation(ECOMMERCE, {
    onError: (e) => {
      console.error('error: ', e)
    },
  })

  const handleEcommerce = (
    event: string,
    data?: {
      products?: Array<{
        sku: string | number
        quantity: number
        price: number
        category: string
        subcategory: string
      }>
      onCompleted?: () => void
    }
  ) => {
    const email = JSON.parse(localStorage.getItem('checkoutless_data'))?.email

    ecommerce({
      variables: {
        args: {
          event,
          userEmail: email,
          data,
        },
      },
      onCompleted: (_) => {
        data?.onCompleted?.()
      },
    })
  }

  return {
    handleEcommerce,
  }
}
