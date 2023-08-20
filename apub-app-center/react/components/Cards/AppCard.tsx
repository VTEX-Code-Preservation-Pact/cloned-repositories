import React, {useState} from 'react'
import { Button, Tag } from 'vtex.styleguide'
import CardDiv from './CardDiv';
import { AppData } from '../../typings/appdata'

const GetStatusTagByColor = (appStatus: string) => {
  switch(appStatus) {
    case 'prod':
      return (
        <Tag size="small" type="success">
          {appStatus}
        </Tag>
    );
    case 'beta':
      return (
        <Tag size="small" type="warning">
          {appStatus}
        </Tag>
    );
    default:
      return (
        <Tag size="small" variation="low">
          {appStatus}
        </Tag>
    );
  }
}

const RenderStatusTag = (appStatus: string) => {
  return(
    <div className="mb2">
      <span className="mr2">
        {GetStatusTagByColor(appStatus)}
      </span>
    </div>
  )
}

const RenderStoreTags = (appStatus: string, stores: string[]) => {
  return(
    <div className="mb2">
      {stores.map((store, i) => {
        if (appStatus == "idea"){
          return(
            <span key={"span-" + store + i} className="mr2 mb2">
              <Tag size="small" variation="low">
                {store}
              </Tag>
            </span>
          )
        } else {
          return(
            <span key={"span-" + store + i} className="mr2 mb2">
              <Tag size="small">
                {store}
              </Tag>
            </span>
          )
        }
      })}
    </div>
  );
}

const RenderCategoryTags = (appStatus: string, categories: string []) => {
  return(
    <div className="mb2">
      {categories.map((category, i) =>{
        if (appStatus == "idea"){
          return(
            <span key={"span-" + category + i} className="mr2 mb2">
              <Tag size="small" variation="low">
                {category}
              </Tag>
            </span>
          )
        } else {
          return(
            <span key={"span-" + category + i} className="mr2 mb2">
              <Tag size="small" bgColor="#134CD8">
                {category}
              </Tag>
            </span>
          )
        }
      })}
    </div>
  )
}

const RenderPhoto = (appPhoto: string) => {
  const svg =
    <svg width="14" height="14" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 24L9 17L13 20L19 13L25 24H5Z" stroke="#979899" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square">
      </path>
      <path d="M11.5 12C12.8807 12 14 10.8807 14 9.5C14 8.11929 12.8807 7 11.5 7C10.1193 7 9 8.11929 9 9.5C9 10.8807 10.1193 12 11.5 12Z" stroke="#979899" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"></path><path d="M29 1H1V29H29V1Z" stroke="#979899" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square">
      </path>
    </svg>;

  return(
    <>
    {
      appPhoto == null || appPhoto == '' ?
      (
        <div className="image-size mw-100 mh-100 bg-muted-5 flex justify-center items-center mr4">
          {svg}
        </div>
      )
      :
      (
        <div className="image-size mr4">
          <img
            className='mw-100 mh-100'
            src={appPhoto}
            alt="AppIcon"
          />
        </div>
      )
    }
    </>
  )
}

const AppCard = (props: AppData) => {
  const [loadingState, setLoadingState]= useState<boolean>(false);
  return (
    <div className='w-100 w-third-ns pa3' key={"card-" + props.id}>
      <CardDiv>
        <div className='flex flex-wrap items-center mv5'>
          {RenderStatusTag(props.status)}
          {RenderStoreTags(props.status, props.store)}
          {RenderCategoryTags(props.status, props.category)}
        </div>
        <div className='flex flex-column'>
          <a className="link" href={`/admin/app/apub-app-center/${props.id}`}>
            <div className='flex'>
                {RenderPhoto(props.photo)}
                <div className="card-div-name mr4">
                  <h3 className='f5 fw5 near-black mv3'>
                    {props.name}
                  </h3>
                </div>
            </div>
          </a>
          <div>
            <p className='f7 c-muted-2'>
              {props.description}
            </p>
          </div>
          <div className='flex justify-end items-center'>
            <Button
            variation="secondary"
            size="small"
            href={`/admin/app/apub-app-center/${props.id}`}
            onClick={() => setLoadingState(!loadingState)}
            isLoading={loadingState}
            >
              Ver más
            </Button>
          </div>
        </div>
      </CardDiv>
    </div>
  )
}

export default AppCard
