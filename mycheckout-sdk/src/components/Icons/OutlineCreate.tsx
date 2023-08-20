import * as React from 'react'

type Props = {
  className?: string
  theme?: string
  fill?: string
  onClick?: () => void
}

export function OutlineCreate(props: Props) {
  const { className, theme, fill } = props

  const newFill = fill || (theme === 'generic' ? '#919191' : '#284859')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
      className={className}
    >
      <defs>
        <style>{`.prefix__b{fill:${fill}}`}</style>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        // className="prefix__b"
        fill={newFill}
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06.92.92zM20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a1 1 0 000-1.41z"
      />
    </svg>
  )
}
