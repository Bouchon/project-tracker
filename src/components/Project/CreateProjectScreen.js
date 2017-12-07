import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { push } from 'react-router-redux'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import { addProject } from '../../action-creators/project'
import UserSelectModal from '../User/UserSelectModal'

const css = {
    container: {
        padding: '15px',
        display: 'flex',
        justifyContent: 'center'
    },
    main: {
        width: '400px'
    },
    input: { 
        width: '100%',        
        marginTop: '15px'
    },
    action: { 
        display: 'flex', 
        justifyContent: 'flex-end', 
        marginTop: '15px' 
    },
    button: {
        marginLeft: '15px'
    }
}
class CreateProjectScreen extends Component {
    state = { 
        project: { name: '', description: '' },
        userModalOpen: false
    }

    handleCreateProject () {
        const { login, createProjectMutation, addProject, redirect } = this.props
        const { project } = this.state
        createProjectMutation({ variables: { authorId: login.id, name: project.name, description: project.description } })
        .then(({ data }) => {
            project.id = data.createProject.id
            project.author = login
            addProject(project)
            redirect('/project')
        }) 
        .catch(error => {
            console.error(error)
        })
    }

    render () {
        const { redirect } = this.props
        const { project, userModalOpen } = this.state
        return (
            <div style={ css.container }>
                <div style={ css.main }>
                    <Typography type='title'>New project</Typography>
                    <TextField style={ css.input } label='Name' value={ project.name } onChange={ (evt) => this.setState({ project: { ...project, name: evt.target.value } })} />
                    <TextField style={ css.input } label='Description' multiline rows="4" rowsMax="4" value={ project.description } onChange={ (evt) => this.setState({ project: { ...project, description: evt.target.value } })} />
                    <div style={{ display: 'flex' }}>
                        <Button color= 'primary' style={ css.input } onClick={ () => this.setState({ userModalOpen: true }) }>Members (0)</Button>
                        <Button color='primary' style={ css.input }>Tasks (0)</Button>
                    </div>
                    <div style={ css.action }>
                        <Button style={ css.button } color='primary'  onClick={ () => redirect('/project') }>Cancel</Button>
                        <Button style={ css.button } raised color='accent' onClick={ () => this.handleCreateProject() }>Create</Button>
                    </div>
                </div>

                <UserSelectModal open={ userModalOpen } onRequestClose={ () => this.setState({ userModalOpen: false }) } />
            </div>
        )
    }
}

const CREATE_PROJECT_MUTATION = gql`
mutation CreateProjectMutation($authorId: ID!, $name: String!, $description: String!) {
  createProject(
    authorId: $authorId,
    name: $name
    description: $description
  ) {
    id
  }
}
`

const mapStateToProps = ({ dispatch, login, project }) => ({ dispatch, login, project })
const mapDispatchToProps = dispatch => ({ 
    addProject: bindActionCreators(addProject, dispatch), 
    redirect: bindActionCreators(push, dispatch)
})

export default 
    connect(mapStateToProps, mapDispatchToProps)(
        compose(graphql(CREATE_PROJECT_MUTATION, { name: 'createProjectMutation' }))
    (CreateProjectScreen))