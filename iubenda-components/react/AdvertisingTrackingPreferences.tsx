import * as React from 'react'
import { defineMessages } from 'react-intl'
import { IOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

const HANDLES = ['advertisingTrackingPreferences']

const messages = defineMessages({
  label: {
    id: 'store/iubenda.advertisingTrackingPreferences',
  },
  title: {
    id: 'admin/editor.iubenda.advertisingTrackingPreferences',
  },
})

const AdvertisingTrackingPreferences: SFC<Props> = ({
  label = messages.label.id,
}) => {
  const handles = useCssHandles(HANDLES)

  const ref = React.useCallback(node => {
    if (node !== null) {
      try {
        window._iub.advertisingPreferencesButton.enableElement(node)
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      ref={ref}
      href="#"
      className={`${handles.advertisingTrackingPreferences} iubenda-advertising-preferences-link`}
    >
      <IOMessage id={label} />
    </a>
  )
}

interface Props {
  label: string
}

AdvertisingTrackingPreferences.schema = {
  title: messages.title.id,
}

export default AdvertisingTrackingPreferences
