import mqify from 'mqify';

import { renderRules, renderVars } from './modules/rule';
import manifest from './manifest';
import { camelToKebab } from './modules/case';

function build(builder, config) {
  const rules = builder.rules(config) ?? [];
  const vars = builder.vars?.(config) ?? [];

  return { rules, vars };
}

function assemble({ cssParts, vars }) {
  return [renderVars(vars), cssParts.join('\n')].join('\n\n');
}

export async function main(config) {
  const cssParts = [];
  const mqParts = [];
  const vars = [];

  const manifestEntries = Object.entries<any>(manifest);

  for (const [entry, { builder, mq }] of manifestEntries) {
    let rendered = null;

    if (builder) {
      const { rules: builderRules, vars: builderVars } = build(builder, config);
      rendered = renderRules(builderRules);
      vars.push(...builderVars);
    } else {
      const { default: css } = await import(
        `./static/_${camelToKebab(entry)}.css`
      );
      rendered = css;
    }

    if (mq) {
      mqParts.push(rendered);
    } else {
      cssParts.push(rendered);
    }
  }

  if (mqParts.length > 0) {
    const mqfied = await mqify(mqParts.join('\n'), config.customMedia);
    cssParts.push(mqfied);
  }

  return assemble({ vars, cssParts });
}
