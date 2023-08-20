import { accountPrieview } from './accountPrieview'

export const Mocks = (option: string) => {
  const options = {
    ACCOUNTS: accountPrieview(),
    default: {},
  }

  return options[option] || options.default
}
