import { Injectable } from '@nestjs/common';
// import { ValidationArguments, ValidatorConstraint } from 'class-validator';
//  import { Connection } from 'typeorm';
// import { EntityValidator } from '../entity.validator';

// @ValidatorConstraint({ async: true })
@Injectable()
export class ExistsRule /* extends EntityValidator */ {
  // constructor(protected readonly connection: Connection) {
  //     super(connection)
  //     this.action = this.exists.name
  // }
  // protected async exists(value, property: string) {
  //     return (await this.repository.findAndCount({ [property]: value }))[1] > 0
  // }
  // public defaultMessage(args: ValidationArguments) {
  //     const exists = args.constraints[2] ? 'already' : 'not'
  //     return `${args.constraints[0].name} with the same '${args.property}' ${exists} exists`;
  // }
}
