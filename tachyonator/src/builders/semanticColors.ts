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
  'active-background': {
    prefix: 'active-bg',
    selectorTemplate: [`.{prefix}-{name}:active`],
    prop: 'background-color',
  },
  text: {
    prefix: 'c',
    selectorTemplate: [`.{prefix}-{name}`],
    prop: 'color',
  },
  'visited-text': {
    prefix: 'visited-c',
    selectorTemplate: [`.{prefix}-{name}:visited`],
    prop: 'color',
  },
  'hover-text': {
    prefix: 'hover-c',
    selectorTemplate: [`.{prefix}-{name}:hover`, `.{prefix}-{name}:focus`],
    prop: 'color',
  },
  'active-text': {
    prefix: 'active-c',
    selectorTemplate: [`.{prefix}-{name}:active`],
    prop: 'color',
  },
  on: {
    prefix: 'c-on',
    selectorTemplate: [`.{prefix}-{name}`],
    prop: 'color',
  },
  'hover-on': {
    prefix: 'hover-c-on',
    selectorTemplate: [`.{prefix}-{name}:hover`, `.{prefix}-{name}:focus`],
    prop: 'color',
  },
  'active-on': {
    prefix: 'active-c-on',
    selectorTemplate: [`.{prefix}-{name}:active`],
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
  'active-border': {
    prefix: 'active-b',
    selectorTemplate: [`.{prefix}--{name}:active`],
    prop: 'border-color',
  },
};

function rules(config) {
  const rules = [];

  for (const [type, colors] of Object.entries(config.semanticColors)) {
    // add a transparent semantic color
    const colorNames = Object.keys(colors).concat('transparent');

    for (const name of colorNames) {
      const { selectorTemplate, prop, prefix } = RULE_MAP[type];
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
  return Object.entries(config.semanticColors).flatMap(([type, dict]) => {
    return Object.entries(dict).map(([name, color]) => [
      `${RULE_MAP[type].prefix}-${name}`,
      color,
    ]);
  });
}

export default {
  rules,
  vars,
};
