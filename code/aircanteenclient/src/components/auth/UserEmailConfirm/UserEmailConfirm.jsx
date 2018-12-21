import React from 'react'
import { publicRequest } from '../../../helpers/requestHelper'
import { newToastNotification, resetNotifications } from '../../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class UserEmailConfirm extends React.Component {

    constructor(props) {
        super(props)
        this.state =
            {
                
                test: ''
            };
        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleListChange = this.handleListChange.bind(this)
        // this.handleChange = this.handleChange.bind(this)

        // console.log(this.props.location.query.id);
    }
    componentDidMount(){
        console.log('this.props', this.props.match.params.token)
        publicRequest('post', 'registration/account-confirm-email/',
            {
                key: this.props.match.params.token
            }
        ).then((res) => {
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
    newToast(title, status) {
        this.props.newToastNotification({
            title,
            status
        })
        setTimeout(() => {
            this.props.resetNotifications()
        }, 8000)
    }
    render() {
        return (
            <div>confirming email...</div>
        )
    }
}
// export default UserEmailConfirm
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        newToastNotification,
        resetNotifications
    }, dispatch)
)

export default connect(null, mapDispatchToProps)(UserEmailConfirm)