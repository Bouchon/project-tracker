import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import HomeScreen from '../Home/HomeScreen'
import ProjectScreen from '../Project/ProjectScreen'
import TaskScreen from '../Task/TaskScreen'

export default class AppRoutes extends Component {
    render () {
        const { history } = this.props
        return (
            <ConnectedRouter history={ history }>
                <div>
                    <Route exact path='/' component={ HomeScreen } />
                    <Route path='/project' component={ ProjectScreen } />
                    <Route path='/task' component={ TaskScreen } />
                    <Route path='/user' component={ TaskScreen } />
                </div>
            </ConnectedRouter>
        )
    }
}