import { createRule } from '../modules/rule';

const NAME_MAP = {
  0: 'solid',
  1: 'title',
  2: 'copy',
};

function rules(config) {
  const { lineHeight } = config;
  const rules = [];

  lineHeight.forEach((value, i) => {
    rules.push(createRule(`.lh-${NAME_MAP[i]}`, { 'line-height': value }));
  });

  return rules;
}

export default {
  rules,
};
