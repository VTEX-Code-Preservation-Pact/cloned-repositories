import * as React from 'react'

interface Props {
  fill: string
}

export const LiteAdd = (props: Props) => {
  const { fill } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12.517"
      height="12.517"
      viewBox="0 0 12.517 12.517"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectángulo_2121"
            data-name="Rectángulo 2121"
            width="12.517"
            height="12.517"
            transform="translate(0 0)"
            className={fill}
          />
        </clipPath>
      </defs>
      <g id="Grupo_4736" data-name="Grupo 4736" transform="translate(-26 -585)">
        <g id="Grupo_4735" data-name="Grupo 4735" transform="translate(26 585)">
          <g id="Grupo_4734" data-name="Grupo 4734" clipPath="url(#clipPath)">
            <path
              id="Trazado_5994"
              data-name="Trazado 5994"
              d="M6.258,12.517a.283.283,0,0,1-.283-.283V.284a.283.283,0,1,1,.566,0v11.95a.283.283,0,0,1-.283.283"
              className={fill}
            />
            <path
              id="Trazado_5995"
              data-name="Trazado 5995"
              d="M12.233,6.542H.283a.284.284,0,0,1,0-.567h11.95a.284.284,0,0,1,0,.567"
              className={fill}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
