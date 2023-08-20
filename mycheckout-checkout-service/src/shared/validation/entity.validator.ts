import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'typeorm';

@Injectable()
export class EntityValidator implements ValidatorConstraintInterface {
  protected repository: any;
  protected action: string;

  constructor(protected readonly connection: Connection) {}

  async validate(value: any, args: ValidationArguments) {
    this.repository = this.connection.getRepository(args.constraints[0]);
    const property = args.constraints[1] ? args.constraints[1] : args.property;
    try {
      const val: unknown = eval(
        `this.${this.action}("${value}","${property}")`,
      );
      return (await (<boolean>val)) == !args.constraints[2];
    } catch {
      return false;
    }
  }
}
