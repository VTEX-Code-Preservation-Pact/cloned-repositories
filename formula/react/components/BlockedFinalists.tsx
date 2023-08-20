import React, { Component } from 'react'
import OwlIcon from '../icons/OwlIcon'

export default class FinalistsList extends Component<{}> {
  public render () {
    return (
      <div className="flex justify-center w-100">
        <div className="bg-base ma5 ba1 b-dark-silver center mw7 pa7 mt7 br2 w-100">
          <div className="flex items-center justify-center pt9">
            <OwlIcon height="100" />
          </div>
          <div className="f3 fw7 tc pt9">Nothing to see here, mate</div>
          <div className="f5 tc pb9 pt3">Go get some pizza and come back after Formula is done.</div>
        </div>
      </div>
    )
  }
}
