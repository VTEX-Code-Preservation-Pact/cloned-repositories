import * as React from 'react'

interface Props {
  className?: string
  fill: string
}

export const ArrowBack = (props: Props) => {
  const { className, fill } = props

  return (
    <svg
      id="Icon_back"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
    >
      <g id="Grupo_4733" data-name="Grupo 4733" transform="translate(6 8)">
        <g id="Grupo_4732" data-name="Grupo 4732">
          <path
            id="Trazado_5993"
            data-name="Trazado 5993"
            d="M.958,6.2,8.366.646A.359.359,0,1,0,7.934.072L.143,5.926l-.026.025L.1,5.969a.354.354,0,0,0-.066.1.061.061,0,0,0,0,.012A.367.367,0,0,0,0,6.2l0,.009v.009a.351.351,0,0,0,.026.117c0,.008.006.016.009.023a.357.357,0,0,0,.067.1l.015.013a.368.368,0,0,0,.042.036l8.081,5.447a.359.359,0,1,0,.4-.6L.979,6.218"
            transform="translate(0 0)"
            className={fill}
          />
        </g>
      </g>
    </svg>
  )
}
