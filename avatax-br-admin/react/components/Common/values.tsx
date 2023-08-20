import { useQuery } from 'react-apollo'
import { MessageDescriptor, useIntl } from 'react-intl'

import { activitySectors } from '../../utils/constants/activitySector'
import { values } from '../../utils/definedMessages'
import getDocks from '../../queries/getDocks.gql'

export const dockIdValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'dockId',
    placeholder: formatMessage(values.dockIdPlaceholder),
    label: formatMessage(values.dockIdLabel),
  }
}

export const dockNameValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'dockName',
    placeholder: formatMessage(values.dockNamePlaceholder),
    label: formatMessage(values.dockNameLabel),
    options: [],
  }
}

export const activitySectorValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'activitySector',
    label: 'Setor de atividade',
    options: Object.entries(activitySectors)
      .map((obj) => {
        const [key, value] = obj

        return { value: key, label: formatMessage(value) }
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1)),
  }
}

export const icmsTaxPayerValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'icmsTaxPayer',
    label: formatMessage(values.icmsLabel),
    options: [
      {
        value: true,
        label: formatMessage(values.icmsOptionsTrue),
      },
      {
        value: false,
        label: formatMessage(values.icmsOptionsFalse),
      },
    ],
  }
}

export const taxRegimeValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'taxRegime',
    label: formatMessage(values.taxRegimeLabel),
    options: [
      {
        value: 'individual',
        label: formatMessage(values.taxRegimeIndividual),
      },
      {
        value: 'estimatedProfit',
        label: formatMessage(values.taxRegimeProfitEstimated),
      },
      {
        value: 'realProfit',
        label: formatMessage(values.taxRegimeProfitReal),
      },
      {
        value: 'simplified',
        label: formatMessage(values.taxRegimeSimplified),
      },
      {
        value: 'simplifiedOverGrossthreshold',
        label: formatMessage(values.taxRegimeSimplifiedGrossthreshold),
      },
      {
        value: 'simplifiedEntrepreneur',
        label: formatMessage(values.taxRegimeSimplifiedEntrepreneur),
      },
      {
        value: 'notApplicable',
        label: formatMessage(values.taxRegimeNotApplicable),
      },
    ],
  }
}

export const entityTypeValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'entityType',
    label: formatMessage(values.entityTypeLabel),
    options: [
      {
        value: 'mixedCapital',
        label: formatMessage(values.entityTypeMixedCapital),
      },
      {
        value: 'stateGovernment',
        label: formatMessage(values.entityTypeGovernment),
      },
      {
        value: 'foreign',
        label: formatMessage(values.entityTypeForeign),
      },
      {
        value: 'federalGovernment',
        label: formatMessage(values.entityTypeFederal),
      },
      {
        value: 'individual',
        label: formatMessage(values.entityTypeIndividual),
      },
      {
        value: 'cityGovernment',
        label: formatMessage(values.entityTypeCity),
      },
      {
        value: 'business',
        label: formatMessage(values.entityTypeBusiness),
      },
    ],
  }
}

export const stateTaxIdValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'stateTaxId',
    placeholder: formatMessage(values.stateTaxIdPlaceholder),
    label: formatMessage(values.stateTaxIdLabel),
  }
}

export const streetValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'street',
    placeholder: formatMessage(values.streetPlaceholder),
    label: formatMessage(values.streetLabel),
  }
}

export const neighborhoodValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'neighborhood',
    placeholder: formatMessage(values.neighborhoodPlaceholder),
    label: formatMessage(values.neighborhoodLabel),
  }
}

export const zipCodeValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'zipCode',
    placeholder: formatMessage(values.zipCodePlaceholder),
    label: formatMessage(values.zipCodeLabel),
    type: 'number',
  }
}

export const cityValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'city',
    placeholder: formatMessage(values.cityPlaceholder),
    label: formatMessage(values.cityLabel),
  }
}

