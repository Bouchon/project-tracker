import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography';


const tasks = {
    [0]: { id: 0, name: 'Task name', description: 'Task description'},
    [1]: { id: 1, name: 'Task name', description: 'Task description' },
    [2]: { id: 2, name: 'Task name', description: 'Task description' }
}
const projects = {
    [0]: { id: 0, name: 'Project name', tasks: tasks },
    [1]: { id: 1, name: 'Project name', tasks: tasks },
    [2]: { id: 2, name: 'Project name', tasks: tasks }
}

const css = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0 10vw'
    },
    project: {
        margin: '15px',
        padding: '15px'
    }
}

export default class TaskScreen extends Component {
    render () {
        return (
            <div style={ css.container }>
            { Object.values(projects).map(project => (
                <Paper key={ project.id } style={ css.project }>
                    <Typography type='title'>{ project.name }</Typography>
                    { Object.values(project.tasks).map(task => (
                        <div key={ task.id }>
                            <Typography>{ task.name }</Typography>
                        </div>
                    )) }
                </Paper>
            )) }
            </div>
        )
    }
}