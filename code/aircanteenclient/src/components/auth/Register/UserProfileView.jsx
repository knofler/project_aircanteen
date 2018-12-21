import React from 'react'
import { authRequest } from '../../../helpers/requestHelper'
import App from './../../../App'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { newToastNotification, resetNotifications } from '../../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
class UserProfileView extends React.Component {
    
    viewProfileContent() {
        return (
            <div className="container">
                <div className="row top">
                    {/* <div className="col-sm-2">
                    </div> */}
                    <div className="centerDiv col-sm-12 form-elegant divShadow">
                        <br />
                        <div className="titleColor">
                            <p className=" h1 text-center mb-4">Profile view</p>
                        </div>
                    </div>
                    {/* <div className="col-sm-2">
                    </div> */}

                </div>
            </div>
        )
    }
    render() {
        return (
            <App content={this.viewProfileContent()} />
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        newToastNotification,
        resetNotifications
    }, dispatch)
)

export default connect(null, mapDispatchToProps)(UserProfileView)