import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import Marketplaceslider from "../slider/marketplaceslider"
import Bannerslider from "../slider/bannerslider"
// import artistslider from "../slider/artistslider"
import { Link } from "react-router-dom"
import validator from "validator"
import Select from 'react-select';
import apiUrl from "../../config"
import {Icon} from "react-materialize"
import data from "../../data"
import Bestprofiles from "./bestprofiles"
import Recent from "./recent"
import Keywordfilter from "./keywordfilter"
import Searchbar from "./searchbar"
import axios from "axios"
import Banner from "./banner"
import moment from "moment"
import Loading from "../loader"
import Contact from "../profile/contact"
import { connect } from "react-redux"
import Filter from "./filter"
import $ from "jquery"
import auth from "../../reducer/index"
import { Card, CardTitle, Collapsible, CollapsibleItem, Button, Row, Input, Badge } from "react-materialize"

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}
class Searchevents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: {},
            events: [],
            result: [],
            search: false,
            filterByIndustry: [],
            selectValue: "",
            searchitems: {},
            response: false
        }
    }

    componentWillMount() {

        axios.get(`${apiUrl}/api/getEvents`).then((res) => {
           
            if (res.data.success) {
                this.setState({ events: res.data.success, response: true })
            } else console.log(res.data)
        }).catch((err) => console.log(err));
        // if(this.props.match)
        if (this.props.auth.user.id) {
            axios.get(`${apiUrl}/api/artist?id=${this.props.auth.user.id}`).then((res) => {
                // this.props.setUserProfile(res.data.data)
                if (res.data.success) {
                    this.setState({ artist: res.data.success });
                } else this.setState({ artist: false })
            })
        } else this.setState({ artist: false })
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
 
        let array = ["a6.jpg", "a9.jpg", "a10.jpg", "a5.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"]
        return (
            this.state.events || this.state.search ?
                <div className="artist">
                    <Navbar />
                    <div className="white hide-on-med-and-down" style={{ position: "fixed", zIndex: "992", width: "100%", padding: "10px 0px" }}>
                        <div className="container " >

                            <div className="row "  >
                                <div className="col s6  " >
                                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>SEARCH OUR WEBSITE</h5>
                                    {/* <p> Browse And Discover</p> */}
                                </div>
                                <div className="col s6 " >
                                    <div className="row" style={{ padding: "0px 3px", marginBottom: "0px" }}>

                                        <div className="col s12 right-align" >
                                            <Filter searchCB={this.searchCB.bind(this)} />
                                        </div>

                                        <div className="col s12">
                                            <Searchbar searchCB={this.searchCB.bind(this)} />
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
                            <h6 style={{ fontFamily: "avenirBold", padding: "20px" }}>BROWSE AND DISCOVER EVENTS</h6>

                            <div className="col s12  " >

                                {this.state.search ?


                                    <div className="row">
                                        <div className="col s12">
                                            {this.state.result.length} Result(s) found
                                </div>
                                    </div> : null}
                                <div className="row" >
                                    {this.state.search ?
                                        this.state.result.map((event, key) => (
                                            <div className="col s12 m3">
                                                <Link to={`calendar/events/${event._id}`} className="grey-text text-darken-3">
                                                    <div className="card  hoverable z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>

                                                        <div className="bgimg" style={{
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
                                                            {/* <div className="date-box white-text center-align   right" style={{ border: "2px solid white",borderTop:"none", width: "20%", padding: "5px", fontSize: "0.9em", margin: "0px 10px" }}>
                                                                    <b >{moment(event.checkedDate).format("MMM Do")}</b>
                                                                </div> */}
                                                        </div>
                                                        <div className="row" style={{ padding: "10px", margin: "0px" }}>
                                                            <div className="col s12">

                                                                <div style={{ textTransform: "capitalize", fontSize: "1.3em" }}><b>{this.substr(event.title, 20)}</b></div>
                                                            </div>
                                                            <div className="col s12">
                                                                <div className="grey-text"> <small>{this.substr(event.description, 40)}</small> </div>
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
                                                            <div className="col s6 left-align  grey-text">
                                                                <small>{event.location}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                        : window.location.search === "" ?
                                            this.state.events.map((event, key) => (
                                                <div className="col s12 m3">
                                                    <Link to={`calendar/events/${event._id}`} className="grey-text text-darken-3">
                                                        <div className="card  hoverable z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>

                                                            <div className="bgimg" style={{
                                                                background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_800,h_700,c_fill,g_auto/${event.imgID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                                backgroundSize: "100%",height: "200px"
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
                                                                <div className="col s12">

                                                                    <div style={{ textTransform: "capitalize", fontSize: "1.3em" }}><b>{this.substr(event.title, 20)}</b></div>
                                                                </div>
                                                                <div className="col s12">
                                                                    <div className="grey-text"> <small>{this.substr(event.description, 40)}</small> </div>
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
                                                                <div className="col s6 left-align  grey-text">
                                                                    <small>{event.location}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                            : <div className="center-align">
                                                No search result found
                                        </div>}
                                </div>

                                <div className="row" style={{ marginBottom: "30px" }}>
                                    <div className="col s6 offset-s3 center-align">
                                        <button type="button" style={{ border: "1px solid lightgrey", fontSize: "0.8em" }} className="btn waves-effect waves-red transparent z-depth-0 grey-text text-darken-2">Load More</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="hide-on-med-and-down" style={{ padding: "0px 40px" }}>
                        <h6 style={{ fontFamily: "avenirBold", padding: "20px" }}>MOST TRENDING</h6>
                        <Bannerslider />
                    </div>
                    <Footer />
                    <style>{`
                    body{
                        background:#f9f9f9;
                    }
                   .artist >.row{
                       padding:5px 0px;
                   }
                   .artist .row{
                       margin:0px ;
                       
                   }
                   .artist .card-content{
                       padding: 10px;
                       font-size:0.9em
                   }
                   .bgimg{
                    // background-size:100% !important;
                    // background-position:center !important;

                   }
                   .artist .card .card-image img{
                    //    width:50%;
                    max-height:200px;

                   }
                   .artist .left-grid-col{
                       padding:0px 10px 0px 0px !important;
                   }
                    .artist .left-grid{
                    //    border-right:1px solid lightgrey;
                   }
                    .artist .grid{
                       width:20% !important;
                   }
                    .artist .grid-2{
                       width:40% !important;
                   }
         
                    .artist .pad{
                        padding:0px 10px;
                    }
                      .artist .container{
                        width:95%;
                        margin:auto;
                    }
                         .artist .adjust-pad{
                        padding-right:0px;
                    }
                     .artist input.input{
                        height:23px;
                        border:1px solid lightgrey;
                        border-radius:10px;
                        padding:0px 10px;
                        font-size:0.8em;
                     }
                      .artist input{
                        height:20px;
                     }
                      @media (max-width: 620px) {
                       .container{
                           width:100% !important
                       }
                       .no-pad{
                           padding:0px !important
                       }
                }
                    
                `}</style>
                </div> : <Loading />
        );
    }
}

export default connect(mapStateToProps)(Searchevents);