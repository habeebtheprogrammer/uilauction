import React, { Component } from 'react';
import axios from "axios"
import apiUrl from "../../config"
import moment from "moment"
import { Link } from "react-router-dom"
class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            artists2: [],
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/sixBestArtists`).then((res) => {

            if (res.data.success) {
                this.setState({ artists: res.data.success })
            }
            else this.setState({ empty: res.data.empty })

        })
        axios.get(`${apiUrl}/api/sevenBestArtists`).then((res) => {

            if (res.data.success) {
                this.setState({ artists2: res.data.success })
            }
            else this.setState({ empty: res.data.empty })

        })
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {
        return (
            <div className="" >
                <div className="row">
                    <div className="col s12 m9 " style={{ padding: "0px" }}>
                        <div className="row">
                            {this.state.artists.slice(0, 3).map((artist) => (

                                <div className="col s12 m4 pad-top x2-padding">
                                    <Link to={`artist/${artist._id}`} className="grey-text text-darken-3">
                                        <div className="card x-nopad z-depth-0 hoverable white" style={{ border: "1px solid lightgrey", textTransform: "capitalize" }}>
                                            <div className="row">
                                                <div className="col s4 m12" style={{ padding: "0px" }}>
                                                    <div className="acard" style={{
                                                        background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_800,h_700,c_fill,g_auto/${artist.dpID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                        backgroundSize: "100%", 
                                                    }}>
                                                    </div>
                                                </div>
                                                <div className="col s8 m12" style={{ padding: "0px" }}>

                                                    <div className="x-center-align" style={{ padding: "10px 10px" }}>
                                                        <div style={{ fontSize: "1.2em" }}><b>{artist.firstName} {artist.lastName}</b></div>
                                                        <div style={{}}>{this.substr(artist.bio, 35)}</div>
                                                        <span className="hide-on-med-and-up grey-text"> <small>{artist.selectedIndustry}</small></span>

                                                    </div>
                                                    <div className="hide-on-med-and-down" style={{ padding: "10px 10px" }}>

                                                        <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                            <div className="col s5">
                                                                <i className="material-icons left tiny">visibility</i> Genre
                                                    </div>
                                                            <div className="col s7 right-align">
                                                                {artist.selectedIndustry}
                                                            </div>
                                                        </div>
                                                        <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                            <div className="col s5">
                                                                <i className="material-icons left tiny">place</i>Location
                                                    </div>
                                                            <div className="col s7 right-align">
                                                                {artist.country}
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
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="col s12 m3 xpad-top" style={{ padding: "0px" }}>
                        <div className="row">
                            {this.state.artists.slice(3, 7).map((artist) => (

                                <div className="col s6 m6 x2-padding ">
                                    <Link to={`artist/${artist._id}`} className="grey-text text-darken-3">
                                        <div className="card x-nopad z-depth-0 hoverable white" style={{ border: "1px solid lightgrey", textTransform: "capitalize" }}>
                                            <div className="" style={{
                                                background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_200,h_200,c_fill,g_auto/${artist.dpID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                backgroundSize: "100%", height: "135px"
                                            }}>

                                            </div>
                                            <div className="center-align" style={{ padding: "10px 10px" }}>
                                                <div style={{ fontSize: "0.9em" }}><b>{artist.firstName} {artist.lastName}</b></div>
                                                {/* <div style={{ height: "44px" }}>{this.substr(artist.bio, 50)}</div> */}

                                            </div>
                                            {/* <div className="" style={{ padding: "10px 10px" }}>

                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                    <div className="col s5">
                                                        <i className="material-icons left tiny">visibility</i> Genre
                                                    </div>
                                                    <div className="col s7 right-align">
                                                        {artist.selectedIndustry}
                                                    </div>
                                                </div>
                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                    <div className="col s5">
                                                        <i className="material-icons left tiny">place</i>Location
                                                </div>
                                                    <div className="col s7 right-align">
                                                        {artist.country}
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
                                            </div> */}
                                        </div>
                                    </Link>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 m9" style={{ padding: "0px" }}>
                        <div className="row">
                            {this.state.artists.slice(7, 10).map((artist) => (

                                <div className="col s12 m4 pad-top x2-padding" >
                                    <Link to={`artist/${artist._id}`} className="grey-text text-darken-3">
                                        <div className="card z-depth-0 hoverable white" style={{ border: "1px solid lightgrey", textTransform: "capitalize" }}>
                                            <div className="" style={{
                                                background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_800,h_700,c_fill,g_auto/${artist.dpID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                backgroundSize: "100%", height: "250px"
                                            }}>

                                            </div>
                                            <div className="center-align" style={{ padding: "10px 10px" }}>
                                                <div style={{ fontSize: "1.2em" }}><b>{artist.firstName} {artist.lastName}</b></div>
                                                <div style={{}}>{this.substr(artist.bio, 35)}</div>

                                            </div>
                                            <div className="" style={{ padding: "10px 10px" }}>

                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                    <div className="col s5">
                                                        <i className="material-icons left tiny">visibility</i> Genre
                                           </div>
                                                    <div className="col s7 right-align">
                                                        {artist.selectedIndustry}
                                                    </div>
                                                </div>
                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                    <div className="col s5">
                                                        <i className="material-icons left tiny">place</i>Location
                                           </div>
                                                    <div className="col s7 right-align">
                                                        {artist.country}
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
                            ))}

                        </div>
                    </div>
                    <div className="col s12 m3 xpad-top2">
                        <div className="row">
                            {this.state.artists.slice(10, 14).map((artist) => (

                                <div className="col s6 m6  no-padding">
                                    <Link to={`artist/${artist._id}`} className="grey-text text-darken-3">
                                        <div className="card z-depth-0 x-nopad hoverable white" style={{ border: "1px solid lightgrey", textTransform: "capitalize" }}>
                                            <div className="" style={{
                                                background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_200,h_200,c_fill,g_auto/${artist.dpID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                backgroundSize: "100%", height: "130px"
                                            }}>

                                            </div>
                                            <div className="center-align" style={{ padding: "10px 10px" }}>
                                                <div style={{ fontSize: "0.9em" }}><b>{artist.firstName} {artist.lastName}</b></div>
                                                {/* <div style={{ height: "44px" }}>{this.substr(artist.bio, 50)}</div> */}

                                            </div>
                                            {/* <div className="" style={{ padding: "10px 10px" }}>

                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                    <div className="col s5">
                                                        <i className="material-icons left tiny">visibility</i> Genre
                                                    </div>
                                                    <div className="col s7 right-align">
                                                        {artist.selectedIndustry}
                                                    </div>
                                                </div>
                                                <div className="row grey-text" style={{ fontSize: "0.8em", margin: "0px" }}>
                                                    <div className="col s5">
                                                        <i className="material-icons left tiny">place</i>Location
                                                </div>
                                                    <div className="col s7 right-align">
                                                        {artist.country}
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
                                            </div> */}
                                        </div>
                                    </Link>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <style>
                    {`  
                    .acard{
                        height:220px
                    }
                    .card{
                        margin:0px !important;
                    }
                    .x2-padding{
                        padding:5px !important
                        }   

                     .x-center-align{
                                    text-align:center;
                                }
                    @media (max-width: 620px) {
                                .x-center-align{
                                    text-align:left;
                                    font-size:0.9em
                                }
                        .acard{
                                height:100px
                            }
                            .x-nopad{
                                margin:0px
                            }
                            .xpad-top{
                                padding:20px 0px 15px!important;
                            }
                            .xpad-top2{
                                padding:10px 0px 15px!important;
                            }
                    }`}
                </style>
            </div>
        );
    }
}

export default Services;