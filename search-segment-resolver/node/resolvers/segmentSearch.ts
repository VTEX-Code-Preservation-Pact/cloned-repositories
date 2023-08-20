export const queries = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchSegment: async (_: unknown, args: SearchSegmentInput, __: Context) => {
    // This is just a dummy implementation which returs the input itself
    // const { myClient } = ctx.clients

    console.log({ args })

    return args.selectedFacets
  },
}
