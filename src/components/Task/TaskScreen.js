import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { push } from 'react-router-redux'

import Typography from 'material-ui/Typography';

const css = {

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
        
        const taskList =
            loading === true ? <Typography>Loading...</Typography> :
            tasks.length === 0 ? <Typography>No tasks found from search '{ textSearch }'</Typography> :
            (
                <div>
                    
                </div>
            )
    }
}

const USER_TASKS_QUERY = gql`
query userTasksQuery($userId: ID!) {
    allTasks(filter: { assignees: { id: $userId }}) {
        id
        name
        author
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
        author
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