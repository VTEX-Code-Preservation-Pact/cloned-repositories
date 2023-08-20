import { OmitExtend } from './omit-extend';
import { PickExtend } from './pick-extend';
import { TotalExtend } from './total-extend';
import { ExtendTypes } from './extends-types.enum';

export function ExtendTypeSelector(type: ExtendTypes) {
  if (type == ExtendTypes.pick) {
    return PickExtend;
  } else if (type == ExtendTypes.omit) {
    return OmitExtend;
  } else {
    return TotalExtend;
  }
}
