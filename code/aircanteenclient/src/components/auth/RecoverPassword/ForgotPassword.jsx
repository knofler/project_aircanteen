import React from 'react'
import App from './../../../App'
import { publicRequest } from '../../../helpers/requestHelper'
import { newToastNotification, resetNotifications } from '../../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ForgotPassword extends React.Component{
    constructor(props) {
        super(props)
        this.state =
            {
                email: '',
            };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        publicRequest('post', 'auth/password/reset/',
            {
                email: this.state.email,
            }
        ).then((res) => {
            console.log(res)
            this.newToast(res.detail, 'success')
        }).catch((error) => {
            if (error.response) {
                this.setState({
                    errorMsg: error.response.data
                })
                console.log('server', error)
            } else {
                // Something happened in setting up the request that triggered an Error
                alert('Error', error.message)
            }
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    newToast(title, status) {
        this.props.newToastNotification({
            title,
            status
        })
        setTimeout(() => {
            this.props.resetNotifications()
        }, 3000)
    }

    
    forgotPasswordContent() {
        return (
            <div className="container">
                <div className="row top">
                    <div className="col-sm-4">
                    </div>
                    <div className="centerDiv col-sm-4 form-elegant divShadow">
                        <br />
                        <div className="titleColor">
                            <p className=" h1 text-center mb-4">Recover Password</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Email address</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="radius form-control"
                                    id="email"
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <button type="submit" className=" btunColor radius btn btn-block btn-primary ">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-4">
                    </div>

                </div>
            </div>
        )
    }

    render() {
        return (
            <App content={this.forgotPasswordContent()} />
        )
    }
}

// export default ForgotPassword
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        newToastNotification,
        resetNotifications
    }, dispatch)
)

export default connect(null, mapDispatchToProps)(ForgotPassword)