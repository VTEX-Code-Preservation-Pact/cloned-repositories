export const trimObjValues = (obj: unknown): unknown => {
  Object.keys(obj).map(
    (k) =>
      (obj[k] =
        typeof obj[k] == 'string'
          ? obj[k].trim()
          : typeof obj[k] == 'object'
          ? trimObjValues(obj[k])
          : obj[k]),
  );
  return obj;
};
