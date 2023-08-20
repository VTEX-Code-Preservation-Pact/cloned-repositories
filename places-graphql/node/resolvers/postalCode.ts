interface PostalCodeQueryArgs {
  postalCode: string
  countryCode: string
}

export const queries = {
  getAddressFromPostalCode: async (
    _: unknown,
    args: PostalCodeQueryArgs,
    ctx: Context
  ): Promise<Address> => {
    const {
      clients: { checkout },
    } = ctx
    const { postalCode, countryCode } = args

    return checkout.getAddressFromPostalCode(postalCode, countryCode)
  },
}
