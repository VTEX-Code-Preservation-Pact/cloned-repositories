import * as React from 'react'

interface Props {
  fill: string
  width?: number
  height?: number
}

export const CreditCard = (props: Props) => {
  const { fill, width = '21.113', height = '13.826' } = props

  return (
    <svg width={width} height={height} viewBox="0 0 21.113 13.826">
      <g>
        <title>Layer 1</title>
        <g data-name="Grupo 4710" id="Grupo_4710">
          <g data-name="Grupo 4695" id="Grupo_4695">
            <path
              className={fill}
              d="m18.99,1.25l-16.86,0a0.23,0.23 0 0 0 -0.23,0.23l0,10.84a0.23,0.23 0 0 0 0.23,0.24l16.86,0a0.23,0.23 0 0 0 0.23,-0.24l0,-10.84a0.23,0.23 0 0 0 -0.23,-0.23m-16.62,1.56l16.39,0l0,0.94l-16.39,0l0,-0.94zm16.39,-0.45l-16.39,0l0,-0.64l16.39,0l0,0.64zm-16.39,1.85l16.39,0l0,7.89l-16.39,0l0,-7.89z"
              data-name="Trazado 5969"
              id="Trazado_5969"
            />
            <path
              className={fill}
              d="m10.15,10.14l-6.16,0a0.23,0.23 0 0 0 0,0.46l6.16,0a0.23,0.23 0 0 0 0,-0.46"
              data-name="Trazado 5970"
              id="Trazado_5970"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
