import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Checkbox from 'material-ui/Checkbox'

const css = {
    container: { padding: '15px' },
    searchField: { width: '100%' },
    actionsContainer: { display: 'flex', justifyContent: 'flex-end' }
}

export default class SelectUserDialog extends Component {
    state = { selection: [], searchText: '' }

    componentWillMount () {
        this.setState({ selection: this.props.selection })
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
    }

    render () {
        const { users, open, onRequestClose, onConfirmSelection } = this.props
        const { searchText, selection } = this.state

        return (
            <Dialog open={ open } onRequestClose={ onRequestClose }>
                <div style={ css.container }>
                    <List>
                        <TextField style={ css.searchField } label='Search' value={ searchText } onChange={ evt => this.setState({ searchText: evt.target.value }) } />
                    { users.filter(u => u.name.toLowerCase().includes(searchText.toLowerCase())).map(user => (
                        <ListItem button key={ user.id } onClick={ () => this.selectUser(user.id) }>
                            <Checkbox checked={ selection.includes(user.id) } />
                            <ListItemText primary={ user.name } />
                        </ListItem>
                    )) }
                    </List>
                    <div style={ css.actionsContainer }>
                        <Button onClick={ onRequestClose } color='primary'>Cancel</Button>
                        <Button onClick={ () => onConfirmSelection(selection) } color='accent' raised>Confirm</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}