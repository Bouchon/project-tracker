import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

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
    groupBlock: { padding: '8px 16px' },
    groupText: { fontWeight: 'bold' },
    itemBlock: { padding: '8px 16px 8px 32px' },
    itemSelected: { fontWeight: 'bold', textDecoration: 'underline' }
}

const menu = [
    { label: 'Home', children: [
        { label: 'Home',            href: '/' }
    ] },
    { label: 'Projects', children: [ 
        { label: 'My projects',     href: '/projects/users/me' },   
        { label: 'All projects',    href: '/projects/users/all' }
    ] },
    { label: 'Tasks', children: [
        { label: 'My tasks',        href: '/tasks/users/me' },
        { label: 'All tasks',       href: '/tasks/users/all'}
    ] },
    { label: 'Profiles', children: [ 
        { label: 'My profile',      href: '/users/me' },
        { label: 'All profiles',    href: '/users/all' }
    ] }   
]

class AppMenu extends Component {
    state = { currentHref: window.location.pathname }
    redirect (href) {
        this.props.dispatch(push(href))
        this.setState({ currentHref: href })
    }

    render () {
        const { currentHref } = this.state
        return (
            <div style={ css.container }>
                <div style={ css.header }>
                    <Typography type='title'>Project Tracker</Typography>
                    <Typography type='caption'>v0.0.1</Typography>
                </div>
                <Divider />
                <List>
                { menu.map(group => (
                    <div key={ group.label }>
                        <ListItem style={ css.groupBlock }><Typography style={ css.groupText }>{ group.label }</Typography></ListItem>
                        <List disablePadding>
                        { group.children.map(item => 
                            item.href === currentHref ? 
                            <ListItem key={ item.label } style={ css.itemBlock } button><Typography style={ css.itemSelected }>{ item.label }</Typography></ListItem>: 
                            <ListItem key={ item.label } style={ css.itemBlock } button onClick={evt => this.redirect(item.href) }><Typography>{ item.label }</Typography></ListItem>
                        ) }
                        </List>
                    </div>
                )) }
                </List>
            </div>
        )
    }
}

export default connect()(AppMenu)