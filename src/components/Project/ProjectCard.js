import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import WorkIcon from 'material-ui-icons/Work'
import SupervisorAccountIcon from 'material-ui-icons/SupervisorAccount'
import DeleteIcon from 'material-ui-icons/Delete'

const css = {
    paper: {
        width: 'calc(100% / 3 - 20px)',
        margin: '10px'
    },
    header: {
        padding: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        cursor: 'pointer',        
        transition: 'all 250ms ease'
    },
    headerHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },
    headerAvatar: {
        marginRight: '10px'
    },
    body: {
        position: 'relative',
        padding: '10px',
        height: '150px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 250ms ease'
    },
    bodyHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },
    deleteButton: {
        position: 'absolute',
        bottom: '0',
        right: '0'
    },
    footer: {
        padding: '10px'
    },
    footerText: {
        textAlign: 'center'
    }
}

export default class ProjectCard extends Component {
    state = { headerHover: false, bodyHover: false }

    getInitials (name) {
        const words = name.split(' ')
        return words.length === 1 ? 
        words[0][0].toUpperCase() : words[0][0].toUpperCase() + words[1][0].toUpperCase()
    }

    render () {
        const { headerHover, bodyHover } = this.state
        const { project, onMenuOpen, deletable, onDelete, onDashboard, onAuthorProfile } = this.props
        const headerStyle = headerHover === false ? css.header : { ...css.header, ...css.headerHover }
        const bodyStyle= bodyHover === false ? css.body : { ...css.body, ...css.bodyHover }

        return (
            <Paper style={ css.paper }>
                <div onClick={ onAuthorProfile } style={ headerStyle } onMouseEnter={ () => this.setState({ headerHover: true }) } onMouseLeave={ () => this.setState({ headerHover: false }) }>
                    <Avatar style={ css.headerAvatar }>{ this.getInitials(project.author.name) }</Avatar>
                    <div>
                        <Typography>{ project.author.name }</Typography>
                        <Typography type='caption'>#{ project.author.id }</Typography>
                    </div>
                </div>
                <div onClick={ onDashboard } style={ bodyStyle } onMouseEnter={ () => this.setState({ bodyHover: true }) } onMouseLeave={ () => this.setState({ bodyHover: false }) }>
                    { bodyHover && deletable && <IconButton style={ css.deleteButton } onClick={ onDelete }><DeleteIcon /></IconButton> }
                    <Typography type='title'>{ project.name }</Typography>
                    <Typography>{ project.description }</Typography>
                </div>
                <Divider />
                <div style={ css.footer }>
                    <Typography style={ css.footerText } type='caption'>{ project.createdAt }</Typography>
                </div>
            </Paper>
        )
    }
}