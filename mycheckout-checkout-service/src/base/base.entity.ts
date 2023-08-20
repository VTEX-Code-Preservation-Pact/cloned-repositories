import { Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  /*id field*/
  //validations
  //entity assignations
  @ObjectIdColumn()
  //field
  id: string;
}
