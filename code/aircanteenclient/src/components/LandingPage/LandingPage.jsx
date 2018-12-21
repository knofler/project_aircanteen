import React from 'react'
import './LandingPage.css'
import callNow from '../../assets/call-now.svg'
import goAcc from '../../assets/go-to-account.svg'

import { newToastNotification, resetNotifications } from '../../actions/toastAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import pay1 from '../../assets/payments/1.png'
// import pay2 from '../../assets/payments/2.png'
// import pay3 from '../../assets/payments/3.png'

import fakeChefs from '../../fake-data/home-chef.json'
import App from '../../App'

class LandingPage extends React.Component {

  state = {
    chefsDisplayable: null,
    selectedLocationID: null,
  }

  componentWillMount() {
    // console.log( 'chefs', fakeChefs )
    this.setState( {
      selectedLocationID: fakeChefs[ 0 ][ 'id' ],
      chefsDisplayable: fakeChefs[ 0 ][ 'chefs' ]
    } )
  }

  componentDidMount() {
    document.title = 'Welcome to Online Food Shop'
  }

  handleChefByLocation( id ) {
    let locations = fakeChefs.find( l => l.id == id )
    this.setState( {
      selectedLocationID: id,
      chefsDisplayable: locations.chefs.sort( () => Math.random() - 0.5 )
    }, () => {
      this.state.chefsDisplayable.map( f => {
        console.log(f)
      } )
    } )
  }

  renderChefs() {
    if ( this.state.chefsDisplayable !== null ) {
      return this.state.chefsDisplayable.map( ( chef, index ) => {
        let x = Math.floor(Math.random() * 399) + 599
        let dyiImg = x + 'x' + x
        return <div className="chef-tab col-sm-4" key={ chef.id }>
          <div className="card-outer">
            <div className="card-header-image">
              <img 
                className="product-img" 
                src={ 'https://source.unsplash.com/'+dyiImg+'/?food' } 
              alt="..."/>
            </div>
            <div className="card-body">
              <h4>
                { chef.full_name + ' ' }
                <span className="badge">
                  <i className="fas fa-star"></i>{ ' ' + chef.rating } 
                </span>
              </h4>
              Lorem ipsum doler sit amte, orbi blandit felis eros.
            </div>
          </div>
        </div>
      } )
    } else {
      return <div>loading...</div>
    }
  }

  renderTabLocations() {
    return <div className="_tab_menu">
      {
        fakeChefs.map( locations => {
          return <div onClick={ () => this.handleChefByLocation( locations.id ) } 
            className = { this.state.selectedLocationID == locations.id ? "active-location-tab location-tab" : "location-tab" }
            key={ locations.id }>
              { locations.city_name }
          </div>
        } )
      }
    </div>
  }

  newToast( title, status ) {
    this.props.newToastNotification({
      title,
      status
    })
    setTimeout(() => {
      this.props.resetNotifications()
    }, 8000)
  }

