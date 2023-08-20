import { applyDecorators } from '@nestjs/common';
import { IDecorators } from '../base-options.interface';
import { IBaseService } from '../base-service.interface';

export function DecoratorAssing<T, K extends keyof IBaseService<T>>(
  decorators: IDecorators<K>['decorators'],
  method: K,
) {
  if (!decorators) return applyDecorators();
  const functions: any = [];
  decorators.forEach((decorator) => {
    if (decorator.in.includes(method)) functions.push(decorator.use);
  });
  return applyDecorators(...functions);
}
