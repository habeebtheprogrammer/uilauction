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
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: {},
            artists: [],
            result: [],
            search: false,
            filterByIndustry: [],
            selectValue: "",
            searchitems: {},
            response: false
        }
    }

    componentWillMount() {

        axios.get(`${apiUrl}/api/getArtists`).then((res) => {
           
            if (res.data.success) {
                this.setState({ artists: res.data.success, response: true })
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
            this.state.artists || this.state.search?
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
                    <div className="hide-on-med-and-up white" style={{ position: "fixed", zIndex: "992", width: "100%" }}>
                        <Searchbar searchCB={this.searchCB.bind(this)} />
                    </div>
                    <div className="hide-on-med-and-up" style={{ padding: "25px 0px" }}>
                        {this.state.search ? this.state.result.length ? <div style={{ padding: "35px 10px 0px" }}>{this.state.result.length} results found</div> : <div style={{ padding: "35px 13px 0px" }}>No result found</div> : null}
                    </div>
                    <div className="container " >

                        <div className="row"></div>

                        <div className="row"
                            style={{ marginTop: "130px" }}>
                            <h6 style={{ fontFamily: "avenirBold", padding: "20px" }}>BROWSE AND DISCOVER ARTISTS</h6>

                            <div className="col s12  " >

                                {this.state.search ?


                                    <div className="row">
                                        <div className="col s12 hide-on-med-and-down" style={{ paddingBottom: "100px" }}>
                                            {this.state.result.length} Result(s) found
                                </div>
                                    </div> : null}
                                <div className="row" >
                                    {this.state.search ?
                                        this.state.result.map((artist, key) => (
                                            <div className="col m3 s12 no-pad">
                                                <Link to={`artist/${artist._id}`} className="grey-text text-darken-3">
                                                    <div className="card z-depth-0 hoverable white" style={{ border: "1px solid lightgrey", textTransform: "capitalize" }}>
                                                        <div className="bgimg" style={{
                                                            background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_800,h_700,c_fill,g_auto/${artist.dpID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                            backgroundSize: "100%",height:"200px"
                                                        }}>

                                                        </div>
                                                        <div className="center-align" style={{ padding: "10px 10px" }}>
                                                            <div style={{ fontSize: "1.2em" }}><b>{artist.firstName} {artist.lastName}</b></div>
                                                            <div >{this.substr(artist.bio, 50)}</div>
                                                        </div>
                                                        <div className="" style={{ padding: "10px 10px" }}>

                                                            <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                                <div className="col s5">
                                                                    <i className="material-icons left tiny">visibility</i> Genre
                                           </div>
                                                                <div className="col s7 right-align">
                                                                    {this.substr(artist.selectedIndustry,10)}
                                                                </div>
                                                            </div>
                                                            <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                                <div className="col s5">
                                                                    <i className="material-icons left tiny">place</i>Location
                                           </div>
                                                                <div className="col s7 right-align">
                                                                    {this.substr(artist.country, 10)}
                                                                </div>
                                                            </div>
                                                            <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>

                                                                <div className="col s8">
                                                                    <i className="material-icons left tiny">visibility</i>Views
                                           </div>
                                                                <div className="col s4 right-align">
                                                                    {artist.views}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>

                                            </div>
                                        ))
                                        : window.location.search === "" ?
                                            this.state.artists.map((artist, key) => (
                                                <div className="col s12 m3 no-pad">
                                                    <Link to={`artist/${artist._id}`} className="grey-text text-darken-3">
                                                        <div className="card z-depth-0 hoverable white" style={{ border: "1px solid lightgrey", textTransform: "capitalize" }}>
                                                            <div className="" style={{
                                                                background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_800,h_700,c_fill,g_auto/${artist.dpID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                                backgroundSize: "100%",height:"250px"
                                                            }}>
                                                            </div>
                                                            <div className="center-align" style={{ padding: "10px 10px" }}>
                                                                <div style={{ fontSize: "1.2em" }}><b>{artist.firstName} {artist.lastName}</b></div>
                                                                <div>{this.substr(artist.bio, 30)}</div>
                                                            </div>
                                                            <div className="" style={{ padding: "10px 10px" }}>

                                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                                    <div className="col s5">
                                                                        <i className="material-icons left tiny">visibility</i> Genre
                                                                                 </div>
                                                                    <div className="col s7 right-align">
                                                                        {this.substr(artist.selectedIndustry, 10)}
                                                                    </div>
                                                                </div>
                                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                                    <div className="col s5">
                                                                        <i className="material-icons left tiny">place</i>Location
                                                                        </div>
                                                                    <div className="col s7 right-align">
                                                                        {this.substr(artist.country,10)}
                                                                    </div>
                                                                </div>
                                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>

                                                                    <div className="col s8">
                                                                        <i className="material-icons left tiny">visibility</i>Views
                                                                     </div>
                                                                    <div className="col s4 right-align">
                                                                        {artist.views}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                </div>
                                            ))
                                            : <div className="center-align" style={{ paddingBottom: "100px" }}>
                                                No search result found
                                        </div>}
                                </div>

                                {/* <div className="row" style={{ marginBottom: "30px" }}>
                                    <div className="col s6 offset-s3 center-align">
                                        <button type="button" style={{ border: "1px solid lightgrey", fontSize: "0.8em" }} className="btn waves-effect waves-red transparent z-depth-0 grey-text text-darken-2">Load More</button>
                                    </div>

                                </div> */}
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
                    // background-size:contain !important;
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

export default connect(mapStateToProps)(Search);