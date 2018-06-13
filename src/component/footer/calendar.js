import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import Marketplaceslider from "../slider/marketplaceslider"
// import artistslider from "../slider/artistslider"
import { Link } from "react-router-dom"
import Calendar from 'react-calendar';
import validator from "validator"
import { Row, Col, Input, Carousel } from "react-materialize"
import Select from 'react-select';
import apiUrl from "../../config"
import classnames from "classnames"
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Bannerslider from "../slider/bannerslider"
import axios from "axios"
import "react-big-calendar/lib/css/react-big-calendar.css"
BigCalendar.momentLocalizer(moment);
class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date,
            mondayStart: "",
            mondayEnd: "",
            tuesdayStart: "",
            events: [],
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
            sundayEnd: "",
        }
        this.typing = this.typing.bind(this)
        this.onChange = this.onChange.bind(this)
        this.filterEvent = this.filterEvent.bind(this)
    }
    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        axios.get(`${apiUrl}/api/allevents`).then((res) => {
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
    filterEvent(event) {
        var filtered = this.state.events.filter((ev) => moment(ev.checkedDate).date() === moment(event.checkedDate).date())
      

        return filtered.length;
    }
    render() {
    
        var custom = [1, 9, 15, 22, 21, 8]
        var week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        var time = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"]
        var number = [1];
        var monthView = [3];
        var ev = [{ number, monthView }]
        var s = {
            slotInfo: {
                start: Date,
                end: Date,
                slots: [1],
                action: "select" | "click"
            }
        }
        return (
            <div className="fcalendar">
                <div className="row" style={{ margin: "0px " }}>
                    <div className="col s12 no-pad">
                        <div className="row">
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                                className="col s12"
                                onClickDay={(value) => window.location.assign(`calendar/events?day=${moment(value).date()}&month=${moment(value).month()}&year=${moment(value).year()}`)}
                                
                                tileClassName={({ date, view }) => this.state.events.map((event) => moment(event.checkedDate).dates() === date.getDate()
                                    && moment(event.checkedDate).months() === date.getMonth() && moment(event.checkedDate).years() === date.getFullYear() ? "border" : null)}
                            // selectRange={true}
                            />
                        </div>
                    </div>
                </div>
                <style>{`
                
                    .fcalendar .days{
                        padding-top:0px
                    }
                    .fcalendar .react-calendar__tile {
                        padding: .2em .1em !important;
                        font-size:0.8em !important;
                        border-left:1px solid lightgrey !important;
                        border-top:1px solid lightgrey !important;
                    }
                    .fcalendar .react-calendar__navigation{
                        margin-bottom:0px !important;
                    }
                    .fcalendar .react-calendar.col.s12.no-pad{
                        border:none !important
                    }
                    .react-calendar__tile--active{
                        background:#555 !important;
                    }
                    // .react-calendar.col.s7{
                    //     border:1px solid lightgrey !important;
                    //     // padding-right:0px;
                    //     padding:0px;
                        
                    // }
                   .fcalendar  .select-wrapper input.select-dropdown{
                        border-bottom:1px solid lightgrey
                    }
                   .fcalendar  button.react-calendar__tile--active:enabled:hover, button.react-calendar__tile--active:enabled:focus{
                        background:#333
                    }
                     .fcalendar  .border{
                          font-weight:bold;
                color:#555;
            }
                    
                `}</style>
            </div>
        );
    }
}

export default Calender;