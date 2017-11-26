import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'

const css = {
    paper: {
        margin: 'auto',
        padding: '15px',
        width: '300px'
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: '15px'
    },
    title: { 
        overflow: 'hidden'
    },
    name: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    author: {
        fontStyle: 'italic',
        height: '1.5em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    body: {
        marginTop: '15px'
    },
    footer: {
        margin: '0 -15px -15px 0',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}

export default class Project extends Component {
    render () {
        const { project } = this.props
        return (
            <Paper style={ css.paper }>
                <div style={ css.header }>
                    <Avatar style={ css.avatar }>FK</Avatar>
                    <div style={ css.title }>
                        <Typography style={ css.name } type='title'>{ project.name }</Typography>
                        <Typography style={ css.author } type='subheading'>{ project.author }</Typography>
                    </div>
                </div>
                <div style={ css.body }>
                    <Typography>- Tasks (12)</Typography>
                    <Typography>- Members (3)</Typography>
                    <Typography>- Documents (3)</Typography>
                </div>
                <div style={ css.footer }>
                    <IconButton><ModeEditIcon /></IconButton>
                    <IconButton><DeleteIcon /></IconButton>
                </div>
            </Paper>
        )
    }
}