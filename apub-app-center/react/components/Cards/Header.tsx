import React from 'react'

interface Header {
  text: string
}

const Header = (props: Header) => {
  return (
    <div className="w-100 flex flex-wrap bg-white pa3 mb2">
      <div className="flex flex-column w-100">
        <div className="flex justify-between w-100 items-center">
          <span className="f4 fw5">{props.text}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
