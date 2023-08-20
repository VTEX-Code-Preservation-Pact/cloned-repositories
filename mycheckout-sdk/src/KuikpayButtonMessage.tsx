import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'

import { Info } from './components/Icons'
import { ToolTip } from './components/shared'
import { selectSettings } from './contexts/global-context/reducers/uiSettingsSlice'

export const KuikpayButtonMessage = ({ styles, isVisible }: any) => {
  const settings = useSelector(selectSettings)
  const buttonMessage = useMemo(
    () => pathOr('', ['buttonMessage'], settings),
    [settings]
  )

  const isConfigured = useMemo(
    () => pathOr(false, ['isConfigured'], settings),
    [settings]
  )

  const [message, setMessage] = useState<string>()

  useEffect(() => {
    if (buttonMessage) {
      setMessage(
        buttonMessage.replaceAll(/\*[aA-zZÀ-ú | ]+\*/g, (e) => {
          const element = e.replace(/\*/g, '')

          return `<span>${element}</span>`
        })
      )
    }
  }, [buttonMessage])

  return useMemo(() => {
    if (!isVisible || !isConfigured) return <Fragment />
    if (!message) return <Fragment />

    return (
      <div className={styles.CheckoutlessInfo}>
        <ToolTip
          tooltip={
            <div className={styles.CheckoutlessInfoMessage}>
              <div dangerouslySetInnerHTML={{ __html: message }}></div>
            </div>
          }
        >
          <Info />
        </ToolTip>
      </div>
    )
  }, [buttonMessage, message, isVisible, isConfigured])
}
