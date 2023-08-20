import * as React from 'react'

interface Props {
  className?: string
  fill: string
  onClick?: any
}

export const LiteEdit = (props: Props) => {
  const { className, fill, onClick } = props

  return (
    <svg
      id="Icon_edit"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 20"
      onClick={onClick}
      className={className}
    >
      <rect
        id="Rectángulo_2113"
        data-name="Rectángulo 2113"
        width="24"
        height="24"
        fill="none"
      />
      <g id="Grupo_4716" data-name="Grupo 4716" transform="translate(0.474 3)">
        <g id="Grupo_4726" data-name="Grupo 4726" transform="translate(0 0)">
          <path
            id="Trazado_5972"
            data-name="Trazado 5972"
            d="M5.571,17.756a.312.312,0,0,1-.31-.292l-.223-3.594a.311.311,0,0,1,.049-.189L13.863.143a.31.31,0,0,1,.43-.092l3.588,2.325a.3.3,0,0,1,.134.2.307.307,0,0,1-.043.234L9.2,16.344a.306.306,0,0,1-.151.122l-3.363,1.27a.323.323,0,0,1-.111.02m.093-3.822.191,3.072,2.875-1.085L17.283,2.727,14.217.742Zm3.271,2.241h0Z"
            transform="translate(0.489 0)"
            className={fill}
          />
        </g>
      </g>
    </svg>
  )
}
