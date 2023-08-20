export function PickExtend<Class, K extends keyof Class>(_class, methods: K[]) {
  const prototype = _class.prototype;
  const properties = Object.getOwnPropertyNames(prototype);
  properties.shift();
  properties.forEach((method: any) => {
    if (!methods.includes(method)) delete prototype[method];
  });
  return _class;
}
