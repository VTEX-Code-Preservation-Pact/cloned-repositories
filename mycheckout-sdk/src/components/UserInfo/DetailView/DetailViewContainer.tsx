import React from 'react'

import { useDetailView } from './useDetailView'
import { DetailView } from './DetailView'

export const DetailViewContainer = () => {
  const viewMobileProps = useDetailView()

  return <DetailView {...viewMobileProps} />
}
