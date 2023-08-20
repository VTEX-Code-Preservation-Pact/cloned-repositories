import { create } from 'domain';

import { createRule } from '../modules/rule';

const PERCENTAGE_WIDTHS = [
  '10',
  '20',
  '25',
  '30',
  '33',
  '34',
  '40',
  '50',
  '60',
  '70',
  '75',
  '80',
  '90',
  '100',
];

function unit(value) {
  return `${value}rem`;
}

function rules(config) {
  const { maxWidths, widths } = config;
  const rules = [];

  maxWidths.forEach((step, i) => {
    rules.push(createRule(`.mw${i + 1}`, { 'max-width': unit(step) }));
  });

  rules.push(
    createRule('.mw-none', { 'max-width': 'none' }),
    createRule('.mw-100', { 'max-width': '100%' }),
  );

  PERCENTAGE_WIDTHS.forEach(p => {
    rules.push(createRule(`.w-${p}`, { width: `${p}%` }));
  });

  rules.push(
    createRule('.w-third', { width: 'calc(100% / 3)' }),
    createRule('.w-two-thirds', { width: 'calc(100% / 1.5)' }),
    createRule('.w-auto', { width: 'auto' }),
  );

  if (!config.print) {
    rules.push(
      createRule('.vw-10', { width: '10vw' }),
      createRule('.vw-20', { width: '20vw' }),
      createRule('.vw-25', { width: '25vw' }),
      createRule('.vw-30', { width: '30vw' }),
      createRule('.vw-33', { width: '33vw' }),
      createRule('.vw-34', { width: '34vw' }),
      createRule('.vw-40', { width: '40vw' }),
      createRule('.vw-50', { width: '50vw' }),
      createRule('.vw-60', { width: '60vw' }),
      createRule('.vw-70', { width: '70vw' }),
      createRule('.vw-75', { width: '75vw' }),
      createRule('.vw-80', { width: '80vw' }),
      createRule('.vw-90', { width: '90vw' }),
      createRule('.vw-100', { width: '100vw' }),
      createRule('.vw-third', { width: 'calc(100vw / 3)' }),
      createRule('.vw-two-thirds', { width: 'calc(100vw / 1.5)' }),
    );
  }

  return rules;
}

export default {
  rules,
};
