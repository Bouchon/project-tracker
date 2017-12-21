import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const css = {
    container: { padding: '15px 0' },
    header: { padding: '0 15px 0 15px' },
    body: { padding: '15px' },
    footer: { padding: '15px 15px 0 15px', display: 'flex', justifyContent: 'flex-end' },
    button: { marginLeft: '15px' }
}

export default class ConfirmDialog extends Component {
    render () {
        const { open, onRequestClose, title, message, onConfirm } = this.props
        return (
            <Dialog open={ open } onRequestClose={ onRequestClose }>
                <div style={ css.container }>
                    <div style={ css.header }>
                        <Typography type='title'>{ title }</Typography>
                    </div>
                    <div style={ css.body }>
                        <Typography>{ message }</Typography>
                    </div>
                    <Divider />
                    <div style={ css.footer }>
                        <Button style={ css.button } onClick={ onRequestClose } color='primary'>Cancel</Button>
                        <Button style={ css.button } onClick={ onConfirm } raised color='accent'>Confirm</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}