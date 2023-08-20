import { useEffect, useState } from 'react'

import { getIpAddress } from '../services/getIpAdrress'

export const useFetchIpAddress = () => {
  const [ipAddress, setIpAddress] = useState<string>(null)

  useEffect(() => {
    getIpAddress().then((ip) => {
      setIpAddress(ip)
    })
  }, [])

  return { ipAddress }
}
