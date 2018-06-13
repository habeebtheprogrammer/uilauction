import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './component/homepage/index';
import Login from "./component/login/index"
import Notfound from "./component/error/index"
import Register from "./component/register/index"
import Dashboard from "./component/dashboard/index"
import News from "./component/news/index"
import Appartment from "./component/appartment/index"
import Shows from "./component/shows/index"
import Marketplace from "./component/marketplace/index"
import Product from "./component/product/index"
import Artist from "./component/artist/index"
import Contactseller from "./component/contactseller/index"
import Search from "./component/search/index"
import Setting from "./component/settings/index"
import Profile from "./component/profile/index"
import Pricing from "./component/pricing/index"
import Mc from "./component/mc/index"
import Signup from "./component/signup/index"
import Buy from "./component/buy/index"
import jwt from "jsonwebtoken"
import Success from "./component/signup/success"
import Msuccess from "./component/buy/success"
import Calender from "./component/calender/index"
import Events from "./component/calender/events"
import Event from "./component/calender/event"
import Event2 from "./component/dashboard/events"
import Searchevents from "./component/events/index"
import Edititem from "./component/dashboard/edititem"
import Commingsoon from "./component/commingsoon/index"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Privateroute from "./container/privateroute"
import Contact from "./component/extras/contact"
import About from "./component/extras/about"
import About2 from "./component/profile/about"
import Tac from "./component/extras/tac"
import Privacy from "./component/extras/privacy"
import $ from "jquery"
import Password from './component/reset/password';
import Resetpassword from './component/reset/reset';

import Join from "./join"
class Main extends Component {

    render() {
        
        return (
            <div className="">
                <Join />
                <Switch>
                    <Route exact path="/" render={(props) => (
                            <Homepage {...props} />
                    )} />
                    <Route exact path="/register" render={(props) => (
                        window.localStorage.getItem("jwToken")?
                            <Register {...props} />:window.location.assign("/") 
                       
                    )} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/success/:token" render={(props)=>(
                        jwt.decode(props.match.params.token)?<Success {...props} Registeration={true} />:<Notfound />
                    )} />
                    <Route exact path="/reset_password/:token" render={(props) => (
                        jwt.decode(props.match.params.token) ? <Resetpassword {...props} /> : <Notfound />
                    )} />
                    <Route exact path="/payment_successful/:token" render={(props) => (
                        jwt.verify(props.match.params.token,"o1l2a3m4i5d6e") ? <Msuccess {...props} payment={true} /> : <Notfound />
                    )} />
                    <Route exact path="/verify/:token" render={(props) => (
                        jwt.decode(props.match.params.token) ? <Success {...props} Verification={true} /> : <Notfound />
                    )} />
                    {/* <Route exact path="/register" component={Register} /> */}
                    <Route exact path="/buy/:id" component={Buy} />
                    <Privateroute exact path="/dashboard" component={Dashboard} />
                    <Route  path="/news" component={News} />
                    <Route exact path="/marketplace" component={Marketplace} />
                    <Route exact path="/marketplace/:id" component={Product} />
                    <Route exact path="/appartment" component={Commingsoon} />
                    <Route exact path="/shows" component={Commingsoon} />
                    <Route exact path="/artists" component={Search} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/about/:id" component={About2} />
                    <Route exact path="/terms-and-condition" component={Tac} />
                    <Route exact path="/privacy-policy" component={Privacy} />
                    <Route exact path="/calendar" component={Calender} />
                    <Route exact path="/calendar/events" component={Events} />
                    <Route exact path="/calendar/events/:id" component={Event} />
                    <Route exact path="/events" component={Searchevents} />
                    <Route exact path="/dashboard/event/:id" component={Event2} />
                    <Route exact path="/dashboard/item/:id" component={Edititem} />
                    <Route exact path="/artists/:id" component={Artist} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/password-reset" component={Password} />
                    <Route exact path="/pricing" component={Pricing} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/media-channel" component={Mc} />
                    <Route exact path="/media-channel/:id" component={Mc} />
                    <Route exact path="/artist/:id" component={Profile} />
                    <Privateroute exact path="/setting" component={Setting} />
                    <Route exact path="/contact/:id" component={Contactseller} />
                    <Route exact path="/commingsoon" component={Commingsoon} />
                    <Route exact path="*" component={Notfound} />
                </Switch>

            </div>
        );
    }
}

export default Main;