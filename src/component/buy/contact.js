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
                <ul className="collection white" style={{ border: "0px", padding: "20px 20px", marginTop: "0px" }}>
                    <div className=" center-align" ><center>
                        <div className="profile-pic">
                        </div></center>
                    </div>
                    <p className="center-align custom-title" ><b>{this.props.product.title} </b></p>
                    <div className="grey-text center-align text-darken-3">
                        Price: ${this.props.product.price} || Uploaded by {this.props.profile.firstName} {this.props.profile.lastName}
                    </div>
                    {/* <div style={{ margin: "10px 0px" }}>
                        <a href="#" onClick={(e) => this.props.openProductModal(e)} style={{ border: "1px solid lightgrey", width: "100%", textTransform: "capitalize" }} className="btn white z-depth-0 grey-text text-darken-3">Contact Artist</a>

                    </div> */}
{/* 
                    <div className="row  grey-text text-darken-3">
                        <div className="col s6 ">
                            <i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>email</i><span>Email</span>
                        </div>
                        <div className="col s6 right-align">
                            <span>{this.props.profile.email}</span>
                        </div>
                        <div className="col s6 ">
                            <i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>place</i><span>Location</span>
                        </div>
                        <div className="col s6 right-align">
                            <span>
                                {this.props.profile.location} </span>
                        </div>
                        <div className="col s6 " >
                            <i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>perm_identity</i><span>Member since</span>
                        </div>
                        <div className="col s6 right-align">
                                <span>{this.props.profile.date ? moment(this.props.profile.date).format("LL") : "Not available"}</span>
                        </div>
                        <div className="col s6 " >
                            <i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>visibility</i><span>Success rate</span>
                        </div>
                        <div className="col s6 right-align">
                                <span>{this.props.profile.views ? this.props.profile.views : "Not available"}</span>
                        </div>
                    </div> */}

                </ul>
                <style>{`
           .contact .profile-pic
            {
                background: #eee url('${this.props.product.imgUrl || "../../images/user.png"}');
                background-size: cover;
                padding: 60px;
                border-radius: 100%;
                width: 100px
            }
              
                 .contact    .custom-title{
                        font-size:1.5em;
                        margin:5px 0px 0px;
                    }
            `}
                </style>
            </div>
        );
    }
}

export default Contact;