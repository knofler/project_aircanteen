import React from 'react'
import './Login.css'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import App from './../../../App'
import { publicRequest } from '../../../helpers/requestHelper' 
import { newToastNotification, resetNotifications } from '../../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state =
      {
        email:'',
        password:'',
        errorMsg:'',
        successMsg:'',
        test:''
      };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordReset = this.handlePasswordReset.bind(this)
    this.registerPage = this.registerPage.bind(this)
    this.handleChange = this.handleChange.bind(this)

    // console.log(this.props.location.query.id);
  }


  handleSubmit(event) {
    // console.log('yo')
    event.preventDefault()
    publicRequest('post', 'auth/login/',
      {
        email: this.state.email,
        password: this.state.password,
      }
    ).then((res) => {
      this.setState({
        test: res
      })
      console.log(res)
      if (res.has_profile) {
        // this.props.history.push('/')
        window.location = '/'
        localStorage.setItem('_airUserToken', res.token)
        localStorage.setItem('_airUserName', res.user.username)
        localStorage.setItem('_airUserId', res.user.pk)
      }
      else {
        localStorage.setItem('_airUserToken', res.token)
        localStorage.setItem('_airUserName', res.user.username)
        localStorage.setItem('_airUserId', res.user.pk)
        this.props.history.push('/user/profile/create/' + res.user.pk)
      }
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

  registerPage() {
    this.props.history.push('/register')
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handlePasswordReset(event) {
    console.log('labooh')
    this.newToast('redirecting to password recovery', 'success')
    this.props.history.push('/forgot/password')

  }

  responseFacebook(response) {
    publicRequest('get', 'profile/facebook-signup' + '?auth_token=' + response.accessToken).then((res) => {
      this.setState({
        test: res,
      }, () => { this.newToast('you have successfully logged in with facebook', 'success')})
      console.log(res)
      if( res.has_profile )
        {
          // this.props.history.push('/')
          window.location = '/'
          localStorage.setItem('_airUserToken', res.token)
          localStorage.setItem('_airUserName', res.username)
          localStorage.setItem('_airUserId', res.pk)
        }
      else
        {
          localStorage.setItem('_airUserToken', res.token)
          localStorage.setItem('_airUserName', res.username)
          localStorage.setItem('_airUserId', res.pk)
          this.props.history.push('/user/profile/create/'+res.pk)
        }
    }).catch((error) => {
      console.log('server', error)
    })
    console.log('responseFacebook', response);
  }

  responseGoogle(response) {
    publicRequest('get', 'profile/google-signup' + '?auth_token=' + response.accessToken).then((res) => {
      this.setState({
        test: res,
      })
      console.log(res)
      if (res.has_profile) {
        // this.props.history.push('/')
        window.location = '/'
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
    console.log('google', response);
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

  renderLogin() {
    return (
      <div className="container">
        <div className="row top">
          <div className="col-sm-4">
          </div>
          <div className="centerDiv col-sm-4 form-elegant divShadow">
            <br/>
            <div className="titleColor">
              <p className=" h1 text-center mb-4">Sign In</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Email address</label>
                <input 
                  name="email"
                  type="email" 
                  className="radius form-control" 
                  id="exampleInputEmail1" 
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="bmd-label-floating">Password</label>
                <input 
                  name="password"
                  type="password" 
                  className="radius form-control" 
                  id="exampleInputPassword1" 
                  onChange={this.handleChange}
                />
                <br/>
                <small>
                  <p className="font-small grey-text d-flex justify-content-end text-right">Forgot <a href="#" className="dark-grey-text ml-1" onClick={this.handlePasswordReset}> Password?</a></p>
                </small>
              </div>

              <div className="row">
                <div className="col-sm-12 text-center">
                  <button type="submit" className=" btunColor radius btn btn-block btn-primary ">Sign In</button>
                </div>
              </div>
            </form>
              <br/>
              <br/>
            <div>
              <small>
                <p className=" grey-text text-center">Or Sign In Using</p>
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
                  <a href="#" title="Log in with twitter" className="si2 iconSocial">
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
                    <p className=" grey-text text-center">Don't have an account?</p>
                  </small>
                  <div className="col-sm-12 text-center">
                    <button type="button" onClick={this.registerPage} className=" btunColor radius btn btn-primary ">Sign Up</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="col-sm-4">
          </div>
          
        </div>
      </div>
    )
  }

  render() {
    return (
      <App content={ this.renderLogin() } />
    )
  }

}
// export default Login


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    newToastNotification,
    resetNotifications
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(Login)