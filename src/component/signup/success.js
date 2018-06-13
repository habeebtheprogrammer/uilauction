import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import Payment from "../pay"
import $ from "jquery"
import { Link } from "react-router-dom"
import Notfound from "../error/index"
import jwt from "jsonwebtoken"
import axios from "axios"
import apiUrl from "../../config"
import validator from 'validator'
class Success extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 5
        }
    }


    componentWillMount() {
        if(!this.props.Registeration)
        axios.post(`${apiUrl}/api/verify`, { token: this.props.match.params.token }).then((res) => {
           
        }).catch((err) => {
            setTimeout(() => {
                this.setState({ isLoading: false, error: { server: "Please try again later. an error has occured" } })
            }, 2000);

        })
    } 

    componentDidMount() {
      
        setTimeout(() => {
            this.setState({ count: this.state.count - 1 })
            setTimeout(() => {
                this.setState({ count: this.state.count - 1 })
                setTimeout(() => {
                    this.setState({ count: this.state.count - 1 })
                    setTimeout(() => {
                        this.setState({ count: this.state.count - 1 })
                        setTimeout(() => {
                            this.setState({ count: this.state.count - 1 })
                            window.location.assign("/login")
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)




    }



    render() {

        return (
            <div >
                {/* <Navbar /> */}

                <div className="row" style={{ margin: "0px" }}>
                    <div className="col s12 center-align" style={{ padding: "100px 0px 100px" }}>
                        <h5 className="pay-text">  {this.props.Registeration? "Registeration" : "Verification"} was Successful!</h5>
                        <p>{this.props.Registeration ? "Please check your email address to verify your account":"Congratulations! your account has successfully been verified. Login to continue"}</p>
                        <div>
                            <i className="material-icons green-text" style={{ fontSize: "5em" }}>check_circle</i>
                        </div>
                        <div>
                            Redirecting {this.state.count}
                        </div>
                    </div>
                </div>
                <style>{`
                    body{
                        //  background:linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.1)),url('../../images/EventsHeader.jpg');
                        background:#fff;
                        background-size:cover
                    
                    }
                 
                    input.soon::placeholder{
                        color:#eee
                    }
                    .pay-text{
                        font-size:3.3em;
                        font-weight:800;
                    }
                `}
                </style>
                {/* <Footer /> */}
            </div>
        );
    }
}

export default Success;