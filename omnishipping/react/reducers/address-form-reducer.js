import * as types from '../actions/action-types'

import { RESIDENTIAL, SEARCH, GIFT_REGISTRY, COMMERCIAL } from '../constants'
import {
  getActionAddress,
  formatReceiverName,
  isActionAddressEqualState,
  newAddress,
  isGiftRegistry,
  addPostalCodeAutoCompleted,
  unifyAddress,
} from '../utils/AddressFormUtils'

import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { hasSLAs } from '../utils/SlasUtils'
import { isDelivery } from '../utils/DeliveryChannelsUtils'
import { isString } from 'util'
import { helpers } from 'vtex.address-form'
const { addValidation, isValidAddress, validateField } = helpers

const defaultState = {
  addresses: {},
  valid: null,
  receiverName: null,
  alreadyCompletedReceiverName: false,
  queuedValidations: [],
}

const filterValidationsQueue = (queue, validationType) =>
  queue ? queue.filter(validation => validation !== validationType) : []

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_ORDERFORM: {
      const shippingData = 'orderForm.shippingData'

      const actionResidentialAddress =
        getActionAddress(action, RESIDENTIAL) ||
        getActionAddress(action, COMMERCIAL) ||
        getActionAddress(action, GIFT_REGISTRY)
      const actionSearchAddress = getActionAddress(action, SEARCH)

      const { addresses, receiverName, residentialId, searchId } = state

      const hasSlas =
        action.orderForm &&
        get(action.orderForm, 'shippingData.logisticsInfo') &&
        action.orderForm.shippingData.logisticsInfo.find(li => hasSLAs(li))

      if (
        !get(action, shippingData) ||
        !get(action, `${shippingData}.selectedAddresses`) ||
        isActionAddressEqualState(
          actionResidentialAddress,
          residentialId,
          addresses,
          true
        )
      ) {
        const updatedAddresses = addresses[residentialId] && {
          ...addresses,
          [residentialId]: {
            ...addresses[residentialId],
            receiverName: {
              value:
                addresses[residentialId].receiverName.value ||
                receiverName ||
                formatReceiverName(action),
            },
            postalCode: {
              ...addresses[residentialId].postalCode,
              ...(!hasSlas || action.isOmniShippingCompleted
                ? { loading: false }
                : {}),
            },
          },
        }
        return {
          ...state,
          addresses: updatedAddresses || addresses,
        }
      }

      const {
        countryCode: actionCountryCode,
      } = action.orderForm.storePreferencesData

      const newCopyAddress = newAddress({
        ...(action.orderForm.canEditData ? actionResidentialAddress : {}),
        country:
          (actionResidentialAddress && actionResidentialAddress.country) ||
          actionCountryCode,
        addressId: searchId || undefined,
        addressType: SEARCH,
        addressQuery: '',
      })

      const newResidentialAddress = newAddress({
        country: actionCountryCode,
        addressId: residentialId || undefined,
        addressType: RESIDENTIAL,
        receiverName: formatReceiverName(action),
        addressQuery: '',
      })

      const newSearchAddressWithValidation = addValidation(newCopyAddress)
      const newDeliveryAddressWithValidation = addValidation(
        newResidentialAddress
      )

      if (actionResidentialAddress && actionSearchAddress) {
        const newIds = {
          residential: actionResidentialAddress.addressId || residentialId,
          search: actionSearchAddress.addressId || searchId,
        }

        return {
          ...state,
          addresses: {
            ...addresses,
            [newIds.search]: addValidation({
              ...actionSearchAddress,
              addressId: newIds.search,
              addressQuery: '',
            }),
            [newIds.residential]: addPostalCodeAutoCompleted(
              addValidation({
                ...actionResidentialAddress,
                addressId: newIds.residential,
                receiverName:
                  actionResidentialAddress.receiverName ||
                  formatReceiverName(action),
                addressQuery: '',
              })
            ),
          },
          valid: isGiftRegistry(actionResidentialAddress) || state.valid,
          searchId: newIds.search,
          residentialId: newIds.residential,
          receiverName: formatReceiverName(action),
        }
      }

      if (!actionResidentialAddress && actionSearchAddress) {
        const newIds = {
          residential:
            residentialId || newDeliveryAddressWithValidation.addressId.value,
          search: actionSearchAddress.addressId || searchId,
        }

        const newSearch = addPostalCodeAutoCompleted(
          unifyAddress(
            state.addresses[state.searchId],
            addValidation({
              ...actionSearchAddress,
              addressId: newIds.search,
              addressQuery: '',
            })
          )
        )

        return {
          ...state,
          addresses: {
            ...addresses,
            [newIds.search]: newSearch,
            [newIds.residential]: newDeliveryAddressWithValidation,
          },
          valid: isGiftRegistry(actionResidentialAddress) || state.valid,
          residentialId: newIds.residential,
          searchId: actionSearchAddress.addressId || searchId,
          receiverName: formatReceiverName(action),
        }
      }

      if (actionResidentialAddress && !actionSearchAddress) {
        const newIds = {
          residential: actionResidentialAddress.addressId || residentialId,
          search: searchId || newSearchAddressWithValidation.addressId.value,
        }

        const newResidential = addPostalCodeAutoCompleted(
          unifyAddress(
            state.addresses[state.residentialId],
            addValidation({
              ...actionResidentialAddress,
              addressId: newIds.residential,
              receiverName:
                actionResidentialAddress.receiverName ||
                formatReceiverName(action),
              addressQuery: '',
            })
          )
        )

        return {
          ...state,
          addresses: {
            ...addresses,
            [newIds.residential]: newResidential,
            [newIds.search]: newSearchAddressWithValidation,
          },
          valid: isGiftRegistry(actionResidentialAddress) || state.valid,
          residentialId: newIds.residential,
          searchId: newIds.search,
          receiverName: formatReceiverName(action) || receiverName,
        }
      }

      if (!actionResidentialAddress && !actionSearchAddress) {
        const newIds = {
          residential: newDeliveryAddressWithValidation.addressId.value,
          search: newSearchAddressWithValidation.addressId.value,
        }

        return {
          ...state,
          addresses: {
            ...addresses,
            [newIds.residential]: addPostalCodeAutoCompleted(
              newDeliveryAddressWithValidation
            ),
            [newIds.search]: newSearchAddressWithValidation,
          },
          valid:
            isGiftRegistry(newDeliveryAddressWithValidation) || state.valid,
          residentialId: newIds.residential,
          searchId: newIds.search,
          receiverName: formatReceiverName(action) || receiverName,
        }
      }

      return {
        ...state,
        receiverName: formatReceiverName(action),
      }
    }

    case types.CHANGE_ACTIVE_TAB: {
      const shouldUpdate =
        state.addresses[state.searchId] &&
        state.addresses[state.searchId].geoCoordinates.value.length > 0 &&
        action.pickupOptions.length === 0 &&
        isDelivery(action.channel)
      const updatedAddresses = shouldUpdate && {
        ...state.addresses,
        [state.searchId]: {
          ...state.addresses[state.residentialId],
          addressType: {
            value: SEARCH,
          },
          addressId:
            state.addresses[state.searchId] &&
            state.addresses[state.searchId].addressId,
        },
      }

      return {
        ...state,
        addresses: updatedAddresses || state.addresses,
      }
    }

    case types.SIMULATE_SHIPPING_FAILURE:
    case types.UPDATE_SHIPPING_FAILURE:
    case types.UPDATE_SIMULATION_OPTIONS: {
      const updatedAddresses = state.addresses[state.residentialId] && {
        ...state.addresses,
        [state.residentialId]: {
          ...state.addresses[state.residentialId],
          postalCode: {
            ...state.addresses[state.residentialId].postalCode,
            loading: false,
          },
        },
      }

      return {
        ...state,
        addresses: updatedAddresses || state.addresses,
      }
    }

    case types.UPDATE_SHIPPING_REQUEST: {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          [state.residentialId]: {
            ...state.addresses[state.residentialId],
            postalCode: {
              ...state.addresses[state.residentialId].postalCode,
              loading: action.loading,
            },
          },
        },
      }
    }

    case types.VALIDATE_ADDRESS_FORM: {
      if (!action.rules) {
        return {
          ...state,
          queuedValidations: [...(state.queuedValidations || []), action.type],
        }
      }

      const { valid } = isValidAddress(
        state.addresses[state.residentialId],
        action.rules
      )

      return {
        ...state,
        valid,
        queuedValidations: filterValidationsQueue(
          state.queuedValidations,
          action.type
        ),
      }
    }

    case types.VALIDATE_ADDRESS_FORM_FIELDS: {
      if (!action.rules) {
        return {
          ...state,
          queuedValidations: [...(state.queuedValidations || []), action.type],
        }
      }

      const { valid, address } = isValidAddress(
        state.addresses[state.residentialId],
        action.rules
      )

      return {
        ...state,
        addresses: {
          ...state.addresses,
          [state.residentialId]: unifyAddress(
            state.addresses[state.residentialId],
            address
          ),
        },
        valid: isGiftRegistry(state.addresses[state.residentialId]) || valid,
        queuedValidations: filterValidationsQueue(
          state.queuedValidations,
          action.type
        ),
      }
    }

    case types.VALIDATE_POSTAL_CODE: {
      if (!action.rules) {
        return {
          ...state,
          queuedValidations: [...(state.queuedValidations || []), action.type],
        }
      }

      return {
        ...state,
        addresses: {
          ...state.addresses,
          [state.residentialId]: {
            ...state.addresses[state.residentialId],
            postalCode: {
              ...state.addresses[state.residentialId].postalCode,
              ...validateField(
                state.addresses[state.residentialId].postalCode.value,
                'postalCode',
                state.addresses[state.residentialId],
                action.rules
              ),
            },
          },
        },
        queuedValidations: filterValidationsQueue(
          state.queuedValidations,
          action.type
        ),
      }
    }

    case types.UPDATE_ADDRESS_FORM: {
      // TODO: Break this monster up

      // Sets default values, to allow passing in items which you
      // don't want to update as `undefined`.
      // TODO: remove the need for doing this
      if (!action.address) {
        action.address = state.addresses[state.residentialId]
      }
      if (!action.searchAddress) {
        action.searchAddress = state.addresses[state.searchId]
      }

      // Updates both residential and search addresses
      // with the residential address
      if (
        get(action, 'searchAddress.geoCoordinates.value') &&
        action.searchAddress.geoCoordinates.value.length === 0 &&
        action.address.postalCode.valid &&
        !action.address.postalCode.loading &&
        !isEqual(action.address, state.addresses[state.residentialId])
      ) {
        return {
          ...state,
          alreadyCompletedReceiverName: !!state.receiverName,
          addresses: {
            [state.residentialId]: {
              ...action.address,
              addressId: state.addresses[state.residentialId].addressId,
              postalCode: {
                ...state.addresses[state.residentialId].postalCode,
                ...action.address.postalCode,
                loading: action.isOmniShippingCompleted
                  ? false
                  : action.address.postalCode.loading ||
                    state.addresses[state.residentialId].postalCode.loading,
              },
              receiverName: {
                ...state.addresses[state.residentialId].receiverName,
                ...action.address.receiverName,
                value:
                  action.address.receiverName.value !== null
                    ? action.address.receiverName.value
                    : state.alreadyCompletedReceiverName && state.receiverName
                      ? state.receiverName
                      : null,
              },
            },
            [state.searchId]: {
              ...action.address,
              addressType: {
                value: SEARCH,
              },
              addressId: state.addresses[state.searchId].addressId,
            },
          },
        }
      }

      // Updates search address
      if (
        action.address.postalCode.value === null &&
        action.searchAddress.postalCode.valid &&
        !action.searchAddress.postalCode.loading &&
        !isEqual(action.searchAddress, state.addresses[state.searchId])
      ) {
        return {
          ...state,
          alreadyCompletedReceiverName: !!state.receiverName,
          addresses: {
            [state.residentialId]: {
              ...state.addresses[state.residentialId],
              postalCode: {
                ...state.addresses[state.residentialId].postalCode,
                ...action.address.postalCode,
                loading: action.isOmniShippingCompleted
                  ? false
                  : action.address.postalCode.loading ||
                    state.addresses[state.residentialId].postalCode.loading,
              },
              receiverName: {
                ...state.addresses[state.residentialId].receiverName,
                ...action.address.receiverName,
                value:
                  action.address.receiverName.value !== null
                    ? action.address.receiverName.value
                    : state.alreadyCompletedReceiverName && state.receiverName
                      ? state.receiverName
                      : null,
              },
            },
            [state.searchId]: {
              ...action.searchAddress,
              addressType: {
                value: SEARCH,
              },
              addressId: state.addresses[state.searchId].addressId,
            },
          },
        }
      }

      // Refrain from updating, if addresses are equal with state addresses
      if (
        isEqual(action.address, state.addresses[state.residentialId]) &&
        isEqual(action.searchAddress, state.addresses[state.searchId])
      ) {
        return state
      }

      return {
        ...state,
        alreadyCompletedReceiverName: !!state.receiverName,
        addresses: {
          [state.residentialId]: {
            ...state.addresses[state.residentialId],
            ...action.address,
            postalCode: {
              ...state.addresses[state.residentialId].postalCode,
              ...action.address.postalCode,
              loading: action.isOmniShippingCompleted
                ? false
                : action.address.postalCode.loading ||
                  state.addresses[state.residentialId].postalCode.loading,
            },
            addressId: state.addresses[state.residentialId].addressId,
            receiverName: {
              ...state.addresses[state.residentialId].receiverName,
              ...action.address.receiverName,
              value: isString(action.address.receiverName.value)
                ? action.address.receiverName.value
                : state.alreadyCompletedReceiverName && state.receiverName
                  ? state.receiverName
                  : null,
            },
          },
          [state.searchId]: {
            ...state.addresses[state.searchId],
            ...action.searchAddress,
            addressType: {
              value: SEARCH,
            },
            addressId: state.addresses[state.searchId].addressId,
          },
        },
      }
    }

    case types.ADD_ADDRESS_FORM_ADDRESS: {
      if (action.searchAddress) {
        return {
          ...state,
          addresses: {
            ...state.addresses,
            [action.address.addressId]: addValidation({
              ...action.address,
              receiverName:
                action.address.receiverName ||
                formatReceiverName(action) ||
                state.receiverName,
              addressQuery: '',
            }),
            [action.searchAddress.addressId]: addValidation({
              ...action.searchAddress,
              addressType: {
                value: SEARCH,
              },
              addressQuery: '',
            }),
          },
          residentialId: action.address.addressId,
          lastResidentialId: state.residentialId,
          searchId: action.searchAddress.addressId,
        }
      }

      return {
        ...state,
        addresses: {
          ...state.addresses,
          [action.address.addressId]: addValidation({
            ...action.address,
            addressQuery: '',
          }),
        },
        lastResidentialId: state.residentialId,
        residentialId: action.address.addressId,
      }
    }

    case types.NEW_ADDRESS:
    case types.EDIT_ADDRESS: {
      return {
        ...state,
        lastResidentialId: state.residentialId,
      }
    }

    case types.SELECT_ADDRESS_ITEM: {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          [action.selectedAddress.addressId]: addValidation(
            newAddress({
              ...action.selectedAddress,
              addressType:
                (action.address && action.address.addressType) || RESIDENTIAL,
              receiverName:
                action.selectedAddress.receiverName ||
                formatReceiverName(action) ||
                state.receiverName,
            })
          ),
        },
        lastResidentialId: state.residentialId,
        residentialId: action.selectedAddress.addressId,
      }
    }

    case types.FOCUS_ON_INPUT: {
      const inputValue =
        state.addresses[state.residentialId][action.input.name].value
      return {
        ...state,
        addresses: {
          ...state.addresses,
          [state.residentialId]: {
            ...state.addresses[state.residentialId],
            [action.input.name]: {
              ...state.addresses[state.residentialId][action.input.name],
              focus: true,
              value:
                action.input.value !== undefined
                  ? action.input.value
                  : inputValue,
            },
          },
        },
      }
    }

    case types.CHANGE_ACTIVE_DELIVERY_CHANNEL: {
      const postalCode =
        state.addresses[state.residentialId] &&
        state.addresses[state.residentialId].postalCode
      const postalCodeValue = postalCode && postalCode.value
      const validPostalCode = postalCode && postalCode.valid

      if (
        isDelivery(action) &&
        postalCodeValue &&
        !validPostalCode &&
        action.canEditData
      ) {
        return {
          ...state,
          addresses: {
            ...state.addresses,
            [state.residentialId]: {
              ...state.addresses[state.residentialId],
              postalCode: {
                ...state.addresses[state.residentialId].postalCode,
                value: '',
              },
            },
          },
        }
      }
      return state
    }

    default:
      return state
  }
}
