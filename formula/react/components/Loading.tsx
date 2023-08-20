import React, { Component } from 'react'
import { Spinner } from 'vtex.styleguide'

export default class Timer extends Component {
  public render() {
    return (
      <div className="flex justify-center pa8 w-100">
        <Spinner />
      </div>
    )
  }
}
