import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import Project from './Project'

const css = {
    container: {
        position: 'relative',
        marginTop: '30px',
        padding: '0 10vw'
    },
    fab: {
        position: 'absolute',
        top: '-58px',
        right: '58px'
    }
}

const projects = {
    ['1']: { id: 1, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 },
    ['2']: { id: 2, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 },
    ['3']: { id: 3, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 },
    ['4']: { id: 4, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 },
    ['5']: { id: 5, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 }
}

class ProjectScreen extends Component {
    handleCreateProject (authorId, name) {
        this.props.createProjectMutation({ variables: { authorId, name } })
        .then(({ data }) => {
            console.info('project ' + name + ' created! (id=' + data.id + ')')
        }) 
        .catch(error => {
            console.error(error)
        })
    }

    render () {
        const { login } = this.props
        return (
            <div style={ css.container }>
                <Button onClick={ () => this.handleCreateProject(login.id, "Nouveau projet") } fab color='accent' style={ css.fab }><AddIcon /></Button>
            { 
                Object.values(projects).map(project => (
                    <Project key={ project.id } project={ project } />
                ))
            }
            </div>
        )
    }
}

const CREATE_PROJECT_MUTATION = gql`
mutation CreateProjectMutation($authorId: String!, $name: String!) {
  createProject(
    authorId: $authorId,
    name: $name
  ) {
    id
  }
}
`

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(compose(
    graphql(CREATE_PROJECT_MUTATION, { name: 'createProjectMutation' })
)(ProjectScreen))