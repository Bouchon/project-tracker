import React, { Component } from 'react'

import { GC_AUTH_TOKEN } from '../../constants'

/* REACT ROUTER */
import { BrowserRouter } from 'react-router-dom'

/* APOLLO WRAPPER */
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

class ApolloWrapper extends Component {
    constructor () {
        super()
        const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cja3poo7h7snt0109pfpbc5h2' })
        const middlewareAuthLink = new ApolloLink((operation, forward) => {
            const token = localStorage.getItem(GC_AUTH_TOKEN)
            const authorizationHeader = token ? `Bearer ${token}` : null
            operation.setContext({
              headers: {
                authorization: authorizationHeader
              }
            })
            return forward(operation)
          })
          
        const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)
        this.client = new ApolloClient({ link: httpLinkWithAuthToken, cache: new InMemoryCache() })
    }

    render() {
        return (
            <ApolloProvider client={ this.client }>{ this.props.children }</ApolloProvider>
        )
    }
}

export default class Wrapper extends Component {
    render () {
        return (
            <BrowserRouter>
                <ApolloWrapper>
                    { this.props.children }
                </ApolloWrapper>
            </BrowserRouter>
        )
    }
}