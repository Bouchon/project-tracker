import React, { Component } from 'react'
import { connect } from 'react-redux'

import Hidden from 'material-ui/Hidden'

import Header from '../App/Header'
import { AllProjectsQuery, ProjectByIdQuery, UserProjectsQuery } from './ProjectQuery'
import ProjectCards from './ProjectCards'
import ProjectDashboard from './ProjectDashboard'

const allProjectsList = <AllProjectsQuery><ProjectCards /></AllProjectsQuery>
const projectDashboard = projectId => <ProjectByIdQuery projectId={ projectId }><ProjectDashboard /></ProjectByIdQuery>
const userProjectsList = userId => <UserProjectsQuery userId={ userId }><ProjectCards /></UserProjectsQuery>

class ProjectScreen extends Component {

    render () {
        const { match, login } = this.props
        const { projectId, userId } = match.params
        const allProjects = this.props.match.path.includes('all')
        const myProjects = this.props.match.path.includes('me')
        
        console.log(projectId)
        const projectComponent = 
            projectId !== undefined ? projectDashboard(projectId) :
            userId !== undefined ? userProjectsList(userId) :
            match.path.includes('/all') === true ? allProjectsList :
            match.path.includes('/me') === true ? userProjectsList(login.id) : null


        return (
            <div>
                <Header />
                <Hidden mdUp>
                    { projectComponent }
                </Hidden>
                <Hidden smDown>
                    <div style={{ marginLeft: '200px' }}>
                        { projectComponent }
                    </div>
                </Hidden>

            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(ProjectScreen)
