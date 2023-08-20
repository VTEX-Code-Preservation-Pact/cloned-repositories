import { createRule } from '../modules/rule';

const MEASURE_MAP = ['measure', 'measure-wide', 'measure-narrow'];

function rules(config) {
  const { typography } = config;
  const rules = [];

  if (typography.styles == null) {
    return;
  }

  rules.push(
    ...typography.measure.map((val, i) =>
      createRule(`.${MEASURE_MAP[i]}`, { 'max-width': `${typography.measure[i]}em` }),
    ),
    createRule('.small-caps', { 'font-variant': 'small-caps' }),
    createRule('.indent', {
      'text-indent': '1em',
      'margin-top': '0',
      'margin-bottom': '0',
    }),
    createRule('.truncate', {
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
    }),
  );

  const root = config.namespace ? '*' : 'body';

  for (const [styleName, styleProps] of Object.entries<any>(
    typography.styles,
  )) {
    rules.push(
      createRule(
        [styleName === 'body' ? root : null, `.t-${styleName}`].filter(Boolean),
        {
          'font-family': styleProps.fontFamily,
          'font-weight': styleProps.fontWeight,
          'font-size': styleProps.fontSize,
          'text-transform': styleProps.textTransform,
          'letter-spacing': styleProps.letterSpacing,
        },
      ),
    );
  }

  return rules;
}

export default {
  rules,
};
