import * as React from 'react'

interface Props {
  fill: string
  background: string
  backgroundSecondary: string
}

export function Delete(props: Props) {
  const { fill, background, backgroundSecondary } = props

  return (
    <svg
      id="Element-eliminarx"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <style>{`.del{fill-rule:evenodd;}`}</style>
      </defs>
      <circle
        id="Elipse_173"
        data-name="Elipse 173"
        cx="12"
        cy="12"
        r="12"
        className={backgroundSecondary}
      />
      <g id="icon_close-o" data-name="icon / close-o">
        <rect
          id="Rectángulo_1735"
          data-name="Rectángulo 1735"
          width="24"
          height="24"
          className={background}
        />
        <g
          id="Grupo_1275"
          data-name="Grupo 1275"
          transform="translate(3.75 3.75)"
        >
          <path
            id="Trazado_291"
            data-name="Trazado 291"
            d="M14.09,8.827a.75.75,0,0,0-1.023-1.1L10.873,9.776,8.827,7.581A.75.75,0,0,0,7.73,8.6L9.776,10.8,7.581,12.844a.75.75,0,1,0,1.023,1.1L10.8,11.9l2.045,2.195a.75.75,0,1,0,1.1-1.023L11.9,10.873Z"
            transform="translate(-2.586 -2.586)"
            className={fill}
          />
          <path
            id="Trazado_292"
            data-name="Trazado 292"
            d="M1,9.25A8.25,8.25,0,1,1,9.25,17.5,8.25,8.25,0,0,1,1,9.25ZM9.25,16A6.75,6.75,0,1,1,16,9.25,6.75,6.75,0,0,1,9.25,16Z"
            transform="translate(-1 -1)"
            className={`del ${fill}`}
          />
        </g>
      </g>
    </svg>
  )
}
