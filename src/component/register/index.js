import React, { Component } from 'react';
import { Link } from "react-router-dom"
import Footer from "../footer/index"
import Navbar from "../navbar/index"

import data from "../../data"
import classnames from "classnames"
import Loading from "../loader"
import axios from "axios"
import apiUrl from "../../config.js"
import setAuthorizationToken from "../auth"
import validator from "validator"
import { Tabs, Tab, Row, Col, Input, ProgressBar,Autocomplete } from "react-materialize"
import $ from "jquery"
import Paypal from "../pay"
import countries from "../countries"
import jwt from "jsonwebtoken"
import RadioButtonGroup from 'react-radio-button';
class Register extends Component {
    constructor() {
        super();
        this.state = {
            disabled: true,
            disabled2: true,
            next: false,
            firstName: "",
            lastName: "",
            address: "",
            country: "",
            style: "",
            studies: "",
            instrument: "",
            nationality: "",
            dob: new Date(),
            vatno: "",
            bio: "",
            bop: "",
            checkEmail: false,
            emailLoading: false,
            password: "",
            location: "",
            confirmPassword: "",
            confirmValidator: "",
            selectIndustry: "",
            teaching: false,
            selectCategory: "",
            isLoading: false,
            token: "",
            industryIndex: "",
            membership: "",
            error: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", location: "", selectIndustry: "", selectCategory: "", server: "" },
            success: { email: "", server: "" },
            radioOptions: [
                { value: 'business', text: 'Business' },
                { value: 'personal', text: 'Personal' }
            ]
        }
        this.selectIndusty = this.selectIndusty.bind(this);
        this.register = this.register.bind(this);
        this.typing = this.typing.bind(this);
        // this.typingEmail = this.typingEmail.bind(this);
        // this.typingPassword = this.typingPassword.bind(this);
        // this.handleCheckEvent = this.handleCheckEvent.bind(this);
        // this.password = this.password.bind(this);
    }


