import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './component/homepage/index';
import Login from "./component/login/index"
import Notfound from "./component/error/index"
import Dashboard from "./component/dashboard/index"
import Marketplace from "./component/marketplace/index"
import Product from "./component/product/index"
import Signup from "./component/signup/index"
import Buy from "./component/buy/index"
import jwt from "jsonwebtoken"
import Success from "./component/signup/success"
import Msuccess from "./component/buy/success"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Privateroute from "./container/privateroute"
import Contact from "./component/extras/contact"
import About from "./component/extras/about"
import Tac from "./component/extras/tac"
import Privacy from "./component/extras/privacy"
import $ from "jquery"
import Password from './component/reset/password';
import Resetpassword from './component/reset/reset';

import Join from "./join"
import Pay from './component/pay';
class Main extends Component {

    render() {
        
        return (
            <div className="">
                <Join />
                <Switch>
                    <Route exact path="/" render={(props) => (
                            <Homepage {...props} />
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
                    <Privateroute exact path="/pay/:id" component={Pay} />
                    <Route exact path="/marketplace" component={Marketplace} />
                    <Route exact path="/marketplace/:id" component={Product} />
                    
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/terms-and-condition" component={Tac} />
                    <Route exact path="/privacy-policy" component={Privacy} />
                    
                    <Route exact path="/password-reset" component={Password} />
                    
                    <Route exact path="/signup" component={Signup} />
                    
                    <Route exact path="*" component={Notfound} />
                </Switch>

            </div>
        );
    }
}

export default Main;