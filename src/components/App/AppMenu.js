import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'

import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'

const css = {
    container: {
        width: '200px'
    },
    header: {
        height: '48px',
        padding: '8px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    selected: {
        textDecoration: 'underline'
    }
}

class AppMenu extends Component {
    redirect (href) {
        this.props.dispatch(push(href))
    }

    render () {
        const { menu, match, location, selected } = this.props
        const { pathname } = location
        console.log(pathname)
        return (
            <div style={ css.container }>
                <div style={ css.header }>
                    <Typography type='title'>Project Tracker</Typography>
                    <Typography type='caption'>v0.0.1</Typography>
                </div>
                <Divider />
                <List>
                { menu.map(item => {
                    return (
                        <ListItem key={ item.label } button onClick={ evt => this.redirect(item.href) }>
                        { item.label === selected ?
                            <Typography style={ css.selected }>{ item.label }</Typography> :
                            <Typography>{ item.label }</Typography>
                        }
                        </ListItem>
                    ) }) }
                </List>
            </div>
        )
    }
}

export default connect()(withRouter(AppMenu))