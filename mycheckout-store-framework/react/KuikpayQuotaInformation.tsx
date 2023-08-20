import React, { useMemo } from 'react'
import { KuikpayQuotaInformative } from 'kuikpay-sdk'
import useProduct from 'vtex.product-context/useProduct'
// eslint-disable-next-line no-restricted-imports
import { pathOr, path } from 'ramda'

import { CONSTANTS } from './utils'

const KuikpayQuotaInformation = () => {
  const ProductContext = useProduct()
  const language = __RUNTIME__?.culture?.language
  const theme = __RUNTIME__?.query?.theme || 'kuikpay'
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runtime = {
    account: __RUNTIME__?.account,
    workspace: __RUNTIME__?.workspace,
    platform: CONSTANTS.platform,
  }

  const selectedItem = useMemo(() => {
    return pathOr(
      path(['product', 'items', 0], ProductContext),
      ['selectedItemasas'],
      ProductContext
    )
  }, [ProductContext])

  return useMemo(
    () => (
      <div>
        <KuikpayQuotaInformative
          language={language}
          theme={theme}
          selectedItem={selectedItem as any}
          runtime={runtime}
        />
      </div>
    ),
    [language, theme, selectedItem, runtime]
  )
}

export default KuikpayQuotaInformation
