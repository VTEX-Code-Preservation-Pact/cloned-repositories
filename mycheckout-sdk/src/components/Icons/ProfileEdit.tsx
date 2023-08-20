import * as React from 'react'

interface Props {
  fill: string
}

export const ProfileEdit = (props: Props) => {
  const { fill } = props

  return (
    <svg
      data-name="Icono_datos+editar"
      xmlns="http://www.w3.org/2000/svg"
      width={31.978}
      height={28.955}
      {...props}
    >
      <path
        data-name="Trazado 381"
        d="M14.478 7.453a2.418 2.418 0 1 1-2.418 2.418 2.418 2.418 0 0 1 2.418-2.418m0 10.365c3.42 0 7.025 1.681 7.025 2.418v1.267H7.453v-1.267c0-.737 3.6-2.418 7.025-2.418m0-12.553a4.606 4.606 0 1 0 4.606 4.606 4.605 4.605 0 0 0-4.606-4.606Zm0 10.365c-3.075 0-9.213 1.543-9.213 4.606v3.455h18.426v-3.455c0-3.063-6.138-4.606-9.213-4.606Z"
        className={fill}
      />
      <path data-name="Trazado 382" d="M0 0h28.955v28.955H0Z" fill="none" />
      <path data-name="Trazado 2781" d="M11 5.478h15v15H11Z" fill="none" />
      <path
        data-name="Trazado 5937"
        d="M17.412 24.105v-3.693l10.5-10.368 3.425 3.284-10.33 10.775Z"
        fill="#fff"
      />
      <g data-name="Grupo 197" className={fill}>
        <path
          data-name="Trazado 2782"
          d="M17.897 20.685v2.933h2.933l8.65-8.65-2.933-2.933Zm2.284 1.369h-.72v-.72l7.086-7.089.72.72Z"
        />
        <path
          data-name="Trazado 2783"
          d="m31.748 11.597-1.83-1.83a.784.784 0 0 0-1.1 0l-1.434 1.431 2.933 2.933 1.431-1.431a.779.779 0 0 0 0-1.103Z"
        />
      </g>
    </svg>
  )
}
