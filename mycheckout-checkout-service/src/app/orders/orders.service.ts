import { Injectable } from '@nestjs/common';
import { OrderContext } from '../../typings/OrderContext';
import { ChannelsService } from '../channels/channels.service';
import { OmsService } from '../oms/oms.service';
import { PaymentProvidersService } from '../payment-providers/payment-providers.service';
import { AwsService } from '../common/aws/aws.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { ProcessTransactionDto } from './dtos/processTransaction.dto';
import { Order, OrderModel } from './schemas/order.schema';
import { InjectModel } from 'nestjs-dynamoose';
import { OrdersVTEXService } from '../vtex/orders/orders.service';
import { AccountsService } from '../accounts/accounts.service';
import { OrderVtexDto } from '../vtex/dtos/orderVtex.dto';
// import { AcceptanceHabeasDataService } from '../accounts/habeasData/acceptanceHabeasData/acceptanceHabeasData.service';
// import { HabeasDataService } from '../accounts/habeasData/habeasData.service';
import { ProfilesService } from '../users/profiles/profiles.service';
import { AddressesService } from '../users/addresses/addresses.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: OrderModel,
    // private acceptanceHabeasDataService: AcceptanceHabeasDataService,
    private accountServices: AccountsService,
    private awsService: AwsService,
    private channelsService: ChannelsService,
    // private habeasDataService: HabeasDataService,
    private omsService: OmsService,
    private paymentProviderService: PaymentProvidersService,
    private profilesService: ProfilesService,
    private vtexOrderService: OrdersVTEXService,
    private addressService: AddressesService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderAddress = createOrderDto.shipping.addressId;
    const externalAddress = createOrderDto.shipping.externalAddress;
    const email = createOrderDto.profile.email;

    const address = await this.addressService.findByEmail(
      email,
      createOrderDto.account.accountName,
    );

    const profile = (await this.profilesService.getByEmail(email)).toJSON();

    if (
      externalAddress &&
      !address.find((address) => {
        return address.id === orderAddress;
      }) &&
      externalAddress.addressId === orderAddress
    ) {
      const newAddress = {
        receiverName: externalAddress.receiverName,
        profileId: profile[0].id,
        geoCoordinates: externalAddress.geoCoordinates,
        user: profile[0].user,
        country: externalAddress.country,
        state: externalAddress.state,
        city: externalAddress.city,
        number: externalAddress.number,
        neighborhood: externalAddress.neighborhood,
        id: externalAddress.addressId,
        postalCode: externalAddress.postalCode,
        street: externalAddress.street,
      };
      // save the direction
      await this.addressService.create(newAddress, true);
    }

    const ctx: OrderContext = {
      dataDto: createOrderDto,
      queueMessage: {
        profile: createOrderDto.profile,
        shipping: createOrderDto.shipping,
        channel: createOrderDto.channel,
        oms: createOrderDto.oms,
        hostname: createOrderDto.account.hostname,
        version: '2',
      },
      headers: {
        VtexIdclientAutCookie: createOrderDto.authToken,
      },
    };
    const channel = this.channelsService.createChannel(
      createOrderDto.channel,
      ctx,
    );
    const oms = this.omsService.createOms(createOrderDto.oms, ctx);
    const paymentProvider = this.paymentProviderService.createPaymentProvider(
      createOrderDto.payment.paymentMethod,
      createOrderDto.payment.gateway,
      createOrderDto.payment.additionalData?.accountId,
      ctx,
    );
    try {
      await channel.prepare();
      await oms.prepare();

      await oms.createOrder();
      await channel.createOrder(this.orderModel);
      if (ctx.account.paymentRedirect) {
        return this.processTransaction({
          ...ctx.queueMessage,
          authToken: createOrderDto.authToken,
        } as ProcessTransactionDto);
      } else {
        await this.awsService.sendTransactionProcessorQueue({
          ...ctx.queueMessage,
          authToken: createOrderDto.authToken,
        });

        return ctx.order;
      }
    } catch (err) {
      if (ctx.dataDto.payment.token && !ctx.dataDto.payment.cardId) {
        paymentProvider.rollbackPayment();
      }

      if (ctx.account && ctx.account.paymentRedirect && !ctx.order) {
        await channel.cancelOrder(this.orderModel, err.toString());
      }
      throw err;
    }
  }

  async processTransaction(processTransactionDto: ProcessTransactionDto) {
    const ctx: OrderContext = {
      processTransactionDto,
      headers: {
        VtexIdclientAutCookie: processTransactionDto.authToken,
      },
    };

    const channel = this.channelsService.createChannel(
      processTransactionDto.channel,
      ctx,
    );
    const oms = this.omsService.createOms(processTransactionDto.oms, ctx);
    const paymentProvider = this.paymentProviderService.createPaymentProvider(
      processTransactionDto.payment.paymentMethod,
      processTransactionDto.payment.gateway,
      processTransactionDto.payment.additionalData?.accountId,
      ctx,
    );

    try {
      await channel.prepareProcessTransaction(this.orderModel);

      await oms.onProcessTransaction();

      await paymentProvider.authorizePayment();

      await channel.onProcessTransaction();

      return {
        ...ctx.order.toJSON(),
        transaction: {
          ...(ctx.transaction.gatewayCallbackResponse &&
            (ctx.transaction.gatewayCallbackResponse as Record<
              string,
              unknown
            >)),
        },
      };
    } catch (err) {
      if (
        ctx.processTransactionDto.payment.token &&
        !ctx.processTransactionDto.payment.cardId
      ) {
        paymentProvider.rollbackPayment();
      }

      await channel.cancelOrderProcessTransaction(err.toString());
      throw err;
    }
  }

  async paymentProcess(an: string, order: string, authToken: string) {
    const account = await this.accountServices.get({
      account: an,
    });
    const headers = {
      VtexIdclientAutCookie: authToken,
    };

    try {
      return await this.vtexOrderService.payment.requestPaymentProcess(
        account,
        '',
        {
          orderGroup: order,
        } as OrderVtexDto,
        headers,
      );
    } catch (err) {
      return { status: false, message: err.response.data?.error.message };
    }
  }
}
