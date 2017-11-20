import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants'

export default class Header extends Component {
    clickLogout = () => {
        localStorage.removeItem(GC_USER_ID)
        localStorage.removeItem(GC_AUTH_TOKEN)
    }

    render () {
        const userId = localStorage.getItem(GC_USER_ID)

        const login = userId ? <button onClick={ () => this.clickLogout() }>Logout</button> : <Link to='/login'>Login</Link>

        return (
            <div>
                <span><Link to='/'>Home</Link> - </span>
                <span><Link to='/create'>New</Link> - </span>
                <span>{ login }</span>
            </div>
        )
    }
}