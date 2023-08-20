import type { PaymentsMethod } from '../interfaces'

// reemplaza cualquier caracter que no es un numero por un vacío
export const clearNumber = (value = '') => {
  return value.replace(/\D+/g, '')
}

export const formatExpiryDate = (value: string) => {
  const clearValue = clearNumber(value)

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
  }

  return clearValue
}

export const selectIdImgCard = (paymentMethod: string) => {
  let dataImgCard = null
  // eslint-disable-next-line padding-line-between-statements
  if (
    paymentMethod === 'VIS' ||
    paymentMethod === 'vi' ||
    paymentMethod === 'visa' ||
    paymentMethod === 'Visa'
  ) {
    dataImgCard = { id: '155401', name: 'visa', nameComplete: 'visa' }
  } else if (
    paymentMethod === 'ECA' ||
    paymentMethod === 'mc' ||
    paymentMethod === 'master' ||
    paymentMethod === 'Master' ||
    paymentMethod === 'Mastercard'
  ) {
    dataImgCard = {
      id: '155402',
      name: 'mastercard',
      nameComplete: 'mastercard',
    }
  } else if (
    paymentMethod === 'AMX' ||
    paymentMethod === 'ae' ||
    paymentMethod === 'amex' ||
    paymentMethod === 'Amex' ||
    paymentMethod === 'American Express'
  ) {
    dataImgCard = {
      id: '155404',
      name: 'amex',
      nameComplete: 'american express',
    }
  } else if (
    paymentMethod === 'DIN' ||
    paymentMethod === 'di' ||
    paymentMethod === 'diner' ||
    paymentMethod === 'Diner' ||
    paymentMethod === 'Diners'
  ) {
    dataImgCard = { id: '155403', name: 'diners', nameComplete: 'diners' }
  }

  return dataImgCard
}

export const getImgFranchise = (fran: string) => {
  const franchise = fran?.toLowerCase()
  let idImgFranchise = ''

  if (franchise === 'vi' || franchise === 'visa') {
    idImgFranchise = '155401'
  } else if (
    franchise === 'di' ||
    franchise === 'diners' ||
    franchise === 'diner'
  ) {
    idImgFranchise = '155403'
  } else if (franchise === 'mc' || franchise === 'master') {
    idImgFranchise = '155402'
  } else if (franchise === 'ae' || franchise === 'amex') {
    idImgFranchise = '155404'
  }

  const url = `https://kuikpay.vteximg.com.br/arquivos/ids/${idImgFranchise}`

  return url
}

export const PaymentKey = {
  Orion: 'Orion',
}

export const validateOrion = (paymentMethod: PaymentsMethod[]) => {
  return !!paymentMethod.find(
    (payment) =>
      payment.paymentMethodName === PaymentKey.Orion && payment?.isActive
  )
}

export const copyAttributes = (
  from: string,
  toObj: any,
  exceptions: string[]
) => {
  $.each(
    $(from).prop('attributes'),
    (_: never, attr: { name: string; value: string }) => {
      if (!exceptions.includes(attr.name)) {
        toObj.attr(attr.name, attr.value)
      }
    }
  )
}
