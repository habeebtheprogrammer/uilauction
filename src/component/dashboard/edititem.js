import React, { Component } from 'react';
import { Link } from "react-router-dom"
import Footer from "../footer/index"
import classnames from "classnames"
import axios from "axios"
import Banner from "../profile/banner"
import Navbar from "../navbar/index"
import apiUrl from "../../config.js"
import moment from "moment"
import FileUpload from "react-fileupload"
import setAuthorizationToken from "../auth"
import validator from "validator"
import { Tabs, Tab, Row, Col, Input, ProgressBar, Icon } from "react-materialize"
import $ from "jquery"
import Paypal from "../mpay"
import Contact from "./contact"
import jwt from "jsonwebtoken"
import Loading from "../loader"
class Edititem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            checkedDate: new Date(),
            title: "",
            description: "",
            price: "",
            stock: "",
            error: "",
            item: {},
            progress: "",
            success: "",
            isLoading:false
        }
        this.typing = this.typing.bind(this)
        this.submitform = this.submitform.bind(this)
        this.deleteitem = this.deleteitem.bind(this)
    }

    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        let userData = jwt.decode(token)
        axios.get(`${apiUrl}/api/productbyid?id=${this.props.match.params.id}&&token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ item: res.data.success })
            
            } else console.log(res)
        })
    }
    deleteitem(e) {
        e.preventDefault();
        let token = window.localStorage.getItem("jwToken")
        this.setState({ isLoading: true, error: "", success: "" })
        axios.post(`${apiUrl}/api/deleteitem`, { id: this.props.match.params.id, token }).then((res) => {
            if (res.data.success) {
                window.location.assign("/dashboard")
            }
        })
    }
    submitform(e) {
        e.preventDefault();
        var token = localStorage.getItem("jwToken")
        this.setState({isLoading:true,error:"",success:""})
        axios.post(`${apiUrl}/api/editproduct`, { ...this.state,token,id:this.state.item._id,userID:this.state.item.userID}).then((res) => {
            if (res.data.success) {
                this.setState({ success: res.data.success })
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
            this.setState({ isLoading: false })
            
        }).catch((err)=>this.setState({isLoading:false,error:"An error has occured. please try again later"}))
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {
        var time = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"]
        let token = localStorage.getItem("jwToken");
        const { firstName, lastName, email, city, state, billing, shipping, organisation, phone, completed } = this.state
        return (
            this.state.item._id ?
                <div className="register2 ">
                    <Navbar />
                    <div className="white" style={{ position: "fixed", zIndex: "992", width: "100%", padding: "0px 0px" }}>
                        <div className="container " >

                            <div className="row " style={{ margin: "0px" }}>
                                <div className="col s1">
                                    <h5>
                                        <img src={this.state.item.imgUrl} width="60px" className="circle" alt="Image" />
                                    </h5>
                                </div>
                                <div className="col s8  " >

                                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>
                                        {this.substr(this.state.item.title, 50)}</h5>
                                    {this.substr(this.state.item.description, 70)}
                                    {/* <p> Browse And Discover</p> */}
                                </div>
                                <div className="col s2  " >
                                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>
                                        €{ this.state.item.price}</h5>
                                    {this.state.item.stock} in stock
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "100px" }} >
                        <div className="col s6 offset-s3 white" style={{ padding: "10px 50px 20px 40px" }}>
                            <form onSubmit={this.submitform}>

                                <Row>

                                    <Col s={12}>

                                        <label>Title  </label>
                                        <input name="title" placeholder={this.state.item.title} onChange={this.typing.bind(this)} type="text" className="input" title="" />
                                    </Col>
                                    <Col s={6}>

                                        <label>Price (€)  </label>
                                        <input name="price" placeholder={this.state.item.price} onChange={this.typing.bind(this)} type="number" className="input" title="" />
                                    </Col> 
                                    <Col s={6}>

                                        <label>Stock </label>
                                        <input name="stock" placeholder={this.state.item.stock} onChange={this.typing.bind(this)} type="number" className="input" title="" />
                                    </Col>

                              
                                    <Col s={12}>

                                        <label>Description </label>
                                        <textarea placeholder={this.state.item.description} onChange={this.typing.bind(this)} name="description" cols="30" rows="10"></textarea>
                                    </Col>
                                </Row>
                                {/* <Input s={6} className="grey-text darken-1 no-pad" labelClassName="grey-text darken-1" name="title" label="Title" onChange={this.typing} error={this.state.error.title ? ' ' : null} ></Input>
                                        <Input s={6} className="grey-text darken-1 no-pad" labelClassName="grey-text darken-1" name="location" label="Location" onChange={this.typing} error={this.state.error.location ? ' ' : null} type="text" validate></Input>
                                        <Input s={12} className="grey-text darken-1 no-pad" labelClassName="grey-text darken-1" name="description" label="Description" onChange={this.typing} error={this.state.error.description ? " " : null} type="textarea" validate></Input>
                                        <Input s={12} className="grey-text darken-1 no-pad" labelClassName="grey-text darken-1" name="link" label="Ticket Link (http://)" onChange={this.typing} error={this.state.error.link ? " " : null} type="text" validate></Input> */}

                                {this.state.success ? <p className="green-text darken-1  center-align">{this.state.success}</p> : null}
                                {this.state.error ? <p className="red-text darken-1 center-align"> {this.state.error}</p> : null}

                                <button type="submit" className="btn grey  z-depth-0 darken-3 left " >
                                    {this.state.progress !== "" ? <span> <Loading /> Loading</span> : "Save"}
                                </button>
                                <a className="btn red z-depth-0 lighten-1 right" onClick={this.deleteitem}>
                                    {this.state.progress !== "" ? <span> <Loading /> Loading</span> : "Delete"}
                                </a>
                            </form>
                             
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
                    textarea{
                                  border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            height:130px !important;
                            padding:10px !important;
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

                </div> :
                <Loading />
        );
    }
}

export default Edititem;
