import { ValidationPipe as VP, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidateParams } from './validate-params';
import { ArgumentMetadata } from './argument-metadata.interface';
import { ApiResponse } from '../responses/api-response';
import { ApiError } from '../responses/api-error';

@Injectable()
export class ValidationPipe extends VP {
  async transform(value: any, { metatype, data }: ArgumentMetadata) {
    let { errors, isParam } = new ValidateParams().validateParam(
      metatype,
      value,
      { property: data },
    );

    let object = plainToClass(metatype, value);

    if (!isParam) {
      object =
        Object.getOwnPropertyNames(new metatype()).length > 0
          ? new metatype(value)
          : plainToClass(metatype, value);
      Object.keys(object).forEach(
        (key) => object[key] === undefined && delete object[key],
      );

      errors = await validate(object);
    }
    if (errors.length > 0) {
      throw ApiResponse.multipleErrors(this.formatErrors(errors));
    }

    return object;
  }

  private formatErrors(errors: any[], result: ApiError = []): ApiError {
    errors.forEach((err) => {
      if (err.children?.length > 0) this.formatErrors(err.children, result);
      for (const property in err.constraints) {
        const message = err.constraints[property];
        try {
          let [msg, args] = message.split('|');
          args = JSON.parse(args);
          result.push({ message: msg, args: args });
        } catch {
          result.push({ message: message, args: {} });
        }
      }
    });
    return result;
  }
}
