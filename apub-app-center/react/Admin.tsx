import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import Cards from './components/Cards'

import './styles/styles.global.css'

const Admin: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="apub-app-center.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
        <Cards />
      </PageBlock>
    </Layout>
  )
}

export default Admin
