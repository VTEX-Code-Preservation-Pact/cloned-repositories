import * as React from 'react'

interface Props {
  fill: string
  stroke?: string
  className?: string
}

export const Alert = ({ className, fill, stroke }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      className={className}
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectángulo_2170"
            data-name="Rectángulo 2170"
            width="26.124"
            height="25.319"
            className={fill}
          />
        </clipPath>
      </defs>
      <g
        id="Grupo_4847"
        data-name="Grupo 4847"
        transform="translate(-165 -464)"
      >
        <g
          id="Grupo_4846"
          data-name="Grupo 4846"
          transform="translate(174 473)"
        >
          <g
            id="Grupo_4845"
            data-name="Grupo 4845"
            transform="translate(0 0)"
            clipPath="url(#clipPath)"
          >
            <path
              id="Trazado_6054"
              data-name="Trazado 6054"
              d="M12.859,22.415q-.72,0-1.437-.066L5.09,21.777H1.358a1.364,1.364,0,0,1-.986-.424A1.347,1.347,0,0,1,0,20.347a1.389,1.389,0,0,1,1.414-1.286h.7a2.658,2.658,0,0,0,2.655-2.655V9.363a8.088,8.088,0,1,1,16.176,0v7.043A2.659,2.659,0,0,0,23.6,19.061h1.106A1.4,1.4,0,0,1,26.1,20.179a1.36,1.36,0,0,1-1.337,1.6H20.6l-6.3.571c-.476.043-.957.066-1.437.066M1.415,19.762a.7.7,0,0,0-.712.621.658.658,0,0,0,.655.694H5.121l6.364.575a15.22,15.22,0,0,0,2.748,0l6.332-.574h4.2a.657.657,0,0,0,.646-.778.7.7,0,0,0-.7-.537H23.6a3.359,3.359,0,0,1-3.356-3.356V9.363a7.387,7.387,0,0,0-14.775,0v7.043a3.36,3.36,0,0,1-3.356,3.356Z"
              transform="translate(0 0.301)"
              className={fill}
            />
            <path
              id="Trazado_6055"
              data-name="Trazado 6055"
              d="M10.946,21.087a2.862,2.862,0,0,1-2.858-2.858.351.351,0,0,1,.7,0,2.157,2.157,0,1,0,4.314,0,.351.351,0,0,1,.7,0,2.862,2.862,0,0,1-2.858,2.858"
              transform="translate(1.914 4.231)"
              className={fill}
            />
            <path
              id="Trazado_6056"
              data-name="Trazado 6056"
              d="M10.466,5.052a.35.35,0,0,1-.35-.35V.35a.35.35,0,1,1,.7,0V4.7a.35.35,0,0,1-.35.35"
              transform="translate(2.394 -0.001)"
              className={fill}
            />
          </g>
        </g>
        <g
          id="Elipse_195"
          data-name="Elipse 195"
          transform="translate(165 464)"
          fill="none"
          className={stroke}
          strokeWidth="1"
        >
          <circle cx="22" cy="22" r="22" stroke="none" />
          <circle cx="22" cy="22" r="21.5" fill="none" />
        </g>
      </g>
    </svg>
  )
}
