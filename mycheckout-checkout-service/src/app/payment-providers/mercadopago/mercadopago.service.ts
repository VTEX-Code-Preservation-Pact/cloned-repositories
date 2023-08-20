import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mercadopago from 'mercadopago';
import { IBaseAll } from '../base/base-all.interface';
import { CardsService } from './services/cards.service';
import { PreferencesService } from './services/preferences.service';
import { TransactionService } from './services/transaction.service';

@Injectable()
export class MercadopagoService implements IBaseAll {
  cards: CardsService;
  transactions: TransactionService;
  preferences: PreferencesService;

  constructor(private readonly configService: ConfigService) {
    mercadopago.configure({
      access_token: this.configService.get('MERCADOPAGO_ACCESS_TOKEN'),
    });

    this.cards = new CardsService(mercadopago);
    this.transactions = new TransactionService(mercadopago);
    this.preferences = new PreferencesService(mercadopago);
  }
}
