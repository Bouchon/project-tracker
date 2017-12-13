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
    groupBlock: { padding: '8px 16px' },
    groupText: { fontWeight: 'bold' },
    itemBlock: { padding: '8px 16px 8px 32px' },
    itemSelected: { fontWeight: 'bold', textDecoration: 'underline' }
}

class AppMenu extends Component {
    redirect (href) {
        this.props.dispatch(push(href))
    }

    render () {
        const { menu, match, location } = this.props
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
                { menu.map(group => (
                    <div key={ group.label }>
                        <ListItem style={ css.groupBlock }><Typography style={ css.groupText }>{ group.label }</Typography></ListItem>
                        <List disablePadding>
                        { group.children.map(item => 
                            item.href === pathname ? 
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

export default connect()(withRouter(AppMenu))