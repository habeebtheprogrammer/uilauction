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
import { setUserProfile,editUserProfile } from "../../actions/index"
import data from "../../data"
import FileUpload from "react-fileupload"
import Contact from "../dashboard/contact"
import Work from "../dashboard/work"
import Banner from "../dashboard/banner"
import Contactform from "./contactform"
import Location from "./location"
import Personal from "./personal"
import Description from "../dashboard/description"
function mapStateToProps(state) {
    return {
        auth: state.auth,
        profile: state.profile.bioData
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserProfile: setUserProfile,
        editUserProfile
    }, dispatch)
}


class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: "",

        }
        this.editBio = this.editBio.bind(this)
        this.editDesc = this.editDesc.bind(this)
        this.editWorkExp = this.editWorkExp.bind(this)
        this.editContact = this.editContact.bind(this)
    }
    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        axios.get(`${apiUrl}/api/dashboard?token=${token}`).then((res) => {
            if (res.data.user) {
                this.props.setUserProfile({ profile: res.data.user, media: res.data.media })
            } else console.log(res)
        })
    }

    editBio(bio) {
        let userprofile = this.props.profile;
        userprofile.bio = bio;
        this.props.editUserProfile(userprofile)
    }
    editDesc(desc) {
        let userprofile = this.props.profile;
        userprofile.desc = desc;
        this.props.editUserProfile(userprofile)
    }
    editWorkExp(exp) {
        let userprofile = this.props.profile;
        userprofile.workExp = exp;
        this.props.editUserProfile(userprofile)
    }
    editContact(desc) {
        let userprofile = this.props.profile;
        // userprofile.workExp = exp;
        // this.props.setUserProfile(userprofile)
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

                        <Contact profile={this.props.profile} match={this.props.match}  editBio={this.editBio} />
                        {/* <Description profile={this.props.profile} editDesc={this.editDesc} /> */}
                        {/* <Work profile={this.props.profile} editWorkExp={this.editWorkExp} /> */}

                    </div>
                    <div className="col m9 adjust-pad">
                        {/* <Banner profile={this.props.profile} /> */}
                        <div className="row white" style={{margin:"1px"}}>
                            <div className="col m12 no-padding">
                                <Location/>
                            </div>
                            {/* <div className="col m6 no-padding" >
                                <Contactform />
                            </div> */}
                            <div className="col m12 no-padding" >
                                <Personal />
                            </div>
                            <div className="col m12 no-padding" >
                                <Description profile={this.props.profile} editDesc={this.editDesc} />
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
                        textarea{
                                  border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            height:130px !important;
                            padding:10px !important;
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
        );
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Setting);