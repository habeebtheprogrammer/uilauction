import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
import moment from "moment"
import { Link } from "react-router-dom"
import FileUpload from "react-fileupload"
class Contact extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className="contact">
                <ul className="collection white" style={{ border: "0px", padding: "20px 20px", marginTop: "0px",marginBottom:"10px" }}>
                    <div className=" center-align" ><center>
                        <div className="profile-pic">
                        </div></center>
                    </div>
                    <p className="center-align custom-title" >{this.props.profile.firstName} {this.props.profile.lastName}</p>
                    <div className="grey-text center-align grey-text text-darken-1">
                        <small className="">
                            {this.props.profile.bio}
                        </small>
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                            <Link to={`/artist/${this.props.match.params.id}`} style={{ border: "1px solid lightgrey", width: "100%", textTransform: "capitalize" }} className="btn white z-depth-0 grey-text text-darken-3">View Artist</Link>
                    </div>

                    <div className="row  grey-text text-darken-3">
                        <div className="col s6 " style={{ fontSize: "0.9em" }}>
                            <i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>email</i><span>Email</span>
                        </div>
                        <div className="col s6 right-align">
                            <small>
                                <span>{this.props.profile.email}</span>
                            </small>
                        </div>
                        <div className="col s6 " style={{ fontSize: "0.9em" }}>
                            <i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>place</i><span>Location</span>
                        </div>
                        <div className="col s6 right-align">
                            <span><small>{this.props.profile.location} </small></span>
                        </div>
                        <div className="col s6 " style={{ fontSize: "0.9em" }}>
                            <i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>perm_identity</i><span>Member since</span>
                        </div>
                        <div className="col s6 right-align">
                            <small>
                                <span>{this.props.profile.date ? this.props.profile.date : "Not available"}</span>
                            </small>
                        </div>
                        <div className="col s6 " style={{ fontSize: "0.9em" }}>
                            <i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>visibility</i><span>Success rate</span>
                        </div>
                        <div className="col s6 right-align">
                            <small>
                                <span>{this.props.profile.views ? this.props.profile.views : "Not available"}</span>
                            </small>
                        </div>
                    </div>

                </ul>
                <style>{`
           .contact .profile-pic
            {
                background: #fff url('${this.props.profile.dpUrl || "../../images/user.png"}') no-repeat;
                background-size: contain;  background-position:center;
                padding: 60px;
                border-radius: 100%;
                width: 100px
            }
              
                 .contact    .custom-title{
                        font-size:1.4em;
                        margin:5px 0px 0px;
                    }
            `}
                </style>
            </div>
        );
    }
}

export default Contact;