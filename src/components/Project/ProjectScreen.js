import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { push } from 'react-router-redux'

import Hidden from 'material-ui/Hidden'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import Header from '../App/Header'
import ProjectCard from './ProjectCard'
import AddOrUpdateProject from './AddOrUpdateProject'
import AddOrUpdateTask from '../Task/AddOrUpdateTask'

const userProjectsList = (userId, textSearch, refetch) => <UserProjectsQuery refetch={ refetch } userId={ userId }><ProjectCards textSearch={ textSearch } /></UserProjectsQuery>
const allProjectsList = (textSearch, refetch) => <AllProjectsQuery refetch={ refetch }><ProjectCards textSearch={ textSearch } /></AllProjectsQuery>

const css = {
    addButton: { position: 'absolute', right: '56px', marginTop: '-28px' },
    projectsWrapper: { padding: '0 10vw' },
    projectsContainer: { display: 'flex', flexWrap: 'wrap' },
    searchField: { width: '250px', margin: '15px 0 15px calc(50% - 125px)' }
}

class ProjectScreen extends Component {
    state = { selectedTab: 0, textSearch: '', createDialog: false, refetch: false }

    createProject (project) {
        this.props.createProjectMutation({ variables: project })
            .then(() => {
                this.props.userProjectsQuery.refetch()
                this.props.allProjectsQuery.refetch()
                this.setState({ createDialog: false })
            })
            .catch(() => {
                this.setState({ createDialog: false })
            })
    }
    deleteProject (id) {
        this.props.deleteProjectMutation({ variables: { id } })
            .then(() => {
                this.props.userProjectsQuery.refetch()
                this.props.allProjectsQuery.refetch()
            })
    }
    getProjects (selectedTab) {
        const { userProjectsQuery, allProjectsQuery, login } = this.props
        switch (selectedTab) {
            case 0: return { loading: userProjectsQuery.loading, projects: userProjectsQuery.allProjects }
            case 1: return { loading: allProjectsQuery.loading, projects: allProjectsQuery.allProjects }
        }
    }

    render () {
        const { selectedTab, textSearch, createDialog, refetch } = this.state
        const { login } = this.props
        const { loading, projects } = this.getProjects(selectedTab)

        let projectList
        if (loading === true) {
            projectList = <Typography>Loading...</Typography>
        } else if (projects.length === 0) {
            projectList = <Typography>No projects found, please create a new project with the '+' button</Typography>
        } else {
            const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(textSearch.toLowerCase()))
            if (filteredProjects.length === 0) {
                projectList = <Typography>No project found from search '{ textSearch }'</Typography>
            } else {
                projectList = filteredProjects.map(project => (
                    <ProjectCard 
                        key={ project.id } 
                        project={ project }
                        deletable={ project.author.id === login.id }
                        onAuthorProfile={ () => this.props.dispatch(push('/users/' + project.author.id)) }
                        onDashboard={ () => this.props.dispatch(push('/projects/' + project.id)) }
                        onDelete={ () => this.deleteProject(project.id) } />
                ))
            }
        }

        return (
            <div>
                <Header selected='Projects'>
                    <Tabs value={ selectedTab } onChange={ (evt, val) => this.setState({ selectedTab: val }) } style={{ margin: '-8px -16px' }}>
                        <Tab label='My projects' />
                        <Tab label='All projects' />
                    </Tabs>
                </Header>
                
                <Button onClick={ () => this.setState({ createDialog: true }) } style={ css.addButton } fab color='accent'><AddIcon /></Button>
                <AddOrUpdateProject 
                    authorId={ login.id }
                    open={ createDialog } 
                    onRequestClose={ () => this.setState({ createDialog: false }) }
                    onCreate={ project => this.createProject(project) } />

                <Hidden mdUp>
                    <div style={ css.projectsWrapper }>
                        <TextField label='Search' style={ css.searchField } placeholder='Search' value={ textSearch } onChange={ evt => this.setState({ textSearch: evt.target.value }) } />
                        <div style={ css.projectsContainer }>{ projectList }</div>
                    </div>
                </Hidden>
                <Hidden smDown>
                    <div style={{ ...css.projectsWrapper, marginLeft: '200px' }}>
                        <TextField label='Search' style={ css.searchField } placeholder='Search' value={ textSearch } onChange={ evt => this.setState({ textSearch: evt.target.value }) } />
                        <div style={ css.projectsContainer }>{ projectList }</div>
                    </div>
                </Hidden>
            </div>
        )
    }
}

const CREATE_PROJECT_MUTATION = gql`
mutation createProjectMutation($name: String!, $description: String!, $authorId: ID) {
    createProject(name: $name, description: $description, authorId: $authorId) {
        id
    }
}
`

const DELETE_PROJECT_MUTATION = gql`
mutation deleteProjectMutation($id: ID!) {
    deleteProject(id: $id) {
        id
    }
}
`

const ALL_PROJECTS_QUERY = gql`
query allProjectsQuery {
    allProjects {
        id
        name
        description
        createdAt
        author {
            id
            name
        }
    }
}
`

const USER_PROJECTS_QUERY = gql`
query userProjectsQuery($userId: ID!) {
    allProjects(filter: { author: { id: $userId }}) {
        id
        name
        description
        createdAt
        author {
            id
            name
        }
    }
}
`

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(compose(
    graphql(CREATE_PROJECT_MUTATION, { name: 'createProjectMutation' }),
    graphql(DELETE_PROJECT_MUTATION, { name: 'deleteProjectMutation' }),
    graphql(ALL_PROJECTS_QUERY, { name: 'allProjectsQuery'}),
    graphql(USER_PROJECTS_QUERY, { name: 'userProjectsQuery', options: ({ login }) => ({ variables: { userId: login.id } }) }))
    (ProjectScreen))
