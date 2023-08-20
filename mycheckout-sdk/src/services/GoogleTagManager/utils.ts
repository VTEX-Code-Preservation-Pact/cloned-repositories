import type { Item } from '../../interfaces'
import { getCookie, setCookie, removeAccents } from '../../utils'
import { COOKIE_NAME_GTM } from '../../utils/constants'
import type { ProductGTM, StepGTM, StepsCookieGTM } from './InterfacesGTM'

export const formatProducts = (items: Item[]): ProductGTM[] | void => {
  try {
    return items.map((item: Item) => {
      const { sellingPrice, listPrice } = item
      const price = Number.isNaN(sellingPrice) ? listPrice : sellingPrice

      return {
        name: item.name,
        id: item.id,
        price,
        brand: item.additionalInfo.brandName,
        category: item.productCategories[1],
        variant: item.refId,
        quantity: item.quantity,
      }
    })
  } catch (error) {
    console.error('Error format products', error)
  }
}

export const existStepInCookie = (step: number): boolean => {
  try {
    const cookieGtm: StepsCookieGTM = getCookie(COOKIE_NAME_GTM)
      ? JSON.parse(getCookie(COOKIE_NAME_GTM))
      : null

    return !!cookieGtm?.steps?.some((e: StepGTM) => e.step === step)
  } catch (error) {
    console.error('Error exist step in cookie:', error)

    return false
  }
}

export const changeOptionInCookieByStep = (
  step: number,
  option: string
): boolean => {
  try {
    const optionNormalize = removeAccents(option)

    if (!optionNormalize) return false
    const cookieGtm: StepsCookieGTM = getCookie(COOKIE_NAME_GTM)
      ? JSON.parse(getCookie(COOKIE_NAME_GTM))
      : null

    return !!cookieGtm?.steps?.some(
      (e: StepGTM) => e.step === step && e.option !== optionNormalize
    )
  } catch (error) {
    console.error('Error change option in cookie by step', error)

    return false
  }
}

export const updateOptionInCookieByStep = (
  step: number,
  option: string
): void => {
  try {
    const cookieGtm: StepsCookieGTM = getCookie(COOKIE_NAME_GTM)
      ? JSON.parse(getCookie(COOKIE_NAME_GTM))
      : null

    const optionNormalize = removeAccents(option)

    cookieGtm?.steps?.map((e: StepGTM, index: number) => {
      e.step === step ? (cookieGtm.steps[index].option = optionNormalize) : null
      setCookie(COOKIE_NAME_GTM, cookieGtm, 1)

      return true
    })
  } catch (error) {
    console.error('Error update option in cookie by step: ', error)
  }
}

export const setStepInCookie = (step: number, option: string = null): void => {
  try {
    let cookieGtm: StepsCookieGTM = getCookie(COOKIE_NAME_GTM)
      ? JSON.parse(getCookie(COOKIE_NAME_GTM))
      : null

    const optionNormalize = removeAccents(option)

    if (cookieGtm) {
      cookieGtm.steps.push({ step, option: optionNormalize })
    } else {
      cookieGtm = { steps: [{ step, option: optionNormalize }] }
    }

    setCookie(COOKIE_NAME_GTM, cookieGtm, 1)
  } catch (error) {
    console.error('Error set step in cookie: ', error)
  }
}
