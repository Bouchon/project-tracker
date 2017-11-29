import React, { Component } from 'react'

import Menu, { MenuItem } from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import { LinearProgress } from 'material-ui/Progress'
import IconButton from 'material-ui/IconButton'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'

const css = {
    paper: {
        margin: '15px',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        marginRight: '15px'
    },
    progress: {
        margin: '0 auto'
    },
    progressLabel: {
        textAlign: 'right',
        fontSize: '.8rem' 
    },
    progressBar: {
        width: '150px'
    },
    more: {
        marginLeft: 'auto'
    }
}

export default class Project extends Component {
    state = { menuOpen: false, anchorEl: null }

    getInitials (name) {
        const words = name.split(' ')
        return words.length === 1 ? 
            words[0][0].toUpperCase() : words[0][0].toUpperCase() + words[1][0].toUpperCase()
    }

    render () {
        const { menuOpen, anchorEl } = this.state
        const { project } = this.props
        console.log(project)
        return (
            <Paper style={ css.paper }>
                <Avatar style={ css.avatar }>{ this.getInitials(project.author.name) }</Avatar>
                <Typography style={ css.name } type='title'>{ project.name }</Typography>
                <div style={ css.progress }>
                    <Typography style={ css.progressLabel }>{ project.tasksCompleteCount } / { project.tasksCount } tasks</Typography>
                    <LinearProgress style={ css.progressBar } mode='determinate' value={ (100 * project.tasksCompleteCount) / project.tasksCount } />
                </div>
                <Typography style={ css.members }>{ project.membersCount } members</Typography>
                <IconButton onClick={ event => this.setState({ menuOpen: true, anchorEl: event.currentTarget }) } style={ css.more }><MoreHorizIcon /></IconButton>

                <Menu anchorEl={ anchorEl } open={ menuOpen } onRequestClose={ () => this.setState({ menuOpen: false }) }>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Tasks</MenuItem>
                    <MenuItem>Members</MenuItem>
                    <Divider />
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </Paper>
        )
    }
}