    componentDidMount() {

        var token = window.localStorage.getItem("jwToken");
        if (token) this.setState({ token: token })
    }

    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
 
 
    register(e) {
        e.preventDefault();
        this.setState({ isLoading: true, error: {  selectIndustry: "", selectCategory: "", success: "" } })
        axios.post(`${apiUrl}/api/register`, this.state).then((res) => {
            setTimeout(() => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.success) {
                   
                    this.setState({ success: res.data.success, emailLoading: false, checkEmail: true });
                    setTimeout(() => {
                        window.localStorage.clear();
                        var userData = jwt.verify(res.data.success.token, "h1a2b3e4e5b6")
                        if (userData) {
                           
                            localStorage.setItem("jwToken", res.data.success.token);
                            setAuthorizationToken(res.data.success.token);
                            window.location.assign("/dashboard")
                        }
                    }, 1000)
                } else {
                    console.log(res)
                }
                // if (res.data.paymentUrl) window.location.href = res.data.paymentUrl
                this.setState({ isLoading: false })
            }, 2000);

        }).catch((err) => {
            setTimeout(() => {
                this.setState({ isLoading: false, error: { server: "Please try again later. an error has occured" } })
            }, 2000);
        })
    }
    toggleNext() {
        this.setState({
            next: true
        })
    }
    handleCheckEvent(e) {
        console.log(e.target.value)
        this.setState({ radioOption: e.target.value })
    }
    selectIndusty(e) {
        console.log(e.target.name)
    }
    render() {

        return (
            <div className="register2 white">
                <Navbar />
                {/* <div className="row register-card-row"> */}
                {/* <div className="col s12 m10 offset-m1"> */}
                <div className="row  register-img" style={{ marginBottom: "0px", marginTop: "10px" }}>

                    <div className="col m6 offset-m3" >
                        <div className="row ">
                            <div className="col s12 center-align" style={{ padding: "40px 0px 0px" }}>
                                <Row style={{ margin: "0px" }}>
                                    <p className="grey-text text-darken-2 center-align" style={{ fontSize: "1.5em", fontFamily: "avenirBold" }}>Setting up your profile</p>
                                    <p className="grey-text text-darken-2 center-align" style={{ fontSize: "1em" }}>Make the most of the Creative world of Artists and Seekers!</p>
                                </Row>
                            </div>



                                
                                    <form className="col s12" onSubmit={this.register}>
                                   
                                            <Row>
                                            <Col s={6}>
                                                <label>Style </label>
                                                <input name="style" onChange={this.typing} type="text" className="input" required="required" title="" />
                                            </Col>
                                            <Col s={6}>
                                                <label>Instrument </label>
                                                <input name="instrument" onChange={this.typing} type="text" className="input" required="required" title="" />
                                            </Col>
                                            <Col s={6}>
                                                <label>Studies </label>
                                                <input name="studies" onChange={this.typing} type="text" className="input" required="required" title="" />
                                            </Col>
                                            <Col s={6}>
                                                <label>Previous experience </label>
                                                <input name="exp" onChange={this.typing} type="text" className="input" required="required" title="" />
                                            </Col>
                                                {/* <Input s={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="style" label="Style" onChange={this.typing2} error={this.state.error.style ? this.state.error.style : null} type="text" validate></Input>
                                                <Input s={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="instrument" label="Instrument" onChange={this.typing2} error={this.state.error.instrument ? this.state.error.instrument : null} type="text" validate></Input>
                                                <Input s={12} className="grey-text darken-1" labelClassName="grey-text darken-1" name="studies" label="Studies" onChange={this.typing2} error={this.state.error.studies ? this.state.error.studies : null} type="text" validate></Input>
                                                <Input s={12} className="grey-text darken-1" labelClassName="grey-text darken-1" name="exp" label="Previous experience" onChange={this.typing2} error={this.state.error.exp ? this.state.error.exp : null} type="textarea" ></Input> */}

                                                <div className="col s12">
                                                    <RadioButtonGroup listOfItems={this.state.radioOptions} selectedItemCallback={(value) => this.setState({bop:value})} />
                                                </div>



                                                <Input s={6} type='select' name="selectIndustry" label="What industry does it relate to" onChange={this.typing.bind(this)}>
                                                    <option className="grey-text text-darken-2" value="NA" >Please select an industry</option>
                                                    {data.industry.map((industry, key) => (
                                                        <option key={key} className="grey-text text-darken-2" value={key}>{industry.title}</option>
                                                    ))}
                                                </Input>
                                                <span className="helper-text" data-error={this.state.error.selectIndustry ? this.state.error.selectIndustry : null} ></span>

                                                <Input s={6} type='select' name="selectCategory" label="Genre" defaultValue='0' onChange={this.typing.bind(this)}>
                                                    {/* <option className="grey-text text-darken-2" >Please select a category</option> */}
                                                    {this.state.selectIndustry !== "" && this.state.selectIndustry !== "NA" ?
                                                        data.industry[this.state.selectIndustry].categories.map((category, key) => (
                                                            <option key={key} className="grey-text text-darken-2" value={category.title}>{category.title}</option>
                                                        )) : null}
                                                </Input>
                                    <Col s={12}>

                                        <label>Short Bio </label>
                                        <textarea name="bio" onChange={this.typing} cols="30" rows="10"></textarea>
                                    </Col>
                                            </Row>
                                        
                                            <Row>
                                                {this.state.error.server ? <p className="red-text darken-1 center-align"> <small>{this.state.error.server}</small></p> : null}
                                                {this.state.success.server ? <p className="green-text darken-1 center-align"><small>{this.state.success.server}</small></p> : null}
                                            </Row>
                                            <button type="submit" className="btn red lighten-1 z-depth-0"  style={{}}>Continue</button>
                                    </form>

                        </div>
                    </div>
                </div>
                {/* </div> */}
                {/* </div> */}
                {this.state.isLoading ? <Loading /> : null}

                <style>{`
                    body{
                        // background:#eee;
                        // background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),#263238 url('./images/live-concerts-events-in-bujumbura.jpg') no-repeat
                    }
                     .pay-text{
                        font-size:1.5em;
                        font-weight:800;
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
                           textarea{
                                  border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            height:130px !important;
                            padding:10px !important;
                        }
                 
                `}
                </style>
                <Footer />

            </div>
        );
    }
}

export default Register;
