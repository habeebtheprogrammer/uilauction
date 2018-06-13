import React, { Component } from 'react';
import Navbar from "../navbar/index"
import { Link } from "react-router-dom"
import Footer from "../footer/index"
import axios from "axios"
import setAuthorizationToken from "../auth"
import apiUrl from "../../config.js"
import { Preloader, Row, Input, Icon, ProgressBar, Col } from "react-materialize"
import Loading from "../loader"
import jwt from "jsonwebtoken"
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            error: { email: "", password: "", server: "" },
            success: ""
        }
        this.login = this.login.bind(this)
        this.typing = this.typing.bind(this)
    }


    componentWillMount() {
        if (window.location.search) {
            axios.get(`${apiUrl}/api/success${window.location.search}`).then((res) => {
                if (res.data.success) {
                 
                }
            })
        }
    }

    login(e) {
        e.preventDefault();
        this.setState({ isLoading: true, error: { email: "", password: "" } })
        axios.post(`${apiUrl}/api/login`, { password: this.state.password, email: this.state.email }).then((res) => {
            setTimeout(() => {
                console.log(res)
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.token) {
                    var userData = jwt.verify(res.data.token, "h1a2b3e4e5b6")
                    if (userData) {
                        localStorage.setItem("jwToken", res.data.token);
                        setAuthorizationToken(res.data.token);
                        window.location.assign("/dashboard")
                    }
                }
                this.setState({ isLoading: false })
            }, 2000);
        }).catch((err) => {
            setTimeout(() => {
                this.setState({ isLoading: false, error: { server: "Please try again later. an error has occured" } })
            }, 2000);

        })
    }

    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
      
        return (
            <div className="login">
                <Navbar />

                <div className="row login-card-row" >
                    <div className="col s12 m4 offset-m4 white">
                        {this.state.isLoading === true ? <ProgressBar className="progressbar" /> : null}
                        <div className="card-content" style={{ paddingTop: "20px", paddingBottom: "50px" }}>
                            <div className="center-align grey-text"><h5>Instant Login </h5></div>
                            {this.state.isLoading ? <Loading /> : null}

                            {/* <Row >

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
                                <p className="grey-text text-darken-2 center-align">Make the most of the Creative world of Artists and Seekers!</p>
                            </Row>
                            <Row className="hide-on-med-and-down">
                                <Col s={5}>
                                    <div style={{ height: "2px", background: "#ccc", marginTop: "10px" }}></div>
                                </Col>
                                <Col s={2}>
                                    {/* <p className="center-align grey-text text-darken-2 "><span className="grey darken-4" style={{ borderRadius: "100%", color: "#fff", padding: "10px" }}>OR</span></p> */}

                                </Col>
                                <Col s={5}>
                                    <div style={{ height: "2px", background: "#ccc", marginTop: "10px" }}></div>
                                </Col>
                            </Row>

                            <div className="row">
                                <form className="col s12 no-padding" onSubmit={this.login}>
                                    <Row>
                                        <Input s={12} required labelClassName="grey-text darken-1 no-padding" name="email" label="Email" onChange={this.typing} error={this.state.error.email || this.state.error.server ? " " : null} type="email" validate></Input>
                                        <Input s={12} required labelClassName="grey-text darken-1 no-padding" name="password" label="Password" onChange={this.typing} validate error={this.state.error.password || this.state.error.server ? " " : null} type='password'></Input>
                                        <p className="red-text darken-1 center-align">{this.state.error.server ? <small>{this.state.error.server}</small> : null}</p>
                                        <p className="red-text darken-1 center-align">{this.state.error.email || this.state.error.password ? this.state.error.email : null}</p>
                                        <div className="col s6 no-pad-xs"><Link to="/password-reset" className="grey-text text-darken-1"><small>Forgot password?</small></Link>
                                        </div>
                                        <div className="col s6 no-pad-xs right-align"><Link to="/signup" className="grey-text text-darken-1"><small>Register</small></Link>
                                        </div>
                                        <Col s={12}>
                                        </Col>
                                    </Row>

                                    <center>
                                        <button className="btn waves-effect waves-red z-depth-0 grey darken-4 margin-top" type="submit" name="action">
                                            Sign in
                                                </button>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <style>{`
                    body{
                        // background:#eee;
                        // background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),#263238 url('./images/live-concerts-events-in-bujumbura.jpg') no-repeat
                    }
                    .login .login-img{
                        background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),#000 url('./images/Writers_Models_Style_10.jpg') no-repeat;
                        background-size:cover;
                    }
                    .login .login-card-row{
                        margin-top:50px;
                        margin-bottom:40px;
                        
                    }  input{
                            border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            padding-left:10px !important;
                            padding-right:10px !important;
                            box-sizing:border-box !important;
                        }input::placeholder{
                            padding-left:10px !important;
                        }
                      label.grey-text.darken-1{
                            padding-left:10px !important;
                        }
                    .login .left-grid{
                        color:#ddd;
                        padding:100px 10px 20px
                    }
                   .login .input-field{
                       margin:5px 0px !important;
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
                    .no-padding{
                        padding:0px !important
                    }
                     .login .left-grid{
                        color:#ddd;
                        padding:40px 10px
                    }
                    .login .login-card-row{
                        margin-bottom:0px;
                    }
                     .login .input-field{
                       padding:0px !important;
                   }
                   .margin-top{
                    margin-top:15px;
                   }
                   .no-pad-xs{
                       padding:0px !important
                   }
                    }
                `}
                </style>
            </div>
        );
    }
}

export default Login;
