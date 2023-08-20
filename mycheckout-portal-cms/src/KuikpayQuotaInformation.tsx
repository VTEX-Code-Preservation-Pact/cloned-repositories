import React from 'react'
import { KuikpayQuotaInformative } from 'kuikpay-sdk'
import type { ProductItem } from 'kuikpay-sdk/dist/interfaces'

import { CONSTANTS } from './utils'

const LANGUAGE = 'es'
const THEME = 'kuikpay'
const windowInfo: any = window
const { vtxctx } = windowInfo
const RUNTIME = {
  account: vtxctx.url.split('.')[0],
  workspace: CONSTANTS.workspace,
  platform: CONSTANTS.platform,
}

interface Props {
  selectedItem?: ProductItem
}

export const KuikpayQuotaInformation = ({ selectedItem }: Props) => {
  return (
    <div>
      <KuikpayQuotaInformative
        language={LANGUAGE}
        theme={THEME}
        selectedItem={selectedItem}
        runtime={RUNTIME}
      />
    </div>
  )
}
