import './vtex-tachyons-polyfill.css'
import React, { PureComponent } from 'react'
import App from './components/App'

class AppMain extends PureComponent {
  render() {
    return (
      <div className="vtex-lib">
        <App />
      </div>
    )
  }
}

export default AppMain
