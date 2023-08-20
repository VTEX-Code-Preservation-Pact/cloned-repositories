import * as React from 'react'

interface Props {
  fill: string
  width?: number
  height?: number
}

export const LiteLocation = (props: Props) => {
  const { fill, width = '24', height = '24' } = props

  return (
    <svg
      id="Icon_ubicación"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <rect
        id="Rectángulo_2115"
        data-name="Rectángulo 2115"
        width="16"
        height="16"
        transform="translate(0 0)"
        fill="none"
      />
      <g id="Grupo_4698" data-name="Grupo 4698" transform="translate(3.333)">
        <g id="Grupo_4697" data-name="Grupo 4697">
          <path
            id="Trazado_5971"
            data-name="Trazado 5971"
            d="M8.915,2.31A4.705,4.705,0,0,0,5.086.007C4.91,0,4.731,0,4.554.007A4.706,4.706,0,0,0,.726,2.31,4.967,4.967,0,0,0,.449,6.957L4.62,15.873a.221.221,0,0,0,.4,0L9.193,6.955A4.966,4.966,0,0,0,8.915,2.31M8.791,6.769,4.821,15.257.85,6.771A4.526,4.526,0,0,1,1.105,2.54,4.27,4.27,0,0,1,4.577.449c.08,0,.162-.006.244-.006s.163,0,.243.006A4.271,4.271,0,0,1,8.536,2.54a4.524,4.524,0,0,1,.256,4.229"
            transform="translate(0 0)"
            className={fill}
          />
          <path
            id="Trazado_5972"
            data-name="Trazado 5972"
            d="M5.428,2.813A2.645,2.645,0,1,0,8.073,5.458,2.648,2.648,0,0,0,5.428,2.813m0,4.847a2.2,2.2,0,1,1,2.2-2.2,2.2,2.2,0,0,1-2.2,2.2"
            transform="translate(-0.608 -0.615)"
            className={fill}
          />
        </g>
      </g>
    </svg>
  )
}
