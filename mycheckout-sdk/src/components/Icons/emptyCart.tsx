import * as React from 'react'

interface Props {
  className?: string
  fill?: string
  width?: number
  height?: number
}

export function EmptyCart({ className, fill, height = 68, width = 68 }: Props) {
  return (
    <svg
      className={className}
      height={height}
      id="Icon_carrito_vacío"
      viewBox="0 0 68 68"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Elipse_200"
        data-name="Elipse 200"
        fill="none"
        stroke="#0096c7"
        strokeWidth="1"
      >
        <circle cx="34" cy="34" r="34" stroke="none" />
        <circle cx="34" cy="34" r="33.5" fill="none" />
      </g>
      <g id="Grupo_4862" data-name="Grupo 4862" transform="translate(17 17)">
        <g id="Grupo_4859" data-name="Grupo 4859" transform="translate(0 0)">
          <path
            id="Trazado_6064"
            data-name="Trazado 6064"
            d="M15.964,15.368a.366.366,0,0,0-.529,0l-2.771,2.941a.366.366,0,1,0,.533.5l2.139-2.268V21.76a.366.366,0,0,0,.732,0V16.526l2.413,2.48a.367.367,0,0,0,.526-.511Z"
            transform="translate(8.157 9.904)"
            className={fill}
          />
          <path
            id="Trazado_6065"
            data-name="Trazado 6065"
            d="M33.65,8.1H27.886v-7a1.1,1.1,0,0,0-1.1-1.1H6.869a1.1,1.1,0,0,0-1.1,1.1v7H.467a.467.467,0,1,0,0,.933h5.3v1.247a.468.468,0,1,0,.935,0V9.034H26.953v1.247a.467.467,0,1,0,.933,0V9.034H33.65a.467.467,0,1,0,0-.933m-6.7,0H6.7V.935H26.953Z"
            transform="translate(0 -0.001)"
            className={fill}
          />
          <path
            id="Trazado_6066"
            data-name="Trazado 6066"
            d="M28.44,7.852a.467.467,0,0,0-.6.285L24.348,17.7A5.87,5.87,0,0,0,17.3,20.16H7.426L3.176,8.137a.468.468,0,0,0-.882.312L6.656,20.783a.468.468,0,0,0,.44.31h9.737a5.907,5.907,0,1,0,8.37-3l3.521-9.641a.467.467,0,0,0-.284-.6M27.3,23.249a4.974,4.974,0,1,1-4.974-4.974A4.98,4.98,0,0,1,27.3,23.249"
            transform="translate(1.472 5.079)"
            className={fill}
          />
          <path
            id="Trazado_6067"
            data-name="Trazado 6067"
            d="M8.4,16V8.212a.468.468,0,1,0-.935,0V16A.468.468,0,0,0,8.4,16"
            transform="translate(4.845 5.027)"
            className={fill}
          />
          <path
            id="Trazado_6068"
            data-name="Trazado 6068"
            d="M10.948,11.8V8.213a.468.468,0,0,0-.935,0V11.8a.468.468,0,0,0,.935,0"
            transform="translate(6.501 5.028)"
            className={fill}
          />
          <path
            id="Trazado_6069"
            data-name="Trazado 6069"
            d="M13.5,16.315v-8.1a.468.468,0,1,0-.935,0v8.1a.468.468,0,0,0,.935,0"
            transform="translate(8.157 5.028)"
            className={fill}
          />
        </g>
      </g>
    </svg>
  )
}
