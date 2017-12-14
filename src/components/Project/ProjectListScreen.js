import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import ProjectCards from './ProjectCards'

class ProjectListScreen extends Component {
    getUsersQuery () {
        return this.props.allProjectsQuery
    }

    render () {
        const query = this.getUsersQuery()
        let allProjects = []
        if (query.loading === false && query.allProjects !== null) {
            allProjects = query.allProjects
        }

        return (
            <div>
                <ProjectCards projects={ allProjects } />
            </div>
        )
    }
}

const ALL_PROJECTS_QUERY = gql`
query AllProjectsQuery {
    allProjects {
        id
        name
        description
        author {
            id
            name
            email
        }
    }
}
`

export default graphql(ALL_PROJECTS_QUERY, { name: 'allProjectsQuery' })(ProjectListScreen)