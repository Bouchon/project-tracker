import React from 'react'
import ReactDOM from 'react-dom'

import store from './store'
import App from './components/App/App'

const root = document.getElementById('app')
ReactDOM.render(<App store={ store } />, root)