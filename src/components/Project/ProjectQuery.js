import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Typography from 'material-ui/Typography'

class AllProjects extends Component {
    render () {
        const { children, allProjectsQuery } = this.props
        return (
            <div>
            { allProjectsQuery.loading === true ?
                <Typography>Loading...</Typography> :
                React.cloneElement(children, { projects: allProjectsQuery.allProjects })                
            }
            </div>
        )
    }
}

class UserProjects extends Component {
    render () {
        const { children, userProjectsQuery } = this.props
        return (
            <div>
            { userProjectsQuery.loading === true ?
                <Typography>Loading...</Typography> :
                React.cloneElement(children, { projects: userProjectsQuery.allProjects })                
            }
            </div>
        )
    }
}

class ProjectById extends Component {
    render () {
        const { children, projectByIdQuery } = this.props
        return (
            <div>
            { projectByIdQuery.loading === true ?
                <Typography>Loading...</Typography> :
                React.cloneElement(children, { project: projectByIdQuery.Project })                
            }
            </div>
        )
    }
}

const ALL_PROJECTS_QUERY = gql`
query allProjectsQuery {
    allProjects {
        id
        name
        description
        author {
            id
            name
        }
    }
}
`

const USER_PROJECTS_QUERY = gql`
query userProjectsQuery($userId: ID!) {
    allProjects(filter: { author: { id: $userId }}) {
        id
        name
        description
        author {
            id
            name
        }
    }
}
`

const PROJECT_BY_ID_QUERY = gql`
query projectById($projectId: ID!) {
    Project(id: $projectId) {
        id
        name
        description
        author {
            id
            name
        }
    }
}
`

export const AllProjectsQuery = graphql(ALL_PROJECTS_QUERY, { name: 'allProjectsQuery' })(AllProjects)
export const UserProjectsQuery = graphql(USER_PROJECTS_QUERY, { name: 'userProjectsQuery' }, { options: ({ userId }) => { variables: { userId } } })(UserProjects)
export const ProjectByIdQuery = graphql(PROJECT_BY_ID_QUERY, { name: 'projectByIdQuery' }, { options: ({ projectId }) => { variables: { projectId } } })(ProjectById)