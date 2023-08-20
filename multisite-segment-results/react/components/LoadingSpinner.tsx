import { Spinner } from 'vtex.styleguide'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
        <span className="dib c-muted-1">
            <Spinner color="currentColor" size={20} />
        </span>
    </div>
  )
}