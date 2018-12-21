export default ( state = [], action ) => {
  switch( action.type ) {

    case 'SHOW_TOAST_NOTIFICATION':
      return [
        ...state,
        Object.assign( {}, action.payload )
      ]

    case 'RESET_NOTIFICATION':
      return []

    default:
      return state

  }
}