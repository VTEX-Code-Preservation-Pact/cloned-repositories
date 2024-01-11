import React, { PureComponent } from 'react'

class Person extends PureComponent {
  render() {
    return (
      <svg
        className="person-blue"
        fill="none"
        height="24"
        style={{
          display: 'block',
        }}
        version="1.1"
        viewBox="0 0 24 24"
        width="24"
        x="0px"
        xmlns="http://www.w3.org/2000/svg"
        y="0px">
        <path
          d="M3 3H7.5V0H1.5C0.6705 0 0 0.6705 0 1.5V7.5H3V3Z"
          fill="#368DF7"
        />
        <path
          d="M22.5 0H16.5V3H21V7.5H24V1.5C24 0.6705 23.3295 0 22.5 0Z"
          fill="#368DF7"
        />
        <path
          d="M21 21H16.5V24H22.5C23.3295 24 24 23.3295 24 22.5V16.5H21V21Z"
          fill="#368DF7"
        />
        <path
          d="M3 16.5H0V22.5C0 23.3295 0.6705 24 1.5 24H7.5V21H3V16.5Z"
          fill="#368DF7"
        />
        <path
          d="M6 15V18H18V15C18 15 16.5 12 12 12C7.5 12 6 15 6 15Z"
          fill="#368DF7"
        />
        <path
          d="M12 10.5C13.6569 10.5 15 9.15685 15 7.5C15 5.84315 13.6569 4.5 12 4.5C10.3431 4.5 9 5.84315 9 7.5C9 9.15685 10.3431 10.5 12 10.5Z"
          fill="#368DF7"
        />
      </svg>
    )
  }
}

export default Person
