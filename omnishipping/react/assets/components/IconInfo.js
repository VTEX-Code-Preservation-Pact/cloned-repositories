import React, { PureComponent } from 'react'

class IconInfo extends PureComponent {
  render() {
    return (
      <svg
        height="25"
        style={{ transform: 'rotate(180deg)' }}
        viewBox="0 0 16 16"
        width="25"
        xmlns="http://www.w3.org/2000/svg">
        <g fill="#368df7">
          <path d="M7 4h2v5H7z" />
          <circle cx="8" cy="11" r="1" />
        </g>
      </svg>
    )
  }
}

export default IconInfo
