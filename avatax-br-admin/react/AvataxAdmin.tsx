import React, { FC, useState } from 'react'
import { Layout, PageBlock, Tabs, Tab } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import AddStock from './components/Common/AddStock'
import CurrentStock from './components/Common/CurrentStock'
import EditArea from './components/Common/editArea'
import ModalArea from './components/Common/modal'
import EstablishmentProvider from './components/Establishment/EstablishmentProvider'
import { LogForm } from './components/Logs/LogForm'
import LogProvider from './components/Logs/LogProvider'
import Settings from './components/Common/settings'
import { avatax } from './utils/definedMessages'

const AvataxAdmin: FC = () => {
  const [tab, setTab] = useState({
    currentTab: 1,
  })

  const intl = useIntl()

  return (
    <>
      <Layout>
        <PageBlock
          title={intl.formatMessage(avatax.avatax)}
          subtitle={intl.formatMessage(avatax.avalara)}
          variation="full"
        >
          <Tabs>
            <Tab
              label={intl.formatMessage(avatax.configuration)}
              active={tab.currentTab === 1}
              onClick={() => setTab({ currentTab: 1 })}
            >
              <EstablishmentProvider>
                <Settings />
              </EstablishmentProvider>
            </Tab>
            <Tab
              label={intl.formatMessage(avatax.addStock)}
              active={tab.currentTab === 2}
              onClick={() => setTab({ currentTab: 2 })}
            >
              <p>{intl.formatMessage(avatax.fields)}</p>
              <EstablishmentProvider>
                <AddStock />
              </EstablishmentProvider>
            </Tab>

            <Tab
              label={intl.formatMessage(avatax.currentStock)}
              active={tab.currentTab === 3}
              onClick={() => setTab({ currentTab: 3 })}
            >
              <EstablishmentProvider>
                <CurrentStock />
                <ModalArea>
                  <EditArea />
                </ModalArea>
              </EstablishmentProvider>
            </Tab>
            <Tab
              label="Logs"
              active={tab.currentTab === 4}
              onClick={() => setTab({ currentTab: 4 })}
            >
              <LogProvider page={1} pageSize={5}>
                <LogForm />
              </LogProvider>
            </Tab>
          </Tabs>
        </PageBlock>
      </Layout>
    </>
  )
}

export default AvataxAdmin
