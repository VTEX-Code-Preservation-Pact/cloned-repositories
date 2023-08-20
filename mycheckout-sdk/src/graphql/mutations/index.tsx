import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation CreateOrder($orderArgs: OrderInput) {
    createOrder(orderArgs: $orderArgs)
      @context(provider: "kuikpay.my-checkout", scope: "private") {
      id
      transaction {
        RedirectResponseCollection {
          redirectUrl
        }
      }
    }
  }
`

export const CREATE_ADDRESS = gql`
  mutation createAddress(
    $id: ID
    $profileId: String!
    $country: String!
    $state: String!
    $city: String!
    $street: String!
    $number: String!
    $postalCode: String!
    $receiverName: String!
    $geoCoordinates: GeocoordinatesInput!
    $reference: String
    $neighborhood: String!
  ) {
    createAddress(
      id: $id
      profileId: $profileId
      country: $country
      state: $state
      city: $city
      street: $street
      number: $number
      postalCode: $postalCode
      receiverName: $receiverName
      geoCoordinates: $geoCoordinates
      reference: $reference
      neighborhood: $neighborhood
    ) @context(provider: "kuikpay.my-checkout") {
      id
      profile
      country
      state
      city
      street
      number
      postalCode
      receiverName
      geoCoordinates {
        latitude
        longitude
      }
      reference
      neighborhood
    }
  }
`

export const UPDATE_SELECTED_ADDRESS = gql`
  mutation updateUser($userArgs: UserInput) {
    updateUser(userArgs: $userArgs)
      @context(provider: "kuikpay.my-checkout", scope: "private") {
      message
      data {
        selectedAddress {
          id
          street
        }
      }
    }
  }
`

export const ECOMMERCE = gql`
  mutation ecommerce($args: EcommerceInput) {
    ecommerce(args: $args)
      @context(provider: "kuikpay.my-checkout", scope: "private") {
      event
    }
  }
`

export const CREATE_ADDRESS_EXTERNAL = gql`
  mutation externalAddress($args: AddressInput) {
    externalAddress(args: $args)
      @context(provider: "kuikpay.my-checkout", scope: "private") {
      id
      country
      state
      city
      street
      number
      postalCode
      receiverName
      geoCoordinates {
        latitude
        longitude
      }
      neighborhood
      reference
      isEqual
    }
  }
`
