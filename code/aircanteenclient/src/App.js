import React, { Component } from 'react'
import Header from './components/Header/Header'

class App extends Component {
  constructor( props ) {
    super( props )
  }
  render() {
    return (
      <div className="app-component">
        <Header/>
        { this.props.content }
      </div>
    );
  }
}

export default App