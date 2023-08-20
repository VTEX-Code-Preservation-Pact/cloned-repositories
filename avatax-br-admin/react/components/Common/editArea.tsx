import { useIntl } from 'react-intl'
import React, { FC, useContext } from 'react'

import { DividerArea } from './divider'
import EstablishmentDropdown from '../Establishment/EstablishmentDropdown'
import EstablishmentInput from '../Establishment/EstablishmentInput'
import Values from './values'
import { stock } from '../../utils/definedMessages'
import EstablishmentContext from '../../context/EstablishmentContext'

const EditArea: FC = () => {
  const intl = useIntl()
  const allValues: Values = Values()
  const provider = useContext(EstablishmentContext)

  return (
    <>
      <div className="flex flex-column flex-row-ns">
        <div className="w-100">
          <h3 className="t-heading-3">{intl.formatMessage(stock.info)}</h3>

          <EstablishmentDropdown {...allValues.dockName} />
          <EstablishmentInput {...allValues.dockId} />

          <EstablishmentDropdown {...allValues.activitySector} />
          <EstablishmentDropdown {...allValues.icmsTaxPayer} />
          <EstablishmentDropdown {...allValues.taxRegime} />

          <EstablishmentDropdown {...allValues.entityType} />

          {provider.establishment.icmsTaxPayer === true && (
            <EstablishmentInput {...allValues.stateTaxId} />
          )}

          <DividerArea />

          <h3 className="t-heading-3">{intl.formatMessage(stock.place)}</h3>

          <EstablishmentInput {...allValues.zipCode} />
          <EstablishmentInput {...allValues.street} />
          <EstablishmentInput {...allValues.neighborhood} />
          <EstablishmentInput {...allValues.city} />
          <EstablishmentInput {...allValues.state} />
          <EstablishmentInput {...allValues.streetNumber} />
          <EstablishmentInput {...allValues.complement} />
          <EstablishmentInput {...allValues.phone} />
          <EstablishmentInput {...allValues.cnpj} />
          <EstablishmentInput {...allValues.suframa} />
        </div>
      </div>
    </>
  )
}

export default EditArea
