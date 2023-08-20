import { createRule, getVar } from '../modules/rule';

const RULE_MAP = {
  background: {
    prefix: 'bg',
    selectorTemplate: [`.{prefix}-{name}`],
    prop: 'background-color',
  },
  'hover-background': {
    prefix: 'hover-bg',
    selectorTemplate: [`.{prefix}-{name}:hover`, `.{prefix}-{name}:focus`],
    prop: 'background-color',
  },
  text: {
    prefix: '',
    selectorTemplate: [`.{name}`],
    prop: 'color',
  },
  'hover-text': {
    prefix: 'hover',
    selectorTemplate: [`.{prefix}-{name}:hover`, `.{prefix}-{name}:focus`],
    prop: 'color',
  },
  border: {
    prefix: 'b',
    selectorTemplate: [`.{prefix}--{name}`],
    prop: 'border-color',
  },
  'hover-border': {
    prefix: 'hover-b',
    selectorTemplate: [`.{prefix}--{name}:hover`, `.{prefix}--{name}:focus`],
    prop: 'border-color',
  },
};

function rules(config) {
  const rules = [];
  const colorNames = Object.keys(config.colors).concat('transparent');

  for (const { selectorTemplate, prop, prefix } of Object.values(RULE_MAP)) {
    for (const name of colorNames) {
      const colorValue = name === 'transparent' ? name : getVar(prefix, name);
      const selectors = selectorTemplate.map(s =>
        s.replace(/\{prefix\}/g, prefix).replace(/\{name\}/g, name),
      );
      const props = { [prop]: colorValue };

      rules.push(createRule(selectors, props));
    }
  }

  return rules;
}

function vars(config) {
  return Object.entries(config.colors).map(([colorName, colorValue]) => [
    colorName,
    colorValue,
  ]);
}

export default {
  rules,
  vars,
};
