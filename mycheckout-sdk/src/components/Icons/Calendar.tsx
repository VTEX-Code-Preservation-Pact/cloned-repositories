import * as React from 'react'

interface Props {
  fill: string
  width?: string
  height?: string
}

export const Calendar = (props: Props) => {
  const { fill, width = '20.797', height = '20.544' } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20.797 20.544"
    >
      <defs>
        <clipPath>
          <rect
            id="Rectángulo_2099"
            data-name="Rectángulo 2099"
            width="20.797"
            height="20.544"
            transform="translate(0 0)"
            className={fill}
          />
        </clipPath>
      </defs>
      <g id="Grupo_4689" data-name="Grupo 4689" transform="translate(0 0)">
        <g id="Grupo_4686" data-name="Grupo 4686">
          <path
            id="Trazado_5967"
            data-name="Trazado 5967"
            d="M4.847.284V2.161H.283A.284.284,0,0,0,0,2.445V20.261a.284.284,0,0,0,.283.284H20.514a.284.284,0,0,0,.283-.284V2.445a.284.284,0,0,0-.283-.284H15.805V.284a.284.284,0,1,0-.567,0V2.161H5.414V.284a.284.284,0,1,0-.567,0M20.23,19.978H.566V5.527H20.23ZM5.414,3.968V2.728h9.824v1.24a.284.284,0,0,0,.567,0V2.728H20.23V4.96H.567V2.728h4.28v1.24a.284.284,0,0,0,.567,0"
            className={fill}
          />
        </g>
      </g>
    </svg>
  )
}
