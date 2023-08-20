import React, { Component } from 'react'

class AwardIcon extends Component {
  public render() {
    return (
      <svg height={this.props.height} width={this.props.width} version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" xmlSpace="preserve">
        <title>award</title>
        <g fill="#f71963" stroke="#f71963" strokeLinecap="round" strokeWidth="4">
          <polyline fill="none" points="43,40.892 43,61 32,56 21,61 21,40.891 "/>
          <circle cx="32" cy="23" fill="none" r="8"/>
          <circle cx="32" cy="23" fill="none" r="21" stroke="#162031"/>
        </g>
      </svg>
    )
  }
}

export default AwardIcon
