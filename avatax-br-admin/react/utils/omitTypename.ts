export const omitTypename = (key: string, value: unknown) => {
  return key === '__typename' ? undefined : value
}
