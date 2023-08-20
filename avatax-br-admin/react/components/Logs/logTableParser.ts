import { MessageDescriptor } from 'react-intl'

import { activitySectors } from '../../utils/constants/activitySector'

const truncate = (input: string) =>
  input && input.length > 10 ? `${input.substring(0, 10)}...` : input

export const parse = (formatMessage: (desc: MessageDescriptor) => string) => (
  log: CalculationLog
) => {
  return {
    view: log,
    createdIn: new Date(log.createdIn).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
    email: log.email,
    activitySector: `${truncate(
      activitySectors[log.establishment.activitySector]
        ? formatMessage(activitySectors[log.establishment.activitySector])
        : log.establishment.activitySector
    )} → ${truncate(
      activitySectors[log.client.activitySector]
        ? formatMessage(activitySectors[log.client.activitySector])
        : log.client.activitySector
    )}`,
    establishment_dockName: log.establishment.dockName,
    city: `${log.establishment.city} → ${log.client.city}`,
    state: `${log.establishment.state} → ${log.client.state}`,
    numberOfProducts: log.avalaraReturn
      .map((item) => item.numberOfItems)
      .reduce((val1, val2) => val1 + val2, 0),
    productsTotal: log.avalaraReturn
      .map((item) => item.lineAmount)
      .reduce((val1, val2) => val1 + val2, 0)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    freightTotal: log.avalaraReturn
      .map((item) => item.freightAmount)
      .reduce((val1, val2) => val1 + val2, 0)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    includedTaxes: log.avalaraReturn
      .map((obj) =>
        obj.taxDetails
          .filter((tax) => tax.taxImpact.impactOnFinalPrice === 'Included')
          .map((tax) => tax.taxType)
      )
      .reduce((acc, tax) => acc.concat(tax), [])
      .filter((val, index, arr) => arr.indexOf(val) === index)
      .join(', '),
    includedTaxesTotal: log.avalaraReturn
      .map((obj) =>
        obj.taxDetails
          .filter((tax) => tax.taxImpact.impactOnFinalPrice === 'Included')
          .map((tax) => tax.tax)
      )
      .reduce((acc, tax) => acc.concat(tax), [])
      .reduce((val1, val2) => val1 + val2, 0)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    addedTaxes: log.avalaraReturn
      .map((obj) =>
        obj.taxDetails
          .filter((tax) => tax.taxImpact.impactOnFinalPrice === 'Add')
          .map((tax) => tax.taxType)
      )
      .reduce((acc, tax) => acc.concat(tax), [])
      .filter((val, index, arr) => arr.indexOf(val) === index)
      .join(', '),
    addedTaxesTotal: log.avalaraReturn
      .map((obj) =>
        obj.taxDetails
          .filter((tax) => tax.taxImpact.impactOnFinalPrice === 'Add')
          .map((tax) => tax.tax)
      )
      .reduce((acc, tax) => acc.concat(tax), [])
      .reduce((val1, val2) => val1 + val2, 0)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
  }
}

export default parse
