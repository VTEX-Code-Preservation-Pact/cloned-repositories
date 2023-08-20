import React from 'react'

interface Props {
  fill: string
}

export const Pickup = (props: Props) => {
  const { fill } = props

  return (
    <svg
      id="Icon_tienda"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="24"
      viewBox="0 -2 16 16"
    >
      <rect
        id="Rectángulo_2110"
        data-name="Rectángulo 2110"
        width="16"
        height="16"
        fill="none"
      />
      <g id="Grupo_4721" data-name="Grupo 4721" transform="translate(1 2)">
        <g id="Grupo_4720" data-name="Grupo 4720" transform="translate(0 0)">
          <path
            id="Trazado_5979"
            data-name="Trazado 5979"
            d="M13.266,6.752A.179.179,0,0,1,13.14,6.7L6.722.418.3,6.7a.179.179,0,0,1-.251,0,.171.171,0,0,1,0-.246L6.6.049a.186.186,0,0,1,.251,0l6.544,6.406a.171.171,0,0,1,0,.246.179.179,0,0,1-.125.051"
            transform="translate(0 0)"
            className={fill}
          />
          <path
            id="Trazado_5980"
            data-name="Trazado 5980"
            d="M12.555,15.753H9.4a.176.176,0,0,1-.177-.174V11.144h-2.9v4.435a.176.176,0,0,1-.177.174H2.982a.175.175,0,0,1-.177-.174V8.049a.177.177,0,0,1,.355,0V15.4h2.8V10.97A.176.176,0,0,1,6.14,10.8H9.4a.176.176,0,0,1,.179.174V15.4h2.8V8.049a.177.177,0,0,1,.355,0v7.53a.175.175,0,0,1-.177.174"
            transform="translate(-1.046 -3.042)"
            className={fill}
          />
        </g>
      </g>
    </svg>
  )
}
