import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Chip from 'material-ui/Chip'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import DateRangeIcon from 'material-ui-icons/DateRange'

import SelectUserList from '../User/SelectUserList'

const DEFAULT_PROJECT = {
    name: '',
    description: '',
    authorId: null
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
                        
                        <FormControl>
                            <InputLabel>Start date</InputLabel>
                            <Input value='' startAdornment={ <InputAdornment position='start'><IconButton><DateRangeIcon /></IconButton></InputAdornment> } />
                        </FormControl>
                        
                        <Button><DateRangeIcon /> End</Button>
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