import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'

const css = {
    paper: {
        margin: '15px',
        padding: '15px',
        width: '200px',
        
        
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    actions: {
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
                <Typography type='title' style={ css.title }>{ project.name }</Typography>
                <Typography>{ project.description }</Typography>
                <div style={ css.actions }>
                    <IconButton><ModeEditIcon /></IconButton>
                    <IconButton><DeleteIcon /></IconButton>
                </div>
            </Paper>
        )
    }
}