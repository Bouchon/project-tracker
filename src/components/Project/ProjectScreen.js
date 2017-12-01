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
    render () {
        const { login, project } = this.props
        return (
            <div style={ css.container }>
                <Button onClick={ () => this.props.dispatch(push('/project/create')) } fab color='accent' style={ css.fab }><AddIcon /></Button>
            { Object.values(project).length === 0 && (
                <Typography>Use the + button to create a new project!</Typography>
            )}            
            { Object.values(project).map(p => (
                    <Project key={ p.id } project={ p } />
            ))}
            </div>
        )
    }
}

const mapStateToProps = ({ login, project }) => ({ login, project })

export default connect(mapStateToProps)(ProjectScreen)