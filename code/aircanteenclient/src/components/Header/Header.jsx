import React from 'react'
import './Header.css'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown, MenuItem
} from 'react-bootstrap'
import { Link } from "react-router-dom"
import logo from '../../assets/logo.png'
import { publicRequest, logout } from '../../helpers/requestHelper'

class Header extends React.Component {
  
  constructor(props) {
    super(props)
    this.state =
      {
        authStatus : null
      };
    this.handleAuth = this.handleAuth.bind(this)

  }
  handleAuth(event){
    // let hello = event
    if(event === 2){
      publicRequest('post', 'auth/logout/'
      ).then((res) => {
        logout()
        console.log(res)
        // location.reload()
        // this.props.history.push('/')
        window.location = '/'
      }).catch((error) => {
        if (error.response) {
          this.setState({
            errorMsg: error.response.data
          })
          console.log('server', error)
        } else {
          // Something happened in setting up the request that triggered an Error
          // alert('Error', error.message)
          console.log(error)
        }
      })
    }
  }

  render() {
    let currentUser = localStorage.getItem('_airUserName')
    const menuLabels = {
      account: <span><i className="fas fa-user"></i> Account</span>
    }

    if (currentUser == null){
      return (
        <div className='navbar-wrapper'>
          <div className="container">
            <div className="row">
              <div className="navbar">
                <div className="_a">
                  <Link className='logo-link' to='/'>
                    <img className="header-logo" src={ logo } alt=""/>
                  </Link>
                </div>
                <div className="_b">
  
                  {/* <div eventKey={1} href="#" className="phone-call-menu">
                    <i className="fas fa-mobile-alt"></i> 
                    <span className="mobile-no">+880171200080</span>
                    <span className="help-text">Need Help?</span>
                  </div>
  
                  <div className="account-l">
                    <NavDropdown eventKey={3} title={ menuLabels.account } id="basic-nav-dropdown">
                      <li>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Sign Up</Link>
                      </li>
                    </NavDropdown>
                  </div> */}
                  
  
                  <Link className='btn btn-default auth-btn' to='/login'>Sign In</Link>
                  <Link className='btn btn-default auth-btn' to='/register'>Sign Up</Link>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <Navbar className="navbar navbar-static-top">
          <Navbar.Header>
            <Navbar.Brand>
            <Link className='logo-link' to='/'>
              <img className="header-logo" src={ logo } alt=""/>
            </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#" className="phone-call-menu">
              <i className="fas fa-mobile-alt"></i> 
              <span className="mobile-no">+880171200080</span>
              <span className="help-text">Need Help?</span>
            </NavItem>
            <NavDropdown 
              title={currentUser}
              value={this.state.authStatus}
              name="authStatus" 
              eventKey={this.state.authStatus}
              onSelect={this.handleAuth}
              id=''
            >
              <MenuItem value ="profile">Profile</MenuItem>
              <MenuItem eventKey={2}value="signOut">Sign Out</MenuItem>
              {/* 2 for log ot */}
            </NavDropdown>

          </Nav>
        </Navbar>
      )
    }

  }

}
export default Header
