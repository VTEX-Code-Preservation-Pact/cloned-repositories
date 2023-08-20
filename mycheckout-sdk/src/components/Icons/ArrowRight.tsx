import * as React from 'react'

interface Props {
  fill: string
  width?: number
  height?: number
}

export function ArrowRight(props: Props) {
  const { fill, width = 16, height = 16 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 620 620"
    >
      <g
        xmlns="http://www.w3.org/2000/svg"
        transform="translate(0.000000,622.000000) scale(0.100000,-0.100000)"
        className={fill}
        stroke="none"
      >
        <path d="M1211 5927 c-53 -20 -111 -76 -137 -131 -43 -91 -27 -189 40 -262 25 -26 490 -344 1186 -810 1665 -1116 2243 -1505 2258 -1519 11 -10 -299 -246 -1630 -1244 -904 -677 -1655 -1241 -1670 -1253 -48 -41 -73 -105 -73 -183 1 -45 7 -81 17 -100 23 -42 83 -100 127 -121 53 -26 145 -25 201 3 39 20 3515 2626 3611 2708 51 43 75 83 89 146 17 78 -4 150 -62 212 -27 28 -425 302 -1053 724 -555 374 -1374 925 -1820 1225 -445 300 -834 560 -863 578 -44 27 -66 33 -120 36 -39 2 -81 -2 -101 -9z" />
      </g>
    </svg>
  )
}
