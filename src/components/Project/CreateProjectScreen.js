import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import { addProject } from '../../action-creators/project'

const css = {
    container: {
        padding: '15px',
        display: 'flex',
        justifyContent: 'center'
    }
}
class CreateProjectScreen extends Component {
    state = { project: { name: '' }}

    handleCreateProject () {
        const { login, createProjectMutation, addProject } = this.props
        const { project } = this.state
        createProjectMutation({ variables: { authorId: login.id, name: project.name } })
        .then(({ data }) => {
            addProject(data.createProject)
        }) 
        .catch(error => {
            console.error(error)
        })
    }

    render () {
        const { project } = this.state
        return (
            <div style={ css.container }>
                <div>
                    <Typography type='title'>New project</Typography>
                    <TextField label='Name' value={ project.name } onChange={ (evt) => this.setState({ project: { ...project, name: evt.target.value } })} />
                    <Button color='primary'>Cancel</Button>
                    <Button raised color='accent' onClick={ () => this.handleCreateProject() }>Create</Button>
                </div>
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
    connect(mapStateToProps, { addProject })(
        compose(graphql(CREATE_PROJECT_MUTATION, { name: 'createProjectMutation' }))
    (CreateProjectScreen))