import * as React from 'react'

interface Props {
  fill: string
  height?: number
  width?: number
}

export const MyData = (props: Props) => {
  const { fill, height = 18, width = 18 } = props

  return (
    <svg
      id="Icon_misdatos"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
    >
      <rect
        id="Rectángulo_2145"
        data-name="Rectángulo 2145"
        width={width}
        height={height}
        fill="none"
      />
      <g
        id="Grupo_4799"
        data-name="Grupo 4799"
        transform="translate(2.536 2.375)"
      >
        <g id="Grupo_4798" data-name="Grupo 4798" transform="translate(0 0)">
          <path
            id="Trazado_6022"
            data-name="Trazado 6022"
            d="M13.117,14.329H.181a.19.19,0,0,1-.181-.2V.2A.19.19,0,0,1,.181,0H13.117A.19.19,0,0,1,13.3.2V14.131a.189.189,0,0,1-.181.2m-12.754-.4H12.936V.4H.363Z"
            transform="translate(0 0)"
            className={fill}
          />
          <path
            id="Trazado_6023"
            data-name="Trazado 6023"
            d="M7.54,6.94H2.653a.181.181,0,0,1,0-.363H7.54a.181.181,0,0,1,0,.363"
            transform="translate(-0.891 -2.371)"
            className={fill}
          />
          <path
            id="Trazado_6024"
            data-name="Trazado 6024"
            d="M12.256,9.49h-9.6a.181.181,0,0,1,0-.363h9.6a.181.181,0,0,1,0,.363"
            transform="translate(-0.891 -3.291)"
            className={fill}
          />
          <path
            id="Trazado_6025"
            data-name="Trazado 6025"
            d="M7.54,12.041H2.653a.181.181,0,0,1,0-.363H7.54a.181.181,0,0,1,0,.363"
            transform="translate(-0.891 -4.211)"
            className={fill}
          />
          <path
            id="Trazado_6026"
            data-name="Trazado 6026"
            d="M7.54,17.142H2.653a.181.181,0,0,1,0-.363H7.54a.181.181,0,0,1,0,.363"
            transform="translate(-0.891 -6.05)"
            className={fill}
          />
          <path
            id="Trazado_6027"
            data-name="Trazado 6027"
            d="M12.256,14.591h-9.6a.181.181,0,0,1,0-.363h9.6a.181.181,0,0,1,0,.363"
            transform="translate(-0.891 -5.13)"
            className={fill}
          />
          <path
            id="Trazado_6028"
            data-name="Trazado 6028"
            d="M15.013,4.367a.829.829,0,1,1,.829-.829.829.829,0,0,1-.829.829m0-1.565a.736.736,0,1,0,.735.736.737.737,0,0,0-.735-.736"
            transform="translate(-5.115 -0.976)"
            className={fill}
          />
          <path
            id="Trazado_6029"
            data-name="Trazado 6029"
            d="M15.929,6.971H13.893a.047.047,0,0,1-.047-.047v-.7a1.065,1.065,0,0,1,2.13,0v.7a.047.047,0,0,1-.047.047M13.94,6.877h1.942V6.221a.971.971,0,0,0-1.942,0Z"
            transform="translate(-4.993 -1.859)"
            className={fill}
          />
        </g>
      </g>
    </svg>
  )
}
