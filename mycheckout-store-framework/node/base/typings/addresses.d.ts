interface IAddress {
  getAddress(email: User['email'], auth: string): unknown | Promise<unknown>
  createAddress(args: unknown): Promise<unknown>
  updateAddress(args: unknown, auth: string): Promise<GeneralAddressResponse>
  deleteAddress(id: string, auth: string): Promise<unknown>
}

interface GeneralAddressResponse {
  message: string
  data: unknown
}
