import React from 'react'

import LoadModal from './LoadModal'
import { useParams } from './useParams'

// Validate queryparams to know the state of the application when returns from redirects
export const Params = () => {
  const { showParams } = useParams()

  switch (showParams) {
    case 'load':
      return <LoadModal />

    default: {
      return null
    }
  }
}
