import React, { Component } from 'react'

class DevelopIcon extends Component {
  public render() {
    return (
      <svg height={this.props.height} width={this.props.width} version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" xmlSpace="preserve">
        <title>window dev</title>
        <g fill="#f71963" stroke="#f71963" strokeLinecap="round" strokeWidth="4">
          <polyline fill="none" points=" 22,34 18,38 22,42 "/>
          <polyline fill="none" points=" 42,34 46,38 42,42 "/>
          <line fill="none" x1="28" x2="36" y1="46" y2="30"/>
          <line fill="none" x1="10" x2="14" y1="13" y2="13"/>
          <line fill="none" x1="20" x2="24" y1="13" y2="13"/>
          <line fill="none" x1="43" x2="54" y1="13" y2="13"/>
          <line fill="none" stroke="#162031" x1="2" x2="62" y1="20" y2="20"/>
          <rect height="52" width="60" fill="none" stroke="#162031" x="2" y="6"/>
        </g>
      </svg>
    )
  }
}

export default DevelopIcon
