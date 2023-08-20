export function renderRule({ selector, properties }) {
  if (!Array.isArray(properties)) {
    properties = Object.entries(properties);
  }

  if (Array.isArray(selector)) {
    selector = selector.join(', ');
  }

  return `${selector} { ${properties
    .map(([prop, val]) => `${prop}: ${val}`)
    .join('; ')} }`;
}

export function renderRules(rules) {
  return rules.map(rule => renderRule(rule)).join('\n');
}

export function renderVars(vars) {
  const decls = vars.map(([key, value]) => `\t--${key}: ${value}`).join(';\n');

  return `:root {\n${decls}\n}`;
}

export function createRule(selector, properties) {
  return {
    selector,
    properties,
  };
}

export function getVar(prefix, step) {
  return `var(--${prefix}-${step})`;
}
