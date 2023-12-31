import DETAIL_QUERY, {
  Args as DetailArgs,
} from '../graphql/queries/detailsPage.gql'
import LIST_BY_QUERY, {
  Args as ListByArgs,
} from '../graphql/queries/listBy.gql'
import UPDATE_ADDRESS_MUTATION, {
  Args as UpdateAddressArgs,
} from '../graphql/mutations/updateAddress.gql'
import {
  DEFAULT_SUBSCRIPTION_ID,
  GenerationArgs,
  generateSubscription,
} from './subscriptionFactory'

export const MOCK_ROUTER_PARAM = { subscriptionId: DEFAULT_SUBSCRIPTION_ID }

const DETAIL_VARIABLES: DetailArgs = { id: DEFAULT_SUBSCRIPTION_ID }

export function generateDetailMock(args?: GenerationArgs) {
  return {
    request: {
      query: DETAIL_QUERY,
      variables: DETAIL_VARIABLES,
    },
    result: {
      data: {
        subscription: generateSubscription(args ?? {}),
      },
    },
  }
}

export function generateListByMock({
  args,
  result,
}: {
  args?: ListByArgs
  result: Array<ReturnType<typeof generateSubscription>>
}) {
  const variables: ListByArgs = args ?? { value: '', option: 'ADDRESS' }

  return {
    request: {
      query: LIST_BY_QUERY,
      variables,
    },
    result: {
      data: {
        list: result,
      },
    },
  }
}

export function generateUpdateAddressMock({
  variables,
  displayError = false,
}: {
  variables: UpdateAddressArgs
  displayError?: boolean
}) {
  return {
    request: {
      query: UPDATE_ADDRESS_MUTATION,
      variables,
    },
    ...(displayError
      ? {
          error: new Error('Error on update Address!'),
        }
      : {
          result: {
            data: {
              updateAddress: null,
            },
          },
        }),
  }
}
