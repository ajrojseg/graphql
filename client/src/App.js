import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { isLoggedIn, logout } from './utils/auth'
import { CompanyDetail } from './components/CompanyDetail'
import { LoginForm } from './components/LoginForm'
import { CreateAccountForm } from './components/CreateAccountForm'
import { JobBoard } from './components/JobBoard'
import { JobDetail } from './components/JobDetail'
import { JobForm } from './components/JobForm'
import { NavBar } from './components/NavBar'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: isLoggedIn() }
  }

  handleLogin() {
    this.setState({ loggedIn: true })
    this.router.history.push('/')
  }

  handleLogout() {
    logout()
    this.setState({ loggedIn: false })
    this.router.history.push('/')
  }

  render() {
    const { loggedIn } = this.state

    return (
      <Router ref={(router) => this.router = router}>
        <Fragment>
          <NavBar loggedIn={ loggedIn } onLogout={ this.handleLogout.bind(this) } />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={ JobBoard } />
                <Route path="/companies/:companyId" component={ CompanyDetail } />
                <Route exact path="/jobs/new" component={ JobForm } />
                <Route path="/jobs/:jobId" component={ JobDetail } />
                <Route exact path="/login" render={() => <LoginForm onLogin={ this.handleLogin.bind(this) } />} />
                <Route exact path="/create-account" component={ CreateAccountForm } />
              </Switch>
            </div>
          </section>
        </Fragment>
      </Router>
    )
  }
}
