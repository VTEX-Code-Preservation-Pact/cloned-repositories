import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-dynamoose';
import { ChannelsService } from '../channels/channels.service';
import { AwsService } from '../common/aws/aws.service';
import { OmsService } from '../oms/oms.service';
import { PaymentProvidersService } from '../payment-providers/payment-providers.service';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';

const AwsServiceProvider = {
  provide: AwsService,
  useFactory: () => ({}),
};

const OrderModel = {
  provide: getModelToken(Order.name),
  useFactory: () => ({}),
};

const ChannelsServiceProvider = {
  provide: ChannelsService,
  useFactory: () => ({}),
};
const OmsServiceProvider = {
  provide: OmsService,
  useFactory: () => ({}),
};

const PaymentProviderServiceProvider = {
  provide: PaymentProvidersService,
  useFactory: () => ({}),
};

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        AwsServiceProvider,
        OrderModel,
        ChannelsServiceProvider,
        OmsServiceProvider,
        PaymentProviderServiceProvider,
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
