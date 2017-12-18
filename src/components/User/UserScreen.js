import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import SvgIcon from 'material-ui/SvgIcon'
import ProjectIcon from '../../resources/project-icon.svg'
import TaskIcon from '../../resources/task-icon.svg'
import ChatIcon from '../../resources/chat-icon.svg'

import Header from '../App/Header'

const users = {
    [0]: { id: 0, name: 'Florian Knoblauch', email: 'knoblauch.florian@gmail.com' },
    [1]: { id: 1, name: 'Florian Knoblauch', email: 'knoblauch.florian@gmail.com' },
    [2]: { id: 2, name: 'Florian Knoblauch', email: 'knoblauch.florian@gmail.com' },
    [3]: { id: 3, name: 'Florian Knoblauch', email: 'knoblauch.florian@gmail.com' },
    [4]: { id: 4, name: 'Florian Knoblauch', email: 'knoblauch.florian@gmail.com' },
    [5]: { id: 5, name: 'Florian Knoblauch', email: 'knoblauch.florian@gmail.com' },
    [6]: { id: 6, name: 'Florian Knoblauch', email: 'knoblauch.florian@gmail.com' },
    [7]: { id: 7, name: 'Florian Knoblauch', email: 'knoblauch.florian@gmail.com' },
}
const css = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0 10vw'
    },
    user: {
        padding: '15px',
        margin: '15px'
    }
}

class UserScreen extends Component {
    render () {
        console.log(this.props.match.params)
        return (
            <div>
                <Header />
                <div style={ css.container }>
                { Object.values(users).map(user => (
                    <Paper key={ user.id } style={ css.user }>
                        <Typography type='title'>{ user.name }</Typography>
                        <IconButton><SvgIcon><ProjectIcon /></SvgIcon></IconButton>
                        <IconButton><SvgIcon><TaskIcon /></SvgIcon></IconButton>
                        <IconButton><SvgIcon><ChatIcon /></SvgIcon></IconButton>
                    </Paper>
                )) }
                </div>
            </div>
        )
    }
}

export default UserScreen