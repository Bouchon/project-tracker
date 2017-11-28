import React, { Component } from 'react'

const tasks = {
    ['0']: { id: 0, name: 'Task name', description: 'Task description' },
    ['1']: { id: 1, name: 'Task name', description: 'Task description' },
    ['2']: { id: 2, name: 'Task name', description: 'Task description' }
}

export default class TaskScreen extends Component {
    render () {
        return <h1>Task</h1>
    }
}