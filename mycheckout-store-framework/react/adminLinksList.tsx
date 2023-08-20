import React, { useMemo, useState } from 'react'
import type { FC } from 'react'
import {
  Layout,
  PageBlock,
  PageHeader,
  Table,
  Tag,
  Alert,
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage, defineMessages, useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'

import LinkItemAction from './admin/component/LinkItemAction'
import GET_LINKS_ACCOUNT from './admin/graphql/getLinksByAccount.graphql'

const LinkListContext = React.createContext<any>(null)

const messages = defineMessages({
  approvedMessage: { id: 'checkoutless.linksList.approvedMessage' },
  rejectedMessage: { id: 'checkoutless.linksList.rejectedMessage' },
  deleteMessage: { id: 'checkoutless.linksList.deleteMessage' },
})

const defaultSchema = {
  properties: {
    account: {
      title: <FormattedMessage id="checkoutless.linksList.accountColumn" />,
    },
    date: {
      title: <FormattedMessage id="checkoutless.linksList.dateColumn" />,
    },
    status: {
      title: <FormattedMessage id="checkoutless.linksList.statusColumn" />,
      cellRenderer: ({
        cellData,
        rowData,
      }: {
        cellData: string
        rowData: { approver: boolean }
      }) => {
        return (
          <span className="tc">
            {cellData === 'pending' && rowData.approver && (
              <Tag type="warning">
                <FormattedMessage id="checkoutless.linksList.pending" />
              </Tag>
            )}
            {cellData === 'pending' && !rowData.approver && (
              <Tag>
                <FormattedMessage id="checkoutless.linksList.pending" />
              </Tag>
            )}
            {cellData === 'approved' && (
              <Tag type="success">
                <FormattedMessage id="checkoutless.linksList.approved" />
              </Tag>
            )}
            {cellData === 'rejected' && (
              <Tag type="error">
                <FormattedMessage id="checkoutless.linksList.rejected" />
              </Tag>
            )}
          </span>
        )
      },
    },
    action: {
      title: <FormattedMessage id="checkoutless.linksList.actionColumn" />,
      cellRenderer: ({
        rowData,
      }: {
        rowData: { approver: boolean; status: string; id: string }
      }) => {
        return (
          <LinkListContext.Consumer>
            {(value) => (
              <LinkItemAction
                rowData={rowData}
                refetch={value.refetch}
                setMessageId={value.setMessageId}
                setShowAlert={value.setShowAlert}
              />
            )}
          </LinkListContext.Consumer>
        )
      },
    },
  },
}

const LinkList: FC = () => {
  const [messageId, setMessageId] = useState<
    'deleteMessage' | 'approvedMessage' | 'rejectedMessage'
  >('deleteMessage')

  const [showAlert, setShowAlert] = useState(false)
  const { navigate } = useRuntime()
  const intl = useIntl()

  const { data, loading, refetch } = useQuery(GET_LINKS_ACCOUNT, {
    fetchPolicy: 'network-only',
  })

  const linksListResult = useMemo(() => {
    if (data) {
      return data.getLinksByAccount
    }

    return []
  }, [data])

  return (
    <LinkListContext.Provider value={{ refetch, setMessageId, setShowAlert }}>
      <Layout
        pageHeader={
          <PageHeader
            title={<FormattedMessage id="checkoutless.linksList.title" />}
          />
        }
      >
        <PageBlock variation="full">
          {showAlert ? (
            <div className="mb5">
              <Alert
                autoClose={5000}
                type="success"
                onClose={() => setShowAlert(false)}
              >
                {intl.formatMessage(messages[messageId])}
              </Alert>
            </div>
          ) : (
            <></>
          )}
          <Table
            fullWidth
            schema={defaultSchema}
            items={linksListResult}
            loading={loading}
            toolbar={{
              newLine: {
                label: (
                  <FormattedMessage id="checkoutless.linksList.newLinkButton" />
                ),
                handleCallback: () =>
                  navigate({ to: '/admin/app/kuikpay/links/new' }),
              },
            }}
          />
        </PageBlock>
      </Layout>
    </LinkListContext.Provider>
  )
}

export default LinkList
