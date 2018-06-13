import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Calendar from "react-calendar"
import { Input, Col, Row } from "react-materialize"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import classnames from "classnames"
import axios from "axios"
import moment from "moment"
import jwt from "jsonwebtoken"
import {Link} from "react-router-dom"
import Loading from "../loader"
class Calendarmodal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            date: new Date(),
            title: "",
            location: "",
            address:"",
            description: "",
            link: "",
            startTime: "",
            stopTime: "",
            error: {},
            checkedDate: "",
            events: [],
            progress: "",
            success: "",
            fileName: ""
        }
        this.onChange = this.onChange.bind(this)
        this.checkedDate = this.checkedDate.bind(this)
        this.typing = this.typing.bind(this)
    }

    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        let userData = jwt.decode(token)
        axios.get(`${apiUrl}/api/events?id=${userData.id}`).then((res) => {
            if (res.data.events) {
                this.setState({ events: res.data.events })
          
            } else console.log(res)
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    submitform(e) {
        e.preventDefault();
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };
    onChange(value) {
    
    }
    checkedDate(value) {
        this.setState({ checkedDate: value }, (state) => this.onOpenModal()
        )

    }
    typing(e) {
        this.setState({ [e.target.name]: e.target.value })
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
        return (
            <div>
            <div className="calendarModal">
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    className="col s12 no-border"
                    // onClickDay={this.checkedDate}
                    tileClassName={({ date, view }) => this.state.events.map((event) => moment(event.checkedDate).dates() === date.getDate() && moment(event.checkedDate).months() === date.getMonth() && moment(event.checkedDate).years() === date.getFullYear() ? "border" : null)}

                />
                
                <style>{`
                    .custom-modal{
                        padding:0px 10px 0px 0px !important;
                        margin:0px !important;
                    }
                    .bg{
                    // background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.5)),#263238 url('../../../images/singer.jpg') no-repeat;
                    // min-height:400px !important;
                    background-size:cover;
                    }
                     .border{
                // border:1px solid lightgrey !important;
                font-weight:bold;
            }
                `}
                </style>

                
            </div>
            
            <div className="row" >
                    <div className="col s12" style={{ marginTop: "10px" }}>
                        <ul className="collection with-header" style={{ marginTop: "0px", border: "0px", }}>
                            <li className="collection-header">Items bought</li>
                            {this.state.events ? this.state.events.map((item, key) => (
                                <li key={key} className="collection-item avatar">
                                    <img src={`${item.imgUrl || "../../images/user.png"}`} alt="" className="circle" />
                                    <Link to={`/calendar/events/${item._id}`} className=" grey-text text-darken-4" style={{ fontSize: "0.9em" }}>{this.substr(item.title, 25)} </Link>
                                    <p>
                                        <small >{this.substr(item.description, 35)} </small>
                                        <Link to={`/dashboard/event/${item._id}`}  className="btn small  transparent grey-text right z-depth-0"  style={{ fontSize: "0.6em", border: "1px solid lightgrey", padding: "0px 20px" }}>edit</Link>

                                        {/* <a href="#" className="btn transparent z-depth-0 black-text" style={{border:"1px solid lightgrey",fontSize:"1em",height:"inherit"}}> <span className="right">edit</span> </a> */}
                                    </p>
                                    <p>
                                        
                                        
                                        {/* <span className="grey-text text-darken-4">${item.price ? item.price : "not available"}</span> */}
                                    </p>

                                    {/* <Link to={`artists/${artist._id}`} className="secondary-content grey-text text-darken-4"><i className="material-icons">grade</i></Link> */}
                                </li>
                            )) : null}
                        </ul>
                </div>
            </div>
            
            </div>
        );
    }
}

export default Calendarmodal;