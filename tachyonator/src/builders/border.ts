import { createRule } from '../modules/rule';

function unit(value) {
  return `${value}rem`;
}

function rules(config) {
  const { borderRadius, borderWidths } = config;
  const rules = [];

  borderRadius.forEach((step, i) => {
    rules.push(createRule(`.br${i}`, { 'border-radius': unit(step) }));
  });

  rules.push(
    createRule('.br-100', { 'border-radius': '100%' }),
    createRule('.br-pill', { 'border-radius': '9999px' }),
    createRule('.br--bottom', {
      'border-top-left-radius': 0,
      'border-top-right-radius': 0,
    }),
    createRule('.br--top', {
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 0,
    }),
    createRule('.br--right', {
      'border-top-left-radius': 0,
      'border-bottom-left-radius': 0,
    }),
    createRule('.br--left', {
      'border-top-right-radius': 0,
      'border-bottom-right-radius': 0,
    }),
  );

  borderWidths.forEach((width, i) => {
    rules.push(createRule(`.bw${i}`, { 'border-width': unit(width) }));
  });

  borderWidths.push(
    createRule('.bt-0', { 'border-top-width': 0 }),
    createRule('.br-0', { 'border-right-width': 0 }),
    createRule('.bb-0', { 'border-bottom-width': 0 }),
    createRule('.bl-0', { 'border-left-width': 0 }),
  );

  return rules;
}

export default {
  rules,
};
