import React, { Component } from 'react';
import axios from "axios"
import moment from "moment"
import apiUrl from "../../config"
import { Link } from "react-router-dom"
import { Divider, Slider, Slide, Icon } from 'react-materialize';
class Featured extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twoevents: [],
            artists: [],
            twoArtists: [],
            events: [],
            products: [],
            fourProducts: [],
        }
        this.getArtist = this.getArtist.bind(this)

    }
    substr(text, length) {
        if(!text) return text
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    componentWillMount() {


        axios.get(`${apiUrl}/api/allevents`).then((res) => {
        
            if (res.data.events) {
               
                this.setState({ events: res.data.events, response: true })
            } else console.log(res.data)
        }).catch((err) => console.log(err));

    }
    getArtist(id) {
        var artist;
        return id
    }

    render() {
        return (
            <div >

                <center>
                    {/* <h5 style={{ fontFamily: "avenirBold", padding: "20px 0px 20px" }}>CREATE EVENTS IN THE CALENDAR</h5> */}
                    {/* <p className=" "> Choose from our most popular artist</p> */}
                </center>
                <div className="row">
                    <div className="col s12 m3 x2-padding">
                        <div className="recent-news blue-grey darken-4">
                            <ul className="collection with-header">
                                <li className="collection-header">
                                    <div className="bold-title">
                                        Recent Events
                                    </div>
                                </li>
                                {this.state.events.slice(0, 4).map((event) => (
                                    <li className="collection-item no-pad" >
                                        <div className="row" style={{ margin: "0px" }}>
                                            <div className="col m4 s4" style={{ padding:"0px" }}>
                                                <div style={{ background: `url('http://res.cloudinary.com/afrikal/image/upload/w_300,h_300,c_fill,g_auto/${event.imgID}')`, backgroundSize: "100%", height: "80px" }}>
                                                </div>
                                            </div>
                                            <div className="col m8 s8" style={{padding:"0px"}}>
                                                <div className="row" style={{ padding: "10px", margin: "0px" }}>
                                                    <div className="col s12">

                                                        <div style={{ textTransform: "capitalize", fontSize: "1.1em", padding: "5px 0px" }}> <Link to={`/calendar/events/${event._id}`} className="black-text"><b>{this.substr(event.title, 20)}</b></Link></div>
                                                    </div>
                                                    {/* <div className="col s12">
                                                        <div className="g hide-on-med-and-down" style={{ fontSize: "0.9em" }}> {this.substr(event.description, 40)} </div>
                                                    </div> */}
                                                    <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                        <Icon tiny>visibility</Icon>

                                                    </div>
                                                    <div className="col s2 grey-text">
                                                        <small>{event.views}</small>
                                                    </div>
                                                    <div className="col s1 grey-text " style={{ paddingTop: "2px" }}>
                                                        <Icon tiny>alarm</Icon>
                                                    </div>
                                                    <div className="col s7 grey-text left-align ">
                                                        <small>{event.startTime} - {event.stopTime}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col s12 m3">
                                                <div >
                                                    <span className="hide-on-med-and-down">     {moment(event.checkedDate).format("l")}</span>

                                                </div>
                                            </div> */}
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col s12 m9" style={{padding:"0px"}}>
                        <div className="row">
                            {this.state.events.length > 0 ? this.state.events.slice(-2).map((event) => (
                                <div className="col s12 m6 x2-padding">
                                    <Link to={`calendar/events/${event._id}`} className="grey-text text-darken-3">
                                        <div className="card   hoverable z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>

                                            <div className="ecard" style={{
                                                background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#000 url('http://res.cloudinary.com/afrikal/image/upload/w_800,h_700,c_fill,g_auto/${event.imgID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                backgroundSize: "100%",
                                            }}>
                                                <div className="date-box white-text center-align   right" style={{ width: "20%", margin: "0px 10px" }}>
                                                    <div className="green darken-1" style={{ fontSize: "1.3em", padding: "10px 0px" }}> {moment(event.checkedDate).format("DD")}</div>
                                                    <div className="black" style={{ fontSize: "0.7em", padding: "10px 0px" }}>
                                                        <div>{moment(event.checkedDate).format("MMM")}</div>
                                                        <div>{moment(event.checkedDate).format("YYYY")}</div>
                                                    </div>
                                                </div>
                                                {/* <div className="date-box white-text center-align   right" style={{ border: "2px solid white",borderTop:"none", width: "20%", padding: "5px", fontSize: "0.9em", margin: "0px 10px" }}>
                                            <b >{moment(event.checkedDate).format("MMM Do")}</b>
                                        </div> */}
                                            </div>
                                            <div className="row" style={{ padding: "10px", margin: "0px" }}>
                                                <div className="col s12" style={{}}>

                                                    <div style={{ fontSize: "1.1em", padding: "10px 0px" }}><b>{this.substr(event.title, 40)}</b></div>
                                                </div>
                                                <div className="col s12">
                                                    <div className="g" style={{ fontSize: "0.9em" }}>{this.substr(event.description, 45)}</div>
                                                </div>
                                                <div className="col s1  grey-text" style={{ paddingTop: "2px" }}>
                                                    <Icon tiny>visibility</Icon>

                                                </div>
                                                <div className="col s2  grey-text">
                                                    <small>{event.views}</small>
                                                </div>
                                                <div className="col s1  grey-text" style={{ paddingTop: "2px" }}>
                                                    <Icon tiny>map</Icon>
                                                </div>
                                                <div className="col s4 left-align  grey-text">
                                                    <small>{event.location}</small>
                                                </div>
                                                <div className="col s1 grey-text " style={{ paddingTop: "2px" }}>
                                                    <Icon tiny>alarm</Icon>
                                                </div>
                                                <div className="col s3 grey-text left-align ">
                                                    <small>{event.startTime} - {event.stopTime}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )) : null}

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
export default Featured;