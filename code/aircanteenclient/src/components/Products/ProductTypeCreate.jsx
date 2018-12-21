import React from 'react'
import { authRequest } from '../../helpers/requestHelper'
import App from './../../App'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { newToastNotification, resetNotifications } from '../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Radio} from 'react-bootstrap'
import _ from 'lodash'
import './ProductTypeCreate.css'
class ProductTypeCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state =
            {
                productTypeName :'',
                hasVariant : false,
                productAttributes : {},
                variantAttributes : {},
                successMsg: '',
                errorMsg: ''
            };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addNewProductAttribute = this.addNewProductAttribute.bind(this)
        this.variantAttribute = this.variantAttribute.bind(this)

        // console.log(this.props.location.query.id);
    }
    componentDidMount()
    {
        let pa = this.state.productAttributes
        let sand = {}
        sand['name'] = 0
        sand['value'] = 0
        // pa.
        this.setState({
            productAttributes: [...this.state.productAttributes, sand]
        })

        let va = this.state.variantAttributes
        let vsand = {}
        vsand['name'] = 0
        vsand['value'] = 0
        // pa.
        this.setState({
            variantAttributes: [...this.state.variantAttributes, vsand]
        })
    }
    addNewProductAttribute(event)
    {
        event.preventDefault()
        let pa = this.state.productAttributes
        let sand = {}
        sand['name'] = 0
        sand['value'] = 0
        // pa.
        this.setState({
            productAttributes: [...this.state.productAttributes, sand]
        })
        console.log('add', pa)
    }
    variantAttribute(event)
    {
        event.preventDefault()
        let va = this.state.variantAttributes
        let vsand = {}
        vsand['name'] = 0
        vsand['value'] = 0
        // pa.
        this.setState({
            variantAttributes: [...this.state.variantAttributes, vsand]
        })
    }
    removeProductAttribute(event) {
        let invo = this.state.productAttributes
        // delete( invo[ event.target.id ] )
        invo.splice(event.target.id, 1)
        this.setState({
            invoiceTerms: invo
        })
        console.log('remove', event.target.id)
        console.log('remove', invo)
    }
    removeVariantAttribute(event) {
        let invo = this.state.variantAttributes
        // delete( invo[ event.target.id ] )
        invo.splice(event.target.id, 1)
        this.setState({
            invoiceTerms: invo
        })
        console.log('remove', event.target.id)
        console.log('remove', invo)
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
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event){

    }
    viewProfileContent() {
        return (
            <div className="container">
                <div className="row top">
                    {/* <div className="col-sm-2">
                    </div> */}
                    <div className="centerDiv col-sm-12 form-elegant divShadow">
                        <br />
                        <div className="titleColor">
                            <p className=" h1 text-center mb-4">Product Type create</p>
                        </div>
                        <br />
                        <br />
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Type Name</label>
                                    <input
                                        type="text"
                                        className="radius form-control"
                                        name='productTypeName'
                                        onChange={this.handleChange}
                                        value={this.state.productTypeName}
                                    />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Has Variant</label>
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
                                <div className="col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Product Attributes</label>
                                    {/* <table> */}
                                        {_.map(this.state.productAttributes, (pa, index) => {
                                            return (
                                                <div className="row">
                                                    <div className="flex-c-m col-sm-12">
                                                    <input
                                                        name={index}
                                                        type="text"
                                                        className="radius form-control"
                                                        value={pa.value}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span
                                                        className="remove-selected-item"
                                                        name={index}
                                                        id={index}
                                                        onClick={this.removeProductAttribute.bind(this)}
                                                    >
                                                        x
                                                        </span>
                                                        
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Product Attributes</label>
                                    {/* <table> */}
                                    {_.map(this.state.variantAttributes, (pa, index) => {
                                        return (
                                            <div className="row">
                                                <div className="flex-c-m col-sm-12">
                                                    <input
                                                        name={index}
                                                        type="text"
                                                        className="radius form-control"
                                                        value={pa.value}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span
                                                        className="remove-selected-item"
                                                        name={index}
                                                        id={index}
                                                        onClick={this.removeVariantAttribute.bind(this)}
                                                    >
                                                        x
                                                        </span>

                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    {/* <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Product Attributes</label> */}
                                    <button
                                        onClick={this.addNewProductAttribute}
                                    >
                                    +
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    {/* <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Product Attributes</label> */}
                                    <button
                                        onClick={this.variantAttribute}
                                    >+</button>
                                </div>
                            </div>
                            <br/>
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

export default connect(null, mapDispatchToProps)(ProductTypeCreate)