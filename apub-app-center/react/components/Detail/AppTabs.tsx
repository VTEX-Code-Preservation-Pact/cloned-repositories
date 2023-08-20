import React, { useState } from 'react'
// import { FormattedMessage } from 'react-intl'
import { Tabs, Tab, Button, Link } from 'vtex.styleguide'

const Check = (
  <svg className="vtex__icon-check" width="20" height="20" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path d="M10.8 4.4L9.4 3L5.4 7L3.4 5L2 6.4L5.4 9.8L10.8 4.4Z" fill="currentColor">
    </path>
  </svg>
)

const RenderGetAppButton = ( appStore: string ) => {
  return(
    <>
    {
      appStore == null || appStore == '' ?
      (
        <div className="w-30"></div>
      )
      :
      (
        <div className="w-30">
          <Button variation="primary" href={appStore} target="_blank">
            Descarga la App
          </Button>
        </div>
      )
    }
    </>
  )
}

const RenderAppOverview = ( overview: string ) => {
  return(
    <>
      <p className="f9 mt8 mb5">Overview</p>
      <p className="f6 gray ma0">
        {overview}
      </p>
    </>
  )
}

const RenderAppFeatures = ( features: string[] ) => {
  return(
    <>
    <p className="f9 mt8 mb5">Features</p>
    <div className='ph6 pv3'>
      {
        (features.map(feature =>{
          return(
            <>
                <div className="gray flex ma0">
                  {Check}
                  <p className="f6 gray ma2">
                    {feature}
                  </p>
                </div>
            </>
          )
        }))
      }
    </div>
    </>
  )
}

const RenderAppScreenshot = ( screenshot: string ) => {
  return(
    <>
    {
      screenshot == null || screenshot == '' ?
      (
        <>
          <p className="f6 mt8 mb5 gray ma0">No hay screenshot disponible</p>
        </>
      )
      :
      (
        <>
          <p className="f9 mt8 mb5">Screenshots</p>
          <img src={screenshot} alt="App detail photo" />
        </>
      )
    }
    </>
  )
}

const RenderAppWorkspace = ( workspace: string ) => {
  return(
    <>
    {
      workspace == null || workspace == '' ?
      (
        <>
          <p className="f6 mt8 mb5 gray ma0">No requiere un workspace especifico</p>
        </>
      )
      :
      (
        <>
          <p className="f9 mt8 mb5">Entorno</p>
          <p className="f6 gray ma0">
            <Link href={workspace}>{workspace}</Link>
          </p>
        </>
      )
    }
    </>
  )
}

const RenderAppVideo = ( video: string ) => {
  return(
    <>
    {
      video == null || video == '' ?
      (
        <>
          <p className="f6 mt8 mb5 gray ma0">No hay video disponible</p>
        </>
      )
      :
      (
        <>
          <p className="f9 mt8 mb5">Video</p>
          <p className="f6 gray ma0">
            {video}
          </p>
        </>
      )
    }
    </>
  )
}

const RenderAppRequirements = ( requirements: string[] ) => {
  return(
    <>
      <p className="f9 mt8 mb5">Requisitos</p>
      <ul>
        {(requirements.map(requirement =>{
          return(
            <li>
              <p className="f6 gray ma0">
              {requirement}
              </p>
            </li>
          )
        }))}
      </ul>
    </>
  )
}

const RenderAppTutorial = ( tutorials: string[] ) => {
  return(
    <>
      <p className="f9 mt8 mb5">Paso a Paso</p>
      <ol>
        {
        (tutorials.map(tutorial =>{
          return(
            <li>
              <p className="f6 ma0">
              {tutorial}
              </p>
            </li>
          )
        }))
        }
      </ol>
    </>
  )
}

const RenderAppAssets = ( assets: string[] ) => {
  return(
    <>
    {
      assets.length == 0 ?
      (
        <>
          <p className="f6  mt8 mb5 gray ma0">No es necesario utilizar assets</p>
        </>
      )
      :
      (
        <>
        <p className="f9 mt8 mb5">Descargar Assets</p>
        <div>
          {
            (assets.map(asset =>{
              return(
                <p className="f6 gray ma0">
                  <Link
                    href=""
                    target="_blank"
                    mediumWeigth>
                    {asset}
                  </Link>
                </p>
              )
            }))
          }
        </div>
        </>
      )
    }
    </>
  )
}

const RenderAppHelpLinks = ( github: string ) => {
  return(
    <>
    <p className="f9 mt8 mb5">Links de Ayuda</p>
    <Link
      href="https://vtex.slack.com/archives/C017JF73XCH"
      target="_blank"
      mediumWeigth>
      Canal de Slack APUB First Party Apps
    </Link>
    <br></br>
    <Link
      href={github}
      target="_blank"
      mediumWeigth>
      Repo de Github
    </Link>
    </>
  )
}

const AppTabs = (props: {
  name: string,
  download: string,
  overview: string,
  feature: string[],
  screenshot: string,
  workspace: string,
  video: string,
  requirements: string[],
  tutorial: string[],
  assets: string[],
  github: string
}) => {
  const [currentTab, setCurrentTab] = useState<Number>(1);
  return (
    <div className="w-80">

      <div className='flex mb9'>

        <div className="w-70">
          <h2 className="ma3"> {props.name} </h2>
        </div>

        {RenderGetAppButton(props.download)}

      </div>

      <Tabs fullWidth>
        <Tab
          label="Resumen"
          active={currentTab == 1}
          onClick={() => setCurrentTab(1)}>
            {RenderAppOverview(props.overview)}
            {RenderAppFeatures(props.feature)}
            {RenderAppScreenshot(props.screenshot)}
        </Tab>

        <Tab
          label="Demo"
          active={currentTab === 2}
          onClick={() => setCurrentTab(2)}>
            {RenderAppWorkspace(props.workspace)}
            {RenderAppVideo(props.video)}
        </Tab>

        <Tab
          label="Tutorial"
          active={currentTab === 3}
          onClick={() => setCurrentTab(3)}>
            {RenderAppRequirements(props.requirements)}
            {RenderAppTutorial(props.requirements)}
            {RenderAppAssets(props.assets)}
            {RenderAppHelpLinks(props.github)}
        </Tab>
      </Tabs>

  </div>
  )
}

export default AppTabs
