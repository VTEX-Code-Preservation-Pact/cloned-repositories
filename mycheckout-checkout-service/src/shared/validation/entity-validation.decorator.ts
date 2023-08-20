import { registerDecorator, ValidationOptions } from 'class-validator';

export function EntityValidation(
  validator: any,
  args: { entity: string; property?: string; negate?: boolean },
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'EntityValidations',
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
