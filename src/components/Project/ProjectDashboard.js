import React, { Component } from 'react'

import Typography from 'material-ui/Typography'

const css = {
    container: { padding: '30px 10vw' }
}

class ProjectDashboard extends Component {
    render () {
        const { project } = this.props
        console.log(project)
        return (
            <div style={ css.container }>
                <Typography type='title'>{ project.name }</Typography>
                <Typography type='caption'>#{ project.id }</Typography>
                <Typography>{ project.description }</Typography>
            </div>
        )
    }
}

export default ProjectDashboard