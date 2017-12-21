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
import ConfirmDialog from '../App/ConfirmDialog'
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
    state = { selectedTab: 0, textSearch: '', createDialog: false, refetch: false, deleteDialog: false, deleteId: null }

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
        const { deleteProjectMutation, allProjectsQuery, userProjectsQuery } = this.props
        deleteProjectMutation({ variables: { id } })
            .then(() => allProjectsQuery.refetch()
                .then(() => {                
                    allProjectsQuery.refetch()
                    this.setState({ deleteDialog: false })
                } )
            )
    }
    getProjects (selectedTab) {
        const { userProjectsQuery, allProjectsQuery, login } = this.props
        switch (selectedTab) {
            case 0: return { loading: userProjectsQuery.loading, projects: userProjectsQuery.allProjects }
            case 1: return { loading: allProjectsQuery.loading, projects: allProjectsQuery.allProjects }
        }
    }

    render () {
        const { selectedTab, textSearch, createDialog, refetch, deleteDialog, deleteId } = this.state
        const { login, allUsersQuery } = this.props
        const { loading, projects } = this.getProjects(selectedTab)

        const allUsers = 
            allUsersQuery.allUsers === undefined ? [] :
            allUsersQuery.allUsers === null ? [] :
            allUsersQuery.allUsers

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
                projectList = (
                    <div style={ css.projectsContainer }>
                    { filteredProjects.map(project => (
                        <ProjectCard 
                            key={ project.id } 
                            project={ project }
                            deletable={ project.author.id === login.id }
                            onAuthorProfile={ () => this.props.dispatch(push('/users/' + project.author.id)) }
                            onDashboard={ () => this.props.dispatch(push('/projects/' + project.id)) }
                            onDelete={ evt => { evt.stopPropagation(); this.setState({ deleteDialog: true, deleteId: project.id }) } } />
                    )) }
                        <ConfirmDialog 
                            open={ deleteDialog } 
                            onRequestClose={ () => this.setState({ deleteDialog: false }) }
                            onConfirm={ () => this.deleteProject(deleteId) }
                            title='Delete project ?'
                            message='The project will be deleted permanently' />
                    </div>
                )
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
                    login={ login }
                    open={ createDialog }
                    allUsers={ allUsers }
                    onRequestClose={ () => this.setState({ createDialog: false }) }
                    onCreate={ project => this.createProject(project) } />

                <Hidden mdUp>
                    <div style={ css.projectsWrapper }>
                        <TextField label='Search' style={ css.searchField } placeholder='Search' value={ textSearch } onChange={ evt => this.setState({ textSearch: evt.target.value }) } />
                        { projectList }
                    </div>
                </Hidden>
                <Hidden smDown>
                    <div style={{ ...css.projectsWrapper, marginLeft: '200px' }}>
                        <TextField label='Search' style={ css.searchField } placeholder='Search' value={ textSearch } onChange={ evt => this.setState({ textSearch: evt.target.value }) } />
                        { projectList }
                    </div>
                </Hidden>

                
            </div>
        )
    }
}

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

const ALL_USERS_QUERY = gql`
query allUsersQuery {
    allUsers {
        id
        name
    }
}
`


const CREATE_PROJECT_MUTATION = gql`
mutation createProjectMutation($name: String!, $description: String!, $authorId: ID, $membersIds: [ID!]) {
    createProject(name: $name, description: $description, authorId: $authorId, membersIds: $membersIds) {
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



const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(compose(
    graphql(ALL_PROJECTS_QUERY, { name: 'allProjectsQuery'}),
    graphql(ALL_USERS_QUERY, { name: 'allUsersQuery' }),
    graphql(USER_PROJECTS_QUERY, { name: 'userProjectsQuery', options: ({ login }) => ({ variables: { userId: login.id } }) }),
    graphql(CREATE_PROJECT_MUTATION, { name: 'createProjectMutation' }),
    graphql(DELETE_PROJECT_MUTATION, { name: 'deleteProjectMutation' }))
    (ProjectScreen))
