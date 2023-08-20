export const accountPrieview = () => {
  const data = {
    accounts: {
      __typename: 'kuikpay_mycheckout_0_0_5_Accounts',
      cvcRequired: true,
      paymentSystem: null || '',
      buttonMessage:
        'Compra *Fácil y Rápido* con American Express, Visa, Dinners y Mastercard tes',
      PaymentMethod: [
        {
          __typename: 'kuikpay_mycheckout_0_0_5_PaymentsMethods',
          id: '61e98730b8b6ddc2a6bbc1db',
          type: 'store',
          isActive: true,
          paymentMethodName: '3',
          accountName: 'amalia',
        },
        {
          __typename: 'kuikpay_mycheckout_0_0_5_PaymentsMethods',
          id: '61e98730b8b6ddc2a6bbc1d5',
          type: 'store',
          isActive: true,
          paymentMethodName: '201',
          accountName: 'amalia',
        },
        {
          __typename: 'kuikpay_mycheckout_0_0_5_PaymentsMethods',
          id: '61e98730b8b6ddc2a6bbc1d3',
          type: 'store',
          isActive: true,
          paymentMethodName: '2',
          accountName: 'amalia',
        },
        {
          __typename: 'kuikpay_mycheckout_0_0_5_PaymentsMethods',
          id: '61e98730b8b6ddc2a6bbc1cf',
          type: 'store',
          isActive: true,
          paymentMethodName: '4',
          accountName: 'amalia',
        },
        {
          __typename: 'kuikpay_mycheckout_0_0_5_PaymentsMethods',
          id: '61e98730b8b6ddc2a6bbc1cc',
          type: 'own',
          isActive: true,
          paymentMethodName: 'Orion',
          accountName: 'amalia',
        },
        {
          __typename: 'kuikpay_mycheckout_0_0_5_PaymentsMethods',
          id: '61e98730b8b6ddc2a6bbc1d8',
          type: 'store',
          isActive: true,
          paymentMethodName: '1',
          accountName: 'amalia',
        },
        {
          __typename: 'kuikpay_mycheckout_0_0_5_PaymentsMethods',
          id: 'd30d888b-b69b-4be7-ba97-6b4733a57676',
          type: 'store',
          isActive: false,
          paymentMethodName: '201',
          accountName: 'amalia',
        },
      ],
      isConfigured: true,
      visualization: [0],
    },
  }

  return { data }
}
