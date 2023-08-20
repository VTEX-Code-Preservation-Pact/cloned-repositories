import type { FC } from 'react'
import { useState } from 'react'
import { Layout, PageBlock, Tabs, Tab, ToastProvider } from 'vtex.styleguide'
import './styles.global.css'
import * as React from 'react'

import InfosDrivers from './InfosDrivers'
import InfosConstructors from './InfosConstructors'

const F1: FC = () => {
  const [tab, setTab] = useState({
    currentTab: 1,
  })

  return (
    <ToastProvider positioning="window">
      <Layout>
        <PageBlock title="Informações F1 2020" variation="full">
          <Tabs>
            <Tab
              label="Posição final dos pilotos da F1 2020"
              active={tab.currentTab === 1}
              onClick={() => setTab({ currentTab: 1 })}
            >
              <InfosDrivers />
            </Tab>
            <Tab
              label="Posição final das equipes da F1 2020"
              active={tab.currentTab === 2}
              onClick={() => setTab({ currentTab: 2 })}
            >
              <InfosConstructors />
            </Tab>
          </Tabs>
        </PageBlock>
      </Layout>
    </ToastProvider>
  )
}

export default F1
