import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Typography from 'material-ui/Typography'

const css = {
    main: { padding: '30px' }
}

class HomeScreen extends Component {
    render () {
        return (
            <div style={ css.main }>
                <Typography align='center' type='display2'>Welcome to project tracker!</Typography>
            </div>
        )
    }
}

export default HomeScreen