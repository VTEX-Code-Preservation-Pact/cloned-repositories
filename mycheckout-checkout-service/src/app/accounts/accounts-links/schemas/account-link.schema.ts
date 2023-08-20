import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

interface AccountLinkAttrs {
  accountRequester: string;
  accountApprover: string;
  date: Date;
}

export interface AccountLinkDoc extends Document {
  accountRequester: string;
  accountApprover: string;
  date: Date;
  status: string;
}

export type AccountLinkModel = Model<AccountLinkDoc, AccountLinkAttrs>;

const AccountLinkSchema = Schema.build({
  accountRequester: {
    type: String,
    required: true,
    index: { global: true, name: 'accountRequesterIndex' },
  },
  accountApprover: {
    type: String,
    required: true,
    index: { global: true, name: 'accountApproverIndex' },
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    default: 'pending',
    index: { global: true, name: 'statusIndex' },
  },
});

export const AccountLink: ModelDefinition = {
  name: 'accountLinks',
  schema: AccountLinkSchema,
};
