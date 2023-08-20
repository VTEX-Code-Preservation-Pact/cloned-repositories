import React, { Component } from 'react'
import { Query } from 'react-apollo'

import ProfileQuery from './queries/profile.graphql'

import Header from './components/Header'
import Loading from './components/Loading'
import Timer from './components/Timer'

interface ProjectsData {
  params: {
    edition: string
  }
}

export default class ProjectTemplate extends Component<{} & ProjectsData> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { params: { edition } } = this.props
    return (
      <Query query={ProfileQuery} ssr={false}>
        {({ loading, error, data }) => {
          let errorMsg

          if (error) {
            const { graphQLErrors } = error
            const authError = graphQLErrors && graphQLErrors.length > 0 && graphQLErrors.find((e: any) => e.extensions.code === 'UNAUTHENTICATED')
            const forbiddenError = graphQLErrors && graphQLErrors.length > 0 && graphQLErrors.find((e: any) => e.extensions.code === 'FORBIDDEN')
            if (authError) {
              window.location.href = '/_v/auth-server/v1/login?ReturnUrl=' + encodeURIComponent('/formula/2018.10/projects')
              errorMsg = <div>Redirecting to login...</div>
            } else if (forbiddenError) {
              errorMsg = <div>Oops :( Formula is a VTEX-only event. Sorry!</div>
            }
          }

          const firstName = data && data.profile && data.profile.name
            ? data.profile.name.split(' ')[0]
            : ''

          return (
            <div>
              <Header name={firstName} onLogout={this.logout} />
              {!loading && !errorMsg && <Timer edition={edition}/>}
              {loading
                ? <Loading />
                : errorMsg
                  ? <div className="flex center justify-center pa8">{errorMsg}</div>
                  : this.props.children}
            </div>
          )
        }}
      </Query>
    )
  }

  private logout = () => {
    window.location.href = '/admin/logout?redirectUrl=/formula'
  }
}
