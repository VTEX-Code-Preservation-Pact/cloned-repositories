import * as React from 'react'

interface Props {
  fill: string
  border: string
  selected?: boolean
  onClick?: any
  width?: string
  heigth?: string
}

export function RadioButton(props: Props) {
  const { fill, selected, border, onClick, width = '24', heigth = '17' } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={heigth}
      viewBox="0 0 20 20"
      onClick={onClick}
    >
      <defs>
        <style>{`.both{fill-rule:evenodd;}.empty{fill:none;}`}</style>
      </defs>
      <path
        className={`${selected ? fill : 'empty'}`}
        d="M12,16a4,4,0,1,0-4-4A4,4,0,0,0,12,16Z"
        transform="translate(-2 -2)"
      />
      <path
        className={`both ${selected ? fill : border}`}
        d="M22,12A10,10,0,1,1,12,2,10,10,0,0,1,22,12Zm-2,0a8,8,0,1,1-8-8A8,8,0,0,1,20,12Z"
        transform="translate(-2 -2)"
      />
    </svg>
  )
}
