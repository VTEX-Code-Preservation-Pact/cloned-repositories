import { createRule } from '../modules/rule';

const PAGE_BREAKS = Object.entries({
  after: ['auto', 'avoid', 'always', 'all', 'page', 'left', 'right'],
  before: ['auto', 'avoid', 'always', 'all', 'page', 'left', 'right'],
  inside: ['auto', 'avoid'],
});

function rules() {
  const rules = [];

  for (const [name, values] of PAGE_BREAKS) {
    for (const value of values) {
      rules.push(
        createRule(`.break-${name}-${value}`, { [`break-${name}`]: value }),
      );
    }
  }

  for (let i = 1; i <= 5; i++) {
    rules.push(createRule(`.orphans-${i + 1}`, { orphans: `${i}` }));
  }

  for (let i = 1; i <= 5; i++) {
    rules.push(createRule(`.widows-${i + 1}`, { widows: `${i}` }));
  }

  for (const type of ['slice', 'clone']) {
    rules.push(
      createRule(`.decoration-break-${type}`, { 'box-decoration-break': type }),
    );
  }

  return rules;
}

export default {
  rules,
};
