import type { PropsWithChildren } from 'react'
import React from 'react'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { Container } from 'vtex.store-components'

interface Props {
  /** Define if the row should take the full width of its container */
  fullWidth?: boolean
  /** Define if background and text colors should be inverted */
  inverted?: boolean
  blockClass?: string
}

const CSS_HANDLES = ['rowContainer', 'row', 'rowContentContainer'] as const

function Row({ children, fullWidth, inverted }: PropsWithChildren<Props>) {
  const { handles } = useCssHandles(CSS_HANDLES)

  const content = (
    <div className={`${handles.rowContainer} w-100 flex items-center`}>
      {children}
    </div>
  )

  return (
    <div
      className={classNames(
        handles.row,
        'w-100',
        inverted ? 'bg-base--inverted c-on-base--inverted' : 'bg-base c-on-base'
      )}
    >
      {fullWidth ? (
        content
      ) : (
        <Container className={`${handles.rowContentContainer} w-100 flex`}>
          {content}
        </Container>
      )}
    </div>
  )
}

Row.schema = {
  title: 'admin/editor.row.title',
  type: 'object',
  properties: {
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
    inverted: {
      title: 'admin/editor.inverted.title',
      description: 'admin/editor.inverted.description',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    fullWidth: {
      title: 'admin/editor.fullWidth.title',
      description: 'admin/editor.fullWidth.description',
      type: 'boolean',
      default: false,
      isLayout: true,
    },
  },
}

export default Row
