import * as React from 'react'

export function Clock(props: React.SVGProps<SVGSVGElement>) {
  const { fill, width = '24', height = '24' } = props

  return (
    <svg width={width} height={height} viewBox="0 0 24 24">
      <g>
        <g data-name="Grupo 4789" id="Grupo_4789">
          <g data-name="Grupo 4788" id="Grupo_4788">
            <path
              d="m12.01,23.58a11.83,11.58 0 1 1 11.82,-11.57a11.84,11.59 0 0 1 -11.82,11.57m0,-22.52a11.17,10.94 0 1 0 11.17,10.94a11.19,10.96 0 0 0 -11.17,-10.94"
              data-name="Trazado 6012"
              fill="#011d1a"
              id="Trazado_6012"
              className={fill}
            />
            <path
              d="m8.14,15.67a0.32,0.32 0 0 1 -0.22,-0.54l2.87,-2.65a0.32,0.32 0 1 1 0.44,0.45l-2.87,2.65a0.32,0.32 0 0 1 -0.22,0.09"
              data-name="Trazado 6013"
              fill="#011d1a"
              id="Trazado_6013"
              transform="matrix(1 0 0 1 0 0)"
              className={fill}
            />
            <path
              d="m11.99,11.06a0.32,0.32 0 0 1 -0.31,-0.31l0,-7.23a0.32,0.32 0 1 1 0.64,0l0,7.23a0.32,0.32 0 0 1 -0.32,0.31"
              data-name="Trazado 6014"
              fill="#011d1a"
              id="Trazado_6014"
              className={fill}
            />
            <path
              d="m12,13.26a1.28,1.26 0 1 1 1.28,-1.26a1.28,1.26 0 0 1 -1.28,1.26m0,-1.88a0.64,0.62 0 1 0 0.64,0.62a0.64,0.62 0 0 0 -0.64,-0.62"
              data-name="Trazado 6015"
              fill="#011d1a"
              id="Trazado_6015"
              className={fill}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
