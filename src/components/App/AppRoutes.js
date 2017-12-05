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
                    <Route exact path='/project' component={ ProjectScreen } />           
                    <Route exact path='/project/create' component={ CreateProjectScreen } />
                    <Route path='/task' component={ TaskScreen } />
                    <Route path='/user' component={ UserScreen } />
                </div>
            </ConnectedRouter>
        )
    }
}