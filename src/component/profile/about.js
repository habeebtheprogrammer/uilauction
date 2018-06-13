import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
import { connect } from "react-redux"
import Bestprofiles from "../artist/bestprofiles"
import { bindActionCreators } from "redux"
import auth from "../../reducer/index"
import { setUserProfile, editUserProfile } from "../../actions/index"
import data from "../../data"
import FileUpload from "react-fileupload"
import Contact from "../profile/contact"
import validator from "validator"

import Loading from "../loader"

class About2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: "",
            media: "",
            isLoading: true
        }
    }
    componentWillMount() {
        if (validator.isMongoId(this.props.match.params.id)) {
            axios.get(`${apiUrl}/api/artist?id=${this.props.match.params.id}`).then((res) => {
                // this.props.setUserProfile(res.data.data)
                if (res.data.user) {
                    this.setState({ artist: res.data.user, media: res.data.media, isLoading: false });
                } else this.setState({ artist: false })
            })
        } else this.setState({ artist: false })
    }
    render() {

        return (
            this.state.isLoading === false ?
                <div className="dashboard">
                    <Navbar />
                    <div className="row " style={{ marginTop: "10px",padding:"10px" }}>
                        <div className="col s12 m3 adjust-pad">

                            <Contact profile={this.state.artist} match={this.props.match} />
                            {/* <Description profile={this.props.profile} editDesc={this.editDesc} /> */}
                            {/* <Work profile={this.props.profile} editWorkExp={this.editWorkExp} /> */}

                        </div>
                        <div className="col s12 m9 adjust-pad">
                            {/* <Banner profile={this.props.profile} /> */}
                            <div className="row white" style={{ margin: "1px", minHeight: "400px" }}>
                                <div className="col m12 no-padding">
                                    <ul className="collection white col s12" style={{ border: "0px", marginBottom: "0px" }} >

                                        <li className="collection-item avatar" style={{ paddingLeft: "20px" }}>
                                            {/* <img src="./images/rockstar.jpg" alt="" className="circle" /> */}
                                            <span className="title grey-text text-darken-2" style={{ fontSize: "1.3em" }}>About me</span>
                                            <p className="grey-text"><small>Resume</small>
                                            </p>


                                        </li>
                                        <li >
                                            <p style={{ padding: "0px 20px" }} style={{ whiteSpace: "pre-line" }}>
                                                {this.state.artist.desc}
                                            </p>
                                        </li>

                                        <style>{`
                   .mb{margin-bottom:20px}
                `}</style>
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
                      .padding-right{
                        padding-right: 0px !important;
                    }
                         @media (max-width: 620px) {
                           .dashboard .adjust-pad{
                        padding-left:0px;
                    }
                     .padding-right{
                        padding-right: inherit;
                    }
                }
                `}</style>
                </div >
                : <Loading />
        );
    }
}

export default About2