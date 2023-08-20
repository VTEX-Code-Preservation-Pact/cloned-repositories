import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import TagManager from 'react-gtm-module'

import App from './App'

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GOOGLE_TAG_MANAGER || 'GTM-WZGDLLN',
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(<App />, document.getElementById('root'))
