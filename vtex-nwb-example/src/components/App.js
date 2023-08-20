import React, { PureComponent } from 'react'
import styles from './App.css'

class App extends PureComponent {
  render() {
    return (
      <div className="ph0">
        <h2 className={`${styles.appWelcome} ma0`}>Welcome to React components</h2>
      </div>
    )
  }
}

export default App
