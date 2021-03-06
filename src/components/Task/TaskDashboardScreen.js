import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { push } from 'react-router-redux'

import Hidden from 'material-ui/Hidden'
import Typography from 'material-ui/Typography'
import Chip from 'material-ui/Chip'
import Button from 'material-ui/Button'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'

import Header from '../App/Header'
import SelectUserDialog from '../User/SelectUserDialog'

const css = {
    container: { padding: '30px 10vw' }
}

class TaskDashboardScreen extends Component {
    state = { userDialogOpen: false }

    updateTaskAssignees (assigneesIds) {
        const { match, addAssigneesToTaskMutation, taskByIdQuery } = this.props
        addAssigneesToTaskMutation({ variables: { taskId: match.params.taskId, assigneesIds: assigneesIds } })
            .then(() => taskByIdQuery.refetch()
                .then(() => this.setState({ userDialogOpen: false })))
    }
    updateTaskState (state) {
        const { match, updateTaskStateMutation, taskByIdQuery } = this.props
        updateTaskStateMutation({ variables: { taskId: match.params.taskId, state } })
            .then(() => taskByIdQuery.refetch())
    }

    render () {
        const { login, taskByIdQuery, membersByProjectId } = this.props
        const { userDialogOpen } = this.state
        const projectMembers = 
            membersByProjectId.Project === undefined ? [] : 
            membersByProjectId.Project === null ? [] :
            membersByProjectId.Project.members

        let dashboard
        if (taskByIdQuery.loading === true) {
            dashboard = <Typography>Loading...</Typography>
        } else if (taskByIdQuery.Task === null) {
            dashboard = <Typography>Task not found</Typography>
        } else {
            const task = taskByIdQuery.Task
            dashboard = (
                <div>
                    <Button onClick={ () => this.props.dispatch(push('/projects/' + task.project.id)) }>
                        <ChevronLeftIcon />
                        { task.project.name }
                    </Button>
                    <Typography type='title'>{ task.name }</Typography>
                    <Typography type='caption'>#{ task.id }</Typography>
                    <br />
                    <Typography>{ task.description }</Typography>
                    <Typography>State: { task.state }</Typography>
                    <div>
                        <Typography>From { task.startDate === null ? 'N/A' : task.startDate.toString() } - To { task.endDate === null ? 'N/A' : task.endDate.toString() } </Typography>
                    </div>
                    <Typography>Assignees:</Typography>
                    { task.assignees.map(assignee => (
                        <Chip key={ assignee.id } label={assignee.name } />
                    )) }
                    <Button color='primary' onClick={ () => this.setState({ userDialogOpen: true }) }>Add</Button>
                    <br /><br />
                    <Button color='accent' raised onClick={ () => this.updateTaskState(task.state === 'done' ? 'new' : 'done') }>{ task.state === 'done' ? 'Undone' : 'Done!' }</Button>
                    <SelectUserDialog 
                        users={ projectMembers } 
                        selection={ task.assignees.map(a => a.id) }
                        open={ userDialogOpen }
                        onRequestClose={ () => this.setState({ userDialogOpen: false }) }
                        onConfirmSelection={ selection => this.updateTaskAssignees(selection) } />
                </div>
            )
        }

        return (
            <div>
                <Header selected='Tasks' />
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

const TASK_BY_ID_QUERY = gql`
query taskByIdQuery($taskId: ID!) {
    Task(id: $taskId) {
        id
        name
        description
        state
        startDate
        endDate
        author {
            id
            name
        }
        assignees {
            id
            name
        }
        project {
            id
            name
        }
    }
}
`

const MEMBERS_BY_PROJECT_ID = gql`
query membersByProjectId($projectId: ID!) {
    Project(id: $projectId) {
        members {
            id
            name
        }
    }
}
`

const ADD_ASSIGNEES_TO_TASK_MUTATION = gql`
mutation addAssigneesToTaskMutation($taskId: ID!, $assigneesIds: [ID!]) {
    updateTask(id: $taskId, assigneesIds: $assigneesIds) {
        id
    }
}
`

const UPDATE_TASK_STATE_MUTATION = gql`
mutation updateTaskStateMutation($taskId: ID!, $state: String!) {
    updateTask(id: $taskId, state: $state) {
        id
    }
}
`

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(compose(
    graphql(TASK_BY_ID_QUERY, { name: 'taskByIdQuery', options: ({ match }) => ({ variables: { taskId: match.params.taskId } }) }),
    graphql(MEMBERS_BY_PROJECT_ID, { name: 'membersByProjectId', options: ({ taskByIdQuery }) => ({ variables: { projectId: taskByIdQuery.Task === undefined ? '' : taskByIdQuery.Task.project.id } }) }),
    graphql(ADD_ASSIGNEES_TO_TASK_MUTATION, { name: 'addAssigneesToTaskMutation' }),
    graphql(UPDATE_TASK_STATE_MUTATION, { name: 'updateTaskStateMutation' }))
    (TaskDashboardScreen))