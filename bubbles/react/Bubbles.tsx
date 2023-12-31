import React, { Component } from 'react'
import { Helmet } from 'render'

import './js/daynightoverlay.js'
//@ts-ignore
import { IMAGE_ROOT, start } from './js/main.js'

import './global.css'

export default class Bubbles extends Component {
  public componentDidMount() {
    start()
    if (window.localStorage.getItem('autCookie')) {
      //@ts-ignore
      document.querySelector('.reset').style.display = 'block'
      setTimeout(() => {
        //@ts-ignore
        document.querySelector('.reset').style.display = 'none'
      }, 5*1000)
    }
  }

  private handleReset = () => {
    window.localStorage.removeItem('autCookie')
    window.location.reload()
  }

  private handleLogin = () => {
    const token = window.prompt('Paste token here:')
    window.localStorage.setItem('autCookie', String(token))
    try {
      //@ts-ignore
      document!.querySelector('.login')!.style.display = "none"
      //@ts-ignore
      document!.querySelector('.loading')!.style.display = "block"
    } catch(e){}
    // this.initGoogle(() => {
    //   const genericWindow = window as any
    //   const GoogleAuth = genericWindow.gapi.auth2.getAuthInstance()

    //   if (false) {
    //     // GoogleAuth.grantOfflineAccess().then((v: OfflineAccessResponse) =>
    //     //   exchangeCode(v)
    //     // )
    //   } else {
    //     GoogleAuth.signIn().then(
    //       () => {
    //         this.loginSucceed(GoogleAuth)
    //       },
    //       (error: any) => {
    //         // loginFailed()
    //         console.log('erro no login')
    //       }
    //     )
    //   }
    // }
  }

  private initGoogle = (callback: () => void) => {
    const genericWindow = window as any
    genericWindow.gapi.load('auth2', () => {
      genericWindow.gapi.auth2
        .init({
          client_id:
            '388920801697-jo8o228hlp7k5ifqhosum7tqml2br3kh.apps.googleusercontent.com',
        })
        .then(callback)
    })
  }

  private loginSucceed = (GoogleAuth: any) => {
    const profile = GoogleAuth.currentUser.get().getBasicProfile()
    console.log('login funcionou')
    console.log(profile)
    // if (!profile) {
    //   loginFailed()
    //   return
    // }
    // const email = profile.getEmail()
    // const image = profile.getImageUrl()
    // if (email.split('@')[1] === 'vtex.com.br') {
    //   props.cookies.set(
    //     keepLogged ? props.COOKIE_NAME : props.TEMPORARY_COOKIE_NAME,
    //     GoogleAuth.currentUser.get().getAuthResponse().id_token,
    //     {
    //       maxAge: 2147483647,
    //     }
    //   )
    //   props.setEmail(email)
    //   props.setImageUrl(image)
    //   props.setLogin(true)
    // } else {
    //   setInvalidUser(true)
    //   props.setLogin(false)
    // }
  }

  public render() {
    return (
      <div>
        <Helmet>
          <title>VTEX Order Map</title>
          <link rel="shortcut icon" href="https://io.vtex.com.br/favico/1.3.0/favico.ico"></link>
          <script src="https://io.vtex.com.br/front-libs/jquery/2.0.3/jquery-2.0.3.min.js"></script>
          <script src="https://vtexid.vtex.com.br/api/vtexid/pub/authentication/vtexid.min.js"></script>
        </Helmet>
        <div className="container" id="container" style={{ background: '#142032' }}>
          <canvas id="map"></canvas>
          {/* <canvas id="heatmap"></canvas> */}
          <canvas id="overlay"></canvas>
          <canvas id="map-borders"></canvas>
          <canvas id="image-gallery"></canvas>
          <a href="https://en.vtex.com/" rel="noopener noreferrer" target="_blank">
            <img src={`${IMAGE_ROOT}/vtex-logo.svg`} className="logovtex" alt="Logo VTEX"/>
          </a>
        </div>
        <div id="stats"></div>
        <button onClick={this.handleLogin} className="login">Login</button>
        <button onClick={this.handleReset} className="reset">Reset Token</button>
        <div className="loading">Connecting...</div>
        <div className="valid"></div>
      </div>
    )
  }
}
