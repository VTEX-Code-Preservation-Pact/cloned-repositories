import React, { FunctionComponent } from 'react'

const Video: FunctionComponent = () => (
  <section className="mv7 flex justify-center items-center">
    <iframe
      className="w-70-l w-90 vh-75"
      src="https://www.youtube.com/embed/vO7Kdg4qs34"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope;"
      allowFullScreen
    />
  </section>
)

export default Video
