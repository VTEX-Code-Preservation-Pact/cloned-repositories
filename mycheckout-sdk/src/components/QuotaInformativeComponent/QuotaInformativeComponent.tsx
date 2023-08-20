import React from 'react'

import { I18nProvider } from '../../i18n'
import type { ProductItem } from '../../interfaces'
import QuotaInformativeContainer from '../QuotaInformative/QuotaInformativeContainer'

interface Props {
  initialStyle: { display: string }
  language: string
  selectedItem: ProductItem
  styles?: any
}

const QuotaInformativeComponent = (props: Props) => {
  const { initialStyle, language, selectedItem, styles } = props

  return (
    <I18nProvider locale={language}>
      <div className={styles.Checkoutless} style={initialStyle}>
        <QuotaInformativeContainer selectedItem={selectedItem} />
      </div>
    </I18nProvider>
  )
}

export default QuotaInformativeComponent
