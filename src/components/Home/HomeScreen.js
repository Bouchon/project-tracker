import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Typography from 'material-ui/Typography'

import Header from '../App/Header'

const css = {
    main: { padding: '30px' }
}

class HomeScreen extends Component {
    render () {
        return (
            <div>
                <Header />
                <div style={ css.main }>
                    <Typography align='center' type='display2'>Welcome to project tracker!</Typography>
                </div>
            </div>
        )
    }
}

export default HomeScreen