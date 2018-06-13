import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import { Row, Col, } from "react-materialize"
import axios from "axios"
import apiUrl from "../../config"
import { connect } from "react-redux"
import Bestprofiles from "../artist/bestprofiles"
import { bindActionCreators } from "redux"
import auth from "../../reducer/index"
import { setUserProfile } from "../../actions/index"
import data from "../../data"
import FileUpload from "react-fileupload"
import Contact from "./contact"
import Work from "./work"
import validator from "validator"
import Description from "./description"



class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: "",
        }
    }
    componentWillMount() {
        if (validator.isMongoId(this.props.match.params.id)) {
            axios.get(`${apiUrl}/api/artist?id=${this.props.match.params.id}`).then((res) => {
                // this.props.setUserProfile(res.data.data)
                if (res.data.success) {
                    this.setState({ artist: res.data.success });
                } else this.setState({ artist: false })
            })
        } else this.setState({ artist: false })
    }
    render() {
        let token = localStorage.getItem("jwToken");
  
        return (
            <div className="dashboard">
                <div className="grey darken-4" style={{ paddingBottom: "10px" }}>
                    <Navbar />
                </div>
                <div className="row container" style={{ marginTop: "10px" }}>
                    <div className="col m3 adjust-pad">

                        <Contact profile={this.state.artist} match={this.props.match} />
                        <Description profile={this.state.artist} />
                        <Work profile={this.state.artist} />

                    </div>
                    <div className="col m9 adjust-pad">
                        <div className="profile-banner">
                            <div className="row profile-box" >
                                <div className="col s2">
                                    <div style={{ position: "absolute", bottom: "0", }}>
                                        <img src="../../images/logoTransparent.png" alt="" width="120px" />
                                    </div>
                                </div>
                                <div className="col s8 white-text text-lighten-2" style={{ padding: "0px", margin: "0px", textTransform: "capitalize" }}>
                                    <h4>{data.industry[this.state.artist.selectedIndustry] ? data.industry[this.state.artist.selectedIndustry].title : null}</h4>
                                    {data.industry[this.state.artist.selectedIndustry] ? data.industry[this.state.artist.selectedIndustry].categories[this.state.artist.selectedCategory].title : null}
                                </div>
                                <div className="col s2">
                                    <div style={{ marginTop: "20px" }}>
                                        {/* <button ref="chooseBtn" className="btn btn-default btn-sm">choose</button> */}
                                        <a href="#" className="grey-text text-lighten-2" style={{ position: "absolute", bottom: "0" }}>
                                            <div className="c">
                                                <div className="col" style={{ padding: "3px 4px 0px" }}>
                                                    <span>{this.state.artist.views}</span>
                                                </div>
                                                <div className="col" style={{ padding: "0px" }}>
                                                    <div>
                                                        <i className="material-icons">visibility</i>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row " >
                            <div className="col m6" style={{ paddingRight: "0px" }}>
                                <ul className="collection white col s12" style={{ border: "0px" }} >

                                    <li className="collection-item avatar" style={{ paddingLeft: "20px" }}>
                                        {/* <img src="./images/rockstar.jpg" alt="" className="circle" /> */}
                                        <span className="title grey-text text-darken-2" style={{ fontSize: "1.3em" }}>Uploaded videos</span>
                                        <p className="grey-text"><small>Upload a video</small>
                                        </p>


                                    </li>
                                    <li>

                                        <p style={{ padding: "0px 20px" }}>

                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col m6" >
                                <ul className="collection white col s12" style={{ border: "0px" }} >
                                    <li className="collection-item avatar" style={{ paddingLeft: "20px" }}>
                                        {/* <img src="./images/rockstar.jpg" alt="" className="circle" /> */}
                                        <span className="title grey-text text-darken-2" style={{ fontSize: "1.3em" }}>Uploaded songs</span>
                                        <p className="grey-text"><small>Songs uploaded will be available in the media channel</small>
                                        </p>
                                    </li>
                                    <li>

                                        <p style={{ padding: "0px 20px" }}>

                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col m6" style={{ paddingRight: "0px" }}>
                                <ul className="collection white col s12" style={{ border: "0px" }} >

                                    <li className="collection-item avatar" style={{ paddingLeft: "20px" }}>
                                        {/* <img src="./images/rockstar.jpg" alt="" className="circle" /> */}
                                        <span className="title grey-text text-darken-2" style={{ fontSize: "1.3em" }}>Uploaded pictures</span>
                                        <p className="grey-text"><small>Uploaded pictures</small>
                                        </p>

                                    </li>
                                    <li>

                                        <p style={{ padding: "0px 20px" }}>

                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col m6" >
                                <ul className="collection white col s12" style={{ border: "0px" }} >

                                    <li className="collection-item avatar" style={{ paddingLeft: "20px" }}>
                                        {/* <img src="./images/rockstar.jpg" alt="" className="circle" /> */}
                                        <span className="title grey-text text-darken-2" style={{ fontSize: "1.3em" }}>Marketplace</span>
                                        <p className="grey-text"><small>Items uploaded will be available in the media channel</small>
                                        </p>

                                    </li>
                                    <li>

                                        <p style={{ padding: "0px 20px" }}>

                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
                <Footer />
                <style>{`
                    body{
                        background:#f7f7f7
                    }
                    .dashboard .profile-banner{
                         background:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),#263238 url('../../images/${this.state.artist.bgUrl}') no-repeat;
                        background-position:cover;
                        background-size:100%;
                        min-height:300px;
                        padding:20px;
                        position:relative;
                    }
                    .dashboard .profile-box{
                        position:absolute;
                        bottom: 0px;
                        width:100%;
                    }
                         .dashboard .adjust-pad{
                        padding-right:0px;
                    }
                    .tabs .tab a{
                        color:#222;
                    }
                    .tabs .indicator{
                        background:#222
                    }
                    .tabs .tab a:hover, .tabs .tab a.active {
                        background-color: transparent;
                        color: #222;
                    }                   
                      .dashboard .container{
                        width:95%;
                        margin:auto;
                    }
                         .dashboard .collapsible-header{
                       padding:0px;
                       border:0px;
                    //    font-size:0.9em;
                   }
                   .dashboard .collapsible-header:hover{
                       background:#eee;
                   }
                  .dashboard .collapsible{
                       box-shadow:none;
                       border:0px;
                   }
                     .dashboard .collapsible i{
                       font-size:1em;
                   }
                    .dashboard .x-card{
                        background:#fff;
                        padding:20px;
                        margin:10px 0px 0px;
                        color:#222;
                    }
                    .dashboard .x-card .title{
                        font-size:1.4em;
                    }
                    .dashboard .custom-title{
                        font-size:1.4em;
                        margin:0px;
                    }
                `}</style>
            </div >
        );
    }
}

export default Media