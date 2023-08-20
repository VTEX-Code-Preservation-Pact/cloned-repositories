import {
  ModelDefinition as ModelDefinitionBase,
  DynamooseModule as Base,
  getModelToken,
} from 'nestjs-dynamoose';
import { model as Model, Schema as SchemaBuild } from 'dynamoose';
import { Model as IModel } from 'dynamoose/dist/Model';
import { DYNAMOOSE_INITIALIZATION } from 'nestjs-dynamoose/dist/dynamoose.constants';
import { FunctionType, ModelType } from 'dynamoose/dist/General';
import { AnyDocument, Document as DocumentBase } from 'dynamoose/dist/Document';
import { SchemaDefinition } from 'dynamoose/dist/Schema';
import { classToPlain } from 'class-transformer';
import { deleteNull } from './data-array';
import { ConditionInitalizer } from 'dynamoose/dist/Condition';
import { ObjectId } from './object-id';

const modelInstances: { [model: string]: ModelType<AnyDocument> } = {};

export class Schema {
  static build = (def: SchemaDefinition) =>
    new SchemaBuild({
      id: {
        type: String,
        hashKey: true,
        default: ObjectId,
      },
      ...def,
    });
}

export declare class Document extends DocumentBase {
  set?: (attrs: Partial<this>) => void;
  save: (this: Document) => Promise<any>;
  id?: string;
}

export interface Model<Doc extends Document, Attrs> extends IModel<Doc> {
  build(attrs: Attrs | Doc): Doc;
  findOne: (attrs: ConditionInitalizer) => { exec: () => Promise<Doc> };
  insertMany: (attrs: Attrs[]) => Promise<Doc[]>;
}

export class CustomDynamooseModule extends Base {
  static forFeature(models: ModelDefinition[] = []) {
    const providers = createDynamooseProviders(models);
    return {
      module: CustomDynamooseModule,
      providers: providers,
      exports: providers,
    };
  }
}

export declare interface ModelDefinition extends ModelDefinitionBase {
  methods?: { [name: string]: FunctionType };
  statics?: { [name: string]: FunctionType };
  population?: (
    config: (
      model: ModelDefinition,
      properties?: string[],
    ) => ModelType<Document>,
  ) => void;
}

function createDynamooseProviders(models: ModelDefinition[] = []) {
  const providers = (models || []).map((model) => ({
    provide: getModelToken(model.name),
    useFactory: () =>
      modelInstances[model.name] || SchemaInstanceFactory(model),
    inject: [DYNAMOOSE_INITIALIZATION],
  }));
  return providers;
}

export function SchemaInstanceFactory(model: ModelDefinition) {
  {
    const modelInstance = Model(model.name, model.schema, model.options);
    if (model.serializers) {
      Object.entries(model.serializers).forEach(([key, value]) => {
        modelInstance.serializer.add(key, value);
      });
    }
    model.population?.((modelInfo) => {
      const schema =
        modelInstances[modelInfo.name] || SchemaInstanceFactory(modelInfo);
      model.population = null;
      return schema;
    });

    modelInstance.methods.document.set('set', function (attrs) {
      const data = modelInstance.build(attrs);
      delete data.id;
      Object.assign(this, data);
    });

    const createFn = modelInstance.create;
    modelInstance.create = async function (data) {
      return createFn(deleteNull(classToPlain(data))) as any;
    };

    modelInstance.insertMany = async function (data = []) {
      if (data) {
        const object = [];
        data.map((attrs) => {
          const info = this.build(attrs);
          object.push(info);
          return info;
        });
        await modelInstance.batchPut(object);
      }
      return data;
    };

    modelInstance.findOne = (query) => {
      return {
        exec: async () => {
          return modelInstance
            .query(query)
            .exec()
            .then((r) => r[0]);
        },
      };
    };

    modelInstance.build = function (attrs) {
      if (!attrs.id) attrs.id = ObjectId();
      attrs = new this(classToPlain(attrs));
      deleteNull(attrs);
      return attrs;
    };

    for (const fn in model.methods) {
      if (fn === 'transform') {
        modelInstance.prototype.toJSON = function () {
          model.methods.transform(this);
          return this;
        };
      } else {
        modelInstance.Model.Document.prototype[fn] = model.methods[fn];
      }
    }
    for (const fn in model.statics) {
      modelInstance[fn] = model.statics[fn];
    }
    modelInstances[model.name] = modelInstance;
    return modelInstances[model.name];
  }
}
