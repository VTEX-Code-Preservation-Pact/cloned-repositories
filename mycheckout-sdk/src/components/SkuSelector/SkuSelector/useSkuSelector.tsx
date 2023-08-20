import { pathOr, equals } from 'ramda'
import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { arrayEquals } from '../../../utils'
import { useActions } from '../../../contexts/ActionsProviderV2'
import {
  selectItemData,
  setVariationSelected,
  updateItemToAdd,
} from '../../../contexts/global-context/reducers/cartSlice'
import type { VariationsV2, ProductItem } from '../../../interfaces'

interface Props {
  setDisabled: (disabled: boolean) => void
}

const getSelectedVariation = (variations: VariationsV2[]) => {
  const variation = pathOr('', [0, 'values', 0], variations)

  return [variation]
}

const getPossibleVariation = (
  variationList: any[],
  variations: VariationsV2[]
): string[] => {
  const variationsElement = pathOr(null, [0], variationList)

  if (variationsElement) {
    const name = pathOr('', ['name'], variationsElement)
    const dataName = pathOr(
      '',
      ['values', 0],
      variations.find((v) => v?.name === name)
    )

    const list = pathOr([], ['variations'], variationsElement).find(
      (v) => v?.variation === dataName
    )

    const elements = pathOr([], ['elements'], list)

    return elements.map((e) => e?.itemId)
  }

  return []
}

const useSkuSelector = (props: Props) => {
  const { setDisabled } = props
  const dispatchGlobal = useDispatch()
  const initialRender = useRef(true)
  const [actualItems, setActualItems] = useState([])
  const [actualSelectedItem, setActualSelectedItem] = useState<ProductItem>()

  const visibleVariations = pathOr(
    [],
    ['skuSelectorProps', 'visibleVariations'],
    useActions()
  )

  const {
    product: { items, productId },
    selectedItem: { variations, itemId: currentItemId },
    itemToAdd,
  } = useSelector(selectItemData)

  const [selectedVariation, setSelectedVariation] = useState(
    getSelectedVariation(variations)
  )

  const variationList = useMemo(() => {
    const variationsElements = items.reduce((a: any, b: any) => {
      const availableQuantity = pathOr(
        0,
        ['sellers', 0, 'commertialOffer', 'AvailableQuantity'],
        b
      )

      const images = pathOr(0, ['images'], b)
      const itemId = pathOr('', ['itemId'], b)

      // eslint-disable-next-line array-callback-return
      pathOr([], ['variations'], b).map((variation) => {
        const name = pathOr('', ['values', 0], variation)

        const elements = {
          name,
          availableQuantity,
          images,
          itemId,
        }

        const element = {
          variation: name,
          elements: [elements],
        }

        if (
          a[variation?.name]?.variations &&
          a[variation?.name]?.variations.length
        ) {
          const elementIndex = a[variation?.name]?.variations.findIndex(
            (e: any) => e?.variation === name
          )

          if (elementIndex !== -1) {
            a[variation?.name]?.variations[elementIndex]?.elements?.push(
              elements
            )
          } else {
            a[variation?.name]?.variations?.push(element)
          }
        } else {
          a[variation?.name] = {
            name: variation?.name,
            variations: [element],
          }
        }
      })

      return a
    }, {})

    if (!visibleVariations.length) return Object.values(variationsElements)

    return Object.values(variationsElements).filter((variaton: any) =>
      visibleVariations.some((v: any) => {
        const config = v?.toLowerCase()
        const originalName = variaton?.name?.toLowerCase()

        return config === originalName
      })
    )
  }, [items, visibleVariations])

  const [possibleVariations, setPosibleVariations] = useState(
    getPossibleVariation(variationList, variations)
  )

  useEffect(() => {
    let sameItems = false

    if (actualItems.length) {
      sameItems = arrayEquals(items, actualItems)
    }

    if (!sameItems) {
      setActualItems(items)
      setActualSelectedItem(undefined)
    } else if (items.length && selectedVariation) {
      const selectedItem = items.find((item) => {
        const variationsElements = pathOr([], ['variations'], item)
          .filter((v) => {
            if (!visibleVariations.length) return true

            return visibleVariations.some(
              (vv) =>
                vv?.toLowerCase() === pathOr('', ['name'], v).toLowerCase()
            )
          })
          .map((v) => {
            return pathOr('', ['values', 0], v)
          })

        return equals(variationsElements, selectedVariation)
      })

      setActualItems(items)
      setActualSelectedItem(selectedItem)

      const availableQuantity = pathOr(
        0,
        ['sellers', 0, 'commertialOffer', 'AvailableQuantity'],
        selectedItem
      )

      if (
        selectedItem &&
        availableQuantity &&
        selectedItem?.itemId !== currentItemId
      ) {
        setDisabled(false)
        dispatchGlobal(setVariationSelected(selectedItem))
        dispatchGlobal(
          updateItemToAdd({
            ...itemToAdd,
            id: selectedItem?.itemId,
          })
        )
      }
    } else {
      setDisabled(true)
    }
  }, [selectedVariation, items, visibleVariations])

  useEffect(() => {
    if (
      actualSelectedItem &&
      selectedVariation.length &&
      variationList.length
    ) {
      setDisabled(variationList.length > selectedVariation?.length)
    }
  }, [selectedVariation, variationList])

  const onChangeSelector = (variation: any, index: number) => {
    if (index === 0) {
      setPosibleVariations(
        pathOr([], ['elements'], variation).map((v) => v?.itemId)
      )
      setSelectedVariation([pathOr('', ['variation'], variation)])

      return setDisabled(true)
    }

    const prevState = JSON.parse(JSON.stringify(selectedVariation))

    prevState[index] = pathOr('', ['variation'], variation)
    setSelectedVariation(prevState)
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else if (!actualSelectedItem) {
      setDisabled(true)
    }
  }, [actualSelectedItem])

  useEffect(() => {
    if (variationList.length === 0 || !productId) return
    setSelectedVariation(getSelectedVariation(variations))
    setPosibleVariations(getPossibleVariation(variationList, variations))
  }, [productId, JSON.stringify(variationList)])

  const isSelected = useCallback(
    (variation: any) => {
      const elements = pathOr('', ['variation'], variation)

      return selectedVariation.some((s) => s === elements)
    },
    [selectedVariation]
  )

  // eslint-disable-next-line array-callback-return
  const isAvailableVariation = useCallback(
    (variation: any, position: number) => {
      const elements = pathOr([], ['elements'], variation)
      const available = !!elements.filter((e) => e?.availableQuantity).length

      if (position > 0) {
        let possible = 0
        let lastAvailableQuantity = 0
        // eslint-disable-next-line
        elements.map((e) => {
          if (possibleVariations.some((p) => p === e?.itemId)) {
            possible++
            lastAvailableQuantity = e?.availableQuantity
          }
        })

        return available && possible && lastAvailableQuantity
      }

      // eslint-disable-next-line array-callback-return
      return available
    },
    [selectedVariation, possibleVariations]
  )

  return {
    variationList,
    isAvailableVariation,
    isSelected,
    onChangeSelector,
  }
}

export default useSkuSelector
