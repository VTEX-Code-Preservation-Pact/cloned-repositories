/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

import { useStyleSettings } from './context'
import { setStyles, setStylesButton, addButtonEvent } from '../utils'
import styles from '../components/Preview/Body/styles.css'

const CLASS_MODAL_CONTAINER = '_kuikpay-modal__modalContainer'
const CLASS_CHECKOUTLESS = '_kuikpay-myCheckout-styles-module__Checkoutless'
const CLASS_BUY_BUTTON = '_kuikpay-myCheckout-styles-module__buyButtonContainer'
const CLASS_ICONS = '_kuikpay-myCheckout-styles-module__iconAlternative'
const NEW_CLASS_ICONS = '_kuikpay-myCheckout-styles-module__iconAlternative'
const CLASS_BUTTONS = '_kuikpay-button__buttonContainer'
const CLASS_BUY_BUTTONS = '_kuikpay-button__buttonContainer'
const CLASS_MODAL_INPUTS = '_kuikpay-input__input'
const CLASS_STROKE_ICON =
  '_kuikpay-myCheckout-styles-module__strokeCheckiconAlternative'

const CLASS_SUMMARY_CONTAINER = '_kuikpay-summary-modules__summaryContainer'

export const useKuikpayModal = () => {
  const refModal = useRef(null)
  const [iconsClass, setIconsClass] = useState('')
  const {
    deviceSelected,
    state: { modalStyles },
  } = useStyleSettings()

  const isMobile = deviceSelected === 'mobile'

  useEffect(() => {
    if (refModal === null) return
    const checkoutless = document.getElementsByClassName(CLASS_CHECKOUTLESS)
    const buyButton = document.getElementsByClassName(CLASS_BUY_BUTTON)
    const iconsContainer = document.getElementsByClassName(CLASS_ICONS)
    const modalContainer = document.getElementsByClassName(
      CLASS_MODAL_CONTAINER
    )

    modalContainer[0].classList.add(styles.modalPositionContainer)
    checkoutless[0].classList.add(styles.modalCheckoutlessHeight)
    buyButton[0].classList.add(styles.modalBuyButtonPosition)

    const iconsContainerArray = Array.from(iconsContainer)

    iconsContainerArray.forEach((element) =>
      element.classList.replace(CLASS_ICONS, NEW_CLASS_ICONS)
    )

    setIconsClass(NEW_CLASS_ICONS)
  }, [refModal])

  useEffect(() => {
    if (refModal === null) return
    const { backgroundColor } = modalStyles
    const modalContainer = document.getElementsByClassName(
      CLASS_MODAL_CONTAINER
    )

    const modalInputs = document.getElementsByClassName(CLASS_MODAL_INPUTS)
    const summaryContainer = document.getElementsByClassName(
      CLASS_SUMMARY_CONTAINER
    )

    const buyButton = document.getElementsByClassName(CLASS_BUY_BUTTON)

    const modalContainerArray = Array.from(modalContainer)
    const modalInputsArray = Array.from(modalInputs)
    const summaryContainerArray = Array.from(summaryContainer)
    const buyButtonArray = Array.from(buyButton)
    const modalElementArray = [
      ...modalContainerArray,
      ...modalInputsArray,
      ...summaryContainerArray,
      ...buyButtonArray,
    ]

    modalElementArray.forEach((element) =>
      setStyles(element, [{ name: 'background-color', value: backgroundColor }])
    )
  }, [refModal, modalStyles.backgroundColor])

  useEffect(() => {
    if (refModal === null || !iconsClass) return
    const { icons } = modalStyles
    const iconsContainer = document.getElementsByClassName(iconsClass)
    const strokeIconContainer =
      document.getElementsByClassName(CLASS_STROKE_ICON)

    const iconsContainerArray = Array.from(iconsContainer)
    const strokeIconsContainerArray = Array.from(strokeIconContainer)

    strokeIconsContainerArray.forEach((element) =>
      setStyles(element, [{ name: 'stroke', value: icons.color }])
    )

    iconsContainerArray.forEach((element) =>
      setStyles(element, [{ name: 'fill', value: icons.color }])
    )
  }, [refModal, modalStyles.icons.color, iconsClass])

  useEffect(() => {
    if (refModal === null) return
    const { font } = modalStyles

    const fontDiv = document.querySelectorAll(`.${CLASS_CHECKOUTLESS} div`)
    const fontP = document.querySelectorAll(`.${CLASS_CHECKOUTLESS} p`)
    const fontA = document.querySelectorAll(`.${CLASS_CHECKOUTLESS} select`)
    const fontInput = document.querySelectorAll(`.${CLASS_CHECKOUTLESS} input`)
    const fontSelect = document.querySelectorAll(
      `.${CLASS_CHECKOUTLESS} select`
    )

    const fontDivArray = Array.from(fontDiv)
    const fontPArray = Array.from(fontP)
    const fontAArray = Array.from(fontA)
    const fontInputArray = Array.from(fontInput)
    const fontSelectArray = Array.from(fontSelect)
    const fontArray = [
      ...fontDivArray,
      ...fontPArray,
      ...fontAArray,
      ...fontInputArray,
      ...fontSelectArray,
    ]

    if (fontArray.length) {
      fontArray.forEach((element) =>
        setStyles(element, [{ name: 'font-family', value: font }])
      )
    }
  }, [refModal, modalStyles.font])

  useEffect(() => {
    if (refModal === null) return
    const {
      button: { normal, borderRadius },
    } = modalStyles

    const buttons = document.getElementsByClassName(CLASS_BUTTONS)
    const buyButton = document.getElementsByClassName(CLASS_BUY_BUTTONS)

    const buttonsArray = Array.from(buttons)
    const buyButtonArray = Array.from(buyButton)
    const buttonsConcat = [...buttonsArray, ...buyButtonArray]

    buttonsConcat.forEach((element) => {
      setStylesButton(element, { ...normal, borderRadius })
      addButtonEvent('mouseout', element, { ...normal, borderRadius })
    })
  }, [refModal, modalStyles.button.normal, modalStyles.button.borderRadius])

  useEffect(() => {
    if (refModal === null) return
    const {
      button: { hover, borderRadius },
    } = modalStyles

    const buttons = document.getElementsByClassName(CLASS_BUTTONS)
    const buyButton = document.getElementsByClassName(CLASS_BUY_BUTTONS)

    const buttonsArray = Array.from(buttons)
    const buyButtonArray = Array.from(buyButton)
    const buttonsConcat = [...buttonsArray, ...buyButtonArray]

    buttonsConcat.forEach((element) => {
      addButtonEvent('mouseover', element, { ...hover, borderRadius })
    })
  }, [refModal, modalStyles.button.hover, modalStyles.button.borderRadius])

  return { refModal, isMobile }
}
