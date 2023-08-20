export const useScript = async (url: string, type: string) =>
  new Promise((resolve, reject) => {
    let ready = false

    if (!document) {
      reject(new Error('Document is not defined'))
    }

    if (type === 'script') {
      const script = document.createElement('script')

      script.src = url
      script.async = true
      script.charset = 'UTF-8'

      script.onload = function () {
        if (
          !ready &&
          (!(this as any).readyState || (this as any).readyState === 'complete')
        ) {
          ready = true
          resolve(script)
        }
      }

      script.onerror = (msg) => {
        console.error(msg)
        reject(new Error('Error loading script.'))
      }

      script.onabort = (msg) => {
        console.error(msg)
        reject(new Error('Script loading aboirted.'))
      }

      document.head.appendChild(script)
    } else {
      const link = document.createElement('link')

      link.href = url
      link.rel = 'stylesheet'
      link.type = 'text/css'

      document.head.appendChild(link)
    }
  })
