export async function getCategories(
  _: unknown,
  __: unknown,
  { clients: { categories } }: Context
) {
  const theCategories = await categories.getCategories()

  return theCategories
}
