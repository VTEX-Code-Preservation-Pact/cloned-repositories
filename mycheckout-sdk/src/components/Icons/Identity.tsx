import * as React from 'react'

interface Props {
  fill: string
}

export function Identity(props: Props) {
  const { fill } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className={fill}
        d="M12 5.9A2.1 2.1 0 119.9 8 2.1 2.1 0 0112 5.9m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4a4 4 0 104 4 4 4 0 00-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
      />
    </svg>
  )
}
