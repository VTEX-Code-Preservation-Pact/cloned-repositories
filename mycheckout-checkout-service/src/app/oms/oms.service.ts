import { OrderContext } from '../../typings/OrderContext';
import { Injectable } from '@nestjs/common';
import { OrdersVTEXService } from '../vtex/orders/orders.service';
import { NoopOms } from './noop';
import { Oms } from './oms';
import { OmsName, OmsServices } from './types/oms.types';
import { VtexOms } from './vtex';

@Injectable()
export class OmsService {
  private services: OmsServices;
  constructor(vtexService: OrdersVTEXService) {
    this.services = {
      vtexService,
    };
  }
  createOms(oms: string, ctx: OrderContext): Oms {
    switch (oms) {
      case OmsName.VTEX:
        return new VtexOms(ctx, this.services);
      case OmsName.NOOP:
        return new NoopOms(ctx, this.services);
      default:
        break;
    }
  }
}
