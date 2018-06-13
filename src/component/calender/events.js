import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import { Link } from "react-router-dom"
// import $ from "jquery"
import moment from "moment"
import apiUrl from "../../config"
import axios from "axios"
import Loading from "../loader"
import "../../style.css"
class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            result: [],
            search: false,
            response: false,
        }
    }
    componentWillMount() {
     
        axios.get(`${apiUrl}/api/eventsByDate${window.location.search}`).then((res) => {
            if (res.data.events) {
                console.log(res)
                this.setState({ events: res.data.events, response: true })
            } else console.log(res)
        })
    }
    searchCB(result) {
      
        this.setState({ result: result, search: true })
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {
   
        var array = ["1(30).jpg", "1(38).jpg", "1(3).jpg", "coll4.jpg", "cc.jpg", "cd.jpg", "cf.jpg", "cg.jpg", "coll5.jpg", "1(31).jpg"]
        return (
            this.state.response ?
                <div className="events">
                    <Navbar />
                    <div className="white hide-on-med-and-down" style={{ position: "fixed", zIndex: "992", width: "100%", padding: "10px 0px" }}>
                        <div className="container " >

                            <div className="row "  >
                                <div className="col s6  " >
                                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>BROWSE AND DISCOVER</h5>
                                    {/* <p> Browse And Discover</p> */}
                                </div>
                                <div className="col s6 " >
                                    <div className="row" style={{ padding: "0px 3px", marginBottom: "0px" }}>

                                        <div className="col s12 right-align" >
                                            {/* <Filter searchCB={this.searchCB.bind(this)} /> */}
                                        </div>

                                        <div className="col s12">
                                            {/* <Searchbar searchCB={this.searchCB.bind(this)} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container " >

                        <div className="row"></div>

                        <div className="row"
                            style={{ marginTop: "130px" }}>

                            <div className="col s12  " >


                                <div className="row" >

                                    {this.state.events.map((event, key) => (
                                        <div className="col m3 s12">
                                            <Link to={`events/${event._id}`} className="grey-text text-darken-3">
                                                <div className="card z-depth-0 hoverable white" style={{ border: "1px solid lightgrey", textTransform: "capitalize" }}>
                                                    <div className="" style={{
                                                        background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_800,h_700,c_fill,g_auto/${event.imgID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                        backgroundSize: "100%", height: "200px"
                                                    }}>
                                                        <div className="date-box white-text center-align   right" style={{ width: "20%", margin: "0px 10px" }}>
                                                            <div className="green darken-1" style={{ fontSize: "1.3em", padding: "10px 0px" }}> {moment(event.checkedDate).format("DD")}</div>
                                                            <div className="black" style={{ fontSize: "0.7em", padding: "10px 0px" }}>
                                                                <div>{moment(event.checkedDate).format("MMM")}</div>
                                                                <div>{moment(event.checkedDate).format("YYYY")}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="center-align" style={{ padding: "10px 10px" }}>
                                                        <div style={{ fontSize: "1.2em" }}><b>{this.substr(event.title,25)}</b></div>
                                                        <div style={{ height: "44px" ,fontSize:"0.9em"}}>{this.substr(event.description, 50)}</div>
                                                    </div>
                                                    <div className="" style={{ padding: "10px 10px" }}>

                                                        <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                            <div className="col s5">
                                                                <i className="material-icons left tiny">visibility</i> Genre
                                                                                 </div>
                                                            <div className="col s7 right-align">
                                                                {event.industry}
                                                            </div>
                                                        </div>
                                                        <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                            <div className="col s5">
                                                                <i className="material-icons left tiny">place</i>Location
                                                                        </div>
                                                            <div className="col s7 right-align">
                                                                {event.location}
                                                            </div>
                                                        </div>
                                                        <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>

                                                            <div className="col s4">
                                                                <i className="material-icons left tiny">event</i>Time
                                                                     </div>
                                                            <div className="col s8 right-align">
                                                                {event.startTime} to {event.stopTime} 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                        </div>
                                    ))}
                                    {this.state.events.length?null:<div style={{padding:"150px",textAlign:"center"}}>No events available</div>}
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* <div className="container " >
                    <div className="row" style={{marginTop:"10px"}}>
                    <div className="col s12">
                    <h5>Artists Events</h5>    
                    </div>
                    </div>
                        <div className="row">
                            {this.state.events.map((event) => (
                                <div className="col-lg-3 col-md-6">
                                    <Link to={`/calendar/events/${event._id}`} className="listing-item-container compact">
                                        <div className="listing-item">
                                            <img src={event.imgUrl} alt="" />
                                            <div className="listing-item-details" >
                                                <ul>
                                                    <li>{moment(event.checkedDate).format("LL")}</li>
                                                </ul>
                                            </div>
                                            <div className="listing-item-content" >
                                                <div className="numerical-rating high" data-rating="5.0"></div>
                                                <h3 style={{ textTransform: "capitalize" }}>{event.title}</h3>
                                                <span style={{ textTransform: "capitalize" }}>{event.location}</span>
                                            </div>
                                            <span className="like-icon"></span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    <Footer />
                    <style>{`
                    body{
                        background:#f9f9f9;
                    }
                   .events >.row{
                       padding:5px 0px;
                   }
                   .events .row{
                       margin:0px ;
                       
                   }
                   .events .card-content{
                       padding: 10px;
                       font-size:0.9em
                   }
                   .events .card .card-image img{
                    //    width:50%;
                    max-height:200px
                   }
                   .events .left-grid-col{
                       padding:0px 10px 0px 0px !important;
                   }
                    .events .left-grid{
                    //    border-right:1px solid lightgrey;
                   }
                    .events .grid{
                       width:20% !important;
                   }
                    .events .grid-2{
                       width:40% !important;
                   }
         
                    .events .pad{
                        padding:0px 10px;
                    }
                      .events .container{
                        width:95%;
                        margin:auto;
                    }
                         .events .adjust-pad{
                        padding-right:0px;
                    }
                     .events input.input{
                        height:23px;
                        border:1px solid lightgrey;
                        border-radius:10px;
                        padding:0px 10px;
                        font-size:0.8em;
                     }
                      .events input{
                        height:20px;
                     }
                `}</style>
                </div> : <Loading />
        );
    }
}

export default Events;