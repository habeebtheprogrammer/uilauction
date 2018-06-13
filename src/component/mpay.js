import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import jwt from "jsonwebtoken"
import axios from "axios"
import apiUrl from "../config"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import setAuthorizationToken from "../component/auth"
import { setCurrentUser } from "../actions"
function mapStateToProps(state) {
    return {

    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentUser: setCurrentUser
    }, dispatch)
}

class Paypal extends React.Component {

    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            var token = jwt.sign({ payment, data: this.props.data }, "o1l2a3m4i5d6e").toString();
            axios.post(`${apiUrl}/api/mpayment_successful`, { token }).then((res) => {
                if (res.data.success) {
                    window.location.assign(`/payment_successful/${res.data.success.token}`)
                }
            })
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed npm"cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			
        }
        
        let env = 'production'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state  
        var amount; 
        if (this.props.data.completed) amount =  this.props.data.memb ? this.props.data.mprice || this.props.data.price : this.props.data.nprice || this.props.data.price
        var shipping = this.props.data.shipping ?this.props.data.shipping:0
        let total = amount+shipping;
        // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            sandbox: 'Ad3N5ty33kuwM9hRrFR-qmUrek-R33Va6DukqEhHuYvCh0ZJ_B86Zu_UU8kymDdy9cDMLz8-Zqb2gm7t',
            production: 'AQeH8zOxDho5rAflYffB-JNOTycBLFltmlnrhdWRMtG68JAADz3cXhtDYNTNqf_pMCCVAekWKrI_c8CL',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"): 
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/		

        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!		  
        return (
            <PaypalExpressBtn env={env} style={{ size: "large", shape: "rect", label: "pay", layout: "horizontal" }} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(Paypal)