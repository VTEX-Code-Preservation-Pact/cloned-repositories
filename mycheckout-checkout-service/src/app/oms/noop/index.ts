import { Oms } from '../oms';

export class NoopOms extends Oms {
  prepare(): Promise<void> {
    return;
  }
  createOrder(): Promise<void> {
    return;
  }
  onProcessTransaction(): Promise<void> {
    return;
  }
}
