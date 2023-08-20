/* eslint-disable @typescript-eslint/no-explicit-any */

import type { StepsCookieGTM } from '../services/GoogleTagManager/InterfacesGTM'

/* eslint-disable max-params */
export const regularExpressions = {
  user: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  name: /^(?!\s)[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  firstName: /^(?!\s)[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  lastName: /^(?!\s)[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  email:
    /^[a-z0-9+_-]+(?:\.[a-z0-9+_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  phone: /^(^(\+)?\d{2})?\d{7}(\d{3})?$/, // 7 a 10 numeros con codigo de pais condicional.
  document: /^\d{1,10}$/, // 1 a 10 numeros.
  cardholderName: /^(?!\s)[a-zA-ZÀ-ÿ\s]{5,30}$/,
  cardNumber: /^[0-9\s]{19,19}$/,
  cardNumber2: /^[0-9\s]{16,22}$/,
  securityCode1: /^[0-9]{3,3}$/,
  securityCode2: /^[0-9]{4,4}$/,
  dues: /\d{2}/g,
  cvc: /\d{3,4}/g,
  expiryDate: /^\d{2}\/\d{2}/g,
  neighborhood: /^(?!\s)[^]+$/, // No vacio y que al comienzo no tenga un espacio
}

export const validateEmail = (email: string) => {
  const re = regularExpressions.email

  return re.test(String(email).toLowerCase())
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export const getCookie = (key: string) => {
  const b = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`)

  return b ? b.pop() : ''
}

export const setCookie = (
  name: string,
  value: string | Record<string, unknown> | StepsCookieGTM,
  days: number = null
) => {
  if (typeof value !== 'string') value = JSON.stringify(value)
  let expires = ''

  if (days) {
    const date = new Date()

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }

  document.cookie = `${name}=${value || ''} ${expires}; path=/`
}

export const expireCookie = (key: string, secure = true) => {
  document.cookie = `${key}=; path=/; expires=Fri, 01 Apr 2022 15:31:07 GMT; domain=.${
    window.location.hostname
  }; ${secure ? 'secure' : ''}`
}

export const validateCrediCard = (
  cardNumber: string,
  cardType: string,
  name: string,
  expiryMonth: string,
  expiryYear: string,
  validateExpiryDate?: any
) => {
  console.warn(`cardType`, cardType)
  console.warn(`expiryMonth`, expiryMonth)
  console.warn(`expiryYear`, expiryYear)

  const cardholderNameValidate = regularExpressions.cardholderName.test(name)
  const cardNumberValidate = regularExpressions.cardNumber.test(cardNumber)
  const cardExpiration = validateExpiryDate

  return {
    invalidCardholderName: cardholderNameValidate,
    cardholderName: !!name,
    invalidCardNumber: !cardType ? false : cardNumberValidate,
    cardNumber: !!cardNumber,
    invalidCardExpiration: cardExpiration,
  }
}

export const isMobile = () => {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/BlackBerry/i)
  )
}

export const arrayEquals = (a: any, b: any) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}

export const mergeArrays = (a: any, b: any, prop: string) => {
  const reduced = a.filter((aitem: any) => {
    return !b.find((bitem: any) => {
      return aitem[prop] === bitem[prop]
    })
  })

  return reduced.concat(b)
}

export const removeAccents = (str: string | null) => {
  return str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const emptyFunction = () => {}
