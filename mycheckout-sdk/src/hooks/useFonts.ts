import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'

import { selectSettings } from '../contexts/global-context/reducers/uiSettingsSlice'

export const useFonts = () => {
  const { styles: stylesContext } = useSelector(selectSettings)

  const fonts = pathOr(
    "'Calibri', sans-serif;",
    ['modal', 'font'],
    JSON.parse(stylesContext || '{}')
  )

  return {
    fonts,
  }
}
