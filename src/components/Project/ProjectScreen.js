import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { push } from 'react-router-redux'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import { updateProject, deleteProject } from '../../action-creators/project'
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

class ProjectScreen extends Component {
    componentWillMount () {
        const { allProjectsQuery } = this.props
        if (allProjectsQuery.loading === false) {
            allProjectsQuery.refetch()
        }
    }
    render () {
        const { login, project, allProjectsQuery } = this.props
        let allProjects = []
        if (allProjectsQuery.loading === false && allProjectsQuery.allProjects !== undefined) {
            allProjects = allProjectsQuery.allProjects
        }  
        const myProjects = Object.values(allProjects).filter(p => p.author.id === login.id)
        return (
            <div style={ css.container }>
                <Button onClick={ () => this.props.dispatch(push('/project/create')) } fab color='accent' style={ css.fab }><AddIcon /></Button>
            { allProjects.loading === true && <Typography>Loading...</Typography> }
            { myProjects.length === 0 && allProjects.loading === false && (
                <Typography>Use the + button to create a new project!</Typography>
            )}            
            { myProjects.map(p => (
                    <Project key={ p.id } project={ p } />
            ))}
            </div>
        )
    }
}

const ALL_PROJECTS_QUERY = gql`
query AllProjectsQuery {
    allProjects {
        id
        description
        name
        author {
            id
            name
            email
        }
    }
}
`

const mapStateToProps = ({ login, project }) => ({ login, project })

export default 
    connect(mapStateToProps)
        (compose(graphql(ALL_PROJECTS_QUERY, { name: 'allProjectsQuery' }))
    (ProjectScreen))
