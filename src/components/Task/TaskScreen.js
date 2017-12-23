import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { push } from 'react-router-redux'

import Hidden from 'material-ui/Hidden'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField/TextField';

import Header from '../App/Header'
import TaskList from '../Task/TaskList'

const css = {
    tasksWrapper: { padding: '0 10vw' },
    tasksContainer: { display: 'flex', flexWrap: 'wrap' },
    searchField: { width: '250px', margin: '15px 0 15px calc(50% - 125px)' }
}

class TaskScreen extends Component {
    state = { selectedTab: 0, textSearch: '' }

    getTasks (selectedTab) {
        const { userTasksQuery, allTasksQuery, login } = this.props
        switch (selectedTab) {
            case 0: return { loading: userTasksQuery.loading, tasks: userTasksQuery.allTasks }
            case 1: return { loading: allTasksQuery.loading, tasks: allTasksQuery.allTasks }
        }
    }

    render () {
        const { selectedTab, textSearch } = this.state
        const { login, allTasksQuery } = this.props
        const { loading, tasks } = this.getTasks(selectedTab)
        console.log(loading, tasks)
        const taskList =
            loading === true ? <Typography>Loading...</Typography> :
            tasks.length === 0 ? <Typography>No tasks found from search '{ textSearch }'</Typography> :
            (
                <div>
                    <TaskList tasks={ tasks.filter(t => t.name.toLowerCase().includes(textSearch.toLowerCase())) } />
                </div>
            )

        return (
            <div>
                <Header selected='Tasks'>
                    <Tabs value={ selectedTab } onChange={ (evt, val) => this.setState({ selectedTab: val }) }>
                        <Tab label='My tasks' />
                        <Tab label='All tasks' />
                    </Tabs>
                </Header>
                <Hidden mdUp>
                    <div style={ css.tasksWrapper }>
                        <TextField label='Search' style={ css.searchField } placeholder='Search' valie={ textSearch } onChange={ evt => this.setState({ textSearch: evt.target.value }) } />
                        { taskList }
                    </div>
                </Hidden>
                <Hidden smDown>
                    <div style={{ ...css.tasksWrapper, marginLeft: '200px' }}>
                        <TextField label='Search' style={ css.searchField } placeholder='Search' valie={ textSearch } onChange={ evt => this.setState({ textSearch: evt.target.value }) } />
                        { taskList }
                    </div>
                </Hidden>
            </div>
        )
    }
}

const USER_TASKS_QUERY = gql`
query userTasksQuery($userId: ID!) {
    allTasks(filter: { assignees_some: { id: $userId }}) {
        id
        name
        author {
            id
            name
        }
        description
        state
        startDate
        endDate
    }
}
`

const ALL_TASKS_QUERY = gql`
query allTasksQuery {
    allTasks {
        id
        name
        author {
            id
            name
        }
        description
        state
        startDate
        endDate
    }
}
`

const mapStateToProps = ({ login }) => ({ login })
export default connect(mapStateToProps)(compose(
    graphql(USER_TASKS_QUERY, { name: 'userTasksQuery', options: ({ login }) => ({ variables: { userId: login.id } }) }),
    graphql(ALL_TASKS_QUERY, { name: 'allTasksQuery' }))
    (TaskScreen))