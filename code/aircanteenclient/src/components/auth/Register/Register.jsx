import React from 'react'
import './Register.css'
import App from './../../../App'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { publicRequest } from '../../../helpers/requestHelper' 
import { newToastNotification, resetNotifications } from '../../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state =
      {
        userName: '',
        email: '',
        password1: '',
        password2: '',
        errorMsg: '',
        successMsg: '',
        test: ''
      };
      // this.handleListChange = this.handleListChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.loginPage = this.loginPage.bind(this)

    // console.log(this.props.location.query.id);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  loginPage() {
    this.props.history.push('/login')
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

  handleSubmit(event) {
    // console.log('yo')
    event.preventDefault()
    publicRequest('post', 'registration/',
    {
      userName: this.state.userName,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
    }
  ).then((response) => {
    console.log('yo success',response)
      this.setState({
        test: response
      })
      this.newToast('confirmation email sent', 'success')
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

  responseFacebook(response) {
    publicRequest('get', 'profile/facebook-signup'+'?auth_token='+response.accessToken).then((res) => {
      this.setState({
        test: res,
      })
      this.newToast('sign in successfull', 'success')
      console.log(res)
      if (res.has_profile) {
        this.props.history.push('/')
        localStorage.setItem('_airUserToken', res.token)
        localStorage.setItem('_airUserName', res.username)
        localStorage.setItem('_airUserId', res.pk)
      }
      else {
        localStorage.setItem('_airUserToken', res.token)
        localStorage.setItem('_airUserName', res.username)
        localStorage.setItem('_airUserId', res.pk)
        this.props.history.push('/user/profile/create/' + res.pk)
      }
    }).catch((error) => {
      console.log('server', error)
    })
    console.log('responseFacebook', response);
  }

  responseGoogle(response) {
    publicRequest('get', 'profile/google-signup'+'?auth_token='+response.accessToken).then((res) => {
      this.setState({
        test:res,
      })
      this.newToast('sign in successfull', 'success')
      console.log(res)
      if (res.has_profile) {
        this.props.history.push('/')
        localStorage.setItem('_airUserToken', res.token)
        localStorage.setItem('_airUserName', res.username)
        localStorage.setItem('_airUserId', res.pk)
      }
      else {
        localStorage.setItem('_airUserToken', res.token)
        localStorage.setItem('_airUserName', res.username)
        localStorage.setItem('_airUserId', res.pk)
        this.props.history.push('/user/profile/create/' + res.pk)
      }
    }).catch((error)=>{
      console.log('server', error)
    })
    console.log('google', response);
  }

  renderFbButton(renderProps) {
    return (
      <a onClick={renderProps.onClick} title="Log in with facebook" className="si1 iconSocial">
        <i className="fab fa-facebook"></i>
      </a>
    )
  }

  renderGoogleButton(renderProps) {
    return (
      <a onClick={renderProps.onClick} title="Log in with google" className="si3 iconSocial">
        <i className="fab fa-google"></i>
      </a>
    )
  }

  renderRegister() {
    return (
      <div className="container">

        <div className="row top">
          <div className="col-sm-3">
          </div>
          <div className="centerDiv col-sm-6 form-elegant divShadow">
            <br/>
            <div className="titleColor">
              <p className=" h1 text-center mb-4">Sign Up</p>
            </div>
            <br/>
            <form onSubmit={this.handleSubmit}>
              {/* <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1" className="bmd-label-floating">First Name</label>
                  <input type="text" className="radius form-control" id="firstName" />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="exampleInputEmail1" className="bmd-label-floating">last Name</label>
                  <input type="text" className="radius form-control" id="lastName" />
                </div>
              </div> */}

              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">User Name</label>
                <input
                  type="text"
                  className="radius form-control"
                  id="userName"
                  name='userName'
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Email address</label>
                <input 
                  type="email"
                  className="radius form-control"
                  id="email"
                  name='email'
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="bmd-label-floating">Password</label>
                <input 
                  type="password"
                  className="radius form-control"
                  id="password1"
                  name='password1'
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="bmd-label-floating">Confirm Password</label>
                <input 
                  type="password"
                  className="radius form-control"
                  id="password2"
                  name='password2'
                  onChange={this.handleChange}
                />
                <br/>
              </div>

              <div className="row">
                <div className="col-sm-12 text-center">
                  <button type="submit" className=" btunColor radius btn btn-block btn-primary ">Sign Up</button>
                </div>
                {/* <div className="pull-right">
                  <button type="button" className=" btunColor radius btn btn-raised btn-primary ">Sign up </button>
                </div> */}
              </div>
            </form>
              <br/>
              <br/>
            <div>
              <small>
                <p className=" grey-text text-center">Or Sign up Using</p>
              </small>
              <div className="row">
                <div className="flex-c-m">
                  <FacebookLogin
                    appId="1299859883484861"
                    autoLoad={false}
                    fields="name,email,picture.type(large)"
                    callback={this.responseFacebook.bind(this)}
                    render={this.renderFbButton}
                  />
                  <a href="#" className="si2 iconSocial">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <GoogleLogin
                    clientId="711097483785-rcleansbsn82v3kre81e2ibqvp5lp4jk.apps.googleusercontent.com"
                    onSuccess={this.responseGoogle.bind(this)}
                    onFailure={this.responseGoogle.bind(this)}
                    render={this.renderGoogleButton}
                  >
                  </GoogleLogin>
                  <a href="#" title="Log in with phone" className="si1 iconSocial">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <br/>
              <br/>
              <div className="row">
                <div className="text-center">
                  <small>
                    <p className=" grey-text text-center">Already have an account?</p>
                  </small>
                  <div className="col-sm-12 text-center">
                    <button type="button" onClick={this.loginPage} className=" btunColor radius btn btn-primary ">Sign In</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="col-sm-3">
          </div>
          
        </div>
      </div>
    )
  }

  render() {
    return (
      <App content={ this.renderRegister() } />
    )
  }

}
// export default Register
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    newToastNotification,
    resetNotifications
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(Register)
