/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import type { IntlShape, MessageDescriptor } from 'react-intl'
import type { ApolloError } from 'apollo-client'

import { getGraphQLErrorCode } from './index'

interface GenericError extends ApolloError {
  code: number
  reviewId: string
}

export const useIndividualErrorMapping = (intl: IntlShape) => {
  const [shouldShowIndividualErrors, setShouldShowIndividualErrors] =
    useState(false)

  const [allErrorsMap, setAllErrorsMap] = useState({} as Record<string, any>)

  const translateMessage = (message: MessageDescriptor) => {
    return intl.formatMessage(message)
  }

  const setAllErrors = (errors: [GenericError]) => {
    if (errors.length > 0) {
      setShouldShowIndividualErrors(true)
    }

    setAllErrorsMap(
      errors.reduce((acc, error) => {
        const graphQLError = error.graphQLErrors?.[0]
        const applyMatchErrorCode =
          (getGraphQLErrorCode(graphQLError) ?? error.code) || 0

        const message = translateMessage({
          id: `admin/reviews.table.applyMatch.error.${applyMatchErrorCode}`,
        })

        return {
          ...acc,
          [`${error.reviewId}`]: message,
        }
      }, {})
    )
  }

  const getReviewError = (review: { id: string }) => {
    return allErrorsMap[`${review.id}`]
  }

  return {
    getReviewError,
    setAllErrors,
    shouldShowIndividualErrors,
    clearIndividualErrors: () => setShouldShowIndividualErrors(false),
  }
}

export default useIndividualErrorMapping
