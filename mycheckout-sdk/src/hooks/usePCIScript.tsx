import { useMemo } from 'react'

import { useActions } from '../contexts/ActionsProviderV2'
import constant from '../utils/constants'

export const usePCIScript = () => {
  const { sandbox } = useActions()
  const PCI_PROXY_SCRIPT = useMemo(
    () => (sandbox ? constant.PCI_PROXY_SCRIPT_DEV : constant.PCI_PROXY_SCRIPT),
    [sandbox]
  )

  const merchantID = useMemo(
    () => (sandbox ? constant.merchantIDDev : constant.merchantID),
    [sandbox]
  )

  return { PCI_PROXY_SCRIPT, merchantID }
}
