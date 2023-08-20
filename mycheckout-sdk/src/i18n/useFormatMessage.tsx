import { useIntl } from 'react-intl'

const useFormatMessage = (id: string, value = {}) => {
  return useIntl().formatMessage({ id }, { ...value })
}

export default useFormatMessage
