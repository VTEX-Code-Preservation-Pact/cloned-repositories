import {
  Model,
  Document,
  Schema,
  ModelDefinition,
} from 'src/shared/utils/dynamoose-module';

interface DocumentTypeAttrs {
  name: string;
  type: string;
}

interface DocumentTypeDoc extends Document {
  name: string;
  type: string;
}

export type DocumentTypeModel = Model<DocumentTypeDoc, DocumentTypeAttrs>;

const DocumentTypeSchema = Schema.build({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    index: { global: true, name: 'typeIndex' },
  },
});

export const DocumentType: ModelDefinition = {
  name: 'masters.documentTypes',
  schema: DocumentTypeSchema,
};
