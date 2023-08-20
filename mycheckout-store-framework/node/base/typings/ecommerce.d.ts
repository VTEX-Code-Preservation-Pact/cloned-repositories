interface DataInput {
  products: [ProductsInput]
}

interface EcommerceInput {
  event: string
  userEmail: string
  account: string
  data: DataInput
  session: string
}

interface IEcommerceService {
  log(args: EcommerceInput): unknown
}
