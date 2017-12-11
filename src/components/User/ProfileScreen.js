import React, { Component } from 'react'
import { connect } from 'react-redux'

import Typography from 'material-ui/Typography'

import ProfileDashboard from './ProfileDashboard'

const css = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 10vw',
        marginTop: '15px'
    }
}

class ProfileScreen extends Component {
    state = { userId: '' }
    componentWillMount () {
        const { userId } = this.props.match.params
        if (userId === undefined) {
            this.setState({ userId: this.props.login.id })
        } else {
            this.setState({ userId: userId })
        }
    }

    render () {
        const { userId } = this.state

        return (
            <div style={ css.container }>
                <ProfileDashboard userId={ userId } />
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(ProfileScreen)