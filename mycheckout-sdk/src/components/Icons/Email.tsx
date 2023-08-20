import React from 'react'

interface Props {
  fill: string
  width?: string
  height?: string
  className?: string
}

export default function Email(props: Props) {
  const { className, fill, width = '24', height = '24' } = props

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 30 24"
    >
      <g
        data-name="Grupo 4868"
        id="svg_9"
        transform="matrix(0.379712 0 0 0.3926 -1.02267 -4.55776)"
      >
        <g data-name="Grupo 4866" id="svg_10">
          <path
            d="m70.67,70.29l8.52,0a1.04,1.04 0 0 0 1.04,-1.04l0,-54.21a1.04,1.04 0 0 0 -0.03,-0.15a0.96,0.96 0 0 0 -0.05,-0.23a0.89,0.89 0 0 0 -0.12,-0.2c-0.03,-0.04 -0.05,-0.09 -0.08,-0.13l-0.02,-0.01a1.06,1.06 0 0 0 -0.19,-0.14a1.47,1.47 0 0 0 -0.14,-0.09a0.99,0.99 0 0 0 -0.15,-0.04a1.13,1.13 0 0 0 -0.24,-0.05l-0.02,0l-74.15,0l-0.01,0a1.31,1.31 0 0 0 -0.25,0.05c-0.05,0.02 -0.11,0.02 -0.16,0.04a1.06,1.06 0 0 0 -0.13,0.09a1.11,1.11 0 0 0 -0.2,0.14l-0.01,0.01a0.66,0.66 0 0 0 -0.08,0.14a0.68,0.68 0 0 0 -0.12,0.2a0.81,0.81 0 0 0 -0.05,0.22a1.04,1.04 0 0 0 -0.03,0.15l0,54.2a1.04,1.04 0 0 0 1.04,1.05m71.49,-54.21l-34.42,31.8l-34.42,-31.8l68.84,0zm-35.41,52.13l-35.04,0l0,-50.8l35.33,32.64a1.03,1.03 0 0 0 0.7,0.28a1.05,1.05 0 0 0 0.7,-0.28l35.34,-32.64l0,50.8l-7.47,0"
            data-name="Trazado 6070"
            fill={fill}
            id="svg_12"
          />
        </g>
      </g>
    </svg>
  )
}
