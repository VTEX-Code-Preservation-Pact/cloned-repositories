export async function deleteLink(
  _: unknown,
  { id }: { id: string },
  { clients: { checkoutless } }: Context
) {
  const data = await checkoutless.deleteLink(id)

  return {
    ...data,
    id,
  }
}
