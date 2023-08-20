import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

export interface CityAttrs {
  city: string;
  state: string;
  country: string;
  phone: string;
  iso: string;
  postal_code: string;
}

export interface CityDoc extends Document {
  city: string;
  citySearch: string;
  state: string;
  stateSearch: string;
  country: string;
  countrySearch: string;
  phone: string;
  iso: string;
  postal_code: string;
}

export type CityModel = Model<CityDoc, CityAttrs>;

const CitySchema = Schema.build({
  city: { type: String, required: true },
  citySearch: {
    type: String,
    required: true,
    index: { global: true, name: 'cityIndex' },
  },
  state: { type: String, required: true },
  stateSearch: {
    type: String,
    required: true,
    index: { global: true, name: 'stateIndex' },
  },
  country: { type: String, required: true },
  countrySearch: {
    type: String,
    required: true,
    index: { global: true, name: 'countryIndex' },
  },
  phone: { type: String, required: true },
  iso: { type: String, required: true },
  postal_code: { type: String, required: true },
});

export const City: ModelDefinition = {
  name: 'masters.cities',
  schema: CitySchema,
  methods: {
    transform: (ret: CityDoc) => {
      delete ret.citySearch;
      delete ret.countrySearch;
      delete ret.stateSearch;
    },
  },
  options: { throughput: 'ON_DEMAND' },
};
