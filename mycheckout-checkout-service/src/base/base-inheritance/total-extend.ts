export function TotalExtend<Class, K extends keyof Class>(_class, _: K[]) {
  return _class;
}
