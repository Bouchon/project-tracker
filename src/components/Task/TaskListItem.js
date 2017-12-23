import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Chip from 'material-ui/Chip'
import { ListItem, ListItemText } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

export default class TaskListItem extends Component {
    render () {
        const { task, deletable, onTaskDashboard } = this.props
        return (
            <ListItem button onClick={ onTaskDashboard }>
                <Chip label={ task.state } />
                <ListItemText primary={ task.name } secondary={ '#' + task.id } />
                { deletable === true && <IconButton><DeleteIcon /></IconButton> }
            </ListItem>
        )
    }
}