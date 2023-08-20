import * as React from 'react'

interface Props {
  fill: string
  width?: number
  height?: number
  className?: string
}

export const MyProfile = (props: Props) => {
  const { className, fill, width = 24, height = 24 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
    >
      <g id="Grupo_4684" data-name="Grupo 4684" transform="translate(-61 -571)">
        <rect
          id="Rectángulo_2093"
          data-name="Rectángulo 2093"
          width="24"
          height="24"
          transform="translate(61 571)"
          fill="none"
        />
        <g id="Grupo_4683" data-name="Grupo 4683" transform="translate(-23 1)">
          <g
            id="Grupo_4679"
            data-name="Grupo 4679"
            transform="translate(90 572)"
          >
            <g id="Grupo_4678" data-name="Grupo 4678">
              <path
                id="Trazado_5959"
                data-name="Trazado 5959"
                d="M6.441,8.967a4.484,4.484,0,1,1,4.483-4.484A4.488,4.488,0,0,1,6.441,8.967m0-8.46a3.977,3.977,0,1,0,3.977,3.976A3.981,3.981,0,0,0,6.441.507"
                className={fill}
              />
              <path
                id="Trazado_5960"
                data-name="Trazado 5960"
                d="M12.6,20.444H.284A.284.284,0,0,1,0,20.16V15.906a6.44,6.44,0,0,1,12.881,0V20.16a.283.283,0,0,1-.283.284M.567,19.877H12.315V15.906a5.874,5.874,0,1,0-11.748,0Z"
                className={fill}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
