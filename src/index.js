import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './configureStore'
import App from './components/App/App'

const root = document.getElementById('app')
const { store, persistor } = configureStore()
ReactDOM.render(<App store={ store } persistor={ persistor } />, root)