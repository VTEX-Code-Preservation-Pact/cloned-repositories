interface SingleProductArgs {
  productId: string
}

export const rating = async (_: any, args: SingleProductArgs, ctx: Context) => {
  const data = await ctx.clients.yourviews.getRating(args.productId)
  return data
}

interface MultipleProductsArg {
  productIds: string[]
}

export const ratings = async (_: any, args: MultipleProductsArg, ctx: Context) => {
  const data = await ctx.clients.yourviews.getRatings(args.productIds)
  return data
}

export const reviews = async (_: any, args: SingleProductArgs, ctx: Context) => {
  const data = await ctx.clients.yourviews.getReviews(args.productId)
  return data
}
