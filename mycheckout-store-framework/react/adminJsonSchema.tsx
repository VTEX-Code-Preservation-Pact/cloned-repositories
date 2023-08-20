import React from 'react'

const AdminJsonSchema = () => {
  return (
    <div className="h-100 bg-light-silver min-vh-100 flex flex-row-reverse bg-base bb bw1 b--muted-5">
      <div
        className="center w-100 vh-100 overflow-y-auto"
        style={{ maxWidth: 320 }}
      >
        <iframe
          className="w-100 h-100"
          frameBorder="0"
          id="kuikpay-iframe"
          src="https://milwaukee-voice-jury-thought.trycloudflare.com/"
          title="kuikpay-iframe"
        />
      </div>
    </div>
  )
}

export default AdminJsonSchema
