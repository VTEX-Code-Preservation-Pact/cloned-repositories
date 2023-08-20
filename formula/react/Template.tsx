import React, { Component } from 'react'
import { Helmet } from 'render'

import VtexIcon from './icons/VtexIcon'

import './global.css'

export default class FormulaTemplate extends Component {
  render() {
    return (
      <div className="container bg-muted-5">
        <Helmet>
          <title>VTEX Formula</title>
          <link rel="shortcut icon" href="https://io.vtex.com.br/favico/1.3.0/favico.ico"></link>
        </Helmet>
        {this.props.children}
        <footer className="mw7 center gray f8">
          <div className="flex items-center justify-center pa8">
            <VtexIcon />
            <span className="ml3">
              Formula - all rights reserved ©
            </span>
          </div>
        </footer>
      </div>
    )
  }
}
