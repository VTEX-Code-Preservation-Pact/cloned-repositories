import * as React from 'react'

export function UnfilledCheck(props: React.SVGProps<SVGSVGElement>) {
  const { fill, width = 32, height = 32 } = props

  return (
    <svg width={width} height={height} {...props} viewBox="0 0 14.45 8.866">
      <g>
        <path
          d="M14.256,0H.194A.188.188,0,0,0,0,.182v8.5a.188.188,0,0,0,.194.181H14.256a.188.188,0,0,0,.194-.181V.182A.188.188,0,0,0,14.256,0M.388,1.227H14.062v.727H.388ZM14.062.863H.388v-.5H14.062ZM.388,2.317H14.062V8.5H.388Z"
          transform="translate(0 0)"
          fill={fill}
        />
        <path
          d="M7.6,10.85H2.461a.182.182,0,1,0,0,.364H7.6a.182.182,0,1,0,0-.364"
          transform="translate(-0.715 -3.892)"
          fill={fill}
        />
      </g>
    </svg>
  )
}
