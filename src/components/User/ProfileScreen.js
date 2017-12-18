import React, { Component } from 'react'
import { connect } from 'react-redux'

import Hidden from 'material-ui/Hidden'
import Typography from 'material-ui/Typography'

import Header from '../App/Header'
import ProfileDashboard from './ProfileDashboard'

const css = {
    container: {
        display: 'flex',
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
            <div>
                <Header />                
                
                <Hidden mdUp>
                    <div style={ css.container }>
                        <ProfileDashboard userId={ userId } />
                    </div>
                </Hidden>

                <Hidden smDown>
                    <div style={{ ...css.container, marginLeft: '200px' }}>
                        <ProfileDashboard userId={ userId } />
                    </div>
                </Hidden>
                
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps)(ProfileScreen)