import React, { Fragment } from 'react'
import Timer from 'react-compound-timer'
import styles from './styles.css'
import Circles from './components/Circles'
import Logos from './components/Logos'

const BlackFridayTimer: StorefrontFunctionComponent = () => {
  if (typeof document === 'undefined' || typeof document === 'undefined') {
    return null
  }

  const blackFridayDate = new Date('11/29/2019')

  const today = new Date()

  const timeLeft = blackFridayDate.getTime() - today.getTime()

  const formatValue = (value: any) => {
    if (value < 10) {
      return `0${value}`
    }
    return `${value}`
  }

  return (
    <Fragment>
      <div className={`${styles.container2} flex flex-column pv6 ph4`}>
        <Circles />
      </div>
      <div className={`${styles.container} flex flex-column pv6 ph4`}>
        <Timer
          initialTime={timeLeft}
          direction="backward"
        >
          {() => (
            <React.Fragment>
              <p className={styles.days}>Faltam <Timer.Days /> dias para a Black Friday.</p>
            </React.Fragment>
          )}
        </Timer>
        <Timer
          initialTime={timeLeft}
          direction="backward"
          lastUnit="h"
        >
          {() => (
            <React.Fragment>
              <div className={styles.timer}>
                <Timer.Hours />:<Timer.Minutes formatValue={formatValue} />:<Timer.Seconds formatValue={formatValue} />
              </div>
            </React.Fragment>
          )}
        </Timer>
        <Logos />
      </div>
    </Fragment>

  )
}

export default BlackFridayTimer
