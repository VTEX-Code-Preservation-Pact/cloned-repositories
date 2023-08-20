import type {
  AddressMC,
  PaymentsMC,
  ProfileMC,
  ShippingMC,
} from '../interfaces/orderForm'

export const userInfoMapper = (
  userData: any,
  addressAlternative?: AddressMC
): {
  profile: ProfileMC
  shipping?: ShippingMC
  payments?: PaymentsMC
} => {
  const availableAddresses: AddressMC[] = userData.addresses?.map(
    (address: any): AddressMC => ({
      id: address.id,
      city: address.city,
      complement: address.reference,
      country: address.country,
      number: address.number,
      reference: address.reference,
      geoCoordinates: {
        latitude: address.geoCoordinates.latitude,
        longitude: address.geoCoordinates.longitude,
      },
      neighborhood: address.neighborhood,
      postalCode: address.postalCode,
      receiverName: address.receiverName,
      state: address.state,
      street: address.street,
      addressDeliveryType: 'delivery',
    })
  )

  const addressAlternativeWhitPostalCode = availableAddresses?.find(
    (address: AddressMC) => address?.id === addressAlternative?.id
  )

  let newAddressAlternative: AddressMC = addressAlternative
    ? {
        id: addressAlternative?.id,
        city: addressAlternative?.city,
        complement: addressAlternative?.reference,
        country: addressAlternative?.country,
        geoCoordinates: {
          latitude: addressAlternative?.geoCoordinates?.latitude,
          longitude: addressAlternative?.geoCoordinates?.longitude,
        },
        neighborhood: addressAlternative?.neighborhood,
        postalCode: addressAlternative?.postalCode,
        receiverName: addressAlternative?.receiverName,
        state: addressAlternative?.state,
        street: addressAlternative?.street,
        number: addressAlternative?.number,
        reference: addressAlternative?.reference,
        addressDeliveryType: addressAlternative?.addressDeliveryType,
      }
    : null

  if (addressAlternative?.addressDeliveryType === 'delivery') {
    if (!addressAlternativeWhitPostalCode?.id) {
      availableAddresses.push(addressAlternative)
    } else {
      newAddressAlternative = addressAlternativeWhitPostalCode
    }
  }

  return {
    profile: {
      ...(userData.id ? { id: userData.id } : {}),
      ...(userData.habeasData === undefined
        ? {}
        : { habeasData: userData.habeasData }),
      email: userData.email,
      name: userData.name,
      lastname: userData.lastname,
      documentType: userData.id_type,
      document: userData.id_number,
      phoneCode: userData.phone_code,
      phone: userData.phone_number,
    },
    shipping: {
      availableAddresses,
      address:
        newAddressAlternative &&
        addressAlternative?.addressDeliveryType === 'delivery'
          ? { ...newAddressAlternative }
          : userData.selectedAddress && {
              id: userData.selectedAddress.id,
              city: userData.selectedAddress.city,
              complement: userData.selectedAddress.reference,
              country: userData.selectedAddress.country,
              geoCoordinates: {
                latitude: userData.selectedAddress.geoCoordinates.latitude,
                longitude: userData.selectedAddress.geoCoordinates.longitude,
              },
              neighborhood: userData.selectedAddress.neighborhood,
              postalCode: userData.selectedAddress.postalCode,
              receiverName: userData.selectedAddress.receiverName,
              state: userData.selectedAddress.state,
              street: userData.selectedAddress.street,
              number: userData.selectedAddress.number,
              reference: userData.selectedAddress.reference,
              addressDeliveryType: 'delivery',
            },
      selectedAddresses: [
        ...(userData.selectedAddress && !newAddressAlternative
          ? [
              {
                id: userData.selectedAddress.id,
                city: userData.selectedAddress.city,
                complement: userData.selectedAddress.reference,
                country: userData.selectedAddress.country,
                geoCoordinates: {
                  latitude: userData.selectedAddress.geoCoordinates.latitude,
                  longitude: userData.selectedAddress.geoCoordinates.longitude,
                },
                neighborhood: userData.selectedAddress.neighborhood,
                postalCode: userData.selectedAddress.postalCode,
                receiverName: userData.selectedAddress.receiverName,
                state: userData.selectedAddress.state,
                street: userData.selectedAddress.street,
                number: userData.selectedAddress.number,
                reference: userData.selectedAddress.reference,
                addressDeliveryType: 'delivery',
              } as AddressMC,
            ]
          : userData.selectedAddress &&
            newAddressAlternative &&
            addressAlternative?.addressDeliveryType === 'pickup' &&
            userData.selectedAddress.id !== newAddressAlternative.id
          ? [
              { ...newAddressAlternative },
              {
                id: userData.selectedAddress.id,
                city: userData.selectedAddress.city,
                complement: userData.selectedAddress.reference,
                country: userData.selectedAddress.country,
                geoCoordinates: {
                  latitude: userData.selectedAddress.geoCoordinates.latitude,
                  longitude: userData.selectedAddress.geoCoordinates.longitude,
                },
                neighborhood: userData.selectedAddress.neighborhood,
                postalCode: userData.selectedAddress.postalCode,
                receiverName: userData.selectedAddress.receiverName,
                state: userData.selectedAddress.state,
                street: userData.selectedAddress.street,
                number: userData.selectedAddress.number,
                reference: userData.selectedAddress.reference,
                addressDeliveryType: 'delivery',
              } as AddressMC,
            ]
          : newAddressAlternative
          ? [{ ...newAddressAlternative }]
          : []),
      ],
    },
    payments: {
      payment: [
        ...(userData.selectedPayment?.paymentMethod === 'tc'
          ? [
              {
                cardId: userData.selectedPayment?.card.id,
                bin: userData.selectedPayment?.card.bin,
                franchise: userData.selectedPayment?.card.franchise,
                number: userData.selectedPayment?.card.number,
                gateway: userData.selectedPayment?.card.gateway,
                paymentMethod: userData.selectedPayment?.paymentMethod,
                paymentId: userData.selectedPayment?.card.paymentSystem,
              },
            ]
          : userData.selectedPayment?.paymentMethod !== 'tc' &&
            userData.cards.length
          ? [
              {
                cardId: userData.cards[0]?.id,
                bin: userData.cards[0]?.bin,
                franchise: userData.cards[0]?.franchise,
                number: userData.cards[0]?.number,
                gateway: userData.cards[0]?.gateway,
                paymentMethod: 'tc',
                paymentId: userData.cards[0]?.paymentSystem,
              },
            ]
          : []),
      ],
      availableCards: [
        ...userData.cards?.map((card: any) => ({
          cardId: card.id,
          bin: card.bin,
          franchise: card.franchise,
          number: card.number,
          gateway: card.gateway,
        })),
      ],
      selectedCard:
        userData.selectedPayment?.card &&
        userData.selectedPayment?.paymentMethod === 'tc'
          ? {
              cardId: userData.selectedPayment?.card.id,
              bin: userData.selectedPayment?.card.bin,
              franchise: userData.selectedPayment?.card.franchise,
              number: userData.selectedPayment?.card.number,
              gateway: userData.selectedPayment?.card.gateway,
            }
          : userData.selectedPayment?.paymentMethod !== 'tc' &&
            userData.cards.length
          ? {
              cardId: userData.cards[0]?.id,
              bin: userData.cards[0]?.bin,
              franchise: userData.cards[0]?.franchise,
              number: userData.cards[0]?.number,
              gateway: userData.cards[0]?.gateway,
            }
          : null,
    },
  }
}
