import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { GC_USER_ID } from '../../constants'

class CreateLink extends Component {
    state = { description: '', url: '' }

    changeDescription = (event) => this.setState({ description: event.target.value })        
    changeUrl = (event) => this.setState({ url: event.target.value })

    submit = async () => {        
        const postedById = localStorage.getItem(GC_USER_ID)        
        if (!postedById) { console.error('Not logged'); return }
        
        const { description, url } = this.state
        await this.props.createLinkMutation({ variables: { description, url, postedById } })
        this.props.history.push(`/`)
    }

    render () {
        const { description, url } = this.state

        return (
            <div>
                <label>Description : </label>
                <input value={ description } onChange={ this.changeDescription } />
                <br />

                <label>Url : </label>
                <input value={ url } onChange={ this.changeUrl } />
                <br />

                <button onClick={ this.submit }>Create</button>
            </div>
        )
    }
}

const CREATE_LINK_MUTATION = gql`
    mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
        createLink(
            description: $description,
            url: $url,
            postedById: $postedById
        ) {
            id
            createdAt
            url
            description
            postedBy {
                id
                name
            }
        }
    }
`

export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink)