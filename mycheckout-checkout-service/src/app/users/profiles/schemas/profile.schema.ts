import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

import { User, UserDoc } from '../../schemas/user.schema';
import { Account, AccountDoc } from '../../../accounts/schemas/account.schema';
import { Address, AddressDoc } from '../../addresses/schemas/address.schema';
import { maskPhone, maskCard, maskString } from 'maskdata';
import { Card, CardDoc } from '../../cards/schemas/cards.schema';

export interface ProfileAttrs {
  name: string;
  lastname: string;
  documentType: string;
  document: string;
  phoneCode: string;
  phoneNumber: string;
  user: UserDoc;
  account: AccountDoc;
  habeasData: boolean;
  creationDate: string;
}

export interface ProfileDoc extends Document {
  email?: string;
  name: string;
  lastname: string;
  documentType: string;
  document: string;
  phoneCode: string;
  phoneNumber: string;
  user: UserDoc | UserDoc['id'];
  account: AccountDoc;
  habeasData: boolean;
  selectedAddress: AddressDoc | AddressDoc['id'];
  selectedPayment: {
    paymentMethod: string;
    card: CardDoc | CardDoc['id'];
  };
  addresses: AddressDoc[];
  cards: CardDoc[];
  creationDate: string;
  version: number;
  mask(this: this): this;
}

export type ProfileModel = Model<ProfileDoc, ProfileAttrs>;

export const ProfileSchema = Schema.build({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  documentType: { type: String },
  document: { type: String, required: true },
  phoneCode: { type: String, default: '' },
  phoneNumber: {
    type: String,
    required: true,
    index: { global: true, name: 'phoneNumberIndex' },
  },
  habeasData: { type: Boolean, required: true, default: false },
  creationDate: { type: String },
});

export const Profile: ModelDefinition = {
  name: 'profiles',
  schema: ProfileSchema,
  methods: {
    transform: (ret: ProfileDoc) => {
      // delete ret.user;
      delete ret.account;
      delete ret.creationDate;
      ret['phone_code'] = ret.phoneCode;
      ret['phone_number'] = ret.phoneNumber;
      ret['id_type'] = ret.documentType;
      ret['id_number'] = ret.document;

      /*if (doc.email) {
        ret.email = doc.email;
      }
      if (doc.cards) {
        ret.cards = doc.cards;
      }*/
    },
    mask: function (this: ProfileDoc) {
      this.phoneNumber = maskPhone(this.phoneNumber);
      this.document = maskCard(this.document);
      this.name = maskString(this.name, { maskAll: true });
      this.lastname = maskString(this.lastname, { maskAll: true });
      this.addresses?.map((address) => {
        return address.mask();
      });
      (this.selectedAddress as AddressDoc)?.mask();

      return this;
    },
  },
  population: function (populate) {
    this.schema.schemaObject.user = {
      type: populate(User),
      index: { global: true, name: 'userIndex' },
    };
    this.schema.schemaObject.account = {
      type: populate(Account),
      index: { global: true, name: 'accountIndex' },
    };
    this.schema.schemaObject.selectedAddress = {
      type: populate(Address),
      index: { global: true, name: 'selectedAddressIndex' },
    };
    this.schema.schemaObject.selectedPayment = {
      type: Object,
      schema: {
        paymentMethod: { type: String },
        card: {
          type: populate(Card),
          index: { global: true, name: 'cardIndex' },
        },
      },
    };
  },
};
