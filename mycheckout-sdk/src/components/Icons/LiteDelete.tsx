import * as React from 'react'

interface Props {
  fill: string
  className?: string
}

export const LiteDelete = (props: Props) => {
  const { fill, className } = props

  return (
    <svg
      id="Icon_borrar"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 20"
      className={className}
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectángulo_2116"
            data-name="Rectángulo 2116"
            width="13.567"
            height="17.428"
            fill="none"
          />
        </clipPath>
      </defs>
      <rect
        id="Rectángulo_2117"
        data-name="Rectángulo 2117"
        width="24"
        height="24"
        fill="none"
      />
      <g id="Grupo_4728" data-name="Grupo 4728" transform="translate(5 3)">
        <g
          id="Grupo_4727"
          data-name="Grupo 4727"
          transform="translate(0 0)"
          clipPath="url(#clipPath)"
        >
          <path
            id="Trazado_5986"
            data-name="Trazado 5986"
            d="M11.213,17.718H2.842a.248.248,0,0,1-.247-.227L1.358,2.547a.248.248,0,0,1,.065-.188.244.244,0,0,1,.182-.08H12.45a.244.244,0,0,1,.182.08.248.248,0,0,1,.065.188L11.46,17.491a.247.247,0,0,1-.247.227m-8.143-.5h7.915l1.2-14.448H1.874Z"
            transform="translate(-0.172 -0.289)"
            className={fill}
          />
          <path
            id="Trazado_5987"
            data-name="Trazado 5987"
            d="M13.32,2.774H.247a.248.248,0,0,1,0-.5H13.32a.248.248,0,0,1,0,.5"
            transform="translate(0 -0.289)"
            className={fill}
          />
          <path
            id="Trazado_5988"
            data-name="Trazado 5988"
            d="M7.816,16.622a.247.247,0,0,1-.247-.247V4.5a.247.247,0,1,1,.494,0V16.375a.247.247,0,0,1-.247.247"
            transform="translate(-0.961 -0.539)"
            className={fill}
          />
          <path
            id="Trazado_5989"
            data-name="Trazado 5989"
            d="M10.226,16.6H10.2a.247.247,0,0,1-.224-.268L11.016,4.5a.248.248,0,1,1,.493.043L10.472,16.377a.248.248,0,0,1-.246.226"
            transform="translate(-1.267 -0.543)"
            className={fill}
          />
          <path
            id="Trazado_5990"
            data-name="Trazado 5990"
            d="M5.255,16.6a.248.248,0,0,1-.246-.226L3.972,4.546A.248.248,0,0,1,4.2,4.278a.251.251,0,0,1,.268.225L5.5,16.334a.248.248,0,0,1-.225.268H5.255"
            transform="translate(-0.504 -0.543)"
            className={fill}
          />
          <path
            id="Trazado_5991"
            data-name="Trazado 5991"
            d="M9.679,2.485a.247.247,0,0,1-.247-.247V.673A.179.179,0,0,0,9.253.5h-3.7a.179.179,0,0,0-.178.178V2.238a.248.248,0,0,1-.5,0V.673A.674.674,0,0,1,5.552,0h3.7a.673.673,0,0,1,.673.673V2.238a.247.247,0,0,1-.247.247"
            transform="translate(-0.619 0)"
            className={fill}
          />
        </g>
      </g>
    </svg>
  )
}
