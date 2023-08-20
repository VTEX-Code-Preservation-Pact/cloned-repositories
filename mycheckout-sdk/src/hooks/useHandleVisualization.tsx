import { pathOr } from 'ramda'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectSettings } from '../contexts/global-context/reducers/uiSettingsSlice'
import type { Product, Visualization } from '../interfaces'

export const useHandleVisualization = (product: Product) => {
  const settings = useSelector(selectSettings)
  const visualization = useMemo(
    () => pathOr(null, ['visualization'], settings),
    [settings]
  )

  const categories = useMemo(
    () => pathOr([], ['categories'], product),
    [product]
  )

  const [hidde, setHidde] = useState(null)

  useEffect(() => {
    if (visualization === null) return
    if (!visualization.length) setHidde(false)
    if (categories.length && visualization.length) {
      const isValidated = categories.filter(
        (category) =>
          !!visualization.find((v: Visualization) => v?.key === category)
      )

      setHidde(!!isValidated.length)
    }
  }, [visualization, categories])

  const initialStyle = useMemo(
    () => ({
      display: hidde === null && 'none',
    }),
    [hidde]
  )

  return useMemo(() => ({ hidde, initialStyle }), [hidde, initialStyle])
}
