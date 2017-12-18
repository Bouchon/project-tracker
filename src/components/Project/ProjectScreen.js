import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Hidden from 'material-ui/Hidden'
import Tabs, { Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import Header from '../App/Header'
import { AllProjectsQuery, ProjectByIdQuery, UserProjectsQuery } from './ProjectQuery'
import ProjectCards from './ProjectCards'
import AddOrUpdateProject from './AddOrUpdateProject'

const allProjectsList = textSearch => <AllProjectsQuery><ProjectCards textSearch={ textSearch } /></AllProjectsQuery>
const userProjectsList = (userId, textSearch) => <UserProjectsQuery userId={ userId }><ProjectCards textSearch={ textSearch } /></UserProjectsQuery>

const css = {
    addButton: { position: 'absolute', right: '56px', marginTop: '-28px' },
    projectsContainer: { padding: '30px 10vw' }
}

class ProjectScreen extends Component {
    state = { selectedTab: 0, textSearch: '', createDialog: false }

    render () {
        const { selectedTab, textSearch, createDialog } = this.state
        const { login } = this.props
        const projectComponent =
            selectedTab === 0 ? userProjectsList(login.id, textSearch) :
            selectedTab === 1 ? allProjectsList(textSearch) : null

        return (
            <div>
                <Header selected='Projects'>
                    <Tabs value={ selectedTab } onChange={ (evt, val) => this.setState({ selectedTab: val }) } style={{ margin: '-8px -16px' }}>
                        <Tab label='My projects' />
                        <Tab label='All projects' />
                    </Tabs>
                </Header>
                
                <Button onClick={ () => this.setState({ createDialog: true }) } style={ css.addButton } fab color='accent'><AddIcon /></Button>
                <AddOrUpdateProject open={ createDialog } onRequestClose={ () => this.setState({ createDialog: false }) } />

                <Hidden mdUp>
                    <div style={ css.projectsContainer }>
                        <TextField placeholder='Search' value={ textSearch } onChange={ evt => this.setState({ textSearch: evt.target.value }) } />
                        { projectComponent }
                    </div>
                </Hidden>
                <Hidden smDown>
                    <div style={{ ...css.projectsContainer, marginLeft: '200px' }}>
                        <TextField placeholder='Search' value={ textSearch } onChange={ evt => this.setState({ textSearch: evt.target.value }) } />
                        { projectComponent }
                    </div>
                </Hidden>
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(ProjectScreen)
