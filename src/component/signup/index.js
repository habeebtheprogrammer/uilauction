import React, { Component } from 'react';
import Navbar from "../navbar/index"
import { Link } from "react-router-dom"
import Footer from "../footer/index"
import axios from "axios"
import setAuthorizationToken from "../auth"
import apiUrl from "../../config.js"
import { Preloader, Row, Input, Icon, ProgressBar, Col } from "react-materialize"
import Loading from "../loader"
import Paypal from "../pay"
import classnames from "classnames"
import countries from "../countries"
import validator from "validator"
class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            firstName: "",
            progress:"",
            lastName: "",
            username: "",
            phone: "",
            dob: "",
            address: "",
            city: "",
            state: "",
            confirmPassword: "",
            country: "",
            selectIndustry: "",
            selectCategory: "",
            password: "",
            street: "",
            cpassword: "",
            checkEmail: false,
            checkUsername: false,
            company: false,
            completed: false,
            tos: false,
            membership: "",
            isLoading: false,
            usernameLoading: false,
            error: { email: "", password: "", server: "", username: "" },
            success: { email: "", username: "" },
            uerror: "",
            usuccess: ""
        }
        // this.login = this.login.bind(this)
        this.typing = this.typing.bind(this)
        this.typingEmail = this.typingEmail.bind(this)
        this.typingUsername = this.typingUsername.bind(this)
        this.validation = this.validation.bind(this)
        this.register = this.register.bind(this)
    }

    // componentWillMount() {
    //     if (window.location.search === "?membership=supporters") this.setState({ membership: "supporters" })
    //     else if (window.location.search === "?membership=artist") this.setState({ membership: "artist" })
    // }
    typingUsername(e) {
        this.setState({
            [e.target.name]: e.target.value, uerror: "", usuccess: "", checkUsername: false
        }, () => {
            if (this.state.username) {
                this.setState({ usernameLoading: true })
                axios.post(`${apiUrl}/api/checkUsername`, { username: this.state.username }).then((res) => {
                    if (res.data.usuccess) {
                        this.setState({ usuccess: res.data.usuccess, usernameLoading: false, checkUsername: true }, () => this.validation())
                    } else if (res.data.uerror) {
                        this.setState({ uerror: res.data.uerror, usernameLoading: false, checkUsername: false }, () => this.validation())

                    }
                });
            }
        })
    }
    
    typingEmail(e) {
        this.setState({
            [e.target.name]: e.target.value, success: { email: "" }, error: { email: "" }, checkEmail: false
        }, () => {
            if (this.state.email && validator.isEmail(this.state.email)) {
                this.setState({ emailLoading: true })
                axios.post(`${apiUrl}/api/checkEmail`, this.state).then((res) => {
                    setTimeout(() => {
                        if (res.data.success) {
                            this.setState({ success: { email: res.data.success.email }, emailLoading: false, checkEmail: true }, () => this.validation())

                        } else {
                            this.setState({ error: { email: res.data.error.email }, emailLoading: false, checkEmail: false }, () => this.validation())
                        }
                    }, 1000)
                });
            } else if (this.state.email && !validator.isEmail(this.state.email)) {
                this.setState({ error: { email: this.state.email + " is not a valid email address" } }, () => this.validation())

            }
        })
    }
    validation() {
        const { username, password, firstName, lastName, email, dob, tos, street, country, city, state, company, phone, cpassword } = this.state
        if (username !== "" && password !== "" && firstName !== "" && lastName !== "" && dob !== "" && validator.equals(password, cpassword) === true &&
            tos !== false && street !== "" && country !== "" && city !== "" && state !== "" && company !== ""
            && phone !== "" && this.state.checkEmail === true && this.state.checkUsername === true) {

            this.setState({ completed: true })
        } else (this.setState({ completed: false }));
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    register(e){
        e.preventDefault();
        this.setState({ progress: true, })
        axios.post(`${apiUrl}/api/signup`, this.state).then((res) => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.success) {
                    this.setState({ success: res.data.success });
                    window.location.assign(`/success/${res.data.success.token}`)

                } else {
                    console.log(res)
                }
                this.setState({ progress: false })

        }).catch((err) => {
            setTimeout(() => {
                this.setState({ isLoading: false,progress:false, error: { server: "Please try again later. an error has occured" } })
            }, 1000);
            }); 
    }
    render() {
        const { username, password, completed, firstName, lastName, email, dob, tos, street, country, membership, city, state, phone } = this.state

        return (
                <div className="login">
                    {/* <Navbar /> */}
                    {this.state.progress?<Loading />:null}
                    <div className="row " style={{ margin: "0px" }} >
                        <div className="col s12 m5  ">
                        </div>
                        <div className="col s12 m7 no-pad white">
                            {this.state.isLoading === true ? <ProgressBar className="progressbar" /> : null}
                            <div className="card-content" style={{ padding: "20px 10px 100px" }}>
                                {/* <div className="center-align grey-text"><h5>Instant Signup With</h5></div> */}
                                {/* <Row >
                                    {this.state.isLoading ? <Loading /> : null}

                                    <Col s={4}>
                                        <button type="button" style={{ width: "100%" }} className="btn blue darken-4 z-depth-0 small no-radius" >
                                            <i className="fab fa-facebook-f"></i>
                                        </button>
                                    </Col>
                                    <Col s={4}>
                                        <button type="button" style={{ width: "100%" }} className="btn red darken-1  z-depth-0 small no-radius">
                                            <i className="fab fa-google-plus-g"></i>
                                        </button>
                                    </Col>
                                    <Col s={4}>
                                        <button type="button" style={{ width: "100%" }} className="btn blue darken-2 z-depth-0 small no-radius">
                                            <i className="fab fa-linkedin-in"></i>
                                        </button>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <p className="grey-text text-darken-2 center-align" style={{ fontSize: "1.5em", fontFamily: "avenirBold" }}>Sign Up</p>
                                    <p className="grey-text text-darken-2 center-align" style={{ fontSize: "1em" }}>Make the most of the Creative world of Artists and Seekers!</p>
                                </Row>
                                {/* <Row>
                                    <Col s={5}>
                                        <div style={{ height: "2px", background: "lightgrey", marginTop: "23px" }}></div>
                                    </Col>
                                    <Col s={2}>
                                        <p className="center-align grey-text text-darken-2 "><span className="grey darken-3" style={{ borderRadius: "100%", color: "#fff", padding: "15px 10px 8px" }}><i className="material-icons">group</i></span></p>

                                    </Col>
                                    <Col s={5}>
                                        <div style={{ height: "2px", background: "lightgrey", marginTop: "23px" }}></div>
                                    </Col>
                                </Row> */}
                                <form onSubmit={this.register}>
                                    <Row>
                                        <Col s={6}>
                                            <label>First Name  {this.state.firstName ? null : <span>*</span>}</label>
                                            <input name="firstName" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>

                                            <label>Last Name {this.state.lastName ? null : <span>*</span>}</label>
                                            <input name="lastName" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col m={6} s={12}>
                                            <label>Username  {this.state.usuccess ? null : <span>*</span>}  {this.state.uerror ? <span style={{ padding: "0px 12px" }} className="red-text">{this.state.uerror}</span> : null}
                                                {this.state.usuccess && this.state.username && !this.state.uerror ? <span style={{ padding: "0px 12px" }} className="green-text">{this.state.usuccess} </span> : null}
                                            </label>
                                            <input name="username" onChange={this.typingUsername} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>

                                            <label>Telephone  {this.state.phone ? null : <span>*</span>}</label>
                                            <input name="phone" onChange={this.typing} type="number" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={12}>

                                            <label>Email Address  {this.state.success.email ? null : <span>*</span>}   {this.state.error.email ? <span style={{ padding: "0px 12px", }} className="red-text">{this.state.error.email}</span> : null}
                                                {this.state.success.email && this.state.email ? <span style={{ padding: "0px 12px" }} className="green-text">{this.state.success.email} </span> : null}
                                            </label>
                                            <input name="email" onChange={this.typingEmail} type="email" className="input" required="required" title="" />
                                        </Col>
                                        {/* <Col s={6}>

                                            <label>Date of Birth  {this.state.dob ? null : <span>*</span>}</label>
                                            <input name="dob" onChange={this.typing} type="date" className="input" required="required" title="" />
                                        </Col>

                                        <Col s={6}>

                                            <label>Street + Number {this.state.street ? null : <span>*</span>}</label>
                                            <input name="street" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>
                                            <label>City {this.state.city ? null : <span>*</span>}</label>
                                            <input name="city" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>
                                            <label>State {this.state.state ? null : <span>*</span>}</label>
                                            <input name="state" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col> */}
                                        <Col s={6}>
                                            <label>Password  {this.state.password ? null : <span>*</span>}</label>
                                            <input name="password" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        {/* <Col s={6}>
                                            <label>Confirm Password  {this.state.cpassword ? null : <span>*</span>}</label>
                                            <input name="cpassword" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col> */}
                                        {/* <Input s={6} type='select' name="company" label="Company" defaultValue='0' onChange={this.typing.bind(this)}>
                                            <option className="grey-text text-darken-2" >Please select </option>
                                            <option className="grey-text text-darken-2" value={true}>Yes</option>
                                            <option className="grey-text text-darken-2" value={false}>No</option>
                                        </Input> */}
                                        <Input s={6} type='select' name="country" label="Country" defaultValue='0' onChange={this.typing.bind(this)}>
                                            <option className="grey-text text-darken-2" >Please select your country</option>
                                            {countries.map((country, key) => (
                                                <option key={key} className="grey-text text-darken-2" value={country.country}>{country.country}</option>
                                            ))}
                                        </Input>
                                        <Col s={12}>

                                            <label>
                                                <input required style={{ position: "inherit", opacity: "1", left: "0", width: "inherit", position: "relative" }} name="tos" onChange={() => { this.setState({ tos: !this.state.tos }, () => this.validation()); }} type="checkbox" className="input" required="required" title="" /> By signing up you agree with our <a href="/terms-and-condition">Terms and Condition</a>
                                            </label>
                                        </Col>
                                    </Row>
                                     <Row>
                                        <div className="col s12 m6 offset-m3">
                                         <button className="btn yellow z-depth-0 darken-3" style={{width:"100%"}}>Register</button>
                                         </div>
                                    </Row>
                                      
                                </form>
                                  
                                
                            </div>
                        </div>
                    </div>
                    {/* <Footer /> */}
                    <style>{`
                    body{
                        // background:#f8f8f8;
                        background:linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),#263238 url('./images/black-friday-cyber-monday-ecommerce-shopping-holiday-ss-1920.jpg') no-repeat;
                        background-size:cover;
                        background-position:left;
                        background-position-x:-400px;
                    }
                    label{
                        color:#000

                    }
                    .signup .bgimg{
                        // background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.5)),#263238 url('./images/black-friday-cyber-monday-ecommerce-shopping-holiday-ss-1920.jpg') no-repeat;
                        // background-position:cover;
                    }
                    label span{
                        color:#F44336 !important
                    }
                    .login .login-card-row{
                        margin-top:30px;
                        margin-bottom:20px;
                        
                    }
                    .login .left-grid{
                        color:#ddd;
                        padding:140px 10px 20px
                    }
                  
                    input{                  
                            border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            padding-left:10px !important;
                            box-sizing: border-box !important;
                            padding-right:10px !important;
                            
                        }input::placeholder{
                            padding-left:10px !important;
                        }
                      label.grey-text.darken-1{
                            padding-left:10px !important;
                        }
                    .login .progressbar{
                        margin:0px;
                        // background:transparent;
                    }
                    .login .progress{
                        background:#fff;
                    }
                    .login .indeterminate.progressbar{
                        background:#333
                    }
                    .login .no-radius{
                        border-radius:0px
                    }
                     @media (max-width: 620px) {
                     .login .login-card-row{
                        margin-top:0px;
                    }
                    .no-pad{
                        padding:0px
                    }
                     .login .left-grid{
                        color:#ddd;
                        padding:40px 10px
                    }
                    .login .login-card-row{
                        margin-bottom:0px;
                    }
                    }
                `}
                    </style>
                </div>

        );
    }
}

export default Signup;
