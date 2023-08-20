import { ChargesDto } from './dtos/charges.dto';
import { CustomerDto } from './dtos/customer.dto';

export interface ITransactionService {
  createCharge(data: ChargesDto, customer: CustomerDto): Promise<any>;
}
