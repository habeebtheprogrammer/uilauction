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
class Msuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 5
        }
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
                            window.location.assign("/marketplace")
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
                        <h5 className="pay-text"> Your bid has been placed</h5>
                        <p>You will be contacted shortly!</p>
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

export default Msuccess;