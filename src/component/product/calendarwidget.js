import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import Marketplaceslider from "../slider/marketplaceslider"
// import artistslider from "../slider/artistslider"
import { Link } from "react-router-dom"
import Calendar from 'react-calendar';
import axios from "axios"
import validator from "validator"
import { Row, Col, Input } from "react-materialize"
import Select from 'react-select';
import apiUrl from "../../config"
import moment from 'moment';
import Bannerslider from "../slider/bannerslider"
import Eventmodal from "./eventmodal"
import Modal from "react-responsive-modal"
class Calendarwidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date,
            openModal: false,
            mondayStart: "",
            checkedDate: {},
            mondayEnd: "",
            clickedDay: "",
            tuesdayStart: "",
            tuesdayEnd: "",
            wednesdayStart: "",
            wednesdayEnd: "",
            thursdayStart: "",
            thursdayEnd: "",
            fridayStart: "",
            fridayEnd: "",
            saturdayStart: "",
            saturdayEnd: "",
            sundayStart: "",
            events: [],
            sundayEnd: "",
        }
        this.typing = this.typing.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    componentWillMount() {
       
            axios.get(`${apiUrl}/api/events?id=${this.props.userID}`).then((res) => {
                if (res.data.events) {
                    this.setState({ events: res.data.events })
                  
                } else console.log(res)
            })
    }
    typing(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })

    }
    onChange(date) {
        this.setState({ date })
    }
    onClose(bool) {
        this.setState({ openModal: bool })
    }
    render() {
       
        var custom = [1, 9, 15, 22, 21, 8]
        return (
            <div className="calendar">
                {/* {this.state.openModal ? <Eventmodal />: null} */}
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    className="col s12 no-border"
                    activeStartDate=""
                    onClickDay={(value) => {
                        this.setState({ openModal: true, clickedDay: value })
                        this.state.events.filter((event) =>
                            moment(event.checkedDate).dates() === moment(value).dates() ?
                                this.setState({ checkedDate: event, openModal: true }) :
                                null)
                    }}
                    tileClassName={({ date, view }) => this.state.events.map((event) => moment(event.checkedDate).dates() === date.getDate() && moment(event.checkedDate).months() === date.getMonth() && moment(event.checkedDate).years() === date.getFullYear() ? "border" : null)}
                // tileContent={({ date, view }) => this.state.events.map((event) => moment(event.checkedDate).dates() === date.getDate() && moment(event.checkedDate).months() === date.getMonth() && moment(event.checkedDate).years() === date.getFullYear() ? <Eventmodal location={"date"} onClose={this.onClose.bind(this)} clickedDay={this.state.clickedDay} event={event.checkedDate} open={this.state.openModal} /> : null)}
                // tileContent={({ date, view }) => this.state.events.map((event) => moment(event.checkedDate).dates() === date.getDate() && moment(event.checkedDate).months() === date.getMonth() && moment(event.checkedDate).years() === date.getFullYear() ? <Eventmodal location={"date"} onClose={this.onClose.bind(this)} clickedDay={this.state.clickedDay} event={event.checkedDate} open={this.state.openModal} /> : null)}
                />
                <div className="eventmodal">
                    <Modal open={this.state.openModal} onClose={() => this.setState({ openModal: false, checkedDate: "" })} classNames={{ modal: "custom-modal" }} little>
                        <div className="row ">
                            <div className="col s6 left-grid">
                                <iframe width="100%" frameBorder="0" style={{ border: 0 }} height="400px"
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAMsF1hD4qPsu8T-vkdEss5WhkuJ7aH58o&q=${this.state.checkedDate.location || "paris effiel tower"}&maptype=satellite`} />
                            </div>
                            <div className="col s6 right-grid bg center-alignl white-text" style={{ padding: "30px" }}>
                                <i className="material-icons red-text" style={{ fontSize: "5em" }}>event</i>
                                <h4 style={{ textTransform: "uppercase" }}>{this.state.checkedDate.title} </h4>
                                <div style={{ textTransform: "uppercase" }}>{this.state.checkedDate.description} </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p><h5> Starting from</h5></p>
                                    </div>
                                    <div className="col s1">
                                        <i className="material-icons " >event</i>
                                    </div>
                                    <div className="col s3">
                                        <p> {this.state.checkedDate.startTime} </p>
                                    </div>

                                    <div className="col s3">
                                        <p> To</p>
                                    </div>
                                    <div className="col s1">
                                        <i className="material-icons " >event</i>
                                    </div>
                                    <div className="col s3">
                                        <p> {this.state.checkedDate.stopTime} </p>
                                    </div>
                                </div>
                                <button className="btn transparent" style={{ border: "1px solid lightgrey", marginTop: "10px" }}>Buy Ticket</button>

                            </div>
                            {/* <div > <span>  To {this.state.checkedDate.stopTime} </div>
                            </div> */}
                        </div>
                    </Modal>
                    <style>{`
                    .custom-modal{
                        width:100% !important;
                        padding:0px !important;
                        margin:0px !important;
                    }
                    .bg{
                    background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.5)),#263238 url('${this.state.checkedDate.imgUrl}') no-repeat;
                    min-height:450px !important;
                    background-size:cover;
                    }
                    .left-grid{
                    padding:0px !important;
                    }
                    .row{
                        margin:0px;
                        padding:0px;
                    }
                    .right-grid{
                         min-height:400px !important;
                    }
                    input{
                        font-size:0.8em !important;
                        padding:0px !important;
                    }
                    input::placeholder{
                        font-size:0.8em !important;
                        color:#333 !important;
                    }
                    .col.input-field{
                        padding:0px !important;
                    }
                     .border{
                // border:1px solid lightgrey !important;
                font-weight:bold;
            }
                `}
                    </style>
                </div>
                <style>{`
            .no-border{border:0px !important}
            .border{
                // border:1px solid lightgrey !important;
                font-weight:bold;
            }
            `}</style>
            </div>
        );
    }
}

export default Calendarwidget;