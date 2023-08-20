import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';
import { maskPhone as maskString } from 'maskdata';
import { Profile, ProfileDoc } from '../../profiles/schemas/profile.schema';
import { UserDoc } from '../../schemas/user.schema';

export interface AddressAttrs {
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  postalCode: string;
  reference: string;
  receiverName: string;
  geoCoordinates: {
    longitude: string;
    latitude: string;
  };
  profile: ProfileDoc;
  user: UserDoc;
  id?: string;
}

export interface AddressDoc extends Document {
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  postalCode: string;
  reference: string;
  receiverName: string;
  geoCoordinates: {
    longitude: string;
    latitude: string;
  };
  addressId?: string;
  profile: ProfileDoc | ProfileDoc['id'];
  user: UserDoc;
  isEqual?: boolean;
  mask(this: this): this;
}

export type AddressModel = Model<AddressDoc, AddressAttrs>;

export const AddressSchema = Schema.build({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  neighborhood: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  postalCode: { type: String },
  reference: { type: String },
  receiverName: { type: String, required: true },
  geoCoordinates: {
    type: Object,
    schema: {
      longitude: { type: String, required: true },
      latitude: { type: String, required: true },
    },
  },
});

export const Address: ModelDefinition = {
  name: 'addresses',
  schema: AddressSchema,
  methods: {
    mask: function (this: AddressDoc) {
      this.country = maskString(this.country, { unmaskedStartDigits: 3 });
      this.city = maskString(this.city, { unmaskedStartDigits: 3 });
      this.state = maskString(this.state, { unmaskedStartDigits: 3 });
      this.street = maskString(this.street, { unmaskedStartDigits: 3 });
      this.number = maskString(this.number, { unmaskedStartDigits: 3 });
      this.receiverName = maskString(this.receiverName, {
        unmaskedStartDigits: 3,
      });
      this.geoCoordinates = { longitude: '', latitude: '' };
      this.neighborhood = maskString(
        this.neighborhood ? this.neighborhood : '',
        {
          unmaskedStartDigits: 3,
        },
      );
      this.reference = maskString(this.reference ? this.reference : '', {
        unmaskedStartDigits: 3,
      });
      return this;
    },
  },
  population: function (populate) {
    this.schema.schemaObject.profile = {
      type: populate(Profile),
      index: { global: true, name: 'profileIndex' },
    };
    this.schema.schemaObject.user = {
      type: populate(Profile),
      index: { global: true, name: 'userIndex' },
    };
  },
};
