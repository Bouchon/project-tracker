import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import HomeScreen from '../Home/HomeScreen'
import ProjectScreen from '../Project/ProjectScreen'
import CreateProjectScreen from '../Project/CreateProjectScreen'
import TaskScreen from '../Task/TaskScreen'
import UserScreen from '../User/UserScreen'

export default class AppRoutes extends Component {
    render () {
        const { history } = this.props
        return (
            <ConnectedRouter history={ history }>
                <div>
                    <Route exact path='/' component={ HomeScreen } />
                    <Switch>
                        <Switch>
                            <Route exact path='/projects/new' component={ CreateProjectScreen } />
                            <Route exact path='/projects/users/me' component={ ProjectScreen } />
                            <Route exact path='/projects/users/all' component={ ProjectScreen } />
                            <Route exact path='/projects/users/:userId' component={ ProjectScreen } />
                        </Switch>
                        <Route exact path='/projects/:projectId' component={ ProjectScreen } />
                    </Switch>
                    <Switch>
                        <Switch>                            
                            <Route exact path='/tasks/users/me' component={ TaskScreen } />
                            <Route exact path='/tasks/users/all' component={ TaskScreen } />
                            <Route exact path='/tasks/users/:userId' component={ TaskScreen } />
                            <Route exact path='/tasks/projects/:projectId' component={ TaskScreen } />
                            <Route exact path='/tasks/projects/:projectId/users/:userId' component={ TaskScreen } />
                        </Switch>
                        <Route exact path='/tasks/:taskId' component={ TaskScreen } />
                    </Switch>
                    <Switch>
                        <Switch>
                            <Route exact path='/users/projects/:projectId' component={ UserScreen } />
                            <Route exact path='/users/tasks/:taskId' component={ UserScreen } />
                        </Switch>
                        <Route exact path='/users/me' component={ UserScreen } />
                        <Route exact path='/users/all' component={ UserScreen } />
                        <Route exact path='/users/:userId' component={ UserScreen } />
                    </Switch>
                </div>
            </ConnectedRouter>
        )
    }
}