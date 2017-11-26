import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './configureStore'
import AppWrapper from './components/App/AppWrapper'

const root = document.getElementById('app')
const { store, persistor } = configureStore()
ReactDOM.render(<AppWrapper store={ store } persistor={ persistor } />, root)