  renderLandingPage() {
    return (
      <div className="landingpage-wrapper">

        {/* <button onClick={e => {
          e.preventDefault()
          this.newToast( 'Something good happend!', 'success' )
        }}>Toast Success!</button>

        <button onClick={e => {
          e.preventDefault()
          this.newToast( 'Something goes wrong!', 'danger' )
        }}>Toast Danger!</button> */}

        <div className="search-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-6">
                <div className="_jt">
                  Discover the food that you love
                </div>
                <div className="_sf">
                  <div className='_sf_f'>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fas fa-map-marker-alt"></i></div>
                        <input type="text" className="form-control" id="searchbox" placeholder="Enter your delivery address"/>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">Find Food</button>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-md-6 __imb_wrp hidden-xs">
                <img className='__imb' src="https://i.imgur.com/9vJh5mK.png" alt=""/>
              </div>
            </div>
          </div>
        </div>


        <div className="chef-locatior-wrapper">
          <div className="container">

            <div className="row text-center p20">
              <div className='_tph'>Lorem Ipsum Dolor Sit Amet</div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit felis eros, ut euismod dui accumsan et.</p>
            </div>

            <div className="_tabs">
              <div className="_tabs_header">
                { this.renderTabLocations() }
              </div>
              <div className="_tabs_body row">
                { this.renderChefs() }
              </div>
            </div>

            {/* <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-8">
              
                <div className="row search-box-wrapper">
                  <div className="col-sm-12">

                    <div className="form-custom-location">
                      <span className='fascon' for="cls"><i className="fas fa-map-marker-alt"></i></span>
                      <input type="text" className="form-control fassearch" id="cls" placeholder="Start here by entering your location"/>
                      <button className="btn btn-primary"><i className="fas fa-search"></i> Find Food</button>
                    </div>

                  </div>
                  <div className="col-sm-2"></div>
                </div>

              </div>
            </div> 

            <div className="row">
              <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elitx. </p>
            </div> 

            <div className="row hidden-xs">
              <div className="col-md-2"></div>
              <div className="col-sm-5 col-md-4">
                {
                  fakeChefs.map( locations => {
                    return <div onClick={ () => this.handleChefByLocation( locations.id ) } 
                      className = { this.state.selectedLocationID == locations.id ? "active-location-tab location-tab" : "location-tab" }
                      key={ locations.id }>
                      <i className="fas fa-map-marker-alt"></i> { locations.city_name }
                      {
                        this.state.selectedLocationID == locations.id && <span className="pull-right"><i className="fas fa-caret-right"></i></span>
                      }
                    </div>
                  } )
                }
              </div>
              <div className="col-sm-7 col-md-6">
                { this.renderChefs() }
              </div>
            </div> */}

          </div>
        </div>

        {/* <div className='landingpage-component-header'
          style={{backgroundImage: 'url('+bg+')'}}>
          
          <div className='container fh100'>
            
            <div className="row fh100">

              <div className="col-sm-6 header-wrp fh100">

                <h1 className="header-title">Put the food in your pocket</h1>
                <p className="header-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit felis eros, ut euismod dui accumsan et.</p>

                <a href="#" className="btn btn-primary app-download">
                  <i className="fab fa-google-play"></i> Download from Google Play
                </a>

              </div>
              <div className="col-sm-6"></div>

            </div>

          </div>

        </div> */}

        <div className="app-dwn-block">
          <div className="container">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-sm-4 col-md-4 hidden-xs">
                <img 
                  className="mockup-app"
                  src="http://www.yudiz.com/wp-content/uploads/2016/01/cs4-mockup-1.png" 
                alt=""/>
              </div>
              <div className="col-sm-8 col-md-6 col-xs-12">
                <h3>Put the food in your pocket</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <a href="#" className="btn btn-primary app-download">
                  <i className="fab fa-google-play"></i> Download from Google Play
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="help-block-wrapper">
          <div className="container">
            <div className="col-sm-6 hp-cont">
              <div className="_a">
                <img src={ callNow } alt=""/>
              </div>
              <div className='_b'>
                <h3>Need help ordering?</h3>
                <div className="hp-nest">Call +880912817371</div>
              </div>
            </div>
            <div className="col-sm-6 hp-cont">
              <div className="_a">
                <img src={ goAcc } alt=""/>
              </div>
              <div className='_b'>
                <h3>Login to your account</h3>
                <div className="hp-nest">
                  <a href='#'>Login</a> / <a href='#'>Sign Up</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-block-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h1>How it works</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi magni cum porro! Odit cupiditate eveniet nobis saepe aliquam, numquam quis adipisci non animi autem minus eius quas nesciunt ut dicta.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi magni cum porro! Odit cupiditate eveniet nobis saepe aliquam, numquam quis adipisci non animi autem minus eius quas nesciunt ut dicta.</p>
              </div>
              <div className="col-sm-6">
                <h1>About Us</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi magni cum porro! Odit cupiditate eveniet nobis saepe aliquam, numquam quis adipisci non animi autem minus eius quas nesciunt ut dicta.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi magni cum porro!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-block-wrapper">
          
          <div className="_t">We support the following payment methods</div>
          <div className="_i">
            {/* <img src={ pay1 } alt=""/>
            <img src={ pay2 } alt=""/>
            <img src={ pay3 } alt=""/> */}
            <img src="https://i.imgur.com/OW7j5J2.png" alt=""/>
          </div>

        </div>

        <div className="footer-wrapper">
          <div className="_l">
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Join Us</a>
            <a href="#">Terms of use</a>
            <a href="#">Customer Support</a>
            <a href="#">FAQ</a>
          </div>
          <div className="_c">
            &copy; Copyright 2018 &sdot; All rights reserved.
          </div>
        </div>

      </div>
    )
  }

  render() {
    return (
      <App content={ this.renderLandingPage() } />
    )
  }
}
// export default LandingPage

const mapDispatchToProps = dispatch => (
  bindActionCreators( { 
    newToastNotification, 
    resetNotifications 
  }, dispatch )
)

export default connect( null, mapDispatchToProps )( LandingPage )