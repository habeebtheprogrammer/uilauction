import React, { Component } from 'react';
import Navbar from "../navbar/index"
import { Link } from "react-router-dom"
import Footer from "../footer/index"
import data from "../../data"
import classnames from "classnames"
import { connect } from "react-redux"

import axios from "axios"
import Banner from "../profile/banner"
import apiUrl from "../../config.js"
import moment from "moment"
import setAuthorizationToken from "../auth"
import validator from "validator"
import { Tabs, Tab, Row, Col, Input, ProgressBar, Icon } from "react-materialize"
import $ from "jquery"
import Paypal from "../mpay"
import Contact from "./contact"
import jwt from "jsonwebtoken"
import Loading from "../loader"
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}
class Buy extends Component {
    constructor() {
        super();
        this.state = {
            artist: {},
            product: {},
            firstName: "",
            lastName: "",
            email: "",
            billing: "",
            shipping: "",
            organisation: "",
            city:"",
            state: "",
            bid:"",
            phone: "",
            error: "",
            error: "",
            success: "",
            response:false,
            completed: false,
            isLoading:false
        }

        this.validation = this.validation.bind(this);
        this.typing = this.typing.bind(this);
        this.bid = this.bid.bind(this);
    }

    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.validation();
        })
    }
    componentWillMount() {
        if (validator.isMongoId(this.props.match.params.id)) {
            axios.get(`${apiUrl}/api/product?id=${this.props.match.params.id}`).then((res) => {
                // this.props.setUserProfile(res.data.data)
                if (res.data.user) {
                    this.setState({ artist: res.data.user, product: res.data.product,response:true });
                    
                } else this.setState({ artist: false })
            })
        } else this.setState({ artist: false })
    }
    validation() {
        const { firstName, lastName, email,city,state,bid, shipping, organisation, phone } = this.state
        if (firstName !== "" && lastName !== ""&& bid !== ""  && city !== "" && state !== ""&& validator.isEmail(email) && shipping !== "" && organisation !== ""
            && phone !== "") {
            this.setState({ completed: true })
        } else (this.setState({ completed: false }));
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    shipping(){
        var shipping
        if (this.state.product.sfee === 0 && this.state.product.sfee2=== 0){
            shipping = "(Free shipping)"
        }else {
            var fee = this.state.product.sfee + this.state.product.sfee2
            shipping = `N${fee} shipping fee`
        }
    }
    bid(e){
        e.preventDefault();
        if(!this.props.auth.isAuthenticated) return this.setState({error:"Please login to continue"})
        this.setState({isLoading:true})
        var token = jwt.sign({ data: { ...this.state, productTitle: this.state.product.title, productID: this.state.product._id, productTime: this.state.product.date}, id:this.props.auth.user.id}, "o1l2a3m4i5d6e").toString();
        axios.post(`${apiUrl}/api/mpayment_successful`, { token }).then((res) => {
            if (res.data.success) {
                window.location.assign(`/payment_successful/${res.data.success.token}`)
            }else{this.setState({error:res.data.error})}
            this.setState({isLoading:false})
        })

    }
    render() {
        let token = localStorage.getItem("jwToken");
        var usertoken = token
        let memb;
        if (usertoken) memb = jwt.verify(usertoken, "h1a2b3e4e5b6");
        const { firstName, lastName, email, city,state, shipping, organisation, phone, completed } = this.state
        return (
            this.state.response?
            <div className="register2 ">
                <Navbar />
                {this.state.isLoading?Loading:null}
                <div className="white" style={{ position: "fixed", zIndex: "992", width: "100%", padding: "0px 0px" }}>
                    <div className="container " >

                        <div className="row " style={{ margin: "0px" }}>
                            <div className="col s1">
                                <h5>
                                    <img src={this.state.product.imgUrl} width="60px" className="circle" alt="Image" />
                                </h5>
                            </div>
                            <div className="col s7  " >

                                <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>
                                        {this.substr(this.state.product.title,50)}</h5>
                                    {this.substr(this.state.product.description, 60)}
                                    {this.shipping()}
                                {/* <p> Browse And Discover</p> */}
                            </div>
                            <div className="col s3  " >
                                <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>
                                    Starting at N{this.state.product.price}</h5>
                                    {/* {this.state.product.stock} in stock */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ width: "90%" }}>

                    <div className="row  register-imga" style={{ marginBottom: "20px", marginTop: "100px ", }}>
                   
                        <div className="col m6 offset-m3">
                            <div className="row card z-depth-0" >
                                {/* <div className="col m12">
                                <Contact profile={this.state.artist} product={this.state.product} />
                             
                            </div> */}
                                <div className="col m12  " style={{ position: "relative", padding: "20px 0px" }}>
                                    {this.state.isLoading === true ? <ProgressBar className="progressbar" /> : null}

                                    <div className="card-content" style={{ position: "relative", paddingTop: "0px", overflow: "hidden" }}>


                                        <form className="col s12" onSubmit={this.bid}>
                                            <div className={classnames("row", "", "pad-top", this.state.next ? "slideOutLeft animated hide" : null)}>
                                                <Row>
                                                    <Col s={6}>
                                                        <label>First Name  <span>*</span></label>
                                                        <input name="firstName" onChange={this.typing} type="text" className="input" required="required" title="" />
                                                    </Col>
                                                    <Col s={6}>

                                                        <label>Last Name  <span>*</span></label>
                                                        <input name="lastName" onChange={this.typing} type="text" className="input" required="required" title="" />
                                                    </Col>
                                                    <Col s={6}>
                                                        <label>Organisation </label>
                                                        <input name="organisation" onChange={this.typing} type="text" className="input" required="required" title="" />
                                                    </Col>
                                                    <Col s={6}>

                                                        <label>Telephone  <span>*</span></label>
                                                        <input name="phone" onChange={this.typing} type="text" className="input" required="required" title="" />
                                                    </Col>
                                                        <Col s={6}>
                                                            <label>City </label>
                                                            <input name="city" onChange={this.typing} type="text" className="input" required="required" title="" />
                                                        </Col>
                                                        <Col s={6}>

                                                            <label>State  <span>*</span></label>
                                                            <input name="state" onChange={this.typing} type="text" className="input" required="required" title="" />
                                                        </Col>
                                                    <Col s={6}>

                                                        <label>Bidding Amount<span>*</span></label>
                                                        <input name="bid" onChange={this.typing} type="number" className="input" required="required" title="" />
                                                    </Col>
                                                        <Col s={6}>

                                                            <label>Email address <span>*</span></label>
                                                            <input name="email" onChange={this.typing} type="email" className="input" required="required" title="" />
                                                        </Col>
                                                    {/* <Col s={6}>

                                                        <label>Billing address  <span>*</span></label>
                                                        <input name="billing" onChange={this.typing} type="text" className="input" required="required" title="" />
                                                    </Col> */}
                                                    <Col s={12}>

                                                            <label>Shipping address (street+number+city+state+country)  <span>*</span></label>
                                                        <input name="shipping" onChange={this.typing} type="text" className="input" required="required" title="" />
                                                    </Col>

                                                </Row>
                                                {/* <button type="button" onClick={this.toggleNext.bind(this)} disabled={this.state.disabled} className="btn grey z-depth-0 darken-3" style={{}}>Next</button> */}
                                            </div>
                                                <Row>
                                        <div className="col s12 m6 offset-m3">
                                                        <p className="red-text darken-1 center-align">{this.state.error? this.state.error : null}</p>

                                         <button type="submit" className="btn yellow z-depth-0 darken-3" style={{width:"100%"}}>Place a Bid</button>
                                         </div>
                                    </Row>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isLoading ? <Loading /> : null}

                <style>{`
                    body{
                        background:#f7f7f7;
                        // background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),#263238 url('./images/live-concerts-events-in-bujumbura.jpg') no-repeat
                    }
                    ul.collection{
                        margin:0px; 
                    }
                     input,textarea{
                            border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            padding-left:10px !important;
                            padding-right:10px !important;
                            box-sizing: border-box !important;
                        }
                        label span{color:darkred}
                     .pay-text{
                        font-size:3em;
                        font-weight:800;
                    }
                    .register2 input{
                        border:1px solid lightgrey !important
                    }
                    .register2 .register-img{
                        background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.5)),#263238 url('./images/group.jpg') no-repeat;
                        background-position:cover;
                    }
                    .register2 .register-card-row{
                        margin-top:30px;
                        
                    }
                    .register2 .left-grid{
                        color:#ddd;
                        padding:100px 10px;
                    }
                      .tabs .tab a{
                        color:#222;
                    }

                     .register2 .tabs .indicator{
                        background:#222
                    }
                    .register2 .tabs .tab{
                        width:50%
                    }
                    .register2 .tabs .tab a:hover, .tabs .tab a.active {
                        background-color: transparent;
                        color: #222;
                        width:99%
                    }        
                      .register2 .pad-top{
                        padding:10px 0px 0px
                    }
                      .register2 .absolute{
                        position:absolute;
                        z-index:2;
                        width:100%;
                    }
                     .register2 .step{
                        padding:10px;
                        color:#fff;
                        transition:0.3s ease-in;
                    }
                    .register2 .dropdown-content li>a, .dropdown-content li>span{
                        color:#222;
                        text-transform: capitalize;
                    }
                     .register2 .progressbar{
                        margin:0px;
                    }
                    .register2 .progress{
                        background:#fff;
                    }
                    .register2 .indeterminate.progressbar{
                        background:#333
                    }
                    .register2 .margin-left{
                        margin-left:5px;
                    }
                       @media (max-width: 620px) {
                      .register2 .register-card-row{
                        margin-top:0px;
                        margin-bottom:0px;
                    }
                      .register2 .left-grid{
                        color:#ddd;
                        padding:40px 10px;
                    }
                    
                    }
                `}
                </style>
                <Footer />

            </div>:
            <Loading />
        );
    }
}

export default connect(mapStateToProps)(Buy);
