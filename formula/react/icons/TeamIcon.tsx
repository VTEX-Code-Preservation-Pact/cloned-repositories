import React, { Component } from 'react'

class TeamIcon extends Component {
  public render() {
    return (
      <svg height={this.props.height} width={this.props.width} version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" xmlSpace="preserve">
        <title>multiple 11</title>
        <g fill="#f71963" stroke="#f71963" strokeLinecap="round" strokeWidth="4">
          <path d="M21.427,27.439 C20.464,25.41,18.395,24,16,24H8c-3.314,0-6,2.686-6,6v8l4,2l1,14h11" fill="none"/>
          <circle cx="12" cy="12" fill="none" r="6"/>
          <path d="M42.573,27.439 C43.536,25.41,45.605,24,48,24h8c3.314,0,6,2.686,6,6v8l-4,2l-1,14H46" fill="none"/>
          <circle cx="52" cy="12" fill="none" r="6"/>
          <path d="M38,62H26l-1-16l-5-1V32 c0-4.418,3.582-8,8-8h8c4.418,0,8,3.582,8,8v13l-5,1L38,62z" fill="none" stroke="#162031"/>
          <circle cx="32" cy="10" fill="none" r="8" stroke="#162031"/>
        </g>
      </svg>
    )
  }
}

export default TeamIcon
