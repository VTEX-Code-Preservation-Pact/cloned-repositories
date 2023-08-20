import * as React from 'react'

export function Error(props: React.SVGProps<SVGSVGElement>) {
  const { width = 20, height = 20 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <style>{'.a{fill:#cb4242;}.b{fill:#fff;}.c{fill:none;}'}</style>
      </defs>
      <circle className="a" cx="12" cy="12" r="12" />
      <g transform="translate(1 1)">
        <path
          className="b"
          d="M17.833,6.293,16.541,5l-5.124,5.124L6.293,5,5,6.293l5.124,5.124L5,16.541l1.293,1.293,5.124-5.124,5.124,5.124,1.293-1.293-5.124-5.124Z"
          transform="translate(-0.417 -0.417)"
        />
        <path className="c" d="M0,0H22V22H0Z" />
      </g>
    </svg>
  )
}
