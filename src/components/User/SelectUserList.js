import React, { Component } from 'react'

import List, { ListItem, ListItemText } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Checkbox from 'material-ui/Checkbox'

const css = {
    searchField: { width: '100%' },
}

export default class SelectUserDialog extends Component {
    state = { selection: [], searchText: '' }

    componentWillMount () {
        this.setState({ selection: this.props.selection === undefined ? [] : this.props.selection })
    }

    selectUser (id) {
        const { selection } = this.state
        const index = selection.indexOf(id)
        const newSelection = [...selection]

        if (index === -1) {
            newSelection.push(id)
        } else {
            newSelection.splice(index, 1)
        }

        this.setState({ selection: newSelection })
        this.props.onChange(newSelection)
    }

    render () {
        const { users, open, onRequestClose, onConfirmSelection } = this.props
        const { searchText, selection } = this.state

        return (
            <List>
                <TextField style={ css.searchField } label='Search' value={ searchText } onChange={ evt => this.setState({ searchText: evt.target.value }) } />
            {   
                users.filter(u => u.name.toLowerCase().includes(searchText.toLowerCase())).map(user => (
                <ListItem button key={ user.id } onClick={ () => this.selectUser(user.id) }>
                    <Checkbox checked={ selection.includes(user.id) } />
                    <ListItemText primary={ user.name } />
                </ListItem>
            )) }
            </List>
        )
    }
}