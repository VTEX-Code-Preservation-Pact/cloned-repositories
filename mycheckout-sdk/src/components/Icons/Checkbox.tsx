import * as React from 'react'

interface Props {
  checked: boolean
  fill: string
}

export function CheckboxIcon(props: Props) {
  const { checked, fill } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <style>{`.ca,.cc{fill:#fff;}.ca{opacity:0;}.cb{fill:${fill};}.cd{fill:#fff;stroke:#707685;stroke-miterlimit:10;}`}</style>
      </defs>
      <rect className="ca" width="24" height="24" />
      <g transform="translate(4.5 4.5)">
        <rect className={checked ? 'cb' : 'cd'} width="20" height="20" rx="2" />
      </g>
      <path
        className="cc"
        d="M10.586,13.414,7.757,10.586,6.343,12l4.243,4.243,7.071-7.071L16.243,7.757Z"
        transform="translate(-0.344 0.243)"
      />
    </svg>
  )
}
