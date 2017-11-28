import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import Project from './Project'

const css = {
    container: {
        position: 'relative',
        marginTop: '30px',
        padding: '0 10vw'
    },
    fab: {
        position: 'absolute',
        top: '-58px',
        right: '58px'
    }
}

const projects = {
    ['1']: { id: 1, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 },
    ['2']: { id: 2, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 },
    ['3']: { id: 3, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 },
    ['4']: { id: 4, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 },
    ['5']: { id: 5, author: 'FK', name: 'Project name', tasksCount: 10, tasksCompleteCount: 5, membersCount: 5 }
}

export default class ProjectScreen extends Component {
    render () {
        return (
            <div style={ css.container }>
                <Button fab color='accent' style={ css.fab }><AddIcon /></Button>
            { 
                Object.values(projects).map(project => (
                    <Project key={ project.id } project={ project } />
                ))
            }
            </div>
        )
    }
}