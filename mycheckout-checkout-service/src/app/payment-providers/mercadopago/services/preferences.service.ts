import { OrderDoc } from '../../../orders/schemas/order.schema';
import { preference } from '../config/preference';

export class PreferencesService {
  constructor(private readonly mercadopago) {}

  createPreference(order: OrderDoc) {
    return this.mercadopago.preferences
      .create(preference(order))
      .then((res) => res.body)
      .catch((error) => error);
  }
}
