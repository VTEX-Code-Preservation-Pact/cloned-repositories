import React from "react";
import { Link } from 'vtex.styleguide'

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
          <div className="mw-100 mh-100 image-size-detail bg-muted-5 flex justify-center items-center">
            {svg}
          </div>
        )
        :
        (
          <img src={appPhoto} alt="App detail photo" />
        )
      }
    </>
  )
}

const Resume = (props: { photo: string, version: number, status: string, store: string[], category: string[], documentation: string}) => {
  return(
    <div className="w-20">
      <div className="mb7">
        {RenderPhoto(props.photo)}
      </div>
      <h6 className="f6 near-black mv3">Última versión</h6>
      <p className="f6 gray mt0 mb7">
      {props.version}.x
      </p>
      <h6 className="f6 near-black mv3">Status</h6>
      <p className="f6 gray mt0 mb7">
        {props.status}
      </p>
      <h6 className="f6 near-black mv3">Tiendas</h6>
      <p className="f6 gray mt0 mb7">
        {props.store.join(', ')}
      </p>
      <h6 className="f6 near-black mv3">Categorias</h6>
      <p className="f6 gray mt0 mb7">
        {props.category.join(', ')}
      </p>
      <h6 className="f6 near-black mv3">Soporte</h6>
      <p>
        <Link
          href={props.documentation}
          target="_blank"
          mediumWeigth>
          Documentación
        </Link>
      </p>
    </div>
  )
}

export default Resume
