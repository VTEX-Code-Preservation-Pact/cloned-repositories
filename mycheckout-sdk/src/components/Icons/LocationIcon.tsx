import * as React from 'react'

interface Props {
  fill?: string
  fillColor?: string
  width?: number
  height?: number
}

export function LocationIcon(props: Props) {
  const { fill, fillColor, width = 25, height = 25 } = props

  return (
    <svg
      id="Icon_Ubicación"
      data-name="Icon/Ubicación"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48.801 48.8"
    >
      <g id="Bounding_Boxes">
        <path
          id="Trazado_3314"
          data-name="Trazado 3314"
          d="M0,0H48.8V48.8H0Z"
          fill="none"
        />
      </g>
      <g id="Outline" transform="translate(10.166 4.067)">
        <g id="Grupo_333" data-name="Grupo 333">
          <path
            id="Trazado_3315"
            data-name="Trazado 3315"
            d="M19.233,2A14.223,14.223,0,0,0,5,16.233C5,26.908,19.233,42.667,19.233,42.667S33.467,26.908,33.467,16.233A14.223,14.223,0,0,0,19.233,2ZM9.067,16.233a10.167,10.167,0,1,1,20.333,0c0,5.856-5.856,14.62-10.167,20.089C15,30.894,9.067,22.028,9.067,16.233Z"
            transform="translate(-5 -2)"
            className={fill}
            fill={fillColor}
          />
          <circle
            id="Elipse_127"
            data-name="Elipse 127"
            cx="5.083"
            cy="5.083"
            r="5.083"
            transform="translate(9.15 9.15)"
            className={fill}
            fill={fillColor}
          />
        </g>
      </g>
    </svg>
  )
}
