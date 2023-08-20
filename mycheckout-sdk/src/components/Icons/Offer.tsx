import * as React from 'react'

export const Offer = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path data-name="Trazado 3270" d="M0 0h24v24H0z" fill="none" />
      <g data-name="Grupo 322" fill="#1b998b" transform="translate(2 2)">
        <path
          data-name="Trazado 3271"
          d="M19.41 9.58l-9-9A1.987 1.987 0 009 0H2a2.006 2.006 0 00-2 2v7a2 2 0 00.59 1.42l9 9A1.987 1.987 0 0011 20a1.955 1.955 0 001.41-.59l7-7A1.955 1.955 0 0020 11a2.02 2.02 0 00-.59-1.42zM11 18.01L2 9V2h7v-.01l9 9z"
        />
        <circle
          data-name="Elipse 123"
          cx={1.5}
          cy={1.5}
          r={1.5}
          transform="translate(3 3)"
        />
      </g>
    </svg>
  )
}
