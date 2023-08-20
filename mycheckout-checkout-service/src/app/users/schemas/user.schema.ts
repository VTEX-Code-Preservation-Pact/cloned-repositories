import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

interface UserAttrs {
  email: string;
  creationDate: string;
  createdAccount: string;
  createdAt: number;
}

export interface UserDoc extends Document {
  email: string;
  creationDate: string;
  createdAccount: string;
  createdAt: number;
}

export type UserModel = Model<UserDoc, UserAttrs>;

const UserSchema = Schema.build({
  email: {
    type: String,
    required: true,
    index: { global: true, name: 'emailIndex' },
  },
  creationDate: { type: String },
  createdAccount: {
    type: String,
    required: true,
    index: { global: true, name: 'accountIndex' },
  },
  createdAt: { type: Number },
});

export const User: ModelDefinition = {
  name: 'users',
  schema: UserSchema,
};
