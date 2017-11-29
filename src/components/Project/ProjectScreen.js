import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import { addProject, updateProject, deleteProject } from '../../action-creators/project'
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

class ProjectScreen extends Component {
    handleCreateProject (authorId, name) {
        const { createProjectMutation, addProject } = this.props

        createProjectMutation({ variables: { authorId, name } })
        .then(({ data }) => {
            addProject(data.createProject)
        }) 
        .catch(error => {
            console.error(error)
        })
    }

    render () {
        const { login, project } = this.props
        return (
            <div style={ css.container }>
                <Button onClick={ () => this.handleCreateProject(login.id, "Nouveau projet") } fab color='accent' style={ css.fab }><AddIcon /></Button>
            { 
                Object.values(project).map(p => (
                    <Project key={ p.id } project={ p } />
                ))
            }
            </div>
        )
    }
}

const CREATE_PROJECT_MUTATION = gql`
mutation CreateProjectMutation($authorId: ID!, $name: String!) {
  createProject(
    authorId: $authorId,
    name: $name
  ) {
    id
    name
    author {
        id
        name
    }
  }
}
`

const mapStateToProps = ({ login, project }) => ({ login, project })

export default 
    connect(mapStateToProps, { addProject, updateProject, deleteProject })(
        compose(graphql(CREATE_PROJECT_MUTATION, { name: 'createProjectMutation' }))
    (ProjectScreen))