import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NavBar extends Component {
  render() {
    const { loggedIn, onLogout } = this.props

    return (
      <nav className="navbar">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">Home</Link>
          { loggedIn 
            ? <Link className="navbar-item" to="/jobs/new">Post Job</Link>
            : <Link className="navbar-item" to="/login">Login</Link>
          } 
          { !loggedIn && <Link className="navbar-item" to="/create-account">Create Account</Link> }
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          { loggedIn && <a className="navbar-item" onClick={ onLogout }>Logout</a> }
        </div>
      </nav>
    )
  }
}
