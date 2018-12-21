import React, { Component } from 'react'
import { connect } from 'react-redux'

import { newToastNotification } from '../actions/toastAction'
import { bindActionCreators } from 'redux'

class ToastContainer extends Component {

  componentDidMount() {
    this.props.newToastNotification( {
      title: this.props.title,
      status: this.props.status
    } )
  }

  render() {
    return null
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators( { newToastNotification }, dispatch )
)

export default connect( null, mapDispatchToProps )( ToastContainer )