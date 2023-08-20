import * as React from 'react'

interface Props {
  fill: string
  height?: number
  width?: number
}

export const MyOrder = ({ fill, height = 18, width = 18 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <g id="Grupo_4685" data-name="Grupo 4685" transform="translate(-361 376)">
        <rect
          id="Rectángulo_2094"
          data-name="Rectángulo 2094"
          width={width}
          height={height}
          transform="translate(361 -376)"
          fill="none"
        />
        <g
          id="Grupo_4676"
          data-name="Grupo 4676"
          transform="translate(366 -374.89)"
        >
          <g id="Grupo_4675" data-name="Grupo 4675">
            <path
              id="Trazado_5954"
              data-name="Trazado 5954"
              d="M13.131,20.78H.284A.284.284,0,0,1,0,20.5V2.454A.284.284,0,0,1,.284,2.17H8.03a.284.284,0,0,1,0,.567H.567V20.213H12.848V2.737H10.486a.284.284,0,1,1,0-.567h2.645a.283.283,0,0,1,.283.284V20.5a.283.283,0,0,1-.283.283"
              className={fill}
            />
            <path
              id="Trazado_5955"
              data-name="Trazado 5955"
              d="M10.486,5.193H8.03a.284.284,0,0,1-.284-.283V.284A.284.284,0,0,1,8.03,0h2.456a.284.284,0,0,1,.283.284V4.91a.283.283,0,0,1-.283.283M8.313,4.626H10.2V.567H8.313Z"
              className={fill}
            />
            <path
              id="Trazado_5956"
              data-name="Trazado 5956"
              d="M10.486,8.2H2.878a.284.284,0,1,1,0-.567h7.608a.284.284,0,0,1,0,.567"
              className={fill}
            />
            <path
              id="Trazado_5957"
              data-name="Trazado 5957"
              d="M10.486,13.089H2.878a.284.284,0,1,1,0-.567h7.608a.284.284,0,0,1,0,.567"
              className={fill}
            />
            <path
              id="Trazado_5958"
              data-name="Trazado 5958"
              d="M10.486,18.261H2.878a.284.284,0,1,1,0-.567h7.608a.284.284,0,0,1,0,.567"
              className={fill}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
