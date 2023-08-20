import React, { FunctionComponent, useMemo } from 'react'
import { injectIntl, InjectedIntlProps, defineMessages } from 'react-intl'
import { useOwnerBlockCssHandles } from 'vtex.render-runtime'
import Star from './components/Star'

const handleNames = ['stars']

const messages = defineMessages({
  rating: {
    id: 'rating',
    defaultMessage: '',
  },
})

const Stars: FunctionComponent<StarsProps & InjectedIntlProps> = ({
  rating,
  intl,
}) => {
  const styles = useOwnerBlockCssHandles(handleNames)
  const stars = useMemo(
    () => [null, null, null, null, null].map((_, index) => index < rating),
    [rating]
  )

  return (
    <span
      className={styles.stars}
      title={intl.formatMessage(messages.rating, { rating })}
    >
      {stars.map((value, index) => (
        <Star key={index} filled={value} />
      ))}
    </span>
  )
}

interface StarsProps {
  rating: number
}

export default injectIntl(Stars)
