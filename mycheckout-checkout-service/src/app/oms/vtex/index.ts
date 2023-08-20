import * as cookie from 'cookie';
import { Oms } from '../oms';
import { GatewayException } from '../../../shared/exceptions/gateway-exception';
import { paymentSystem as paymentSystemData } from '../types/oms.types';
import { ManageItemsService } from './items/manageItems.service';
import { AddressDoc } from 'src/app/users/addresses/schemas/address.schema';

export class VtexOms extends Oms {
  private getCheckoutCookies = (headers: Record<string, any>) => {
    const responseSetCookies: string[] = headers?.['set-cookie'] || [];
    const checkoutCookie = responseSetCookies.find((item) =>
      item.includes('Vtex_CHKO_Auth'),
    );
    if (checkoutCookie) return cookie.parse(checkoutCookie)['Vtex_CHKO_Auth'];
    return null;
  };

  async prepare(): Promise<void> {
    const {
      dataDto: {
        account,
        items,
        shipping: { logisticsInfo, externalAddress },
        marketingData,
        payment,
      },
      payment: { franchise, paymentSystem },
    } = this.ctx;

    const manageItemsService = new ManageItemsService();
    const { addresses } = this.ctx;
    const { vtexService } = this.services;

    if (payment.gateway == 'noop')
      this.ctx.account.paymentMethodId =
        paymentSystem || paymentSystemData[franchise];
    else if (payment.gateway == 'custom')
      this.ctx.account.paymentMethodId = payment.paymentMethod;

    const promises = [];

    promises[0] = vtexService.cart.cartSimulation(
      account.accountName,
      items,
      externalAddress || addresses[0],
      logisticsInfo,
      marketingData,
      payment,
      this.ctx.account.paymentMethodId,
    );

    //TODO: revisar si es verdaderamente necesario las dos simulaciones
    if (externalAddress)
      promises.push(
        manageItemsService.individualSimulation(
          logisticsInfo,
          items,
          account,
          externalAddress as AddressDoc,
          'pickup-in-point',
          marketingData,
          payment,
          vtexService,
          this.ctx,
        ),
      );
    if (addresses[0])
      promises.push(
        manageItemsService.individualSimulation(
          logisticsInfo,
          items,
          account,
          addresses[0],
          'delivery',
          marketingData,
          payment,
          vtexService,
          this.ctx,
        ),
      );

    const simulations = (await Promise.all(promises)).filter((e) => {
      return e !== undefined;
    });

    //manageItemsService.validateAvailability(simulations[0]);

    let shippingTotal = 0;
    const totals: number = simulations[0].totals.reduce((acumm, total) => {
      if (total.id === 'Shipping') {
        shippingTotal = shippingTotal;
      }

      return acumm + total.value;
    }, 0);

    const {
      items: formattedItems,
      gifts,
      offersTotal,
    } = manageItemsService.manageItems(simulations[0], this.ctx);

    this.ctx.vtex = {
      simulation: simulations[0],
      items: formattedItems,
      gifts,
      totals: totals + offersTotal,
      shippingTotal,
    };

    this.ctx.queueMessage.totalizers = {
      totals: (totals + offersTotal) / 100,
      shippingTotal: shippingTotal / 100,
      subTotal: (totals + offersTotal - shippingTotal) / 100,
    };
  }

  async createOrder(): Promise<void> {
    const {
      account,
      profile,
      addresses,
      vtex: { totals, simulation, items, gifts },
      dataDto: {
        account: {
          storePreferences: { currencyCode },
        },
        customData,
        marketingData,
        payment,
      },
      headers,
    } = this.ctx;

    const { vtexService } = this.services;

    let vtexOrderResp: any;

    try {
      vtexOrderResp = await vtexService.checkout.createOrder(
        account,
        simulation,
        profile,
        addresses,
        totals,
        items,
        gifts,
        customData,
        marketingData,
        payment,
        headers,
      );
    } catch (err) {
      throw new GatewayException(
        'VTEX: Error creating order',
        err.response?.data,
      );
    }

    const checkoutCookie = this.getCheckoutCookies(vtexOrderResp.headers);

    this.ctx.vtex = {
      ...this.ctx.vtex,
      order: vtexOrderResp.data,
      checkoutCookie,
    };

    this.ctx.queueMessage.reference = vtexOrderResp.data.orders[0].orderGroup;
    this.ctx.queueMessage.omsExtraData = {
      transactions: vtexOrderResp.data.transactionData.merchantTransactions.map(
        (transaction) => ({
          transactionId: transaction.transactionId,
          merchantName: transaction.merchantName,
          payments: transaction.payments.map((payment) => ({
            value: payment.value,
            referenceValue: payment.referenceValue,
            paymentSystem: payment.paymentSystem,
          })),
        }),
      ),
      order: {
        addressId: vtexOrderResp.data.orders[0].shippingData.address.addressId,
        currencyCode: currencyCode,
        orderGroup: vtexOrderResp.data.orders[0].orderGroup,
        id: vtexOrderResp.data.orders[0].orderId,
      },
      checkoutCookie,
    };
  }

  async onProcessTransaction(): Promise<void> {
    const {
      processTransactionDto: {
        omsExtraData: { order: orderVtex, transactions, checkoutCookie },
        account,
        payment,
      },
      headers,
    } = this.ctx;

    //TODO: Realizar pago de targetas de comercio aqui, al eliminar PCI proxy
    if (payment.gateway !== 'noop' /*|| payment.additionalData?.accountId*/) {
      const { vtexService } = this.services;

      const transactionPromises = [];
      transactions.forEach((transaction) =>
        transactionPromises.push(
          vtexService.payment.sendPaymentData(
            account,
            transaction,
            orderVtex,
            headers,
            payment,
          ),
        ),
      );

      await Promise.all(transactionPromises);

      await vtexService.payment.requestPaymentProcess(
        account,
        checkoutCookie,
        orderVtex,
        headers,
      );
    }
  }
}
