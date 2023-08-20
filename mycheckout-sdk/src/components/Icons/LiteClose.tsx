import * as React from 'react'

interface Props {
  background?: string
  className?: string
  fill: string
}

export const LiteClose = (props: Props) => {
  const { background, className, fill } = props

  return (
    <svg
      id="Icon_exit"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectángulo_2092"
            data-name="Rectángulo 2092"
            width="10.2"
            height="10.2"
            fill="none"
          />
        </clipPath>
      </defs>
      <rect
        id="Rectángulo_2106"
        data-name="Rectángulo 2106"
        className={background}
      />
      <g
        id="Grupo_4682"
        data-name="Grupo 4682"
        transform="translate(-318 -571.6)"
      >
        <g
          id="Grupo_4681"
          data-name="Grupo 4681"
          transform="translate(325 579)"
        >
          <g id="Grupo_4680" data-name="Grupo 4680" transform="translate(0 0)">
            <path
              id="Trazado_5961"
              data-name="Trazado 5961"
              d="M.328,10.2A.328.328,0,0,1,.1,9.639L9.639.1A.328.328,0,1,1,10.1.561L.56,10.1a.328.328,0,0,1-.232.1"
              transform="translate(0 0)"
              className={fill}
            />
            <path
              id="Trazado_5962"
              data-name="Trazado 5962"
              d="M9.871,10.2a.326.326,0,0,1-.232-.1L.1.561A.328.328,0,0,1,.56.1L10.1,9.639a.328.328,0,0,1-.232.561"
              transform="translate(0 0)"
              className={fill}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
