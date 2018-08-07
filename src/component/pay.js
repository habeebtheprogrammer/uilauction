import React, { Component } from 'react';
    //import the library
    import PaystackButton from 'react-paystack';
    import jwt from "jsonwebtoken"
    class Pay extends Component {
    
    	state = {
    		key: "pk_test_6c0a6f1e0756d356f4205909d6d09992526a0755", //PAYSTACK PUBLIC KEY
    		email: "habibmail31@gmail.com",  // customer email
    		amount: this.props.amount //equals NGN100,
    	}
    
    	callback = (response) => {
    		console.log(response); // card charged successfully, get reference here
    	}
    
    	close = () => {
    		console.log("Payment closed");
    	}
    
    	getReference = () => {
    		//you can put any unique reference implementation code here
    		let text = "";
    		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    
    		for( let i=0; i < 15; i++ )
    			text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    		return text;
    	}
    componentWillMount() {
        var token = this.props.match.params.id;
        var amount = jwt.decode(token,"bidders");
        var email =  localStorage.getItem("email");

        this.setState({amount:amount,email:email})
    } 
    
      render() {
   
        return (
          <div>
            <p>
              <PaystackButton
                text="Make Payment"
                class="payButton"
                callback={this.callback}
                close={this.close}
                disabled={true} 
                embed={true} 
                reference={this.getReference()}
                email={this.state.email}
                amount={this.state.amount}
                paystackkey={this.state.key}
              />
            </p>
          </div>
        );
      }
    }
    
    export default Pay;