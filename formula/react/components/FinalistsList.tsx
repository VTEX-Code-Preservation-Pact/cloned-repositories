import React, { Component } from 'react'
import { Query } from 'react-apollo'

import FinalistsQuery from '../queries/finalists.graphql'

import BlockedFinalists from './BlockedFinalists'
import Loading from './Loading'
import ProjectCard from './ProjectCard'

interface ProjectsListData {
  edition: string
  state: States
}

export default class FinalistsList extends Component<ProjectsListData> {
  public count: number = 0

  public getWinnerIcon() {
    this.count++
    if (this.count === 3) { return '🥉 ' }
    if (this.count === 2) { return '🥈 ' }
    if (this.count === 1) { return '🥇 ' }

    return ''
  }

  public render () {
    const { edition, state } = this.props

    if (state !== 'RESULTS') {
      return <BlockedFinalists />
    }

    return (
      <Query query={FinalistsQuery} variables={{ edition }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />
          }

          return data.finalists.map((p: Project) =>
            <ProjectCard key={p.id} {...p} email={''} edition={edition} hasTeam={true} />
          )
        }}
      </Query>
    )
  }
}
