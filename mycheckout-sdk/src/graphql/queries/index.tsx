import { gql } from '@apollo/client'

export const VERIFY_CODE = gql`
  query verifyCode($email: String!, $code: Int!) {
    verifyCode(email: $email, code: $code)
      @context(provider: "kuikpay.my-checkout") {
      message
      data {
        name
        lastname
        id_type
        id_number
        email
        phone_code
        phone_number
        addresses {
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
        }
        cards {
          id
          franchise
          number
          gateway
          bin
          paymentSystem
        }
        selectedAddress {
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
        }
        selectedPayment {
          paymentMethod
          card {
            id
            franchise
            number
            gateway
            bin
            paymentSystem
          }
        }
        accessToken
      }
    }
  }
`
export const LOGIN = gql`
  query login($email: String!) {
    login(email: $email) @context(provider: "kuikpay.my-checkout") {
      message
    }
  }
`

export const ACCOUNTS = gql`
  query accounts {
    accounts @context(provider: "kuikpay.my-checkout") {
      cvcRequired
      paymentSystem
      buttonMessage
      text
      hasGoogleAnalytics
      PaymentMethod {
        id
        type
        isActive
        paymentMethodName
        accountName
      }
      isConfigured
      visualization {
        type
        key
        secundaryKey
      }
      additionalData {
        key
        value
      }
      styles
      habeasDataInformation {
        url
        version
      }
    }
  }
`

export const GET_CITIES = gql`
  query getCities($city: String) {
    getCities(city: $city) @context(provider: "kuikpay.my-checkout") {
      country
      state
      city
      phone
      postal_code
    }
  }
`

export const VALIDATE_CREDIT = gql`
  query ValidateCredit($email: String, $totals: Int) {
    validateCredit(email: $email, totals: $totals)
      @context(provider: "kuikpay.my-checkout") {
      maxInstallments
      approvedCredit
    }
  }
`

export const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) @context(provider: "kuikpay.my-checkout") {
      id
      name
      lastname
      id_type
      id_number
      email
      phone_code
      phone_number
      habeasData
      addresses {
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
      }
      selectedAddress {
        id
        country
        state
        city
        street
        number
        postalCode
        receiverName
        neighborhood
        reference
        geoCoordinates {
          latitude
          longitude
        }
      }
      selectedPayment {
        paymentMethod
        card {
          id
          franchise
          number
          gateway
          bin
          paymentSystem
          cvv
        }
      }
      cards {
        id
        franchise
        number
        gateway
        bin
        cvv
        paymentSystem
      }
    }
  }
`
export const PAYMENT_PROCESS_STATUS = gql`
  query GetPaymentProcessStatus($orderId: String) {
    getPaymentProcessStatus(orderId: $orderId)
      @context(provider: "kuikpay.my-checkout") {
      status
      message
    }
  }
`
