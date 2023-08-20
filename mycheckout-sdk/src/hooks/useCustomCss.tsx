import { useEffect, useState } from 'react'

const useCustomCss = (account: string, sandbox: boolean) => {
  const _CSSProp = `https://d3pdfqr5jxqzs1.cloudfront.net/${account}-vtex-mc.css`
  const _CSSDev = `https://mycheckout-custom-css-qa.s3.amazonaws.com/${account}-vtex-mc.css`
  const [customCss, setCustomCss] = useState(false)

  useEffect(() => {
    if (!customCss) {
      const css = document.createElement('link')

      css.rel = 'stylesheet'
      css.type = 'text/css'
      css.href = sandbox ? _CSSDev : _CSSProp
      css.id = 'custom-css-mc'

      document.head.appendChild(css)

      if (document.getElementById('custom-css-mc')) setCustomCss(true)
    }
  }, [])
}

export default useCustomCss
