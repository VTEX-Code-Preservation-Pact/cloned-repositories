import { CreateAccountDto } from '../../accounts/dtos/createAccount.dto';
import { PaymentDataDto } from '../../orders/dtos/paymentData.dto';
import { OrderVtexDto } from '../../vtex/dtos/orderVtex.dto';
import { PaymentVtexDto } from '../../vtex/dtos/paymentVtex.dto';
import { TransactionVtexDto } from '../../vtex/dtos/transactionVtex.dto';
import { Injectable } from '@nestjs/common';
import { PaymentProviderServices } from '../types/payment-providers.type';
import { OrderContext } from 'src/typings/OrderContext';

@Injectable()
export class KuikpayService {
  private readonly api;
  constructor(public services: PaymentProviderServices) {
    this.api = this.services.configService.get('KUIKPAY_API_PAYMENTS');
  }

  sendPayment(
    payment: PaymentVtexDto,
    orderVtex: OrderVtexDto,
    transaction: TransactionVtexDto,
    accountData: CreateAccountDto,
    checkoutCookie: any,
    hostname: string,
    paymentData?: PaymentDataDto,
    ctx?: OrderContext,
  ) {
    const installments = paymentData.additionalData?.installments
      ? paymentData.additionalData?.installments
      : 1;
    const proxy: any = {};
    //TODO: revisar accountId al eliminar PCI proxy
    const accountId = paymentData.additionalData?.accountId;
    proxy.transactionId = paymentData.additionalData?.transactionId;
    proxy.token = paymentData.token;
    proxy.aliasCC = paymentData.aliasCC;
    proxy.aliasCVV = paymentData.aliasCVV;

    const payments = {
      proxy: proxy,
      gateway: proxy.token ? 'paymentez' : 'pci',
      vtex: {
        user: {
          email: ctx.processTransactionDto.profile.email,
          document: ctx.profile.document,
        },
        payment: {
          paymentSystem: Number.parseInt(payment.paymentSystem),
          installments: Number.parseInt(installments),
          installmentsInterestRate: 0,
          installmentsValue: 0,
          value: payment.value,
          franchise: paymentData.franchise,
          referenceValue: payment.referenceValue,
          fields: {
            validationCode: paymentData.cvv,
            holderName: paymentData.holderName,
            dueDate: paymentData.expirationDate,
            addressId: orderVtex.addressId,
            number: paymentData.number,
            bin: paymentData.bin,
          },
          transaction: {
            id: transaction.transactionId,
            merchantName: transaction.merchantName,
          },
          currencyCode: orderVtex.currencyCode,
        },
        order: {
          accountName: accountData.account,
          hostname,
          VtexChkoAuth: checkoutCookie,
          orderGroup: orderVtex.orderGroup,
        },
      },
    };

    if (accountId) {
      payments.vtex.payment.fields['cardNumber'] = null;
      payments.vtex.payment.fields['accountId'] = accountId;
      payments.vtex.payment.fields.dueDate = null;
      delete payments.vtex.payment.fields.holderName;
    }

    return this.services.httpService
      .post(this.api, payments, {
        headers: {
          ...ctx?.headers,
        },
      })
      .toPromise()
      .then((r: any) => {
        if (r?.data) {
          (ctx as any).transaction = {
            aliasCC: r.data.aliasCC,
            aliasCVV: r.data.aliasCVV,
            gatewayCallbackResponse: r.data.gatewayCallbackResponse,
            token: r.data.token,
          };
        }
      });
  }
}
