import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, withRuntimeContext } from 'render'
import { Button, Tab, Tabs } from 'vtex.styleguide'

interface NavigationProps {
  edition: string
  currentPage: string
  setPage: (url: string) => void
}

export default class Navigation extends Component<NavigationProps> {
  public render() {
    const { edition, currentPage, setPage, state } = this.props

    return (
      <div className="relative mw7 center mt7">
        <Tabs>
          <Tab label="Projects" active={currentPage === 'formula/projects/list'} onClick={() => setPage('formula/projects/list')} />
          <Tab label="Finalists" active={currentPage === 'formula/projects/finalists'} onClick={() => setPage('formula/projects/finalists')} />
        </Tabs>

        {state === 'REGISTRATION' || state === 'RUNNING' ?
        <Link page="formula/projects/detail" params={{edition, id: 'new'}} className="absolute" style={{right: '0em', bottom: '1em'}}>
          <Button size="small" className="pb4">
            <FormattedMessage id="formula.newProject" />
          </Button>
        </Link>
        :null}
      </div>
    )
  }
}
