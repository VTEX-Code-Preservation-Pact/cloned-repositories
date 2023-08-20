import { registerDecorator, ValidationOptions } from 'class-validator';

export function DataValidations(
  validator: any,
  args: { negate?: boolean } | any,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'DataValidations',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: args.entity
        ? [args.entity, args.property, args.negate]
        : [args],
      validator: validator,
    });
  };
}
