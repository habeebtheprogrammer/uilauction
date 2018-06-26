import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux";
import Paymentpage from "../component/paymentpage/index"
function mapStateToProps(state) {
    return { auth: state.auth }
}
class Privateroute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Route exact={true} path={this.props.path} render={
                    (props) => {
                        if (this.props.auth.isAuthenticated === true ) 
                            return <this.props.component {...props} />
                        
                        // else if (this.props.auth.isAuthenticated && this.props.auth.user.paid === true ) 
                        //     return <Register {...props}/>
                        
                         else 
                           return <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        

                    }
                } />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Privateroute);
