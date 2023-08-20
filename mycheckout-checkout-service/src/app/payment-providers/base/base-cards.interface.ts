import { CustomerDto } from './dtos/customer.dto';

export interface ICardsService {
  listOfUserCards(customer: CustomerDto): Promise<any>;
  deleteUserCards(token: string, customer: CustomerDto): Promise<any>;
  createCard(customer: CustomerDto, data: any);
}
