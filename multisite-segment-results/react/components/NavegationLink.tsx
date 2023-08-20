import React from 'react';
import { useState } from 'react';
import styles from '../styles/styles.css';
import LoadingSpinner from './LoadingSpinner';
// import LoadingSpinner from './component/LoadingSpinner';

interface NavigationLinkProps {
    src: string,
    alt: string,
    title: string,
    idValue: number,
}

const parameter = 'productClustersId';

const SetFacets = async(parameter: string, parameterValue: number, btn: string, activeClass: any) => {
  const data = {
    public: {
      facets: {
        value: `${parameter}=${parameterValue};`
      }
    }
  };

  fetch('/api/sessions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then((response: any) => {
    response.json();
    SetLocalStorageBtnActiveClass(btn, activeClass);
    location.reload();
  });
}

const SetCssClassById = (id: string, cssClass: string) => {
  const el = document.getElementById(id);
  el?.classList.add(cssClass);
}

const SetLocalStorageBtnActiveClass = (btn: string, activeClass: string) =>{
  localStorage.setItem("btnActiveElement", btn);
  localStorage.setItem("btnActiveClass", activeClass);
}

const NavigationLink: StorefrontFunctionComponent<NavigationLinkProps> = ({src, alt, title, idValue}) => {
  
  const [loadingState, SetLoadingState] = useState(false);

  let content = loadingState ? <LoadingSpinner/> : <img src={src} alt={alt} /> ;

  return (
    <>
      <button 
        id={`btn-${title}`} 
        className={styles.navigationLink}
        onClick={() => {
          SetCssClassById(`btn-${title}`, styles.active);
          SetFacets(parameter, idValue, `btn-${title}`, styles.active);
          SetLoadingState(true);
        }}>
        {content}
      </button>
    </>
  )
}

export default NavigationLink