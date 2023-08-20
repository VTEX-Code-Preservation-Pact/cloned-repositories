import * as React from 'react'

export function Store(props: React.SVGProps<SVGSVGElement>) {
  const { fill, height = 24, width = 24 } = props

  return (
    <svg
      id="Icon_tienda"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 84 84"
    >
      <rect
        id="Rectángulo_2110"
        data-name="Rectángulo 2110"
        width="84"
        height="84"
        fill="none"
      />
      <g
        id="Grupo_4721"
        data-name="Grupo 4721"
        transform="translate(5.001 5.999)"
      >
        <g
          id="Grupo_4720"
          data-name="Grupo 4720"
          transform="translate(0 0)"
          clip-path="url(#clip-path-store-icon)"
        >
          <path
            id="Trazado_5979"
            data-name="Trazado 5979"
            d="M73.1,37.9a.974.974,0,0,1-.691-.286L37.041,2.345,1.669,37.616A.977.977,0,0,1,.287,36.234L36.347.274a1.013,1.013,0,0,1,1.385,0l36.06,35.96A.977.977,0,0,1,73.1,37.9"
            transform="translate(-0.001 0.002)"
            className={fill}
          />
          <path
            id="Trazado_5980"
            data-name="Trazado 5980"
            d="M56.532,52.1h-17.4a.978.978,0,0,1-.978-.975v-24.9H22.161v24.9a.978.978,0,0,1-.978.975H3.783a.975.975,0,0,1-.978-.975V8.85a.978.978,0,0,1,1.955,0V50.143H20.2V25.249a.979.979,0,0,1,.981-.978H39.127a.98.98,0,0,1,.985.978V50.143H55.551V8.85a.978.978,0,0,1,1.955,0V51.121a.972.972,0,0,1-.974.975"
            transform="translate(6.885 19.256)"
            className={fill}
          />
          <defs>
            <clipPath id="clip-path-store-icon">
              <rect
                id="Rectángulo_2109"
                data-name="Rectángulo 2109"
                width="74.082"
                height="71.351"
              />
            </clipPath>
          </defs>
        </g>
      </g>
    </svg>
  )
}