export const stateValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'state',
    placeholder: formatMessage(values.statePlaceholder),
    label: formatMessage(values.stateLabel),
    maxLength: 2,
  }
}

export const streetNumberValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'streetNumber',
    placeholder: formatMessage(values.streetNumberPlaceholder),
    label: formatMessage(values.streetNumberLabel),
    type: 'number',
  }
}

export const complementValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'complement',
    placeholder: formatMessage(values.complementPlaceholder),
    label: formatMessage(values.complementLabel),
  }
}

export const phoneValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'phone',
    placeholder: formatMessage(values.phonePlaceholder),
    label: formatMessage(values.phoneLabel),
  }
}

export const cnpjValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'cnpj',
    placeholder: formatMessage(values.cnpjPlaceholder),
    label: formatMessage(values.cnpjLabel),
    type: 'number',
  }
}

export const suframaValues = (
  formatMessage: (desc: MessageDescriptor) => string
) => {
  return {
    name: 'suframa',
    placeholder: formatMessage(values.suframaPlaceholder),
    label: formatMessage(values.suframaLabel),
  }
}

function Values() {
  const intl = useIntl()

  const dockId: {
    name: string
    placeholder: string
    label: string
  } = dockIdValues(intl.formatMessage)

  const dockName: {
    name: string
    placeholder: string
    label: string
    options: Array<{ value: string; label: string }>
  } = dockNameValues(intl.formatMessage)

  const icmsTaxPayer: {
    name: string
    label: string
    options: Array<{ value: boolean; label: string }>
  } = icmsTaxPayerValues(intl.formatMessage)

  const activitySector: {
    name: string
    label: string
    options: Array<{ value: string; label: string }>
  } = activitySectorValues(intl.formatMessage)

  const taxRegime: {
    name: string
    label: string
    options: Array<{ value: string; label: string }>
  } = taxRegimeValues(intl.formatMessage)

  const entityType: {
    name: string
    label: string
    options: Array<{ value: string; label: string }>
  } = entityTypeValues(intl.formatMessage)

  const stateTaxId: {
    name: string
    placeholder: string
    label: string
  } = stateTaxIdValues(intl.formatMessage)

  const street: {
    name: string
    placeholder: string
    label: string
  } = streetValues(intl.formatMessage)

  const neighborhood: {
    name: string
    placeholder: string
    label: string
  } = neighborhoodValues(intl.formatMessage)

  const zipCode: {
    name: string
    placeholder: string
    label: string
  } = zipCodeValues(intl.formatMessage)

  const city: {
    name: string
    placeholder: string
    label: string
  } = cityValues(intl.formatMessage)

  const state: {
    name: string
    placeholder: string
    label: string
  } = stateValues(intl.formatMessage)

  const streetNumber: {
    name: string
    placeholder: string
    label: string
  } = streetNumberValues(intl.formatMessage)

  const complement: {
    name: string
    placeholder: string
    label: string
  } = complementValues(intl.formatMessage)

  const phone: {
    name: string
    placeholder: string
    label: string
  } = phoneValues(intl.formatMessage)

  const cnpj: {
    name: string
    placeholder: string
    label: string
  } = cnpjValues(intl.formatMessage)

  const suframa: {
    name: string
    placeholder: string
    label: string
  } = suframaValues(intl.formatMessage)

  const { data: docks } = useQuery<GetDocks>(getDocks)

  const valueDocks = docks?.getDocks

  if (dockName.options.length === 0) {
    valueDocks?.forEach((element) => {
      dockName.options.push({
        value: element.name,
        label: element.name,
      })
    })
  }

  const allValues: Values = {
    dockId,
    dockName,
    icmsTaxPayer,
    activitySector,
    taxRegime,
    entityType,
    stateTaxId,
    street,
    neighborhood,
    zipCode,
    city,
    state,
    streetNumber,
    complement,
    phone,
    cnpj,
    suframa,
  }

  return allValues
}

export default Values
