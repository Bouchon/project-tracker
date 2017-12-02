import React, { Component } from 'react'

import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

export default class UserSelectModal extends Component {
    render () {
        const { open, onRequestClose } = this.props
        return (
            <Dialog open={ open } onRequestClose={ onRequestClose }>
                <DialogTitle>Select users</DialogTitle>
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onRequestClose }>Cancel</Button>
                    <Button>Add</Button>
                </DialogActions>
            </Dialog>
        )
    }
}