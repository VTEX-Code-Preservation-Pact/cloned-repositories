import { OrderContext } from '../../typings/OrderContext';
import { OmsServices } from './types/oms.types';

export abstract class Oms {
  constructor(protected ctx: OrderContext, protected services: OmsServices) {}
  abstract prepare(): Promise<void>;

  abstract createOrder(): Promise<void>;

  abstract onProcessTransaction(): Promise<void>;

  async run() {
    await this.prepare();
    await this.createOrder();
  }
}
