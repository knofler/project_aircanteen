import React from 'react'
import { authRequest } from '../../helpers/requestHelper'
import App from './../../App'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { newToastNotification, resetNotifications } from '../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './fv.css'
class FoodVariantCreate extends React.Component {

    state = {
        attributes: [ { key: '', value: '' } ]
    }

    componentDidMount() {
        document.title = "Create Food Variant"
    }

    foodVariantForm() {
        return (
            <div className="container">
                <div className="row top">
                    <div className="centerDiv col-sm-12 form-elegant divShadow">
                        <h3>Food Variant Create</h3>
                        
                            <form style={{ marginTop: 40 }} enctype="multipart/form-data">

                                <div className="row">
                                    <div className="form-group col-sm-offset-3 col-sm-6 ">
                                        <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Food</label>
                                        <select 
                                            name='userTypeId'
                                            // value={this.state.userTypeId}
                                            required
                                            className="radius form-control" 
                                            id=""
                                            // onChange={this.handleChange}
                                        >
                                            <option value="1">Food test</option>
                                            <option value="2">Food t2</option>
                                            <option value="3">Test 3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-sm-offset-3 col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            className="radius form-control"
                                            id="name"
                                            // onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-sm-offset-3 col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Price Override</label>
                                        <input
                                            name="price_override"
                                            type="number"
                                            required
                                            className="radius form-control"
                                            id="price_override"
                                            // onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-sm-offset-3 col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Images</label>
                                        <input 
                                            type="file" 
                                            className="radius form-control"
                                            name = 'images'
                                            multiple
                                            accept="image/png, image/jpeg, image/jpg"
                                            // onChange = {this.handleChange}
                                            // value = {this.state.images}
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="form-group col-sm-offset-3 col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Quantity</label>
                                        <input
                                            name="quantity"
                                            type="number"
                                            required
                                            className="radius form-control"
                                            id="quantity"
                                            // onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-sm-offset-3 col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="bmd-label-floating">
                                            Attributes 
                                            <a 
                                                onClick={e => {
                                                    e.preventDefault()
                                                    this.setState( {
                                                        attributes: [ ...this.state.attributes, { key: '', value: '' } ]
                                                    })
                                                    console.log(this.state.attributes)
                                                }}
                                                href="#" 
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'rgb(59, 199, 122)',
                                                    marginLeft: 10,
                                                    fontSize: 18
                                                }}
                                            ><i class="fas fa-plus-circle"></i></a>
                                        </label>
                                        {this.state.attributes.length > 0 && (
                                            <div className="attr-wrapper">
                                                {this.state.attributes.map( ( attr, index ) => {
                                                    return <div className="attr-container">
                                                        <input className="form-control" type="text" placeholder="Key"/> : <input className="form-control" type="text" placeholder="Value"/>
                                                    </div>
                                                } )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-sm-offset-3 col-sm-6">
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" value="dwd"/>
                                                <span>Track Inventory</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-sm-offset-3 col-sm-6">
                                        <button className="btn btn-primary btn-block">Submit</button>
                                    </div>
                                </div>

                            </form>
                        {/* </div> */}
                    </div>
                    

                </div>
            </div>
        )
    }
    render() {
        return (
            <App content={this.foodVariantForm()} />
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        newToastNotification,
        resetNotifications
    }, dispatch)
)

export default connect(null, mapDispatchToProps)(FoodVariantCreate)