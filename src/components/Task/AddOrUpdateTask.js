import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

import DatePicker from '../Date/DatePicker'

const DEFAULT_TASK = {
    name: '',
    description: '',
    authorId: null,
    projectId: null,
    state: 'new',
    startDate: '',
    endDate: ''
}

const css = {
    header: { position: 'relative' },
    headerTitle: { marginRight: 'auto' },
    body: {
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
    }
}

export default class AddOrUpdateTask extends Component {
    state = { task: null }

    componentWillMount () {
        const { task, authorId, projectId } = this.props
        const t = task === undefined ? { ...DEFAULT_TASK, authorId, projectId } : task
        this.setState({ task: t })
    }

    render () {
        const { task } = this.state
        const { open, onRequestClose, onCreate } = this.props
        return (
            <Dialog fullScreen open={ open } onRequestClose={ onRequestClose }>
                <AppBar style={ css.header }>
                    <Toolbar>
                        <Typography style={ css.headerTitle } type='title' color='inherit'>New Task</Typography>
                        <IconButton color='inherit' onClick={ onRequestClose }><CloseIcon /></IconButton>
                    </Toolbar>
                </AppBar>
                <div style={ css.body }>
                    <TextField label='Task name' value={ task.name } onChange={ evt => this.setState({ task: { ...task, name: evt.target.value } }) } />
                    <TextField label='Task description' value={ task.description } onChange={ evt => this.setState({ task: { ...task, description: evt.target.value } }) } />
                    <DatePicker label='Start date' value={ task.startDate } onChange={ date => this.setState({ task: { ...task, startDate: date } })} />
                    <DatePicker label='End date' value={ task.endDate } onChange={ date => this.setState({ task: { ...task, endDate: date } }) } />
                    <div>
                        <Button color='primary' onClick={ onRequestClose }>Cancel</Button>
                        <Button raised color='accent' onClick={ () => onCreate(task) }>Create</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}