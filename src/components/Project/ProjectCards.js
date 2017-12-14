import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import SupervisorAccountIcon from 'material-ui-icons/SupervisorAccount'
import WorkIcon from 'material-ui-icons/Work'
import MoreVertIcon from 'material-ui-icons/MoreVert'

const css = {
    container: {
    },
    paper: {
        padding: '15px',
        margin: '15px',
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: '15px'
    },
    name: {
        width: '20vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    buttons: {
        padding: '8px',
        margin: 'auto'
    },
    iconButtons: {
        marginRight: '8px'
    },
    moreButton: {
        marginLeft: 'auto'
    }
}

export default class ProjectCards extends Component {
    getInitials (name) {
        const words = name.split(' ')
        return words.length === 1 ? 
        words[0][0].toUpperCase() : words[0][0].toUpperCase() + words[1][0].toUpperCase()
    }

    render () {
        const { projects } = this.props
        return (
            <div style={ css.container }>
            { projects.map(project => (
                <Paper key={ project.id } style={ css.paper }>
                    <Avatar style={ css.avatar }>{ this.getInitials(project.author.name) }</Avatar>
                    <Typography style={ css.name } type='title'>{ project.name }</Typography>
                    <Button color='primary' style={ css.buttons }><WorkIcon style={ css.iconButtons } /> tasks</Button>
                    <Button color='primary' style={ css.buttons }><SupervisorAccountIcon style={ css.iconButtons } /> members</Button>
                    <IconButton style={ css.moreButton }><MoreVertIcon /></IconButton>
                </Paper>
            )) }
            </div>
        )
    }
}