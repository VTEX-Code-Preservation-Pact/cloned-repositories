import * as React from 'react'

interface Props {
  fill: string
  height?: number
  strokeWidth?: number
  width?: number
}

export const Shipping = ({
  fill,
  height = 22,
  strokeWidth = 0.5,
  width = 22,
}: Props) => {
  return (
    <svg
      id="Icon_envío"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 22"
    >
      <rect
        id="Rectángulo_2112"
        data-name="Rectángulo 2112"
        width={width}
        height={height}
        fill="none"
      />
      <g
        id="Grupo_4724"
        data-name="Grupo 4724"
        transform="translate(0.917 5.5)"
      >
        <line
          id="Línea_346"
          data-name="Línea 346"
          x2="6.893"
          transform="translate(7.676 8.064)"
          fill="none"
          className={fill}
          strokeWidth={strokeWidth}
        />
        <line
          id="Línea_347"
          data-name="Línea 347"
          x2="1.664"
          transform="translate(3.091 8.064)"
          fill="none"
          className={fill}
          strokeWidth={strokeWidth}
        />
        <g id="Grupo_4723" data-name="Grupo 4723" transform="translate(0 0)">
          <g id="Grupo_4722" data-name="Grupo 4722">
            <path
              id="Trazado_5981"
              data-name="Trazado 5981"
              d="M14.741,7.922V.371a.224.224,0,0,0-.224-.224H4.419"
              transform="translate(-1.304 -0.044)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
            <path
              id="Trazado_5982"
              data-name="Trazado 5982"
              d="M23.729,10.232h2.215a.2.2,0,0,0,.2-.2V8.418A1.282,1.282,0,0,0,24.72,7.345H20.861"
              transform="translate(-6.156 -2.168)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
            <path
              id="Trazado_5983"
              data-name="Trazado 5983"
              d="M19.282,1.512h1.683a2.1,2.1,0,0,1,1.967,1.135L24.21,5.624H19.963"
              transform="translate(-5.69 -0.446)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
            <path
              id="Trazado_5984"
              data-name="Trazado 5984"
              d="M23.637,11.474a1.532,1.532,0,1,0-1.532,1.532A1.532,1.532,0,0,0,23.637,11.474Z"
              transform="translate(-6.071 -2.934)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
            <path
              id="Trazado_5985"
              data-name="Trazado 5985"
              d="M9.607,11.474a1.532,1.532,0,1,0-1.532,1.532A1.532,1.532,0,0,0,9.607,11.474Z"
              transform="translate(-1.931 -2.934)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
            <line
              id="Línea_348"
              data-name="Línea 348"
              x1="5.115"
              transform="translate(2.846 2.639)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
            <line
              id="Línea_349"
              data-name="Línea 349"
              x1="1.583"
              transform="translate(0 2.639)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
            <line
              id="Línea_350"
              data-name="Línea 350"
              x1="5.615"
              transform="translate(4.707 5.177)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
            <line
              id="Línea_351"
              data-name="Línea 351"
              x1="1.738"
              transform="translate(1.583 5.177)"
              fill="none"
              className={fill}
              strokeWidth={strokeWidth}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
