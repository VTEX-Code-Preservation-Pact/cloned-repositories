import * as React from 'react'

interface Props {
  theme?: string
  className?: string
}

export function OutlineCancel(props: Props) {
  const { className, theme } = props
  const fill = theme === 'generic' ? '#919191' : '#284859'

  return (
    <svg
      id="Componente-outline-delete_forever-24px"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      className={className}
    >
      <g id="Bounding_Boxes">
        <path
          id="Trazado_2320"
          data-name="Trazado 2320"
          d="M0,0H26V26H0Z"
          fill="none"
        />
      </g>
      <g id="Outline" transform="translate(5.416 3.25)">
        <g id="Grupo_46" data-name="Grupo 46">
          <path
            id="Trazado_2322"
            data-name="Trazado 2322"
            d="M16.375,4,15.292,3H9.875L8.792,4H5V6H20.167V4Z"
            transform="translate(-5 -3)"
            fill={fill}
          />
          <path
            id="Trazado_2323"
            data-name="Trazado 2323"
            d="M6,20a2.173,2.173,0,0,0,2.167,2.167h8.667A2.173,2.173,0,0,0,19,20V7H6ZM8.167,9.167h8.667V20H8.167Z"
            transform="translate(-4.917 -2.667)"
            fill={fill}
          />
        </g>
      </g>
    </svg>
  )
}
