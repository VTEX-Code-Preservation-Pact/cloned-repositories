import { createRule, getVar } from '../modules/rule';

function unit(value) {
  return `${value}rem`;
}

function rules(config) {
  const steps = config.typeScale;
  const rules = [];

  steps.forEach((step, i) => {
    rules.push(
      createRule(`.f${i + 1}`, { 'font-size': getVar('font-size', i + 1) }),
    );
  });

  return rules;
}

function vars(config) {
  return config.typeScale.map((step, i) => [`font-size-${i + 1}`, unit(step)]);
}

export default {
  rules,
  vars,
};
