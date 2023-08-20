import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, withRuntimeContext } from 'render'
import { Button, Card } from 'vtex.styleguide'

import Header from './components/Header'
import TeamIcon from './icons/TeamIcon'
import SignupIcon from './icons/SignupIcon'
import DevelopIcon from './icons/DevelopIcon'
import AwardIcon from './icons/AwardIcon'

class IntroPage extends Component<RuntimeProps> {
  componentDidMount() {
    const { runtime: { prefetchPage } } = this.props
    prefetchPage('formula/projects')
    prefetchPage('formula/projects/list')
    prefetchPage('formula/projects/detail')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="tc f2 fw7 mt10">We know you missed Formula</div>
        <div className="flex flex-row-ns flex-column items-center justify-center-ns w-100 pv9 tc f4">
          <div className="ma6 w5">
            <Card>
              <TeamIcon height="68" />
              <div className="pv5">Create a team</div>
              <div className="f6 c-muted-2">Up to five members</div>
            </Card>
          </div>
          <div className="ma6 w5">
            <Card>
              <SignupIcon height="68" />
              <div className="pv5">Sign up</div>
              <div className="f6 c-muted-2">You have until tomorrow!</div>
            </Card>
          </div>
          <div className="ma6 w5">
            <Card>
              <DevelopIcon height="68" />
              <div className="pv5">Develop</div>
              <div className="f6 c-muted-2">Improve VTEX product</div>
            </Card>
          </div>
          <div className="ma6 w5">
            <Card>
              <AwardIcon height="68" />
              <div className="pv5">Win prizes!</div>
              <div className="f6 c-muted-2">Surprise, surprise ;)</div>
            </Card>
          </div>
        </div>
        <div className="pa8 flex center justify-center">
          <Link page="formula/projects/list" params={{edition: "2018.10"}}>
            <Button variation="primary">
              <FormattedMessage id="formula.signup"/>
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRuntimeContext(IntroPage)
