import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'typeorm';

@Injectable()
export class DataValidator implements ValidatorConstraintInterface {
  protected repository: any;
  protected action: string;

  async validate(value: any, args: ValidationArguments) {
    try {
      const val: unknown = eval(
        `this.${this.action}(${JSON.stringify(value)})`,
      );
      return (await (<boolean>val)) == !args.constraints[1];
    } catch {
      return false;
    }
  }
}
