import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { Link } from 'react-router-dom'

import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Button from 'material-ui/Button'

import Header from '../App/Header'

const css = {
    container: {
        width: '100%'
    },
    userInfos: {
        display: 'flex',
        margin: '30px 0'
    },
    avatar: {
        marginRight: '15px'
    },
    chipsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        margin: '15px 0'
    },
    chipsLabel: {
        width: '140px'
    },
    chipItem: {
        margin: '5px 10px 5px 0'
    }
}
class ProfileDashboard extends Component {
    getInitials (name) {
        const words = name.split(' ')
        return words.length === 1 ? 
            words[0][0].toUpperCase() : words[0][0].toUpperCase() + words[1][0].toUpperCase()
    }

    render () {
        const { userId, userQuery } = this.props
        
        let user = null
        if (userQuery.loading === false && userQuery.User !== undefined) {
            user = userQuery.User
        }

        return (
            <div style={ css.container }>
            { userQuery.loading === true ? <Typography>loading...</Typography> : (
                user === null ?
                    <Typography>User not found</Typography> : (
                    <div>
                        <Typography type='display1'>Profile</Typography>
                        <Typography type='caption'>#{ userId }</Typography>
                        <div style={ css.userInfos }>
                            <Avatar style={ css.avatar }>{ this.getInitials(user.name) }</Avatar>
                            <div>
                                <Typography><b>Name:</b> { user.name }</Typography>
                                <Typography><b>Email:</b> { user.email }</Typography>
                            </div>
                        </div>

                        <div style={ css.chipsContainer }>
                            <Typography style={ css.chipsLabel } type='subheading'>Created projects </Typography>
                            { user.authorProjects.length === 0 && <Typography type='caption'><i>no project created</i></Typography> }
                            { user.authorProjects.map(project => <Link key={ project.id } to={ '/projects/' + project.id }><Chip onClick={ () => {} } style={ css.chipItem } label={ project.name } /></Link>) }
                        </div>
                        <div style={ css.chipsContainer }>
                            <Typography style={ css.chipsLabel } type='subheading'>Member projects </Typography>
                            { user.memberProjects.length === 0 && <Typography type='caption'><i>no project participation</i></Typography> }
                            { user.memberProjects.map(project => <Chip key={ project.id } onClick={ () => {}} style={ css.chipItem } label={ project.name } />) }
                        </div>
                        <div style={ css.chipsContainer }>
                            <Typography style={ css.chipsLabel } type='subheading'>Created tasks </Typography>
                            { user.authorTask.length === 0 && <Typography type='caption'><i>no task created</i></Typography> }
                            { user.authorTask.map(task => <Chip key={ task.id } onClick={ () => {}} style={ css.chipItem } label={ task.name } />) }
                        </div>
                        <div style={ css.chipsContainer }>
                            <Typography style={ css.chipsLabel } type='subheading'>Created tasks </Typography>
                            { user.assigneeTasks.length === 0 && <Typography type='caption'><i>no task assigned</i></Typography> }
                            { user.assigneeTasks.map(task => <Chip key={ task.id } style={ css.chipItem } label={ task.name } />) }
                        </div>
                    </div>
            )) }
            </div>
        )
    }
}

const USER_QUERY = gql`
query UserQuery($userId: ID!) {
    User(id: $userId) {
        name
        email
        authorProjects {
          id
          name
        }
        memberProjects {
          id
          name
        }
        authorTask {
          id
          name
        }
        assigneeTasks {
          id
          name
        }
    }
}
`

export default graphql(USER_QUERY, { name: 'userQuery', options: ({ userId }) => ({ variables: { userId } }) })
(ProfileDashboard)