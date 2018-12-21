import React from 'react'
import App from './../../../App'
import { publicRequest } from '../../../helpers/requestHelper'
import { newToastNotification, resetNotifications } from '../../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                new_password1 : '',
                new_password2 : '',
                uid : '',
                token : '',
            };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        console.log('this.props', this.props)
        console.log('uid', this.props.match.params.uid)
        console.log('token', this.props.match.params.token)
        this.setState({
            uid:this.props.match.params.uid,
            token: this.props.match.params.token,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        publicRequest('post', 'auth/password/reset/confirm/',
        {
            new_password1: this.state.new_password1,
            new_password2: this.state.new_password2,
            uid: this.state.uid,
            token: this.state.token,
        }
        ).then((res) => {
            console.log(res)
            this.newToast(res.detail, 'success')
            this.props.history.push('/login')
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


    ResetPasswordContent() {
        return (
            <div className="container">
                <div className="row top">
                    <div className="col-sm-4">
                    </div>
                    <div className="centerDiv col-sm-4 form-elegant divShadow">
                        <br />
                        <div className="titleColor">
                            <p className=" h1 text-center mb-4">Reset Password</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">New Password</label>
                                <input
                                    name="new_password1"
                                    type="password"
                                    className="radius form-control"
                                    id="new_password1"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Confirm New Password</label>
                                <input
                                    name="new_password2"
                                    type="password"
                                    className="radius form-control"
                                    id="new_password2"
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
            <App content={this.ResetPasswordContent()} />
        )
    }
}

// export default ResetPassword
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        newToastNotification,
        resetNotifications
    }, dispatch)
)

export default connect(null, mapDispatchToProps)(ResetPassword)