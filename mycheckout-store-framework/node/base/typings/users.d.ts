interface UserInput {
  name?: string
  lastname?: string
  phone_code?: string
  phone_number?: string
  selectedAddress?: string
  selectedPayment?: string
}

interface User {
  access_token?: string
  addresses?: unknown
  cards: Array<{ cardContent: unknown }>
  document: string
  documentType: string
  email: string
  id_number: string
  id_type: string
  id: string
  ip: string
  lastname: string
  name: string
  phone_code: string
  phone_number: string
  phoneCode: string
  phoneNumber: string
  selectedAddress?: unknown
  selectedPayment?: Payments
}

interface GeneralResponse {
  message: string
}

interface GeneralUserResponse {
  message: string
  data: User
}

interface ProfileInput {
  email: string
  habeasData: boolean
}

interface Auth {
  email: User['email']
  code: number
}

interface PaginatedUserResponse {
  count: number
  total: number
  current: number
  prev: number
  next: number
  data: User[]
}

interface IAuth {
  login(email: Auth['email'], origin: string): Promise<unknown>
  verifyCode(args: Auth): Promise<unknown>
}

interface IUser {
  getUser(
    email: User['email'],
    account: string,
    auth: string
  ): User | Promise<unknown>
  createUser(args: User): Promise<unknown>
  updateUser(args: UserInput, auth: string): Promise<unknown>
}
