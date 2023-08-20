import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { withRuntimeContext } from 'render'
import { PageHeader } from 'vtex.styleguide'

import ProjectDetailQuery from './queries/project.graphql'

import Loading from './components/Loading'
import ProjectForm from './components/ProjectForm'

interface ProjectsData {
  data: any
  params: any
}

interface ProjectState {
  project: Project
}

class ProjectDetail extends Component<ProjectsData & RuntimeProps, ProjectState> {
  constructor(props: any) {
    super(props)

    this.state = {
      project: props.data && props.data.project || {}
    }
  }

  public render() {
    const { params: { edition, id }, runtime } = this.props

    return (
      <Query query={ProjectDetailQuery} skip={id === 'new'} variables={{edition, id}}>
        {({ loading, error, data = {} }) => {
          return (
            <div className="pa7 bg-white mw7 center">
              {loading ? <Loading /> : (
                <Fragment>
                  <PageHeader
                    title={<FormattedMessage id="formula.projectDetails" />}
                    linkLabel={<FormattedMessage id="formula.back" />}
                    onLinkClick={() => {
                      runtime.navigate({page: 'formula/projects/list', params: {edition}})
                    }}
                  />
                  <ProjectForm initialProject={data.project} edition={edition} email={data.profile && data.profile.email}/>
                </Fragment>
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withRuntimeContext(ProjectDetail)
