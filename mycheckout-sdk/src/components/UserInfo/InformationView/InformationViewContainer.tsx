import React from 'react'

import { InformationView } from './InformationView'
import { useInformationView } from './useInformationView'

export const InformationViewContainer = () => {
  const informationViewProps = useInformationView()

  return <InformationView {...informationViewProps} />
}
