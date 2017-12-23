import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Typography from 'material-ui/Typography'
import List from 'material-ui/List'

import TaskListItem from './TaskListItem'

class TaskList extends Component {
    render () {
        const { login, tasks } = this.props
        return (
            <div>
            { tasks.length === 0 ? 
                <Typography type='caption'>no tasks</Typography> : 
                tasks.map(task => (
                    <List key={ task.id }>
                        <TaskListItem deletable={ login.id === task.author.id } onTaskDashboard={ () => this.props.dispatch(push('/tasks/' + task.id)) } task={ task } />
                    </List>
                ))
            }
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(TaskList)