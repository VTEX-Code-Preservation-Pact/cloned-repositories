import { applyDecorators } from '@nestjs/common';
import { ExtendTypes } from './extends-types.enum';
import { IBaseService } from '../base-service.interface';

function DecoratorOmit<T, K extends keyof IBaseService<T>>(
  decorator,
  methods: K[],
  method: K,
) {
  return methods.includes(method) ? applyDecorators() : decorator;
}

function DecoratorPick<T, K extends keyof IBaseService<T>>(
  decorator,
  methods: K[],
  method: K,
) {
  return methods.includes(method) ? decorator : applyDecorators();
}

function DecoratorTotal<_, __ extends _>(decorator, _: __[], __: __) {
  return decorator;
}

export function DecoratorExtendTypeSelector(type) {
  if (type == ExtendTypes.pick) {
    return DecoratorPick;
  } else if (type == ExtendTypes.omit) {
    return DecoratorOmit;
  } else {
    return DecoratorTotal;
  }
}
