import React from 'react'
import SectionImage from '../../../components/SectionImage/SectionImage'
import Shopping from '../../../../static/img/shopping-experiences.jpeg'

const ShoppingExperiences = () => {
  return (
    <section className="container">
      <SectionImage
        tag="SHOPPING EXPERIENCES"
        title="Create tailor-made experiences with VTEX IO."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper congue mi, ut aliquam massa finibus at. Vestibulum consectetur aliquet magna, a semper turpis maximus eu. Proin aliquet vulputate condimentum."
        linkTo="/shopping-experiences/overview"
        message="Learn More"
        img={Shopping}
      />
    </section>
  )
}

export default ShoppingExperiences
