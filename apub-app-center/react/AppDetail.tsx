import React, { FC, useEffect, useState } from 'react'
// import { FormattedMessage } from 'react-intl'
import { Divider, Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import './styles/styles.global.css'
import AppTabs from './components/Detail/AppTabs'
import Resume from './components/Detail/Resume'
import { useRuntime } from 'vtex.render-runtime'
import { AppData } from './typings/appdata'
import MockedData from './data/mockedData'


interface Props {
  params: any
}

const AppDetail: FC<Props> = ({ params }) => {
  const { navigate } = useRuntime();
  const [appInfo, setAppInfo] = useState<AppData>();
  useEffect(() => {
    if (!appInfo){
      let apps = MockedData.GetData();
      let app = apps.filter(ap => ap.id == params.id)[0];
      setAppInfo(app);
    }
  }, [])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={appInfo?.name}
          linkLabel="APUB App Center"
          onLinkClick={() => {
            navigate({to: `/admin/app/apub-app-center`})
          }}
        />
      }
    >
      <PageBlock variation="full">
        <div className="flex">
          <Resume
            photo={appInfo?.photo || ''}
            version={appInfo?.version || 0}
            status={appInfo?.status || ''}
            store={appInfo?.store || []}
            category={appInfo?.category || []}
            documentation={appInfo?.documentation || ''}
          />
          <div
            style={{ flexGrow: 1 }}
            className="flex items-stretch w-10 justify-center">
            <Divider orientation="vertical" />
          </div>
          <AppTabs
            name={appInfo?.name || ''}
            download={appInfo?.download || ''}
            overview={appInfo?.overview || ''}
            feature={appInfo?.feature || []}
            screenshot= {appInfo?.screenshot || ''}
            workspace= {appInfo?.workspace || ''}
            video= {appInfo?.video || ''}
            requirements={appInfo?.requirements || []}
            tutorial={appInfo?.tutorial || []}
            assets={appInfo?.assets || []}
            github= {appInfo?.github || ''}
          />
        </div>
      </PageBlock>
    </Layout>
  )
}

export default AppDetail
