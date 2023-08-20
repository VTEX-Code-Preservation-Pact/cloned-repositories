import PropTypes from 'prop-types'
import { injectIntl, intlShape, defineMessages } from 'react-intl'

export const knownTotalizers = defineMessages({
  Discounts: {
    id: 'store/totalizers.Discounts',
    defaultMessage: 'Discounts',
  },
  Items: {
    id: 'store/totalizers.Items',
    defaultMessage: 'Items',
  },
  Shipping: {
    id: 'store/totalizers.Shipping',
    defaultMessage: 'Shipping',
  },
  Tax: {
    id: 'store/totalizers.Tax',
    defaultMessage: 'Tax',
  },
  Interest: {
    id: 'store/totalizers.Interest',
    defaultMessage: 'Interest',
  },
  Change: {
    id: 'store/totalizers.Change',
    defaultMessage: 'Total of changes',
  },
})

export const nonStoreKnownTotalizers = defineMessages({
  Discounts: {
    id: 'totalizers.Discounts',
    defaultMessage: 'Discounts',
  },
  Items: {
    id: 'totalizers.Items',
    defaultMessage: 'Items',
  },
  Shipping: {
    id: 'totalizers.Shipping',
    defaultMessage: 'Shipping',
  },
  Tax: {
    id: 'totalizers.Tax',
    defaultMessage: 'Tax',
  },
  Interest: {
    id: 'totalizers.Interest',
    defaultMessage: 'Interest',
  },
  Change: {
    id: 'totalizers.Change',
    defaultMessage: 'Total of changes',
  },
})

const TranslateTotal = ({ intl, id, totalizer, nonStorePage }) => {
  if (totalizer && totalizer.id) id = totalizer.id

  if (nonStorePage && id in nonStoreKnownTotalizers) return intl.formatMessage(nonStoreKnownTotalizers[id])

  // if the totalizer is known, translate it
  if (id in knownTotalizers) return intl.formatMessage(knownTotalizers[id])

  // id is unknown and there's no totalizer object, render the id or an empty string
  if (!totalizer) return id || ''

  // totalizer exists, render its name or its id
  return totalizer.name || id
}

TranslateTotal.propTypes = {
  intl: intlShape,
  id: PropTypes.string,
  totalizer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
  }),
  nonStorePage: PropTypes.bool // This is used in case that the comoponent is used outsite the store context.
}

export default injectIntl(TranslateTotal)
