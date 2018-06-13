import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import classnames from "classnames"
import Payment from "../pay"
import { Input } from "react-materialize"
import $ from "jquery"
import { Link } from "react-router-dom"
class Pricing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            more: false,
            location: "",
            disabled: true,
            tos: false
        }
    }

    typing(e) {
        this.setState({ [e.target.value]: e.target.name })
    }

    render() {
        var amount;
        if (this.props.membership === "artist") amount = 78
        if (this.props.membership === "supporters") amount = 48
        return (
            <div className="bgp">
                <div >
                    {/* <div className={classnames(this.state.tos ? "row slideOutLeft animated hide" : "row")} style={{}}>
                        <div className="col m8 offset-m2" style={{ padding: " 100px 0px 200px" }}>
                            <div className="row " >
                                <div className="col s12 center-align">
                                    <div className="">
                                      
                                        <h5 className="pay-text">  Terms And Condition</h5>

                                    </div>
                                    <div>

                                    </div>

                                </div>
                            </div>
                            <div className="center-align cbox">
                                <Input name='group1' type='checkbox' value='' label='  By registering you are agreeing with our terms of use which also includes our privacy policy' className='filled-in center-align grey-text text-darken-2' onChange={() => this.setState({ disabled: !this.state.disabled })} defaultChecked='checked' />
                                <style>{`.cbox .col{float:none;} label{color:#333!important}}`}</style>
                                <button onClick={() => this.setState({ tos: true })} style={{marginTop:"10px"}} className="btn z-depth-0 grey darken-3" disabled={this.state.disabled}>Continue </button>
                                
                            </div>
                        </div>

                    </div> */}
                </div>
                <div style={{}}>
                    <div className={classnames("row slideInRight animated")} style={{ margin: "0px", }}>
                        <div className="col s12 center-align" style={{ padding: "40px 0px 0px" }}>
                            <h5 className="pay-text">  Find the perfect plan for your business</h5>
                        </div>
                        <div className="col m6 offset-m3 black-text">
                            <div style={{ padding: "30px 0px 0px" }}>

                                <div className="row">
                                    <div className="col s6" style={{ padding: "10px 0px" }}  >
                                        <div className="white  hoverable" style={{ border: "1px solid lightgrey", borderRight: "none" }}>
                                            <div className="center-align grey darken-3 white-text" style={{ padding: "10px 10px" }}>
                                                <h5 >Supporters</h5>
                                            </div>
                                            <div className="" style={{ paddingTop: "10px" }}>
                                                <div className="row">
                                                    <div className="col s10 offset-s1">
                                                        <div className="center-align">
                                                            <p> Starting from</p>
                                                            <h2 style={{ fontFamily: "avenirBold" }} className="grey-text text-darken-3">€38 </h2>
                                                            <div className="row"> Perfect for individuals who want to:</div>
                                                        </div>
                                                     
                                                    </div>
                                                    <div className="col s10 offset-s1" style={{}}>
                                                        <Link to="/signup?membership=supporters" style={{ width: "100%", border: "1px solid lightgrey" }} className="btn transparent black-text z-depth-0">Continue</Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col s6" style={{ padding: "10px 0px", }}  >
                                        <div className="white  hoverable" style={{ border: "1px solid lightgrey", borderLeft: "none" }}>
                                            <div className="center-align grey darken-3  white-text" style={{ padding: "10px 10px" }}>
                                                <h5>Artist</h5>
                                            </div>
                                            <div className="" style={{ paddingTop: "10px" }}>
                                                <div className="row">
                                                    <div className="col s10 offset-s1">
                                                        <div className="center-align">
                                                            <p> Starting from</p>
                                                            <h2 style={{ fontFamily: "avenirBold" }} className="grey-text text-darken-3">€78</h2>
                                                            <div className="row"> Perfect for individuals who want to:</div>
                                                        </div>
                                                     
                                                    </div>
                                                    <div className="col s10 offset-s1" style={{}}>
                                                        <Link to="/signup?membership=artist" style={{ width: "100%", border: "1px solid lightgrey" }} className="btn transparent black-text z-depth-0">Continue</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`
                    .bgp{
                        //  background:linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.1)),url('../../images/EventsHeader.jpg');
                        background:#fff;
                        background-size:cover
                    }
                 .row p{margin:0px;}
                    input.soon::placeholder{
                        color:#eee
                    }
                    .pay-text{
                        font-size:1.7em;
                        font-family:avenirBold
                    }
                    
                `}
                </style>
            </div>
        );
    }
}

export default Pricing;