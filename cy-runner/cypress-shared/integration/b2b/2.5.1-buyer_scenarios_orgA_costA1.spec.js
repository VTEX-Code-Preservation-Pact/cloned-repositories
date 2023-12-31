import {
  loginViaCookies,
  preserveCookie,
} from '../../support/common/support.js'
import b2b from '../../support/b2b/constants.js'
import {
  ROLE_DROP_DOWN_EMAIL_MAPPING as role,
  ROLE_DROP_DOWN,
  ROLE_ID_EMAIL_MAPPING as roleObject,
} from '../../support/b2b/utils.js'
import { loginToStoreFront } from '../../support/b2b/login.js'
import {
  productShouldNotbeAvailableTestCase,
  verifySession,
  userAndCostCenterShouldNotBeEditable,
  userShouldNotImpersonateThisUser,
} from '../../support/b2b/common.js'
import {
  searchQuote,
  createQuote,
  quoteShouldbeVisibleTestCase,
  quoteShouldNotBeVisibleTestCase,
} from '../../support/b2b/quotes.js'

describe('Organization A - Cost Center A1 - Buyer Scenarios', () => {
  loginViaCookies({ storeFrontCookie: false })

  const {
    organizationName,
    nonAvailableProduct,
    costCenter1,
    users,
    product,
    quotes,
    gmailCreds,
  } = b2b.OrganizationA

  const { organizationName: organizationB, quotes: organizationBQuote } =
    b2b.OrganizationB

  loginToStoreFront(users.Buyer1, ROLE_DROP_DOWN.Buyer, gmailCreds)
  verifySession(b2b.OrganizationA, costCenter1.name, ROLE_DROP_DOWN.Buyer)
  productShouldNotbeAvailableTestCase(nonAvailableProduct)
  userAndCostCenterShouldNotBeEditable({
    organizationName,
    costCenter: costCenter1.name,
    gmailCreds,
    role: role.Buyer1,
  })
  userShouldNotImpersonateThisUser(
    ROLE_DROP_DOWN.Buyer,
    roleObject.SalesManager.role,
    users.SalesManager
  )
  quoteShouldbeVisibleTestCase(
    organizationName,
    quotes.OrganizationAdmin.quotes1,
    organizationName
  )
  quoteShouldNotBeVisibleTestCase(
    organizationName,
    organizationBQuote.OrganizationAdmin.quotes1,
    organizationB
  )
  searchQuote(quotes.OrganizationAdmin.quotes1)
  createQuote({
    product,
    quoteEnv: quotes.Buyer.quotes1,
    role: ROLE_DROP_DOWN.Buyer,
  })
  createQuote(
    {
      product,
      quoteEnv: quotes.Buyer.quotes2,
      role: ROLE_DROP_DOWN.Buyer,
    },
    false
  )
  createQuote({
    product,
    quoteEnv: quotes.Buyer.quotes3,
    role: ROLE_DROP_DOWN.Buyer,
  })
  preserveCookie()
})
