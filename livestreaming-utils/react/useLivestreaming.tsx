import { useContext } from 'react'

import { LivestreamingContext } from './LivestreamingContextProvider'

export const useLivestreaming = () => {
  return useContext(LivestreamingContext)
}

export default useLivestreaming
