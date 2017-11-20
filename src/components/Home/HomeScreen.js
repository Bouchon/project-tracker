import React, { Component } from 'react'

import Logo from '../../logo.svg'
import Typography from 'material-ui/Typography'

class HomeScreen extends Component {
    render () {
        return (
            <div>
                <Typography type='display4' align='center'>Project Tracker</Typography>
                <Logo style={{ tranform: 'rotate(45deg)' }} />
            </div>
        )
    }
}

export default HomeScreen