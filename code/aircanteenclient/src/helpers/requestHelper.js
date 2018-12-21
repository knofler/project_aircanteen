import Axios from 'axios'
import { restpath } from './pathHelper'

export const validToken = () => {
  let token = localStorage.getItem( '_airUserToken' )
  if( token != null ) {
    let user = localStorage.getItem( '_airUserName' )
    if( user != null ) {
      let sendable = {}
      sendable[ '_airUserToken' ] = token
      sendable[ '_airUserName' ] = user
      return sendable
    } else {
      localStorage.removeItem( '_airUserToken' )
      localStorage.removeItem( '_airUserName' )
      return false
    }
  } else {
    return false
  }
}

export const authRequest = ( method, path, data = {} ) => {
  let _validToken = validToken()
  if( _validToken ) {
    return Axios( {
      method    : method,
      url       : restpath( path ),
      data      : data,
      headers   : {
        'Authorization': 'JWT ' + _validToken._airUserToken,
      }
    } ).then( ( res ) => {
       return res.data
    } )
  } else {
    return false
  }
}

export const publicRequest = ( method, path, data = {} ) => {
  return Axios( {
    method: method,
    url: restpath( path ),
    data: data
  } ).then( ( res ) => {
     return res.data
  } )
}
export const logout = () => {
  localStorage.removeItem('_airUserToken')
  localStorage.removeItem('_airUserName')
  localStorage.removeItem('_airUserId')
}
