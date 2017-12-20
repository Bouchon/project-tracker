import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { push } from 'react-router-redux'

import Hidden from 'material-ui/Hidden'
import Dialog from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'

import Header from '../App/Header'
import UserList from '../User/UserList'
import TaskList from '../Task/TaskList'
import AddOrUpdateTask from '../Task/AddOrUpdateTask'

const css = {
    container: { padding: '30px 10vw' },
    authorContainer: { margin: '15px 0', display: 'flex', alignItems: 'center' },
    authorLabel: { marginRight: '15px' },
    membersContainer: { margin: '15px 0', display: 'flex', alignItems: 'center', flexWrap: 'wrap' },
    membersLabel: { marginRight: '15px' },
    chipItem: { marginRight: '15px' }
}

class ProjectDashboardScreen extends Component {
    state = { userDialogOpen: false, taskDialogOpen: false }

    getInitials (name) {
        const words = name.split(' ')
        return words.length === 1 ? 
        words[0][0].toUpperCase() : words[0][0].toUpperCase() + words[1][0].toUpperCase()
    }

    onAddMembers (selection) {
        const { match, addMembersToProjectMutation } = this.props
        addMembersToProjectMutation({ variables: { projectId: match.params.projectId, membersIds: selection } })
            .then(() =>
                this.setState({ userDialogOpen: false })
            )
    }

    onAddTask (task) {
        console.log(task)
        const { createTaskMutation } = this.props
        createTaskMutation({ variables: { name: task.name, description: task.description, projectId: task.projectId, authorId: task.authorId } })
            .then(() => this.setState({ taskDialogOpen: false }))
    }

    render () {
        const { login, projectByIdQuery } = this.props
        const { userDialogOpen, taskDialogOpen } = this.state        
        let dashboard
        if (projectByIdQuery.loading === true) {
            dashboard = <Typography>Loading...</Typography>
        } else if (projectByIdQuery.Project === null) {
            dashboard = <Typography>Project not found</Typography>
        } else {
            const project = projectByIdQuery.Project
            dashboard = (
                <div>
                    <div>
                        <Typography type='title'>{ project.name }</Typography>
                        <Typography type='caption'>#{ project.id }</Typography>
                        <Typography>{ project.description }</Typography>
                    </div>
                    <div style={ css.authorContainer }>
                        <Typography style={ css.authorLabel }>Author</Typography>
                        <Chip 
                            avatar={ <Avatar>{ this.getInitials(project.author.name) }</Avatar> } 
                            onClick={ () => { this.props.dispatch(push('/users/' + project.author.id)) } }
                            label={ project.author.name } />
                    </div>
                    <div style={ css.membersContainer }>
                        <Typography style={ css.membersLabel }>Members</Typography>
                        { project.members.length === 0 ? 
                            <Typography type='caption'>no members</Typography> :
                            project.members.map(member => (
                                <Chip
                                    style={ css.chipItem }
                                    key={ member.id }
                                    avatar={ <Avatar>{ this.getInitials(member.name) }</Avatar> }
                                    onClick={ () => { this.props.dispatch(push('/users/' + member.id)) } }
                                    label={ member.name } />
                        ))}
                        <Button onClick={ () => this.setState({ userDialogOpen: true }) }>Add</Button>
                        <Dialog 
                            open={ userDialogOpen } 
                            onRequestClose={ () => this.setState({ userDialogOpen: false }) }>
                            <UserList blackList={ project.members } onSelected={ selection => this.onAddMembers(selection) } />
                        </Dialog>
                    </div>
                    <div style={ css.tasksContainer }>
                        <Typography>Tasks</Typography>
                        <Button onClick={ () => this.setState({ taskDialogOpen: true }) } color='primary'>ADD</Button>
                        <TaskList tasks={ project.tasks } />
                        <AddOrUpdateTask 
                            open={ taskDialogOpen } 
                            authorId={ login.id }
                            projectId={ project.id }
                            onRequestClose={ () => this.setState({ taskDialogOpen: false }) }
                            onCreate={ task => this.onAddTask(task) } />
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Header selected='Projects' />
                <Hidden mdUp>
                    <div style={ css.container }>{ dashboard }</div>
                </Hidden>
                <Hidden smDown>
                    <div style={{ ...css.container, marginLeft: '200px' }}>{ dashboard }</div>
                </Hidden>
            </div>
        )
    }
}

const PROJECT_BY_ID_QUERY = gql`
query projectById($projectId: ID!) {
    Project(id: $projectId) {
        id
        name
        description
        author {
            id
            name
        }
        members {
            id
            name
        }
        tasks {
            id
            name
            description
        }
    }
}
`

const ADD_MEMBERS_TO_PROJECT_MUTATION = gql`
mutation addUsersToPojectMutation($projectId: ID!, $membersIds: [ID!]) {
    updateProject(id: $projectId, membersIds: $membersIds) {
        id
    }
}
`
const CREATE_TASK_MUTATION = gql`
mutation createTaskMutation($name: String!, $description: String!, $projectId: ID!, $authorId: ID!) {
    createTask(name: $name, description: $description, projectId: $projectId, authorId: $authorId) {
        id
    }
}
`

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(compose(
    graphql(PROJECT_BY_ID_QUERY, { name: 'projectByIdQuery', options: ({ match }) => ({ variables: { projectId: match.params.projectId } }) }),
    graphql(ADD_MEMBERS_TO_PROJECT_MUTATION, { name: 'addMembersToProjectMutation' }),
    graphql(CREATE_TASK_MUTATION, { name: 'createTaskMutation' }))
    (ProjectDashboardScreen))