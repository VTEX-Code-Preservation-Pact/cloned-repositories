/* eslint-disable no-console */
import React from 'react'
import { PageBlock, Alert } from 'vtex.styleguide'

import Logo from './components/Logo'
import Speedometer from './components/Speedometer'

export default class App extends React.Component {
  public state: {
    wifiStatus: boolean
    slackStatus: boolean
  }
  public constructor(props: any) {
    super(props)
    this.state = {
      wifiStatus: true,
      slackStatus: true,
    }
  }

  public async componentDidMount() {
    window.addEventListener('online', () => this.setState({ wifiStatus: true }))
    window.addEventListener('offline', () =>
      this.setState({ wifiStatus: false })
    )
  }

  public componentWillUnmount() {
    window.removeEventListener('online', () => {})
    window.removeEventListener('offline', () => {})
  }

  public render() {
    const { wifiStatus } = this.state
    return (
      <div
        className="flex justify-center pb7 bg-muted-5 min-vh-100"
        style={{ backgroundColor: '#333' }}>
        <div className="w-100 ph10 pv5">
          <div className="flex flex-row items-center">
            <Logo />
            <h2 className="ml3 c-muted-5">H E R M E S</h2>
          </div>
          <PageBlock variation="aside">
            <div>
              <Alert type={wifiStatus ? 'success' : 'error'}>{`wifi is ${
                wifiStatus ? 'online' : 'offline'
              }`}</Alert>
            </div>
            <Speedometer />
          </PageBlock>
        </div>
      </div>
    )
  }
}
