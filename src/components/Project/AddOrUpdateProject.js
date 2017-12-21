import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Chip from 'material-ui/Chip'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import DateRangeIcon from 'material-ui-icons/DateRange'

import SelectUserList from '../User/SelectUserList'
import DatePicker from '../Date/DatePicker'

const DEFAULT_PROJECT = {
    name: '',
    description: '',
    authorId: null,
    startDate: '',
    endDate: ''
}
const css = {
    header: { position: 'relative' },
    headerTitle: { marginRight: 'auto' },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '15px 10vw'
    },
    leftPanel: {
        display: 'flex',
        width: '50%',
        flexDirection: 'column',
        marginRight: '30px'
    },
    datePickerContainer: {
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-around'
    },
    rightPanel: {
        width: 'calc(50% - 90px)',
        padding: '30px'
    },
    footer: {
        width: '100%',
        padding: '15px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}

export default class AddOrUpdateProject extends Component {
    state = { project: null }

    componentWillMount () {
        const { project, login } = this.props
        const p = project === undefined ? { ...DEFAULT_PROJECT, authorId: login.id } : project
        this.setState({ project: p })
    }

    render () {
        const { project } = this.state
        const { open, onRequestClose, onCreate, login, allUsers } = this.props
        
        return (
            <Dialog fullScreen open={ open } onRequestClose={ onRequestClose }>
                <AppBar style={ css.header }>
                    <Toolbar>
                        <Typography style={ css.headerTitle } type='title' color='inherit'>New Project</Typography>
                        <IconButton color='inherit' onClick={ onRequestClose }><CloseIcon /></IconButton>
                    </Toolbar>
                </AppBar>
                <div style={ css.container }>
                    <div style={ css.leftPanel }>
                        <Chip label={ login.name } />
                        <TextField label='Project name' value={ project.name } onChange={ evt => this.setState({ project: { ...project, name: evt.target.value } }) } />
                        <TextField multiline rows={ 5 } label='Project description' value={ project.description } onChange={ evt => this.setState({ project: { ...project, description: evt.target.value } }) } />
                        <div style={ css.datePickerContainer }>
                            <DatePicker value={ project.startDate } label='Start date' onChange={ date => this.setState({ project: { ...project, startDate: date } }) } />
                            <DatePicker value={ project.endDate } label='End date' onChange={ date => this.setState({ project: { ...project, endDate: date } }) } />
                        </div>
                    </div>
                    <Paper style={ css.rightPanel }>
                        <Typography>Memers</Typography>
                        <SelectUserList 
                            users={ allUsers }
                            onChange={ selection => this.setState({ project: { ...project, membersIds: selection } } ) } />
                    </Paper>
                    <div style={ css.footer }>
                        <Button color='primary' onClick={ onRequestClose }>Cancel</Button>
                        <Button raised color='accent' onClick={ () => onCreate(this.state.project) }>Create</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}