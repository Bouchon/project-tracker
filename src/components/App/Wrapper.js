import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import { GC_AUTH_TOKEN } from '../../constants'

/* REACT ROUTER */
import { BrowserRouter as Router } from 'react-router-dom'

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

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Rubik'
    }
})

export default class Wrapper extends Component {
    render () {
        const { store, persistor } = this.props
        return (
            <Router>
                <Provider store={ store }>
                    <PersistGate persistor={ persistor }>
                        <ApolloWrapper>
                            <MuiThemeProvider theme={ theme }>
                            { this.props.children }
                            </MuiThemeProvider>
                        </ApolloWrapper>
                    </PersistGate>
                </Provider>
            </Router>
        )
    }
}