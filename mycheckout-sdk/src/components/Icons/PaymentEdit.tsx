import * as React from 'react'

interface Props {
  fill: string
}

export const PaymentEdit = (props: Props) => {
  const { fill } = props

  return (
    <svg
      data-name="Icono_pagod+editar"
      xmlns="http://www.w3.org/2000/svg"
      width={32.733}
      height={28.096}
      {...props}
    >
      <g data-name="Grupo 4657">
        <path data-name="Trazado 215" d="M0 0h28.1v28.1H0Z" fill="none" />
        <path
          data-name="Trazado 216"
          d="M23.243 5.108H4.854a2.25 2.25 0 0 0-2.289 2.235l-.011 13.41a2.26 2.26 0 0 0 2.3 2.235h18.39a2.26 2.26 0 0 0 2.3-2.235V7.343a2.26 2.26 0 0 0-2.301-2.235Zm0 15.645H4.854v-6.7h18.39Zm0-11.175H4.854V7.343h18.39Z"
          className={fill}
        />
        <path
          data-name="Trazado 5938"
          d="M18.873 23.015v-3.512l9.99-9.865 3.8 3.706-9.819 9.672Z"
          fill="#fff"
        />
        <g data-name="Grupo 197" className={fill}>
          <path
            data-name="Trazado 2782"
            d="M19.335 20.242v2.791h2.791l8.231-8.231-2.791-2.791Zm2.173 1.3h-.685v-.685l6.743-6.736.685.685Z"
          />
          <path
            data-name="Trazado 2783"
            d="m32.516 11.594-1.742-1.741a.746.746 0 0 0-1.049 0l-1.362 1.362 2.791 2.791 1.362-1.362a.741.741 0 0 0 0-1.05Z"
          />
        </g>
      </g>
    </svg>
  )
}
