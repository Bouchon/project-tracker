import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Chip from 'material-ui/Chip'
import { ListItem, ListItemText } from 'material-ui/List'

export default class TaskListItem extends Component {
    render () {
        const { task, onTaskDashboard } = this.props
        return (
            <ListItem button onClick={ onTaskDashboard }>
                <Chip label={ task.state } />
                <ListItemText primary={ task.name } secondary={ '#' + task.id } />
            </ListItem>
        )
    }
}