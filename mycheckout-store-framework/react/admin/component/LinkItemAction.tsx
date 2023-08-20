import React from 'react'
import type { FC } from 'react'
import {
  ButtonWithIcon,
  IconSuccess,
  IconFailure,
  IconDelete,
} from 'vtex.styleguide'
import { useMutation } from 'react-apollo'

import UPDATE_LINK from '../graphql/updateLink.graphql'
import DELETE_LINK from '../graphql/deleteLink.graphql'

interface Props {
  rowData: {
    approver: boolean
    status: string
    id: string
  }
  refetch: () => Promise<void>
  setShowAlert: (state: boolean) => void
  setMessageId: (state: string) => void
}

const LinkItemAction: FC<Props> = ({
  rowData,
  refetch,
  setMessageId,
  setShowAlert,
}) => {
  const [updateLink, { loading }] = useMutation(UPDATE_LINK)
  const [deleteLink, { loading: loadingDelete }] = useMutation(DELETE_LINK)

  return (
    <div className="flex justify-between">
      {rowData.status === 'pending' && rowData.approver ? (
        <>
          <div className="mr2">
            <ButtonWithIcon
              isLoading={loading}
              variation="secondary"
              onClick={() =>
                updateLink({
                  variables: {
                    id: rowData.id,
                    status: 'approved',
                  },
                }).then(() => {
                  refetch()
                  setMessageId('approvedMessage')
                  setShowAlert(true)
                })
              }
              icon={<IconSuccess />}
            />
          </div>
          <div className="mr2">
            <ButtonWithIcon
              isLoading={loading}
              variation="secondary"
              onClick={() =>
                updateLink({
                  variables: {
                    id: rowData.id,
                    status: 'rejected',
                  },
                }).then(() => {
                  refetch()
                  setMessageId('rejectedMessage')
                  setShowAlert(true)
                })
              }
              icon={<IconFailure />}
            />
          </div>
        </>
      ) : (
        <div className="mr2">
          <ButtonWithIcon
            isLoading={loadingDelete}
            variation="secondary"
            onClick={() =>
              deleteLink({
                variables: {
                  id: rowData.id,
                },
              }).then(() => {
                refetch()
                setMessageId('deleteMessage')
                setShowAlert(true)
              })
            }
            icon={<IconDelete />}
          />
        </div>
      )}
    </div>
  )
}

export default LinkItemAction
