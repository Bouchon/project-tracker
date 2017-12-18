import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import Hidden from 'material-ui/Hidden'

import Header from '../App/Header'
import HomeScreen from '../Home/HomeScreen'
import TaskScreen from '../Task/TaskScreen'

/* PROJECT SCREENS */
import ProjectScreen from '../Project/ProjectScreen'

/* PROFILE SCREENS */
import ProfileScreen from '../User/ProfileScreen'
import ProfileListScreen from '../User/ProfileListScreen'

export default class AppRoutes extends Component {
    render () {
        return (
            <div>
                <Route exact path='/' component={ HomeScreen } />
                <Switch>
                    <Route exact path='/projects/:projectId' component={ ProjectScreen } />
                    <Switch>
                        <Route exact path='/projects/users/me' component={ ProjectScreen } />
                        <Route exact path='/projects/users/all' component={ ProjectScreen } />
                        <Route exact path='/projects/users/:userId' component={ ProjectScreen } />
                    </Switch>
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
                    <Route exact path='/users/me' component={ ProfileScreen } />
                    <Route exact path='/users/all' component={ ProfileListScreen } />
                    <Route exact path='/users/:userId' component={ ProfileScreen } />

                    <Route exact path='/users/me/relations' component={ ProfileListScreen } />
                    <Route exact path='/users/:userId/relations' component={ ProfileListScreen } />

                    <Route exact path='/users/projects/:projectId' component={ ProfileListScreen } />
                    <Route exact path='/users/tasks/:taskId' component={ ProfileListScreen } />                        
                </Switch>
            </div>
        )
    }
}