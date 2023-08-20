import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Countdown from 'react-countdown-now'
import { FormattedMessage } from 'react-intl'

import InfoQuery from '../queries/info.graphql'
import Loading from './Loading'

interface TimerProps {
  edition: string
}

const nowMillis = new Date().getTime()

let refreshTimeout: any

export default class Timer extends Component<TimerProps> {
  public render() {
    const { edition } = this.props
    return (
      <Query query={InfoQuery} ssr={false} variables={{ edition }}>
        {({ loading, error, data = {} }) => {
          if (loading || !data.info) {
            return <Loading />
          }

          const remaining = data && data.info && data.info.timeRemainingSeconds
          const status = data && data.info && data.info.status
          const total = data && data.info && data.info.timeTotalSeconds
          const countdownRunning = status === 'REGISTRATION' || status === 'RUNNING'

          if (countdownRunning && !refreshTimeout) {
            refreshTimeout = setTimeout(() => {
              console.log('Time\'s up!')
              window.location.reload()
            }, remaining * 1000)
          }

          const barWidth = status === 'REGISTRATION'
            ? 0
            : status !== 'RUNNING'
              ? '100%'
              : `${Math.round(((total - remaining) / total) * 100)}%`

          const afterContent = status === 'VOTING'
            ? <FormattedMessage id="formula.status.voting.details"/>
            : status === 'RESULTS'
              ? <FormattedMessage id="formula.status.results.details"/>
              : null

          const countdown = countdownRunning &&
            <Countdown
              date={nowMillis + remaining * 1000}
              daysInHours={true} />

          return (
            <div className="bg-serious-black white">
              <div className="center mw7 pv7 ph5">
                <div className="f5 fw3">
                  <FormattedMessage id={`formula.status.${status.toLowerCase()}`} />
                </div>
                <div className="fw3 pb5 dn-ns db" style={{fontSize: '5em'}}>
                  { countdown || afterContent }
                </div>
                <div className="fw3 pb5 dn db-ns" style={{fontSize: countdownRunning ? '10em' : '7em'}}>
                  { countdown || afterContent }
                </div>
                <div className="w-100 bg-marine h2 relative mb7 br2" style={{height: '0.25rem'}}>
                  <div className="bg-rebel-pink h2 br2" style={{width: barWidth, height: '0.25rem'}}></div>
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}
