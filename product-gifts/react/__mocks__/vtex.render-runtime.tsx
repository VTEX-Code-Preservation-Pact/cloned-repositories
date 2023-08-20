import React from 'react'

export const Link = ({ to, className, children }: any) => (
  <a className={className} href="https://storetheme.vtex.com">
    {`This is a link to: ${to}`}
    {children}
  </a>
)
