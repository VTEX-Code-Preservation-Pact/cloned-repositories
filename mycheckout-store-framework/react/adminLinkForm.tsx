import React, { useState } from 'react'
import type { FC } from 'react'
import {
  Layout,
  PageBlock,
  PageHeader,
  Input,
  Button,
  Alert,
} from 'vtex.styleguide'
import { useMutation } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'

import CREATE_LINK from './admin/graphql/createLink.graphql'

const LinkForm: FC = () => {
  const [account, setAccount] = useState('')
  const [errorAccountField, setErrorAccountField] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const { navigate } = useRuntime()

  const [createLink, { loading }] = useMutation(CREATE_LINK)

  const handleSaveChange = async () => {
    if (account) {
      try {
        await createLink({
          variables: {
            accountApprover: account,
          },
        })

        navigate({
          page: 'admin.app.checkoutless-linksList',
        })
      } catch (e) {
        setShowAlert(true)
      }
    } else {
      setErrorAccountField('Required')
    }
  }

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="checkoutless.linkForm.title" />}
          linkLabel={<FormattedMessage id="checkoutless.linksList.title" />}
          onLinkClick={() => navigate({ to: '/admin/app/kuikpay/links' })}
        />
      }
    >
      <PageBlock variation="full">
        {showAlert ? (
          <div className="mb5">
            <Alert
              autoClose={5000}
              type="error"
              onClose={() => setShowAlert(false)}
            >
              <FormattedMessage id="checkoutless.linkForm.linkExist" />
            </Alert>
          </div>
        ) : (
          <></>
        )}
        <div className="mb5">
          <Input
            label={<FormattedMessage id="checkoutless.linkForm.accountField" />}
            value={account}
            onChange={(e: any) => {
              setErrorAccountField('')
              setAccount(e.target.value)
            }}
            minLength={5}
            maxLength={128}
            required
            placeholder="Required"
            errorMessage={errorAccountField}
          />
        </div>
      </PageBlock>

      <div className="flex justify-end">
        <div className="pb7 pr7-s flex-row ">
          <Button
            variation="primary"
            onClick={handleSaveChange}
            isLoading={loading}
          >
            <FormattedMessage id="checkoutless.inputs.save-button" />
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default LinkForm
