import React from 'react'
import { authRequest } from '../../helpers/requestHelper'
import App from './../../App'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { newToastNotification, resetNotifications } from '../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Radio } from 'react-bootstrap'
class FoodCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state =
            {
                name: '',
                category: '',
                product_type: '',
                price: '',
                is_publish: '',
                owner: '',
                is_featured: '',
                attributes: '',
                description: '',
                successMsg: '',
                errorMsg: ''
            };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleChange = this.handleChange.bind(this)

        // console.log(this.props.location.query.id);
    }
    handleSubmit(event){}
    handleDateChange(event){}
    handleChange(event){}
    viewProfileContent() {
        return (
            <div className="container">
                <div className="row top">
                    {/* <div className="col-sm-2">
                    </div> */}
                    <div className="centerDiv col-sm-12 form-elegant divShadow">
                        <br />
                        <div className="titleColor">
                            <p className=" h1 text-center mb-4">Food Create</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Name</label>
                                    <input 
                                        name="name"
                                        type="text"
                                        required
                                        className="radius form-control"
                                        id="name"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Category</label>
                                    <select
                                        name='userTypeId'
                                        value={this.state.category}
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
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Product Type</label>
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
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Price</label>
                                    <input
                                        type="text"
                                        className="radius form-control"
                                        name='price'
                                        onChange={this.handleChange}
                                        value={this.state.price}
                                    />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Publish</label>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <Radio name="radioGroup" inline>
                                                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">yes</label>
                                            </Radio>{' '}
                                        </div>
                                        <div className='col-sm-6'>
                                            <Radio name="radioGroup" inline>
                                                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">No</label>
                                            </Radio>{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Owner</label>
                                    <select
                                        name='userTypeId'
                                        value={this.state.owner}
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
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Featured</label>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <Radio name="radioGroup" inline>
                                                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">yes</label>
                                            </Radio>{' '}
                                        </div>
                                        <div className='col-sm-6'>
                                            <Radio name="radioGroup" inline>
                                                <label htmlFor="exampleInputEmail1" className="bmd-label-floating">No</label>
                                            </Radio>{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Attributes</label>
                                    <textarea
                                        name="specialization"
                                        value={this.state.attributes}
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
                        </form>
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

export default connect(null, mapDispatchToProps)(FoodCreate)