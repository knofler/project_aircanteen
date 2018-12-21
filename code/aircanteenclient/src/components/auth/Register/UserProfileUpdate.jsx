import React from 'react'
import { authRequest } from '../../../helpers/requestHelper'
import App from './../../../App'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { newToastNotification, resetNotifications } from '../../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
class UserProfileUpdate extends React.Component {

    viewProfileContent() {
        return (
            <div className="container">
                <div className="row top">
                    {/* <div className="col-sm-2">
                    </div> */}
                    <div className="centerDiv col-sm-12 form-elegant divShadow">
                        <br />
                        <div className="titleColor">
                            <p className=" h1 text-center mb-4">Profile update</p>
                        </div>
                        {/* <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">User Type</label>
                                    <select
                                        name='userTypeId'
                                        value={this.state.userTypeId}
                                        required
                                        className="radius form-control"
                                        id=""
                                        onChange={this.handleChange}
                                    >
                                        <option value="1">Chef</option>
                                        <option value="2">Customer</option>
                                        <option value="3">Rider</option>
                                    </select>
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Gender</label>
                                    <select
                                        name='gender'
                                        value={this.state.gender}
                                        className="radius form-control"
                                        onChange={this.handleChange}
                                        id=""
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Avater</label>
                                    <input
                                        type="file"
                                        className="radius form-control"
                                        name='avater'
                                        onChange={this.handleChange}
                                        value={this.state.avater}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Date Of Birth</label>
                                    <DatePicker
                                        selected={this.state.dateOfBirth}
                                        onChange={this.handleDateChange}
                                        className='radius form-control'
                                        name='dateOfBirth'
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Phone</label>
                                    <input
                                        name="phone"
                                        type="text"
                                        required
                                        className="radius form-control"
                                        id="phone"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Delivery Method</label>
                                    <select
                                        name='deliveryMethod'
                                        value={this.state.deliveryMethod}
                                        className="radius form-control"
                                        onChange={this.handleChange}
                                        id=""
                                    >
                                        <option value="1">Air</option>
                                        <option value="2">Time Travel</option>
                                        <option value="3">By Drone</option>
                                    </select>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">National Id</label>
                                    <input
                                        name="nationalId"
                                        type="text"
                                        className="radius form-control"
                                        id="nationalId"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Specialization</label>
                                    <textarea
                                        name="specialization"
                                        value={this.state.specialization}
                                        onChange={this.handleChange}
                                        className="radius form-control"
                                        id="" cols="30"
                                        rows="3"
                                    >
                                    </textarea>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Description</label>
                                    <textarea
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        className="radius form-control"
                                        id="" cols="30"
                                        rows="3"
                                    >
                                    </textarea>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <button type="submit" className=" btunColor radius btn btn-block btn-primary ">Save</button>
                                </div>
                            </div>
                        </form> */}
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

export default connect(null, mapDispatchToProps)(UserProfileUpdate)