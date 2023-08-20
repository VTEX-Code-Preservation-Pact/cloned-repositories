import { createRule } from '../modules/rule';

function unit(value) {
  return `${value}rem`;
}

function rules(config) {
  const { heights, sizes } = config;
  const rules = [];

  heights.forEach((step, i) => {
    rules.push(createRule(`.h${i + 1}`, { height: unit(step) }));
  });

  rules.push(
    createRule('.h-25', { height: '25%' }),
    createRule('.h-50', { height: '50%' }),
    createRule('.h-75', { height: '75%' }),
    createRule('.h-100', { height: '100%' }),
    createRule('.min-h-100', { 'min-height': '100%' }),
    createRule('.vh-25', { height: '25vh' }),
    createRule('.vh-50', { height: '50vh' }),
    createRule('.vh-75', { height: '75vh' }),
    createRule('.vh-100', { height: '100vh' }),
    createRule('.min-vh-100', { 'min-height': '100vh' }),
    createRule('.h-auto', { height: 'auto' }),
    createRule('.h-inherit', { height: 'inherit' }),
  );

  sizes.forEach(({ name, value }) => {
    rules.push(
      createRule(`.h-${name}`, {
        height: `${value}rem`,
        'box-sizing': `border-box`,
      }),
      createRule(`.min-h-${name}`, {
        'min-height': `${value}rem`,
        'box-sizing': `border-box`,
      }),
    );
  });

  return rules;
}

export default {
  rules,
};
