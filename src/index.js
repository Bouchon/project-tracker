import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './configureStore'
import AppWrapper from './components/App/AppWrapper'
import AppRoutes from './components/App/AppRoutes'

const root = document.getElementById('app')
const { store, persistor, history } = configureStore()

ReactDOM.render(<AppWrapper store={ store } persistor={ persistor } history={ history } />, root)