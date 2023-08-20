import {
  forEachDirection,
  getDirectionProperties,
} from '../modules/directions';
import { createRule, getVar } from '../modules/rule';

function rules(config) {
  const steps = config.spacing;
  const rules = [];

  steps.forEach((step, i) => {
    forEachDirection(({ dir, cssDirs }) => {
      rules.push(
        createRule(
          `.p${dir}${i}`,
          getDirectionProperties(cssDirs, 'padding', `${getVar('spacing', i)}`),
        ),
        createRule(
          `.m${dir}${i}`,
          getDirectionProperties(cssDirs, 'margin', `${getVar('spacing', i)}`),
        ),
        createRule(
          `.n${dir}${i}`,
          getDirectionProperties(cssDirs, 'margin', `-${getVar('spacing', i)}`),
        ),
      );
    });
  });

  return rules;
}

function vars(config) {
  return config.spacing.map((step, i) => [`spacing-${i}`, `${step}rem`]);
}

export default {
  rules,
  vars,
};
