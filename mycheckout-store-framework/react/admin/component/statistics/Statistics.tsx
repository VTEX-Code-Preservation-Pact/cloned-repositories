import React from 'react'
import { Layout, PageHeader, PageBlock } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import StatisticType from './SelectStatistic'
import Filters from './FiltersDates'
import GraphicStatistics from './GraphicStatistics'

const Statistics = () => {
  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="checkoutless.statistics.title" />}
        />
      }
    >
      <PageBlock variation="full">
        <h5>
          + <FormattedMessage id="checkoutless.statistics.subtitle" />
        </h5>
        <Filters />
        <StatisticType />
        <GraphicStatistics />
      </PageBlock>
    </Layout>
  )
}

export default Statistics
