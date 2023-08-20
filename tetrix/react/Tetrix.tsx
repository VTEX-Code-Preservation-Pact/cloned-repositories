import React, { FunctionComponent, Fragment, useEffect } from 'react'
import { Helmet } from 'vtex.render-runtime'
import ReactGA from 'react-ga'

import Header from './components/Header'
import About from './components/About'
import Video from './components/Video'
import Prizes from './components/Prizes'
import Jury from './components/Jury'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import HowItWorks from './components/HowItWorks'
import News from './components/News'
import favicon from './images/faviconTetrix.png'

function initializeReactGA() {
  ReactGA.initialize('UA-139462697-3')
  ReactGA.pageview('/')
}

const Tetrix: FunctionComponent = () => {
  useEffect(initializeReactGA)

  return (
    <Fragment>
      <Helmet>
        <title>Tetrix - O Desafio Universitário</title>
        <meta name="title" content="Tetrix" />
        <meta name="description" content="O desafio universitário da VTEX" />
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
        <meta
          name="google-site-verification"
          content="WwFB6guJNrYrVApfMf_WmoCLNmptYJ_Vgk_i1DpgYLY"
        />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tetrix.vtex.com/" />
        <meta property="og:title" content="Tetrix" />
        <meta
          property="og:description"
          content="O desafio universitário da VTEX"
        />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tetrix.vtex.com/" />
        <meta property="twitter:title" content="Tetrix" />
        <meta
          property="twitter:description"
          content="O desafio universitário da VTEX"
        />
      </Helmet>
      <main className="w-100 bg-white">
        <div className="w-90-l center">
          <Header />
          <About />
          <Video />
          <HowItWorks />
          <Prizes />
          <Jury />
          <News/>
          <FAQ />
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Tetrix
