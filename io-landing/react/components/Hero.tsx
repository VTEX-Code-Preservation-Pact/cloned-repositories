import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

import Brands from '../images/Brands.svg'
import { Link } from 'vtex.render-runtime'

const Hero: FunctionComponent = () => {
  return (
    <section
      className="mb5 pt6 pb8 bg-base--inverted c-on-base--inverted flex flex-column items-center justify-center"
      style={{ backgroundImage: `url(${Brands})` }}
    >
      <p
        className="tc w-40-ns mb0 mt10 t-heading-1"
        style={{ fontSize: '5rem' }}
      >
        <FormattedMessage id="io.hero.globalbrands" />
      </p>
      <p className="w-40 t-body tc mv6">
        <FormattedMessage id="io.hero.resources" />
      </p>
      <div className="mt5">
        <Link to="/docs/getting-started/build-stores-with-store-framework/1">
          <Button variation="primary">
            <p className="ttu">
              <FormattedMessage id="io.hero.cta" />
            </p>
          </Button>
        </Link>
      </div>
      <a
        className="tc c-on-base--inverted mt5 t-small"
        href="https://www.vtex.com/partner/program/"
      >
        <FormattedMessage id="io.hero.partners" />
      </a>
    </section>
  )
}

export default Hero
