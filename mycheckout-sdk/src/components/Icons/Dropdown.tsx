import * as React from 'react'

interface Props {
  fill: string
}

export const Dropdown = (props: Props) => {
  const { fill } = props

  return (
    <svg
      id="icon_down"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <rect
        id="Rectángulo_2122"
        data-name="Rectángulo 2122"
        width="24"
        height="24"
        fill="none"
      />
      <g
        id="icon_left"
        data-name="icon / left"
        transform="translate(4 20) rotate(-90)"
      >
        <rect
          id="Rectángulo_47"
          data-name="Rectángulo 47"
          width="16"
          height="16"
          className={fill}
          opacity="0.001"
        />
        <path
          id="Fill_1"
          data-name="Fill 1"
          d="M7.987,6.658a.285.285,0,0,0,0-.173A.46.46,0,0,0,7.965,6.4a.522.522,0,0,0-.05-.079.437.437,0,0,0-.037-.059c-.005-.006-.012-.008-.018-.013s-.008-.012-.014-.017L.8.119A.5.5,0,0,0,.126.15.443.443,0,0,0,.157.8L6.809,6.571.157,12.346a.443.443,0,0,0-.031.647.489.489,0,0,0,.355.15A.49.49,0,0,0,.8,13.024L7.846,6.91c.006-.006.008-.012.015-.018s.012-.007.017-.012a.437.437,0,0,0,.037-.059.522.522,0,0,0,.05-.079.46.46,0,0,0,.021-.084"
          transform="translate(12.071 14.571) rotate(180)"
          className={fill}
        />
      </g>
    </svg>
  )
}
