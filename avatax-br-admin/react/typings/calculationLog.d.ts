interface CalculationLog {
  avalaraReturn: [
    {
      skuId: string
      lineAmount: number
      numberOfItems: number
      freightAmount: number
      lineUnitPrice: number
      useType: string
      itemDescriptor: {
        taxCode: string
        hsCode: string
        ex: string
        cest: string
        productType: string
      }
      taxDetails: [
        {
          taxImpact: {
            impactOnFinalPrice: string
          }
          taxType: string
          citation: string
          subtotalTaxable: number
          rate: number
          tax: number
        }
      ]
    }
  ]
  client: {
    activitySector: string
    icmsTaxPayer: boolean
    taxRegime: string
    stateTaxId: string
    useType: string
    cnpj: string
    suframa: string
    city: string
    state: string
  }
  establishment: {
    dockId: string
    dockName: string
    activitySector: string
    taxRegime: string
    entityType: string
    stateTaxId: string
    street: string
    neighborhood: string
    zipCode: string
    city: string
    state: string
    streetNumber: number
    complement: string
    phone: string
    cnpj: string
    suframa: string
  }
  email: string
  createdIn: string
  payload: string
  orderId: string
}

interface CalculationLogQueryResult {
  getLogs: CalculationLogData
}

interface CalculationLogData {
  pagination: Pagination
  data: CalculationLog[]
}
