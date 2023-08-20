import { PipeTransform, Injectable } from '@nestjs/common';
import { trimObjValues } from '../utils/object-trim';

@Injectable()
export class TransformationTrim implements PipeTransform {
  transform(value: any) {
    return trimObjValues(value);
  }
}
