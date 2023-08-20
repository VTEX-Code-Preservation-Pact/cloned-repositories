import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';
import { Profile, ProfileDoc } from '../../profiles/schemas/profile.schema';
import { User, UserDoc } from '../../schemas/user.schema';

enum franchise {
  'vi' = 'visa',
  'visa' = 'vi',
  'mc' = 'master',
  'master' = 'master',
  'di' = 'diner',
  'diner' = 'diner',
  'amex' = 'amex',
}

interface CardAttrs {
  franchise: string;
  number: string;
  token?: string;
  gateway: string;
  profile: ProfileDoc;
  user: UserDoc;
  bin?: string;
  cvv?: string;
  holderName?: string;
  holderDocument?: string;
  expirationDate?: string;
  cardNumber?: string;
  aliasCC?: string;
  aliasCVV?: string;
  accountId?: string;
  paymentSystem?: string;
  cardContent?: Record<string, any>;
  internalCardContent?: Record<string, any>;
}

export interface CardDoc extends Document {
  franchise: string;
  number: string;
  token?: string;
  gateway: string;
  profile: ProfileDoc;
  user: UserDoc;
  bin?: string;
  cvv?: string;
  holderName?: string;
  holderDocument?: string;
  expirationDate?: string;
  aliasCC?: string;
  aliasCVV?: string;
  accountId?: string;
  cardNumber?: string;
  paymentSystem?: string;
  cardContent?: Record<string, any>;
  internalCardContent?: Record<string, any>;
}

export type CardModel = Model<CardDoc, CardAttrs>;

export const CardSchema = Schema.build({
  franchise: { type: String, required: true },
  number: { type: String, required: true },
  token: { type: String },
  gateway: { type: String, required: true },
  bin: { type: String },
  cvv: { type: String },
  paymentSystem: { type: String },
  holderName: { type: String },
  holderDocument: { type: String },
  expirationDate: { type: String },
  cardNumber: { type: String },
  aliasCC: { type: String },
  aliasCVV: { type: String },
  accountId: { type: String },
  cardContent: Object,
  internalCardContent: Object,
});

export const Card: ModelDefinition = {
  name: 'cards',
  schema: CardSchema,
  methods: {
    transform: (ret: CardDoc) => {
      ret.franchise = franchise[ret.franchise];
      ret.cvv = ret.token ? 'required' : 'non-required';
      delete ret.token;
      delete ret.internalCardContent;
      //delete ret.cvv;
      delete ret.holderName;
      delete ret.holderDocument;
      delete ret.cardNumber;
      delete ret.expirationDate;
      delete ret.aliasCC;
      delete ret.aliasCVV;
    },
  },
  population: function (populate) {
    this.schema.schemaObject.profile = {
      type: populate(Profile),
      index: { global: true, name: 'profileIndex' },
    };
    this.schema.schemaObject.user = {
      type: populate(User),
      index: { global: true, name: 'userIndex' },
    };
  },
};

/*
@Prop({
  required: true,
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Profile',
})
profile: null; //Profile;


@Prop({ required: false, type: {} })
cardContent: Record<string, any>;


  @Prop({ required: false, type: {} })
  internalCardContent: Record<string, any>;*/
