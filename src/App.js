import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div className="body-div">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Funbox test</a>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )}
}
