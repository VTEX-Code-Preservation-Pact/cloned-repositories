import React from 'react'

interface EstablishmentContextType {
  establishment: Establishment
  setEstablishment: (establishment: Establishment) => void
  edit: boolean
  setEdit: (edit: boolean) => void
  loading: boolean
  establishmentList?: Establishment[]
  update: (establishment: Establishment) => void
  deleteEstablishments: (documentId: string | boolean) => void
  saveConfigurations: () => Promise<boolean>
  showAlert: boolean
  setShowAlert: (showAlert: boolean) => void
  handleCloseAlert: () => void
  docks: Docks[] | undefined
  validationValues: EstablishmentValidation
  zip: boolean
  validationFuntion: (object: Establishment) => Promise<string>
  showAlertUpdate: boolean
  setShowAlertUpdate: (showAlert: boolean) => void
  settings: Settings
  changeSettings: () => void
  updateSettings: (object: Settings) => void
  change: boolean
  ping: number
  verifyPing: () => void
  updateSettingsSandbox: (object: Settings) => void
}
const EstablishmentContext = React.createContext<EstablishmentContextType>({
  establishment: {},
  setEstablishment: () => {},
  edit: false,
  setEdit: () => {},
  loading: true,
  establishmentList: [],
  update: () => {},
  deleteEstablishments: () => {},
  saveConfigurations: async () => false,
  showAlert: false,
  setShowAlert: () => {},
  handleCloseAlert: () => {},
  docks: [{ name: '', id: '' }],
  validationValues: {},
  zip: false,
  validationFuntion: async () => '',
  showAlertUpdate: false,
  setShowAlertUpdate: () => {},
  settings: {},
  changeSettings: () => {},
  updateSettings: () => {},
  change: false,
  ping: 0,
  verifyPing: () => {},
  updateSettingsSandbox: () => {},
})

export default EstablishmentContext
