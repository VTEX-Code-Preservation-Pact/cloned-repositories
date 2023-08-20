import { IOClients } from '@vtex/api'

import { AddressService } from './checkout/address'
import { AuthService } from './checkout/auth'
import { CountriesService } from './checkout/countries'
import { DocumentsService } from './checkout/documents'
import { OrderService } from './checkout/orders'
import { PaymentsService } from './checkout/payments'
import { AccountsService } from './checkout/accounts'
import { UserService } from './checkout/user'
import { CreditService } from './checkout/credit'
import { EcommerceService } from './checkout/ecommerce'
import SchedulerClient from './checkout/scheduler'
import { CheckoutlessClient } from './admin/checkoutless'
import { CategoriesClient } from './admin/categories'
import { PaymentsClient } from './admin/payments'
import { MetricsService } from './admin/metrics'
import { OrionServices } from './orion'
import { PaymentGateway } from './admin/paymentGateway'

export class Clients extends IOClients {
  /*  ---- Checkout ---- */
  public get user() {
    return this.getOrSet('user', UserService)
  }

  public get auth() {
    return this.getOrSet('auth', AuthService)
  }

  public get address() {
    return this.getOrSet('address', AddressService)
  }

  public get payments() {
    return this.getOrSet('payments', PaymentsService)
  }

  public get orders() {
    return this.getOrSet('orders', OrderService)
  }

  public get countries() {
    return this.getOrSet('countries', CountriesService)
  }

  public get documents() {
    return this.getOrSet('documents', DocumentsService)
  }

  public get accounts() {
    return this.getOrSet('accounts', AccountsService)
  }

  public get credit() {
    return this.getOrSet('credit', CreditService)
  }

  public get ecommerce() {
    return this.getOrSet('ecommerce', EcommerceService)
  }

  public get scheduler() {
    return this.getOrSet('scheduler', SchedulerClient)
  }

  /*  ---- Admin ---- */
  public get checkoutless() {
    return this.getOrSet('checkoutless', CheckoutlessClient)
  }

  public get categories() {
    return this.getOrSet('categories', CategoriesClient)
  }

  public get paymentsClient() {
    return this.getOrSet('paymentsClient', PaymentsClient)
  }

  public get adminMetrics() {
    return this.getOrSet('adminMetrics', MetricsService)
  }

  public get paymentGateway() {
    return this.getOrSet('paymentGateway', PaymentGateway)
  }

  /*  ---- Orion ---- */

  public get orionServices() {
    return this.getOrSet('orionServices', OrionServices)
  }
}
