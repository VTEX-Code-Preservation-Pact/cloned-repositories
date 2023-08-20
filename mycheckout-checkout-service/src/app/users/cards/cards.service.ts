import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { encrypt } from 'src/shared/utils/encription';
import { ApiResponse } from '../../../shared/responses';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileDoc } from '../profiles/schemas/profile.schema';
import { UserDoc } from '../schemas/user.schema';
import { UsersService } from '../users.service';
import { CardDto } from './dtos/card.dto';
import { Card, CardModel } from './schemas/cards.schema';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private cardModel: CardModel,
    private usersService: UsersService,
    private accountsService: AccountsService,
    private profilesService: ProfilesService,
  ) {}

  async findByEmail(email: string, an: string) {
    const user = await this.usersService.getUserByEmail(email);
    const account = await this.accountsService.get({ account: an });
    if (!user || !account) return [];
    const profiles = await this.profilesService.getByUserAccount(user);
    if (!profiles || profiles.count == 0) return [];
    return this.cardModel.query({ profile: profiles[0].id }).exec();
  }

  //TODO: Create CardDTO instead PaymentDataDto
  async create(paymentDto: CardDto, profile: ProfileDoc) {
    const card = this.cardModel.build({
      token: encrypt(paymentDto.token),
      franchise: paymentDto.franchise,
      number: paymentDto.number,
      gateway: paymentDto.gateway,
      cardContent: paymentDto.cardContent,
      bin: paymentDto.bin,
      paymentSystem: paymentDto.paymentSystem,
      holderDocument: paymentDto.holderDocument,
      holderName: paymentDto.holderName,
      expirationDate: paymentDto.expirationDate,
      cardNumber: paymentDto.cardNumber,
      cvv: paymentDto.cvv,
      aliasCVV: 'null',
      aliasCC: paymentDto.aliasCC,
      internalCardContent: paymentDto.internalCardContent,
      profile,
      user: profile.user as UserDoc,
    });

    return card.save();
  }

  async update(paymentDto: Partial<CardDto>, id: string) {
    const card = await this.cardModel.get(id);
    if (paymentDto.token) paymentDto.token = encrypt(paymentDto.token);
    card?.set(paymentDto);
    return card?.save();
  }

  get(id: string) {
    return this.cardModel.get(id);
  }

  async delete(id: string) {
    const card = await this.cardModel.get(id);
    await card?.delete();
    return ApiResponse.send('responses.resource_deleted', card);
  }
}
