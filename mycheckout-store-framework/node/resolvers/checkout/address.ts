import { authCookie } from './auth'

export const getAddress = (
  _: unknown,
  { email }: User,
  { clients: { address: AddressClient }, cookies }: Context
) => AddressClient.getAddress(email, cookies.get(authCookie) as string)

export const createAddress = (
  _: unknown,
  args: unknown,
  { clients: { address: AddressClient } }: Context
) => AddressClient.createAddress(args as never)

export const externalAddress = (
  _: unknown,
  { args }: { args: unknown },
  { clients: { address: AddressClient } }: Context
) => AddressClient.externalAddress(args as never)

export const updateAddress = (
  _: unknown,
  args: unknown,
  { clients: { address: AddressClient }, cookies }: Context
) =>
  AddressClient.updateAddress(args as never, cookies.get(authCookie) as string)

export const deleteAddress = (
  _: unknown,
  { id }: { id: string },
  { clients: { address: AddressClient }, cookies }: Context
) => AddressClient.deleteAddress(id, cookies.get(authCookie) as string)
