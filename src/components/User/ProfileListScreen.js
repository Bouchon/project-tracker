import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Hidden from 'material-ui/Hidden'

import Header from '../App/Header'
import ProfileCards from './ProfileCards'

const css = {
    container: {
        padding: '0 10vw',
        marginTop: '15px'
    }
}

class ProfileListScreen extends Component {
    state = { usersQuery: null }

    setUsersQuery () {
        const { match } = this.props
        console.log(this.props)

        if (Object.keys(match.params).length === 0) {
            this.setState({ usersQuery: this.props.allUsersQuery })
        } else {
            this.setState({ usersQuery: this.props.allUsersQuery })
        }
    }

    render () {
        const usersQuery = this.props.allUsersQuery
        let allUsers = []
        if (usersQuery !== null && usersQuery.loading === false && usersQuery.allUsers !== null) {
            allUsers = usersQuery.allUsers
        }
        return (
            <div>
                <Header />
                <Hidden mdUp>
                    <div style={ css.container }>
                        <ProfileCards users={ allUsers } />
                    </div>
                </Hidden>
                <Hidden smDown>
                    <div style={{ ...css.container, marginLeft: '200px' }}>
                        <ProfileCards users={ allUsers } />
                    </div>
                </Hidden>
            </div>
        )
    }
}

const ALL_USERS_QUERY = gql`
query AllUsersQuery {
    allUsers {
        id
        name
        email
    }
}
`



export default compose(
        graphql(ALL_USERS_QUERY, { name: 'allUsersQuery' }),
        )(ProfileListScreen)