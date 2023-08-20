import './common/commands'
import './common/api_commands'
import './common/env_orders'
import './commands.js'
import './env_reviews'

// Configure it to preserve cookies
Cypress.Cookies.defaults({
  preserve: 'VtexIdclientAutCookie',
})

// Avoid application errors
Cypress.on('uncaught:exception', () => {
  return false
})
