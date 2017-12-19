import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

const css = {
    header: { position: 'relative' },
    headerTitle: { marginRight: 'auto' },
    body: { 
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
    }
}
const DEFAULT_PROJECT = {
    name: '',
    description: '',
    authorId: null
}

export default class AddOrUpdateProject extends Component {
    state = { project: null }

    componentWillMount () {
        const { project, authorId } = this.props
        const p = project === undefined ? { ...DEFAULT_PROJECT, authorId } : project
        this.setState({ project: p })
    }

    createProject () {
        this.props.onCreate(this.state.project)
    }

    render () {
        const { project } = this.state
        const { open, onRequestClose } = this.props
        return (
            <Dialog fullScreen open={ open } onRequestClose={ onRequestClose }>
                <AppBar style={ css.header }>
                    <Toolbar>
                        <Typography style={ css.headerTitle } type='title' color='inherit'>New Project</Typography>
                        <IconButton color='inherit' onClick={ onRequestClose }><CloseIcon /></IconButton>
                    </Toolbar>
                </AppBar>
                <div style={ css.body }>
                    <TextField label='Project name' value={ project.name } onChange={ evt => this.setState({ project: { ...project, name: evt.target.value } }) } />
                    <TextField label='Project description' value={ project.description } onChange={ evt => this.setState({ project: { ...project, description: evt.target.value } }) } />
                </div>
                <div>
                    <Button color='primary' onClick={ onRequestClose }>Cancel</Button>
                    <Button raised color='accent' onClick={ () => this.createProject() }>Create</Button>
                </div>
            </Dialog>
        )
    }
}