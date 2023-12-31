import React, { FunctionComponent, useState } from 'react'
import { IconBars } from 'vtex.styleguide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

import Logo from '../images/tetrix_logo.svg'

const Nav: FunctionComponent = () => {
  const [openNav, setOpenNav] = useState(false)

  return (
    <nav className="flex">
      <div className="c-on-emphasis w-100 flex flex-column flex-row-l justify-between">
        <div className="flex flex-column items-center">
          <img src={Logo} className="h3-l" alt="TETRIX - O DESAFIO" />
          <button
            className="dn-l c-on-base w-33 mv7 bg-0 bn bg-transparent"
            onClick={() => setOpenNav(!openNav)}
          >
            <IconBars />
          </button>
        </div>
        <div className="flex-l" hidden={!openNav}>
          <div className="flex flex-column flex-row-l justify-center list mt0 items-center mb0">
            <p className="mh5-l mv5 mv0-l">
              <a className="link c-on-emphasis" href="https://tetrix.vtex.com">
                <strong>HOME</strong>
              </a>
            </p>
            <p className="mh5-l mv5 mv0-l bold">
              <a className="link c-on-emphasis" href="#about">
                <strong>O QUE É?</strong>
              </a>
            </p>
            <p className="mh5-l mv5 mv0-l bold">
              <a
                className="link c-on-emphasis"
                href="https://drive.google.com/file/d/1F3z9SdkM_ze1tnrwTf-FTR1xJ-WJ5BHc/view?usp=sharing"
              >
                <strong>REGRAS</strong>
              </a>
            </p>
            <p className="mh5-l mv5 mv0-l bold">
              <a className="link c-on-emphasis" href="#prize">
                <strong>PRÊMIO</strong>
              </a>
            </p>
            <p className="mh5-l mv5 mv0-l bold">
              <a className="link c-on-emphasis" href="#faq">
                <strong>FAQ</strong>
              </a>
            </p>
            <a
              className="link c-on-emphasis mh5-l mv5"
              href="https://www.facebook.com/desafiotetrix/"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              className="link c-on-emphasis mh5-l mv5"
              href="https://www.instagram.com/desafiotetrix/"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
