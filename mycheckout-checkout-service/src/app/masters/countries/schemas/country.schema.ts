import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

interface CountryAttrs {
  country: string;
  iso: string;
  phone: string;
  postal_code_regex: string;
  states: {
    state: string;
    cities: [{ city: string; city_id: string }];
  };
}

export interface CountryDoc extends Document {
  country: string;
  iso: string;
  phone: string;
  postal_code_regex: string;
  states: {
    state: string;
    cities: [{ city: string; city_id: string }];
  };
}

export type CountryModel = Model<CountryDoc, CountryAttrs>;

const CountrySchema = Schema.build({
  country: {
    type: String,
    required: true,
    index: { global: true, name: 'countryIndex' },
  },
  iso: {
    type: String,
    required: true,
    index: { global: true, name: 'isoIndex' },
  },
  phone: { type: String, required: true },
  postal_code_regex: { type: String, required: true },
  states: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          state: String,
          cities: {
            type: Array,
            schema: [
              {
                type: Object,
                schema: {
                  city: String,
                  city_id: String,
                },
              },
            ],
          },
        },
      },
    ],
  },
});

export const Country: ModelDefinition = {
  name: 'masters.countries',
  schema: CountrySchema,
};
