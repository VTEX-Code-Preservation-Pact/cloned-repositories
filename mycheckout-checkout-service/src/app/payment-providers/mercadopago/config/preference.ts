import { MERCADOPAGO } from './constants';
import { OrderDoc } from '../../../orders/schemas/order.schema';

//Available types in https://github.com/mercadopago/devsite-docs/issues/1173

export const preference = (order: OrderDoc) => {
  const user = order.user;
  const address = order.shipping.address;
  return {
    binary_mode: false,
    expires: true,
    expiration_date_from: new Date(Date.now()).toISOString(),
    expiration_date_to: new Date(Date.now() + 3).toISOString(),
    payer: {
      name: user.name,
      surname: user.lastname,
      email: user.email,
      phone: {
        area_code: user.phoneCode,
        number: Number(user.phoneNumber) as any,
      },
      identification: {
        type: user.documentType,
        number: user.document,
      },
      address: {
        street_name: address.neighborhood,
        zip_code: address.postalCode,
        street_number: address.street as any,
      },
    },
    shipments: {
      receiver_address: {
        zip_code: address.postalCode,
        street_number: address.street as any,
        city_name: address.city,
        state_name: address.state,
      },
    },
    external_reference: order.orderId,
    items: [
      {
        currency_id: order.currency,
        unit_price: order.total,
        category_id: `others`, // Available categories at https://api.mercadopago.com/item_categories
      },
    ],
    auto_return: 'approved',
    notification_url: MERCADOPAGO.NOTIFICATION_URL,
    back_urls: {
      success: MERCADOPAGO.SUCCESS_URL,
      failure: MERCADOPAGO.FAILURE_URL,
      pending: MERCADOPAGO.PENDING_URL,
    },
    payment_methods: {
      excluded_payment_methods: [{ id: 'amex' }],
      excluded_payment_types: [{ id: 'atm' }],
      installments: 6,
      default_installments: 6,
    },
  };
};
