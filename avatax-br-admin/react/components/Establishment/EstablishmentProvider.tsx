/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useMemo, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from 'react-apollo'
import * as yup from 'yup'
import { useIntl } from 'react-intl'

import EstablishmentContext from '../../context/EstablishmentContext'
import getEstablishmentQuery from '../../queries/getEstablishment.gql'
import getSettingsQuery from '../../queries/getSettings.gql'
import deleteEstablishmentMutation from '../../queries/delete.gql'
import saveConfigurationMutation from '../../queries/saveConfiguration.gql'
import updateSettingsMutation from '../../queries/updateSettings.gql'
import verifyPingQuery from '../../queries/verifyPing.gql'
import getDocks from '../../queries/getDocks.gql'
import getAddress from '../../queries/getAddress.gql'
import { cnpjValidation } from './validCnpj'
import { provider } from '../../utils/definedMessages'

const EstablishmentProvider: FC = (props) => {
  const [establishment, setEstablishments] = useState<Establishment>({})
  const [edit, setEdit] = useState<boolean>(false)

  const [showAlert, setShowAlert] = useState(false)
  const [showAlertUpdate, setShowAlertUpdate] = useState(false)
  const [zip, setZip] = useState(false)
  const [settings, setSettings] = useState<Settings>({})
  const [change, setChange] = useState(false)
  const [ping, setPing] = useState(0)

  const [validationValues, setValidationValues] = useState({
    activitySector: false,
    icmsTaxPayer: false,
    taxRegime: false,
    entityType: false,
    stateTaxId: false,
    street: false,
    neighborhood: false,
    zipCode: false,
    city: false,
    state: false,
    streetNumber: false,
    complement: false,
    cnpj: false,
    suframa: false,
    dockId: false,
    dockName: false,
  })

  const intl = useIntl()
  const schema = yup.object().shape({
    activitySector: yup.string().required(),
    icmsTaxPayer: yup.boolean().required(),
    taxRegime: yup.string().required(),
    entityType: yup.string().required(),
    street: yup.string().required(),
    neighborhood: yup.string().required(),
    zipCode: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, intl.formatMessage(provider.number))
      .length(8),
    city: yup.string().required(),
    state: yup.string().required(),
    streetNumber: yup.number().required().positive().integer(),
    complement: yup.string().required(),
    phone: yup.string().nullable(),
    cnpj: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, intl.formatMessage(provider.number))
      .length(14),
    dockId: yup.string().required(),
    dockName: yup.string().required(),
    suframa: yup.string().nullable(),
    stateTaxId: yup.string().when('icmsTaxPayer', {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
  })

  // Return 1 if its ok, 2 if is null and 3 if cep is smaller than 3 caracteres
  async function validationFuntion(object: Establishment) {
    let text = ''

    for (const [key, value] of Object.entries(object)) {
      try {
        schema.validateSyncAt(key, object)
        if (key === 'cnpj') {
          const returnValue = cnpjValidation(value)

          if (!returnValue) text = intl.formatMessage(provider.cnpj)
        }

        if (key === 'stateTaxId' && value === '')
          text = 'Preencha o campo obrigatório'
      } catch (e) {
        if (
          key === 'zipCode' &&
          e.errors[0] === 'zipCode must be exactly 8 characters'
        )
          text = intl.formatMessage(provider.zipcode)
        else if (
          key === 'cnpj' &&
          e.errors[0] === 'cnpj must be exactly 14 characters'
        )
          text = intl.formatMessage(provider.cnpjLength)
        else text = intl.formatMessage(provider.empty)
      }
    }

    return text
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const { data: docks } = useQuery<GetDocks>(getDocks)

  const valueDocks = docks?.getDocks
  const setEstablishment = (object: Establishment) => {
    setEstablishments({
      ...establishment,
      ...object,
    })

    if (object.dockName && !object.dockId) {
      getDockId(object)
    }

    if (object.zipCode && !object.city) {
      getInfo(object)
    }
  }

  async function getDockId(object: Establishment) {
    valueDocks?.forEach((element) => {
      if (element.name === object.dockName) {
        setEstablishment({ dockName: object.dockName, dockId: element.id })
        setValidationValues({
          ...validationValues,
          ...{ dockId: true, dockName: true },
        })
      }
    })
  }

  const [gettingAddress] = useMutation(getAddress)

  async function getInfo(object: Establishment) {
    if (object.zipCode) {
      if (object.zipCode.length === 8) {
        setZip(false)
        const { zipCode } = object
        const valueReturn = await gettingAddress({ variables: { zipCode } })

        setEstablishment({
          city: valueReturn.data.getAddress.city,
          state: valueReturn.data.getAddress.state,
          street: valueReturn.data.getAddress.street,
          zipCode: object.zipCode,
        })
        setValidationValues({
          ...validationValues,
          ...{ city: true, state: true, street: true, zipCode: true },
        })
      } else {
        setZip(true)
      }
    }
  }

  const {
    loading,
    data: establishmentList,
    refetch,
  } = useQuery<GetEstablishment>(getEstablishmentQuery)

  const [deleteEstablishment] = useMutation(deleteEstablishmentMutation)

  const update = (establishmentUpdate: Establishment) => {
    setEstablishment(establishmentUpdate)
    setEdit(true)
  }

  const deleteEstablishments = async (documentId: string | boolean) => {
    await deleteEstablishment({ variables: { documentId } })
    refetch()
  }

  async function validation() {
    const object = establishment
    const retorno = await schema.validate(object).catch(function (err) {
      err.name // => 'ValidationError'
      err.errors // => ['Deve ser maior que 18']

      return false
    })

    return retorno
  }

  const [saveConfiguration] = useMutation(saveConfigurationMutation)

  const saveConfigurations = async () => {
    const valid = await validation()

    setValidationValues({
      activitySector: true,
      icmsTaxPayer: true,
      taxRegime: true,
      entityType: true,
      street: true,
      neighborhood: true,
      zipCode: true,
      city: true,
      state: true,
      streetNumber: true,
      complement: true,
      cnpj: true,
      suframa: true,
      dockId: true,
      dockName: true,
      stateTaxId: establishment.icmsTaxPayer === true,
    })

    if (valid) {
      const valueReturn = await saveConfiguration({
        variables: {
          esta: { ...establishment },
        },
      })

      setEdit(false)
      refetch()

      if (valueReturn.data.saveConfiguration) {
        setShowAlert(true)

        return true
      }
    }

    return false
  }

  // Settings

  const { data: settingsValues } = useQuery<GetSettings>(getSettingsQuery)

  const [updateSetting, { data: updateSettingsValues }] = useMutation(
    updateSettingsMutation
  )

  useMemo(() => {
    updateSettings({
      sandbox: settingsValues?.getSettings?.useAvalaraSandboxEnv,
      clientId: settingsValues?.getSettings.clientIdValue
        ? settingsValues?.getSettings.clientIdValue
        : '',
      clientSecret: settingsValues?.getSettings.clientSecretValue
        ? settingsValues?.getSettings.clientSecretValue
        : '',
    })
  }, [settingsValues])

  useMemo(() => {
    if (updateSettingsValues !== undefined) {
      updateSettings({
        sandbox: updateSettingsValues.updateSettings.useAvalaraSandboxEnv,
        clientId: updateSettingsValues.updateSettings.clientIdValue
          ? updateSettingsValues.updateSettings.clientIdValue
          : '',
        clientSecret: updateSettingsValues.updateSettings.clientSecretValue
          ? updateSettingsValues.updateSettings.clientSecretValue
          : '',
      })
    }
  }, [updateSettingsValues])

  function updateSettings(object: Settings) {
    setSettings({ ...settings, ...object })
  }

  async function updatingSettings() {
    const values = {
      useAvalaraSandboxEnv: settings.sandbox,
      clientIdValue: settings.clientId,
      clientSecretValue: settings.clientSecret,
    }

    setPing(0)

    await updateSetting({ variables: { settings: values } })
  }

  async function changeSettings() {
    if (!change) setChange(true)
    else {
      setChange(false)
      updatingSettings()
    }
  }

  async function updateSettingsSandbox(object: Settings) {
    updateSettings(object)

    const values = {
      useAvalaraSandboxEnv: !settings.sandbox,
      clientIdValue: settings.clientId,
      clientSecretValue: settings.clientSecret,
    }

    await updateSetting({ variables: { settings: values } })
  }

  const [getPing, { data: verifyPingValues }] = useLazyQuery(verifyPingQuery)

  useMemo(() => {
    if (verifyPingValues !== undefined) {
      if (verifyPingValues?.verifyPing !== '') {
        setPing(1)
      } else setPing(2)
    }
  }, [verifyPingValues])

  async function verifyPing() {
    getPing({
      variables: {
        clientId: settings.clientId,
        clientSecret: settings.clientSecret,
        sandbox: settings.sandbox,
      },
    })
  }

  return (
    <EstablishmentContext.Provider
      value={{
        establishment,
        setEstablishment,
        edit,
        setEdit,
        loading,
        establishmentList: establishmentList?.establishments,
        update,
        deleteEstablishments,
        saveConfigurations,
        showAlert,
        setShowAlert,
        handleCloseAlert,
        docks: docks?.getDocks,
        validationValues,
        zip,
        validationFuntion,
        showAlertUpdate,
        setShowAlertUpdate,
        settings,
        changeSettings,
        updateSettings,
        change,
        ping,
        verifyPing,
        updateSettingsSandbox,
      }}
    >
      {props.children}
    </EstablishmentContext.Provider>
  )
}

export default EstablishmentProvider
