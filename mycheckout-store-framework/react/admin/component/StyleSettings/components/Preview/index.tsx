import React from 'react'
import { PageBlock } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import { AlertMessage } from './AlertMessage'
import { Header } from './Header'
import { Body } from './Body'
import { useStyleSettings } from '../../hooks'
import styles from './styles.css'

export const Preview = () => {
  const { deviceSelected } = useStyleSettings()

  return (
    <div
      className={`${styles.previewContainer} ${
        deviceSelected === 'mobile' && styles.previewContainerMobile
      }`}
    >
      <PageBlock title={<FormattedMessage id="checkoutless.styleSettings" />}>
        <AlertMessage />
        <Header />
        <Body />
      </PageBlock>
    </div>
  )
}
