import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'

const css = {
    container: {
        padding: '15px'
    }
}
class UserList extends Component {
    state = { selection: [], searchText: '' }

    onSelectUser (id) {
        const { selection } = this.state
        const index = selection.indexOf(id)
        let newSelection
        if (index === -1) {
            newSelection = selection
            newSelection.push(id)
        } else {
            newSelection = selection
            newSelection.splice(index, 1)
        }

        this.setState({ selection: newSelection })
    }

    render () {
        const { blackList, allUsersQuery, onSelected } = this.props
        const { selection, searchText } = this.state
        const allUsers = 
            allUsersQuery.loading === true ? <Typography>Loading...</Typography> :
            allUsersQuery.allUsers === null ? <Typography type='caption'>No users found</Typography> : (
                allUsersQuery.allUsers.filter(u => u.name.toLowerCase().includes(searchText.toLowerCase())).map(user => (
                    <ListItem key={ user.id } button onClick={ () => this.onSelectUser(user.id) }>
                        <Checkbox checked={ selection.includes(user.id) } />
                        <ListItemText primary={ user.name } />
                    </ListItem>
                ))
            )



        return (
            <div style={ css.container }>
                <TextField label='Search' value={ searchText } onChange={ evt => this.setState({ searchText: evt.target.value }) } />
                <List>{ allUsers }</List>
                <Button onClick={ () => onSelected(selection) } raised color='accent'>Add</Button>
            </div>
        )
    }
}

const ALL_USERS_QUERY = gql`
query allUsersQuery {
    allUsers {
        id
        name
    }
}
`

export default graphql(ALL_USERS_QUERY, { name: 'allUsersQuery' })(UserList)