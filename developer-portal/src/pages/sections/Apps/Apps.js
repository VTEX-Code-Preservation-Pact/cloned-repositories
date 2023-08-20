import React from 'react'
import SectionImage from '../../../components/SectionImage/SectionImage'
import AppApi from '../../../../static/img/apps-api.jpeg'

const Apps = () => {
  return (
    <section className="container">
      <SectionImage
        tag="APPS AND INTEGRATIONS"
        title="Easily build and sell solutions through our exclusive App Store."
        description="Easily build and sell solutions through our exclusive App Store."
        linkTo="/apps/overview"
        message="Learn More"
        img={AppApi}
      />
    </section>
  )
}

export default Apps
