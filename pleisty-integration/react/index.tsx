import { canUseDOM } from 'vtex.render-runtime'
import {
    Order,
    ProductOrder,
    PixelMessage
} from './typings/events'
import { pleistyPush } from "./utils/pleisty-utils";


export function handleEvents(e: PixelMessage) {
    switch (e.data.eventName) {
        case 'vtex:orderPlaced': {
            const order = e.data;

            const ecommerce = {

                purchase: {
                    actionField: getPurchaseObjectData(order),
                    products: order.transactionProducts.map((product: ProductOrder) => product),
                },
            };
            // Backwards compatible event
            pleistyPush(
                'checkout_finalized',
                {
                    currency: "RON",
                    items: ecommerce.purchase.products
                });

            // Backwards compatible event
            // TODO: Do we need the following 2 events ?
            pleistyPush('pageLoaded', {
                ecommerce,
            });

            pleistyPush('orderPlaced', {
                ...order,
                ecommerce,
            });

            return
        }
        default: {
            return
        }
    }
}

function getPurchaseObjectData(order: Order) {
    return {
        affiliation: order.transactionAffiliation,
        coupon: order.coupon ? order.coupon : null,
        id: order.orderGroup,
        revenue: order.transactionTotal,
        shipping: order.transactionShipping,
        tax: order.transactionTax,
    }
}

if (canUseDOM) {
    window.addEventListener('message', handleEvents)
}
