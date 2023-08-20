import { isArray, ValidationArguments } from 'class-validator';
import { ApiError } from '../responses/api-error';

export class ValidateParams {
  validateParam(
    metatype: unknown,
    value: any,
    args: Partial<ValidationArguments>,
  ): { errors; isParam } {
    const types: unknown = [String, Boolean, Number, Array, Object];
    let error: string;
    let isParam = true;
    switch (metatype) {
      case types[0]:
        error = !this.isString(value)
          ? ApiError.parse('validations.invalid_string', args)
          : null;
        break;
      case types[1]:
        error = !this.isBoolean(value)
          ? ApiError.parse('validations.invalid_boolean', args)
          : null;
        break;
      case types[2]:
        error = !this.isNumber(value)
          ? ApiError.parse('validations.invalid_number', args)
          : null;
        break;
      case types[3]:
        error = !this.isArray(value)
          ? ApiError.parse('validations.invalid_array', args)
          : null;
        break;
      case types[4]:
        error = !this.isObject(value)
          ? ApiError.parse('validations.invalid_object', args)
          : null;
        break;
      /*case types[5]:
        error = !this.isObjectID(value)
          ? ApiError.parse('validations.invalid_objectid', args)
          : null;
        break;*/
      default:
        isParam = false;
        break;
    }
    const errors = error ? [{ constraints: { invalid_param: error } }] : [];
    return { errors, isParam };
  }

  private isObjectID(value: any): boolean {
    return value && value.match(/^[0-9a-fA-F]{24}$/) !== null;
  }

  private isArray(value: any): boolean {
    try {
      return (
        value &&
        /^[\],:{}\s]*$/.test(
          value
            .replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              ']',
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''),
        )
      );
    } catch {
      return isArray(value);
    }
  }

  private isBoolean(value: any): boolean {
    return ['true', 'false', '1', '0'].includes(value);
  }

  private isNumber(value: any): boolean {
    return !isNaN(value);
  }

  private isString(value: any): boolean {
    return (
      value &&
      !(
        (this.isNumber(value) || this.isArray(value) || this.isBoolean(value)) //||
        //this.isObjectID(value)
      )
    );
  }

  private isObject(value: any): boolean {
    return (
      value &&
      !(
        this.isNumber(value) ||
        this.isArray(value) ||
        this.isBoolean(value) ||
        this.isObjectID(value)
      )
    );
  }
}
