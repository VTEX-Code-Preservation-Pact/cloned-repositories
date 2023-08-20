import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { pathOr } from 'ramda'

import { selectSettings } from '../../contexts/global-context/reducers/uiSettingsSlice'
import { useValidateStyles } from '../../hooks/useValidateStyles'

const useButtonMessage = () => {
  const settings = useSelector(selectSettings)
  const [message, setMessage] = useState<string>()

  const styles = useValidateStyles()

  const buttonMessage = useMemo(
    () => pathOr('', ['buttonMessage'], settings),
    [settings]
  )

  const isConfigured = useMemo(
    () => pathOr(false, ['isConfigured'], settings),
    [settings]
  )

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

  return {
    buttonMessage,
    isConfigured,
    message,
    styles,
  }
}

export default useButtonMessage
