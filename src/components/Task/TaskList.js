import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Typography from 'material-ui/Typography'
import List from 'material-ui/List'

import TaskListItem from './TaskListItem'

class TaskList extends Component {
    render () {
        const { tasks } = this.props
        return (
            <div>
            { tasks.length === 0 ? 
                <Typography type='caption'>no tasks</Typography> : 
                tasks.map(task => (
                    <List key={ task.id }>
                        <TaskListItem onTaskDashboard={ () => this.props.dispatch(push('/tasks/' + task.id)) } task={ task } />
                    </List>
                ))
            }
            </div>
        )
    }
}

export default connect()(TaskList)