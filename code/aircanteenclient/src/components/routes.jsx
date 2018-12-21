import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from './LandingPage/LandingPage'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'
import UserProfileCreate from './Auth/Register/UserProfileCreate'
import UserProfileView from './Auth/Register/UserProfileView'
import UserProfileUpdate from './Auth/Register/UserProfileUpdate'
import UserEmailConfirm from './Auth/UserEmailConfirm/UserEmailConfirm'
import ForgotPassword from './Auth/RecoverPassword/ForgotPassword'
import ResetPassword from './Auth/RecoverPassword/ResetPassword'
import ProductTypeCreate from './Products/ProductTypeCreate'
import FoodCreate from './Products/FoodCreate'
import FoodVariantCreate from './Products/FoodVariantCreate'
import ToastNotifications from '../containers/ToastNotifications'

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div className="routes-dom">
          <ToastNotifications/>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/user/profile/create/:userId' component={UserProfileCreate} />
          <Route exact path='/user/profile/view/:userId' component={UserProfileView} />
          <Route exact path='/user/profile/update/:userId' component={UserProfileUpdate} />
          <Route exact path='/user/confirm/:token' component={UserEmailConfirm} />
          <Route exact path='/forgot/password' component={ForgotPassword} />
          <Route exact path='/reset/password/:uid/:token' component={ResetPassword} />
          <Route exact path='/product/type/create' component={ProductTypeCreate} />
          <Route exact path='/food/create' component={FoodCreate} />
          <Route exact path='/food/variant/create' component={FoodVariantCreate} />
        </div>
      </Router>
    )
  }
}
export default Routes
