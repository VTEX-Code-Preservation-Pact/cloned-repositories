import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { withRuntimeContext } from 'render'

import FinalistsList from './components/FinalistsList'
import Loading from './components/Loading'
import Navigation from './components/Navigation'
import ProjectsList from './components/ProjectsList'

import InfoQuery from './queries/info.graphql'

interface ProjectsData {
  params: any
}

class FormulaEdition extends Component<RuntimeProps & ProjectsData> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { params: { edition }, runtime } = this.props

    return (
      <Query query={InfoQuery} ssr={false} variables={{ edition }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />
          }

          const state = data.info.status || 'REGISTRATION'

          return (
            <Fragment>
              <Navigation edition={edition} state={state} setPage={(page) => runtime.navigate({page, params: {edition}})} currentPage={runtime.page} />
              {runtime.page === 'formula/projects/list' ? <ProjectsList state={state} edition={edition} /> : <FinalistsList state={state} edition={edition} />}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default withRuntimeContext(FormulaEdition)
