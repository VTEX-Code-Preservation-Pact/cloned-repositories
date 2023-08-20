/* eslint-disable no-console */
import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'
import { Tag } from 'vtex.styleguide'

import Logo from './components/Logo'

export default class App extends React.Component {
  public state: {
    wifiSpeed: number
  }
  public constructor(props: any) {
    super(props)
    this.state = {
      wifiSpeed: 420,
    }
  }

  public async componentDidMount() {
    const getRandomInt = (min: number, max: number) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }
    const loop: any = () =>
      setTimeout(() => {
        const { wifiSpeed } = this.state
        this.setState({
          wifiSpeed:
            wifiSpeed > 440
              ? wifiSpeed - getRandomInt(5, 10)
              : wifiSpeed < 400
              ? wifiSpeed + getRandomInt(5, 10)
              : wifiSpeed - getRandomInt(5, 10),
        })
        loop()
      }, getRandomInt(420, 840))

    loop()
  }

  public render() {
    const { wifiSpeed } = this.state
    return (
        <div className="flex flex-column">
            <div className="center" style={{ width: 300, height: 170 }}>
            <ReactSpeedometer
                maxValue={500}
                value={wifiSpeed}
                needleColor="black"
                startColor="red"
                segments={10}
                endColor="green"
            />
            </div>
            <span className="mt4 tc">
            WiFi Speed
            <span className="ml4">
                <Tag
                type={wifiSpeed > 400 ? 'success' : 'warning'}
                variation="low">
                {`ping ${Math.floor(wifiSpeed / 10)}`}
                </Tag>
            </span>
            </span>
        </div>
    )
  }
}
