export function OmitExtend<Class, K extends keyof Class>(_class, methods: K[]) {
  const prototype = _class.prototype;
  const properties = Object.getOwnPropertyNames(prototype);
  properties.shift();
  methods.forEach((method: any) => {
    delete prototype[method];
  });
  return _class;
}
