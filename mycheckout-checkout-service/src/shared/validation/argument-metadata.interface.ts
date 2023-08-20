import { Type, ArgumentMetadata as AM } from '@nestjs/common';

export interface ArgumentMetadata extends AM {
  metatype?: Type<any> | undefined;
}
