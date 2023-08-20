/* eslint-disable @typescript-eslint/camelcase */
import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'
import { getCountryISO2 } from './modules/iso-3-to-2'
import { addScript } from './modules/addScript'

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:orderPlacedTracked':
    case 'vtex:orderPlaced': {
      const data = e.data
      const merchantId = window.__google_customer_reviews.merchantId
      const passGtin = window.__google_customer_reviews.passGtin
      const optInStyle = window.__google_customer_reviews.optInStyle
      const showBadge = window.__google_customer_reviews.showBadge
      const badgePosition = window.__google_customer_reviews.badgePosition

      const shippingEstimateDate = new Date(
        data.transactionLatestShippingEstimate
      )
      const estimate = shippingEstimateDate.toISOString().slice(0, 10)

      window.renderOptIn = function() {
        if (showBadge === 'true') {
          const ratingBadgeContainer = document.createElement('div')
          document.body.appendChild(ratingBadgeContainer)

          window.gapi.load('ratingbadge', function() {
            window.gapi.ratingbadge.render(ratingBadgeContainer, {
              merchant_id: merchantId,
              position: badgePosition,
            })
          })
        }

        window.gapi.load('surveyoptin', function() {
          window.gapi.surveyoptin.render({
            // REQUIRED
            merchant_id: merchantId,
            order_id: data.orderGroup,
            email: data.visitorContactInfo[0],
            delivery_country: getCountryISO2(
              data.visitorAddressCountry as keyof typeof getCountryISO2
            ),
            estimated_delivery_date: estimate,
            // OPTIONAL
            products:
              passGtin === 'true'
                ? data.transactionProducts.map(product => ({
                    gtin: product.ean,
                  }))
                : undefined,
            opt_in_style: optInStyle,
          })
        })
      }

      addScript('renderOptIn')
      return
    }
    default: {
      return
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
