import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

class AddOrUpdateProject extends Component {
    render () {
        const { open, onRequestClose } = this.props
        return (
            <Dialog fullScreen open={ open } onRequestClose={ onRequestClose }>
                <AppBar>
                    <Toolbar>
                        <Typography type='title' color='inherit'>New Project</Typography>
                        <Button raised color='accent'>Create</Button>
                        <IconButton onClick={ onRequestClose }><CloseIcon /></IconButton>
                    </Toolbar>
                </AppBar>
            </Dialog>
        )
    }
}

export default AddOrUpdateProject