import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'

import SelectUserList from './SelectUserList'


const css = {
    container: { padding: '15px' },
    actionsContainer: { display: 'flex', justifyContent: 'flex-end' }
}

export default class SelectUserDialog extends Component {
    state = { currentSelection: null }

    componentWillMount () {
        this.setState({ currentSelection: this.props.selection })
    }

    render () {
        const { users, selection, open, onRequestClose, onConfirmSelection } = this.props
        const { currentSelection } = this.state

        return (
            <Dialog open={ open } onRequestClose={ onRequestClose }>
                <div style={ css.container }>
                    <SelectUserList
                        users={ users }
                        selection={ selection }
                        onChange={ selection => this.setState({ currentSelection: selection }) } />                    
                    <div style={ css.actionsContainer }>
                        <Button onClick={ onRequestClose } color='primary'>Cancel</Button>
                        <Button onClick={ () => onConfirmSelection(currentSelection) } color='accent' raised>Confirm</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}