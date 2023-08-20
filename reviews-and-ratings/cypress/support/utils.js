import rrselectors from './selectors.js'
import { PRODUCTS } from './common/utils.js'
import messages from '../../messages/en.json'

export function reload(user = null) {
  cy.get('body').then($body => {
    cy.getReviewItems().then(review => {
      if ($body.find(rrselectors.WriteReview).length === 0) {
        cy.log(
          'We are not in product detail page now!. addReview command will take control'
        )
      } else if (user && !review[user.name]) {
        // Writing review will work only if we go to some page so category page
        cy.intercept('https://rc.vtex.com/v8').as('v8')
        cy.get('a[href*=food]').should('be.visible').click()
        cy.wait('@v8')
      }
    })
  })
}

export const MESSAGES = {
  AlreadySubmitted: messages['store/reviews.form.alreadySubmitted'],
  NoReviews: messages['store/reviews.list.emptyState'],
  VerifiedPurchaser: messages['store/reviews.list.verifiedPurchaser'],
  ReviewSubmitted: messages['store/reviews.form.reviewSubmitted'],
}

export const PRODUCT_ID_MAPPING = {
  [PRODUCTS.onion]: '880026',
  [PRODUCTS.cauliflower]: '880027',
  [PRODUCTS.coconut]: '880030',
  [PRODUCTS.waterMelon]: '880031',
  [PRODUCTS.orange]: '880032',
}
