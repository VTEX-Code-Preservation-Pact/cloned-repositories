/* eslint-disable no-restricted-imports */
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import {
  Layout,
  PageBlock,
  Button,
  Alert,
  Spinner,
  Textarea,
  Divider,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { pathOr } from 'ramda'

import Categories from './admin/component/categories'
import saveTokenGQL from './admin/graphql/saveToken.graphql'
import getAccountGQL from './admin/graphql/getAccount.graphql'

const AdminExample: FC = () => {
  const [buttonMessage, setButtonMessage] = useState('')
  const [cvcRequired] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [showIsNotConfigured, setShowIsNotConfigured] = useState(false)
  const [categories, setCategories] = useState([])
  const [visualization, setVisualization] = useState([])

  const [saveToken] = useMutation(saveTokenGQL)
  const { loading, data } = useQuery(getAccountGQL)

  useEffect(() => {
    if (!data || !data.getAccount) return
    setShowIsNotConfigured(
      data.getAccount.isConfigured !== null
        ? !data.getAccount.isConfigured
        : true
    )
    setButtonMessage(pathOr('', ['getAccount', 'buttonMessage'], data))
    setCategories(pathOr([], ['getAccount', 'visualization'], data))
  }, [data])

  const handleClick = () => {
    saveToken({
      variables: { cvcRequired, visualization, buttonMessage },
    }).then(() => {
      setShowAlert(true)
      setShowIsNotConfigured(false)
    })
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <Layout>
      <PageBlock
        title={<FormattedMessage id="checkoutless.settings.title" />}
        subtitle={<FormattedMessage id="checkoutless.settings.subtitle" />}
        variation="full"
      >
        {showAlert ? (
          <div className="mb5">
            <Alert
              autoClose={5000}
              type="success"
              onClose={() => setShowAlert(false)}
            >
              <FormattedMessage id="checkoutless.settings.success" />
            </Alert>
          </div>
        ) : (
          <></>
        )}
        {showIsNotConfigured && (
          <div className="mb5">
            <Alert type="warning" onClose={() => setShowIsNotConfigured(false)}>
              <FormattedMessage id="checkoutless.settings.warning" />
            </Alert>
          </div>
        )}

        <div className="mb5">
          <Textarea
            label="Button Message"
            onChange={(e: any) => setButtonMessage(e.target.value)}
            value={buttonMessage}
            maxLength="140"
            helpText={
              <FormattedMessage id="checkoutless.settings.buttonMessage" />
            }
          />
        </div>
        {/* <div className="mb5">
          <Toggle
            label="Require CVC"
            checked={cvcRequired}
            semantic
            onChange={() => setCvcRequired(!cvcRequired)}
          />
        </div> */}
        <Divider />
        <Categories visualization={categories} onChange={setVisualization} />
      </PageBlock>
      <div className="flex justify-end">
        <Button onClick={handleClick}>
          <FormattedMessage id="checkoutless.inputs.save-button" />
        </Button>
      </div>
    </Layout>
  )
}

export default AdminExample
