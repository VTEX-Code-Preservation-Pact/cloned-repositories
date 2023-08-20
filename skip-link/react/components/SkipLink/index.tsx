import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import styles from './skiplink.module.css'

const CSS_HANDLES = ['skiplink']

function onClick() {
  var a = window.document.getElementById('skip-link-anchor');
  a?.scrollIntoView(!0);
  a?.focus();
}

function onKeyUp(c: any) {
  13 === c.keyCode && onClick()
}

function SkipLinkAnchor() {
  const { handles } = useCssHandles(CSS_HANDLES)
  return (
    <FormattedMessage id="store/skip-link-text">
      {message => <a id='skip-link' style={{ 'position': 'absolute', 'zIndex': -1 }} tabIndex={1} className={`${styles.skiplink} ${handles.skiplink}`} onClick={onClick} onKeyUp={onKeyUp}>{message}</a>}
    </FormattedMessage>
  )
}

export default SkipLinkAnchor
