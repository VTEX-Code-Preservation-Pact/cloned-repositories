import { IntlProvider } from 'react-intl'

import messages from '../../messages/pt.json'

export function getIntl(locale) {
  return new IntlProvider({
    locale,
    defaultLocale: locale,
    messages: messages,
  }).getChildContext().intl
}
