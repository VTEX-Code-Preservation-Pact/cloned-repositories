import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Link } from 'render'
import { Button, Spinner } from 'vtex.styleguide'

import JoinProjectMutation from '../queries/joinProject.graphql'
import LeaveProjectMutation from '../queries/leaveProject.graphql'
import ProjectsQuery from '../queries/projects.graphql'
import voteMutation from '../queries/vote.graphql'

interface ProjectCardProps {
  email: string
  hasTeam: boolean
}

function getVoteClass(value, current, state, voting) {
  const activeClasses = 'br-pill bg-emphasis c-on-base--inverted flex items-center justify-center fw3 f4 mr4-ns' + (state === 'RESULTS' ? ' bg-muted-2' : '')
  const inactiveClasses = 'br-pill bg-base ba b--muted-3 c-muted-3 flex items-center justify-center fw3 f4 mr4-ns'
  let classes = value >= current ? activeClasses : inactiveClasses
  if (state === 'VOTING' && !voting) {
    classes += ' pointer'
  }
  return classes
}

export default class ProjectCard extends Component<ProjectCardProps & Project> {
  constructor(props: any) {
    super(props)

    this.state = {
      votingCriteria: null,
      votingScore: null
    }
  }

  public render() {
    const { id, edition, name, description, owner, demoURL, team, email, hasTeam, vote, state} = this.props

    const refetchProjectsQuery = {
      query: ProjectsQuery,
      variables: {
        edition,
      }
    }

    const isOwner = owner === email

    const isInTeam = team && team.find((t) => t.email === email)

    const joinOrLeave = isInTeam ? (
      <Mutation mutation={LeaveProjectMutation} refetchQueries={[refetchProjectsQuery]}>
        {(leaveProject) => {
          return (
            <Button onClick={() => leaveProject({variables: {edition, id}})}>
              <FormattedMessage id="formula.leave" />
            </Button>
          )
        }}
      </Mutation>
    ) : !hasTeam ? (
      <Mutation mutation={JoinProjectMutation} refetchQueries={[refetchProjectsQuery]}>
        {(joinProject) => {
          return (
            <Button onClick={() => joinProject({variables: {edition, id}})}>
              <FormattedMessage id="formula.join" />
            </Button>
          )
        }}
      </Mutation>
    ) : null

    return (
      <div className="bg-base ma5 ba1 b-dark-silver center mw7 pa7 mt7 br2">
        <div className="inline-flex w-100">
          <div className="w-100">
            <div className="flex justify-between items-center pb6 w-100">
              <div className="f4 fw5 pb3">{name}</div>
              {state === 'REGISTRATION' || state === 'RUNNING' || state === 'VOTING' ?
              <div className="h1">
                <Link page="formula/projects/detail" params={{edition, id}}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="16" height="16" fill="white"/>
                  <path d="M2 14.5H14" stroke="#f71963" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.1429 1.5L12.7143 4.1L5.42857 11.4667L2 12.3333L2.85714 8.86667L10.1429 1.5Z" stroke="#f71963" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.42859 3.2334L11 5.8334" stroke="#f71963" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              : null}
            </div>
            <div className="f5 bb b--muted-5 mb7 pb7 fw3 lh-copy">{description}</div>
            {demoURL && <div className="f5 bb b--muted-5 mb7 pb7 fw3 lh-copy">
              <a className="link c-emphasis" href={demoURL} target="__blank">
                <FormattedMessage id="formula.viewDemo"/>
              </a>
            </div>}
          </div>
        </div>
        {state !== 'VOTING' ? <section>
          <div className="f4 fw5"><FormattedMessage id="formula.team" /></div>
          <ul className="list pl0 mb7 lh-copy">
            {team && team.map((u) => <li key={u.id}>{u.name} - {u.email}</li>)}
          </ul>
        </section> : null}
        {state === 'REGISTRATION' || state === 'RUNNING' ? !isOwner && joinOrLeave : null}

        {state === 'VOTING' || state === 'RESULTS' ?
        <div>
          <div className="flex justify-between fw7">
            <div>Evaluation</div>
            <div>Total Score: {vote.relevance + vote.execution}</div>
          </div>
          <div className="pt6">
            <div className="c-muted-2 f5">
              Criteria #1
            </div>
            <div className="f6 pt3">
              Project impact on VTEX
            </div>
          </div>
          <div className="flex mt7 w-100 bb b--muted-5 pb7 justify-start-ns justify-between">
            <Mutation mutation={voteMutation} refetchQueries={[refetchProjectsQuery]} awaitRefetchQueries>
              {(updateVote) => (
                <Fragment>
                  {[1,2,3,4,5].map(this.renderVotingCriteria('relevance', updateVote))}
                </Fragment>
              )}
            </Mutation>
          </div>
          <div className="pt6">
            <div className="c-muted-2 f5">
              Criteria #2
            </div>
            <div className="f6 pt3">
              Project quality level
            </div>
          </div>
          <div className="flex mt7 w-100 justify-start-ns justify-between">
            <Mutation mutation={voteMutation} refetchQueries={[refetchProjectsQuery]} awaitRefetchQueries>
              {(updateVote) => (
              <Fragment>
                {[1,2,3,4,5].map(this.renderVotingCriteria('execution', updateVote))}
              </Fragment>
              )}
            </Mutation>
          </div>
        </div> : null}
      </div>
    )
  }

  private renderVotingCriteria = (criteria: string, updateVote: any) => (idx: number) => {
    const {state, vote, edition, id} = this.props
    const votingCriteria = this.state.votingCriteria === criteria
    const votingScore = this.state.votingScore

    const handleVoteClick = () => {
      if (this.state.votingCriteria || state !== 'VOTING') {
        return null
      }
      this.setState({
        votingCriteria: criteria,
        votingScore: idx,
      })
      return updateVote({variables: {
        edition,
        id,
        ...vote,
        [criteria]: idx,
      }}).then(() => {
        this.setState({
          votingCriteria: null,
          votingScore: null,
        })
      })
    }

    return (
      <div
        key={`relevance-${idx}`}
        className={getVoteClass(votingCriteria ? votingScore - 1 : vote[criteria], idx, state, votingCriteria)}
        style={{ width: '48px', height: '48px' }}
        onClick={handleVoteClick}>
        {votingCriteria && votingScore === idx ? <Spinner /> : idx}
      </div>
    )
  }
}
