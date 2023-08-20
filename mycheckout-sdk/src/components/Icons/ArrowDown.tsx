import React from 'react'

interface Props {
  fill?: string
  width?: number
  height?: number
}

export function ArrowDown({ fill, height = 24, width = 24 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
    >
      <path
        d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"
        className={fill}
      />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  )
}
