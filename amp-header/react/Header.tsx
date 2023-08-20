import React from 'react'
import { IconSearch } from 'vtex.store-icons'
import { ExtensionPoint } from 'vtex.render-runtime'

const Header = () => {
  return (
    <React.Fragment>
      <header className="ph5 w-100 flex center justify-center pb4 pv2 bb bw1 b--muted-4">
        <div className="flex-wrap flex w-100 justify-between items-center">
          <ExtensionPoint id="category-menu" />
          <a className="pl3" href="/">
            store theme
          </a>
          <div className="ml-auto">
            <IconSearch />
          </div>
          <input
            className="w-100 ma0 border-box bw1 br2  b--solid outline-0 c-on-base bg-base b--muted-4 hover-b--muted-3 f5 pv4 ph6 pr8"
            type="text"
            placeholder="Buscar"
          />
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
