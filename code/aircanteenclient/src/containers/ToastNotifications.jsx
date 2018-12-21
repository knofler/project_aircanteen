import React, { Component } from 'react'
import { connect } from 'react-redux'

import './toast.css'

import { newToastNotification } from '../actions/toastAction'
import { bindActionCreators } from 'redux'

class ToastNotifications extends Component {

  resetToasts() {
    this.props.newToastNotification([])
  }

  render() {
    if ( this.props.toast.length > 0 ) {
      return <div className="toastWrapper">
        {
          this.props.toast.map( ( t, i ) => {
            return <div className={ "toasts toast-" + t.status } key={ i }>
              { t.title }
            </div>
          } )
        }
      </div>
    }
    return null
  }
}

const mapStateToProps = ( state ) => (
  {
    toast: state.toast
  }
)

export default connect( mapStateToProps, null )( ToastNotifications )